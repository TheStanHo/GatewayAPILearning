import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { getAllExampleFiles } from './examples'
import { getDocSlugs, getDocBySlug } from './mdx'

export interface ValidationError {
  type: 'error' | 'warning'
  file: string
  message: string
  line?: number
}

export interface ValidationResult {
  errors: ValidationError[]
  warnings: ValidationError[]
  isValid: boolean
}

const GATEWAY_API_VERSIONS = ['v1', 'v1beta1', 'v1alpha2']
const NGINX_GATEWAY_FABRIC_VERSION = '2.2.1'

export async function validateYAML(filePath: string, content: string): Promise<ValidationError[]> {
  const errors: ValidationError[] = []

  try {
    yaml.load(content)
  } catch (e: any) {
    errors.push({
      type: 'error',
      file: filePath,
      message: `Invalid YAML syntax: ${e.message}`,
      line: e.mark?.line,
    })
  }

  return errors
}

export function validateAPIVersion(content: string, filePath: string): ValidationError[] {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check for Gateway API resources
  const gatewayAPIPattern = /apiVersion:\s*['"]?gateway\.networking\.k8s\.io\/([^'"]+)['"]?/g
  let match

  while ((match = gatewayAPIPattern.exec(content)) !== null) {
    const version = match[1]
    if (!GATEWAY_API_VERSIONS.includes(version)) {
      warnings.push({
        type: 'warning',
        file: filePath,
        message: `Unknown Gateway API version: ${version}. Supported versions: ${GATEWAY_API_VERSIONS.join(', ')}`,
      })
    }
    if (version !== 'v1') {
      warnings.push({
        type: 'warning',
        file: filePath,
        message: `Using ${version} instead of v1. Consider updating to v1 for stable API.`,
      })
    }
  }

  // Check for NGINX Gateway Fabric references
  const nginxPattern = /nginx-gateway-fabric|nginx\.org/g
  if (nginxPattern.test(content)) {
    // Could add version checking here if needed
  }

  return [...errors, ...warnings]
}

export function validateKubernetesResource(content: string, filePath: string): ValidationError[] {
  const errors: ValidationError[] = []

  try {
    const parsed = yaml.load(content) as any

    if (!parsed || typeof parsed !== 'object') {
      return errors
    }

    // Check required Kubernetes resource fields
    if (!parsed.apiVersion) {
      errors.push({
        type: 'error',
        file: filePath,
        message: 'Missing required field: apiVersion',
      })
    }

    if (!parsed.kind) {
      errors.push({
        type: 'error',
        file: filePath,
        message: 'Missing required field: kind',
      })
    }

    if (!parsed.metadata || !parsed.metadata.name) {
      errors.push({
        type: 'error',
        file: filePath,
        message: 'Missing required field: metadata.name',
      })
    }

    // Validate Gateway API specific resources
    if (parsed.kind === 'Gateway' && !parsed.spec?.gatewayClassName) {
      errors.push({
        type: 'error',
        file: filePath,
        message: 'Gateway resource missing required field: spec.gatewayClassName',
      })
    }

    if (parsed.kind === 'HTTPRoute' && !parsed.spec?.parentRefs) {
      errors.push({
        type: 'error',
        file: filePath,
        message: 'HTTPRoute resource missing required field: spec.parentRefs',
      })
    }
  } catch (e) {
    // Already handled by YAML validation
  }

  return errors
}

export async function validateAllContent(): Promise<ValidationResult> {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Validate all example files
  const exampleFiles = getAllExampleFiles()
  for (const file of exampleFiles) {
    const yamlErrors = await validateYAML(file.path, file.content)
    errors.push(...yamlErrors.filter((e) => e.type === 'error'))
    warnings.push(...yamlErrors.filter((e) => e.type === 'warning'))

    const apiErrors = validateAPIVersion(file.content, file.path)
    warnings.push(...apiErrors.filter((e) => e.type === 'warning'))
    errors.push(...apiErrors.filter((e) => e.type === 'error'))

    const k8sErrors = validateKubernetesResource(file.content, file.path)
    errors.push(...k8sErrors)
  }

  // Validate documentation files (check for broken links, etc.)
  const docSlugs = getDocSlugs()
  for (const slug of docSlugs) {
    const doc = await getDocBySlug(slug)
    if (doc) {
      // Check for broken internal links
      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
      let linkMatch
      while ((linkMatch = linkPattern.exec(doc.content)) !== null) {
        const linkPath = linkMatch[2]
        if (linkPath.startsWith('./') || linkPath.startsWith('../')) {
          // Could validate relative paths here
        }
      }
    }
  }

  return {
    errors,
    warnings,
    isValid: errors.length === 0,
  }
}

