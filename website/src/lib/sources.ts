export interface SourceReference {
  type: 'local' | 'external'
  name: string
  url?: string
  version?: string
  lastUpdated?: string
}

export interface SourceAttribution {
  sources: SourceReference[]
  apiVersion?: string
  nginxGatewayFabricVersion?: string
}

// ============================================================================
// VERSION CONSTANTS - UPDATE THESE WHEN VERSIONS CHANGE
// ============================================================================
// To update versions:
// 1. Check https://gateway-api.sigs.k8s.io/ for Gateway API version
// 2. Check https://docs.nginx.com/nginx-gateway-fabric/ for NGINX version
// 3. Update the constants below
// 4. Search codebase for old version references in CONTENT FILES:
//    - @codebase "ref=v2.2.1" (finds kubectl commands in docs/examples)
//    - @codebase "releases/download/v2.2.1" (finds Gateway API URLs)
//    - @codebase "2.2.1" (finds all version references)
// 5. Update content files:
//    - website/content/docs/02-core-concepts.mdx
//    - website/content/examples.mdx
//    - website/content/examples/01-basic-setup/README.md
//    - website/content/docs/09-migration-guide.mdx
// 6. See VERSION_UPDATE_CHECKLIST.md for step-by-step guide
// 7. See MAINTENANCE.md for detailed maintenance instructions
// ============================================================================

const GATEWAY_API_DOCS_URL = 'https://gateway-api.sigs.k8s.io/'
const NGINX_GATEWAY_FABRIC_DOCS_URL = 'https://docs.nginx.com/nginx-gateway-fabric/'
const NGINX_GATEWAY_FABRIC_VERSION = '2.2.1' // ⚠️ UPDATE THIS when NGINX Gateway Fabric updates
const GATEWAY_API_VERSION = 'v1' // ⚠️ UPDATE THIS when Gateway API updates

export function getSourceAttribution(slug: string, filePath?: string): SourceAttribution {
  const sources: SourceReference[] = []

  // Add external sources only
  sources.push({
    type: 'external',
    name: 'Gateway API Official Documentation',
    url: GATEWAY_API_DOCS_URL,
    version: GATEWAY_API_VERSION,
  })

  sources.push({
    type: 'external',
    name: 'NGINX Gateway Fabric Documentation',
    url: NGINX_GATEWAY_FABRIC_DOCS_URL,
    version: NGINX_GATEWAY_FABRIC_VERSION,
  })

  return {
    sources,
    apiVersion: GATEWAY_API_VERSION,
    nginxGatewayFabricVersion: NGINX_GATEWAY_FABRIC_VERSION,
  }
}

export function getExampleSourceAttribution(category: string, filename: string, filePath: string): SourceAttribution {
  const sources: SourceReference[] = []

  // Add external sources only
  sources.push({
    type: 'external',
    name: 'Gateway API Official Documentation',
    url: GATEWAY_API_DOCS_URL,
    version: GATEWAY_API_VERSION,
  })

  sources.push({
    type: 'external',
    name: 'NGINX Gateway Fabric Documentation',
    url: NGINX_GATEWAY_FABRIC_DOCS_URL,
    version: NGINX_GATEWAY_FABRIC_VERSION,
  })

  return {
    sources,
    apiVersion: GATEWAY_API_VERSION,
    nginxGatewayFabricVersion: NGINX_GATEWAY_FABRIC_VERSION,
  }
}

export function getVersionCompatibilityNote(): string {
  return `This content is based on Gateway API ${GATEWAY_API_VERSION} and NGINX Gateway Fabric ${NGINX_GATEWAY_FABRIC_VERSION}. Please verify compatibility with your cluster's Gateway API implementation and version.`
}

