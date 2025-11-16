# Gateway API Examples

This folder contains working YAML examples for Gateway API, organized by topic. Each example includes comments and references to the corresponding documentation.

## Example Organization

### 01-basic-setup/
Basic Gateway API setup including GatewayClass, Gateway, and HTTPRoute.

- `gatewayclass.yaml` - Basic GatewayClass definition
- `gateway.yaml` - Basic Gateway with HTTP listener
- `httproute-basic.yaml` - Simple HTTPRoute example
- `ingress-equivalent.yaml` - Equivalent Nginx Ingress for comparison

**Related Documentation:** [02-core-concepts.md](../Documentation/02-core-concepts.md)

### 02-path-routing/
Path matching examples including prefix, exact, and multiple paths.

- `httproute-path-prefix.yaml` - Path prefix matching
- `httproute-path-exact.yaml` - Exact path matching
- `httproute-multiple-paths.yaml` - Multiple path rules
- `ingress-path-equivalent.yaml` - Nginx Ingress equivalent

**Related Documentation:** [03-basic-routing.md](../Documentation/03-basic-routing.md)

### 03-header-routing/
Header-based routing examples.

- `httproute-header-match.yaml` - Header-based routing
- `httproute-multiple-headers.yaml` - Multiple header conditions
- `ingress-header-equivalent.yaml` - Nginx Ingress equivalent with annotations

**Related Documentation:** [04-advanced-routing.md](../Documentation/04-advanced-routing.md)

### 04-traffic-splitting/
Traffic splitting and canary deployment examples.

- `httproute-weighted.yaml` - Weighted traffic splitting
- `httproute-canary.yaml` - Canary deployment pattern
- `httproute-mirror.yaml` - Traffic mirroring
- `ingress-canary-equivalent.yaml` - Nginx Ingress canary equivalent

**Related Documentation:** [05-traffic-splitting.md](../Documentation/05-traffic-splitting.md)

### 05-tls/
TLS/SSL configuration examples.

- `gateway-tls.yaml` - Gateway with TLS configuration
- `gateway-tls-termination.yaml` - TLS termination example
- `ingress-tls-equivalent.yaml` - Nginx Ingress TLS equivalent

**Related Documentation:** [06-tls-ssl.md](../Documentation/06-tls-ssl.md)

### 06-filters/
Request/response modification examples.

- `httproute-url-rewrite.yaml` - URL rewriting
- `httproute-header-modify.yaml` - Request/response header modification
- `httproute-redirect.yaml` - Redirect filter
- `ingress-rewrite-equivalent.yaml` - Nginx Ingress rewrite equivalent

**Related Documentation:** [07-request-response-modifications.md](../Documentation/07-request-response-modifications.md)

### 07-advanced/
Advanced routing examples with complex matching.

- `httproute-multiple-matches.yaml` - Complex matching logic
- `httproute-query-params.yaml` - Query parameter matching
- `httproute-method-match.yaml` - HTTP method matching

**Related Documentation:** [04-advanced-routing.md](../Documentation/04-advanced-routing.md)

### 08-migration/
Migration examples showing before/after comparisons.

- `before-ingress.yaml` - Original Nginx Ingress
- `after-httproute.yaml` - Migrated HTTPRoute
- `migration-comparison.md` - Side-by-side comparison notes

**Related Documentation:** [09-migration-guide.md](../Documentation/09-migration-guide.md)

## How to Use These Examples

1. **Read the Documentation First**: Each example folder references documentation that explains the concepts
2. **Review the YAML**: Each file includes comments explaining key fields
3. **Compare with Ingress**: Many examples include Nginx Ingress equivalents
4. **Adapt to Your Needs**: Modify examples to match your use case
5. **Test in Your Cluster**: Apply examples to your Kubernetes cluster (with Gateway API installed)

## Prerequisites

**⚠️ IMPORTANT: Install Gateway API CRDs First!**

Before using any of these examples, you **must** install the Gateway API Custom Resource Definitions (CRDs) in your Kubernetes cluster. Gateway API resources are not part of standard Kubernetes.

### 1. Install Gateway API CRDs

```powershell
# Option 1: From NGINX Gateway Fabric (recommended if using NGINX)
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.2.1" | kubectl apply -f -

# Option 2: From Official Gateway API Repository
kubectl kustomize "https://github.com/kubernetes-sigs/gateway-api/releases/download/v2.2.1/standard-install.yaml" | kubectl apply -f -
```

### 2. Verify CRDs are Installed

```powershell
kubectl get crd | Select-String gateway
```

You should see CRDs like `gatewayclasses.gateway.networking.k8s.io`, `gateways.gateway.networking.k8s.io`, and `httproutes.gateway.networking.k8s.io`.

### 3. Install a Gateway API Implementation

Choose and install a Gateway API implementation:

- **NGINX Gateway Fabric** (recommended for this guide):
  ```powershell
  helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway
  ```

- **Other options:** Istio, Contour, Kong, Traefik (see their respective documentation)

### Additional Requirements

- Kubernetes cluster (minikube, kind, or cloud cluster)
- `kubectl` installed and configured
- `helm` 3.0+ (for NGINX Gateway Fabric installation)

For detailed setup instructions, see the [Setup Guide](../setup/README.md).

## Applying Examples

```bash
# Apply a GatewayClass
kubectl apply -f 01-basic-setup/gatewayclass.yaml

# Apply a Gateway
kubectl apply -f 01-basic-setup/gateway.yaml

# Apply an HTTPRoute
kubectl apply -f 01-basic-setup/httproute-basic.yaml

# Check status
kubectl get gateway
kubectl get httproute
```

## Notes

- Examples use `nginx-gateway` as the GatewayClass name - adjust for your implementation
- TLS examples require valid certificates (create Secrets first)
- Some examples are implementation-specific - check your Gateway provider's documentation
- Examples are for learning purposes - adapt security and configuration for production use

