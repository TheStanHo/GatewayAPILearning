const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const GATEWAY_API_VERSIONS = ['v1', 'v1beta1', 'v1alpha2']
const NGINX_GATEWAY_FABRIC_VERSION = '2.2.1'

const errors = []
const warnings = []

function validateYAML(filePath, content) {
  try {
    // Check if file contains multiple documents (separated by ---)
    // Count document separators (--- at start of line)
    const documentSeparators = (content.match(/^---/gm) || []).length
    const hasMultipleDocuments = documentSeparators > 0
    
    if (hasMultipleDocuments) {
      // Use loadAll for multi-document YAML files
      const docs = []
      yaml.loadAll(content, (doc) => {
        if (doc !== null && doc !== undefined) {
          docs.push(doc)
        }
      })
      // If loadAll completes without error, all documents are valid
    } else {
      // Single document
      yaml.load(content)
    }
  } catch (e) {
    errors.push({
      type: 'error',
      file: filePath,
      message: `Invalid YAML syntax: ${e.message}`,
      line: e.mark?.line,
    })
  }
}

function validateAPIVersion(content, filePath) {
  // Match apiVersion: gateway.networking.k8s.io/v1 (with optional quotes)
  const gatewayAPIPattern = /apiVersion:\s*['"]?gateway\.networking\.k8s\.io\/(v[\w.]+)['"]?/g
  let match
  const foundVersions = new Set()

  while ((match = gatewayAPIPattern.exec(content)) !== null) {
    const version = match[1].trim()
    if (version) {
      foundVersions.add(version)
      
      if (!GATEWAY_API_VERSIONS.includes(version)) {
        warnings.push({
          type: 'warning',
          file: filePath,
          message: `Unknown Gateway API version: ${version}. Supported versions: ${GATEWAY_API_VERSIONS.join(', ')}`,
        })
      }
    }
  }
  
  // Only warn about non-v1 versions if v1 is available and they're using something else
  foundVersions.forEach(version => {
    if (version !== 'v1' && GATEWAY_API_VERSIONS.includes(version)) {
      warnings.push({
        type: 'warning',
        file: filePath,
        message: `Using ${version} instead of v1. Consider updating to v1 for stable API.`,
      })
    }
  })
}

function validateKubernetesResource(content, filePath) {
  try {
    // Check if file contains multiple documents
    const hasMultipleDocuments = content.split(/^---/m).length > 2
    
    if (hasMultipleDocuments) {
      // Validate each document in multi-document YAML
      yaml.loadAll(content, (doc) => {
        validateSingleResource(doc, filePath)
      })
    } else {
      // Single document
      const parsed = yaml.load(content)
      validateSingleResource(parsed, filePath)
    }
  } catch (e) {
    // Already handled by YAML validation
  }
}

function validateSingleResource(parsed, filePath) {
  if (!parsed || typeof parsed !== 'object') {
    return
  }

  // Skip validation for non-Kubernetes resources (e.g., comments-only files)
  if (!parsed.apiVersion && !parsed.kind) {
    return
  }

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
}

function validateExamples() {
  const examplesDir = path.join(process.cwd(), 'content', 'examples')

  if (!fs.existsSync(examplesDir)) {
    console.warn('Examples directory not found')
    return
  }

  const categories = fs.readdirSync(examplesDir, { withFileTypes: true })

  for (const category of categories) {
    if (category.isDirectory()) {
      const categoryPath = path.join(examplesDir, category.name)
      const files = fs.readdirSync(categoryPath).filter(
        (file) => file.endsWith('.yaml') || file.endsWith('.yml')
      )

      for (const file of files) {
        const filePath = path.join(categoryPath, file)
        const content = fs.readFileSync(filePath, 'utf8')

        validateYAML(filePath, content)
        validateAPIVersion(content, filePath)
        validateKubernetesResource(content, filePath)
      }
    }
  }
}

// Run validation
console.log('Validating content...\n')
validateExamples()

// Report results
if (warnings.length > 0) {
  console.log('Warnings:')
  warnings.forEach((warning) => {
    console.log(`  ⚠️  ${warning.file}: ${warning.message}`)
  })
  console.log()
}

if (errors.length > 0) {
  console.error('Errors:')
  errors.forEach((error) => {
    console.error(`  ❌ ${error.file}: ${error.message}`)
  })
  console.error()
  process.exit(1)
}

if (warnings.length === 0 && errors.length === 0) {
  console.log('✅ All content validation passed!')
} else {
  console.log(`✅ Validation complete. ${warnings.length} warning(s), ${errors.length} error(s)`)
}

