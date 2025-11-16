# Gateway API Learning Website

A static Next.js website for learning Kubernetes Gateway API with NGINX Gateway Fabric.

## Features

- Interactive documentation browser
- Code examples viewer with syntax highlighting
- Step-by-step learning paths with progress tracking
- Animated diagrams showing Gateway API concepts
- Content validation
- Source attribution for all content

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Validate content
npm run validate

# Build for production
npm run build
```

## Deployment

The website is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

The site will be available at: https://gatewayapi.stanho.dev

## Content Sources

- Local documentation from `../Documentation/`
- Code examples from `../Examples/`
- External references to:
  - [Gateway API Official Docs](https://gateway-api.sigs.k8s.io/)
  - [NGINX Gateway Fabric Docs](https://docs.nginx.com/nginx-gateway-fabric/)

## Content Validation

All content is validated before deployment:
- YAML syntax validation
- API version checks
- Kubernetes resource validation
- Broken link detection

## Keeping Documentation Up to Date

To keep the documentation current with the latest Gateway API and NGINX Gateway Fabric versions:

1. **Quick Updates**: See `QUICK_UPDATE.md` for fast version updates
2. **Full Maintenance Guide**: See `MAINTENANCE.md` for comprehensive maintenance instructions
3. **Version Constants**: Update versions in `website/src/lib/sources.ts`

### Quick Version Update

1. Check official docs for new versions
2. Update constants in `website/src/lib/sources.ts`
3. Search codebase: `@codebase "2.2.1"` to find all references
4. Update content files as needed

See `QUICK_UPDATE.md` for detailed steps.

