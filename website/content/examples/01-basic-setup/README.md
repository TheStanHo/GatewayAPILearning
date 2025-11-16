# Basic Setup Examples

This directory contains the fundamental Gateway API resources you need to get started: GatewayClass, Gateway, and HTTPRoute.

## ⚠️ Prerequisites - Install Gateway API CRDs First!

**🚨 CRITICAL: Before applying ANY of these examples, you MUST install the Gateway API Custom Resource Definitions (CRDs) in your Kubernetes cluster.**

Gateway API resources (GatewayClass, Gateway, HTTPRoute, etc.) are **NOT** part of standard Kubernetes - they need to be installed as CRDs first. **This is the most common mistake!** If you skip this step, all `kubectl apply` commands will fail with errors like "no matches for kind 'GatewayClass'".

### Step 1: Install Gateway API CRDs

**⚠️ DO THIS FIRST - Without CRDs, nothing will work!**

**Option 1: Install from NGINX Gateway Fabric (Recommended if using NGINX)**

```powershell
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.2.1" | kubectl apply -f -
```

**Option 2: Install from Official Gateway API Repository**

```powershell
kubectl kustomize "https://github.com/kubernetes-sigs/gateway-api/releases/download/v2.2.1/standard-install.yaml" | kubectl apply -f -
```

**💡 Tip:** If you're not sure which to use, choose Option 1 if you plan to use NGINX Gateway Fabric.

### Step 2: Verify CRDs are Installed

**Always verify after installation!**

```powershell
kubectl get crd | Select-String gateway
```

You should see CRDs like:
- `gatewayclasses.gateway.networking.k8s.io`
- `gateways.gateway.networking.k8s.io`
- `httproutes.gateway.networking.k8s.io`
- `backendpolicies.gateway.networking.k8s.io` (if using experimental features)

**✅ If you see these CRDs, you're ready to proceed!**

### Step 3: Install NGINX Gateway Fabric (Gateway Implementation)

**After CRDs are installed and verified**, install a Gateway API implementation. For NGINX Gateway Fabric:

```powershell
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway
```

Wait for the deployment to be ready:

```powershell
kubectl wait --timeout=5m -n nginx-gateway deployment/ngf-nginx-gateway-fabric --for=condition=Available
```

## Files in This Directory

### 1. gatewayclass.yaml

Defines the type of Gateway controller to use. This is similar to `IngressClass` in the Ingress world.

**Apply this first:**
```powershell
kubectl apply -f gatewayclass.yaml
```

**Note:** NGINX Gateway Fabric automatically creates a GatewayClass named `nginx`. This file is only needed if you want to customize it or use a different name.

### 2. gateway.yaml

Creates a Gateway resource that defines network endpoints (listeners) for traffic. This is similar to setting up an Ingress Controller.

**Apply after GatewayClass:**
```powershell
kubectl apply -f gateway.yaml
```

**Verify:**
```powershell
kubectl get gateway
kubectl describe gateway my-gateway
```

The Gateway should show `Ready` status and have an address assigned.

### 3. httproute-basic.yaml

Defines routing rules for HTTP/HTTPS traffic. This is similar to an `Ingress` resource.

**Apply after Gateway:**
```powershell
kubectl apply -f httproute-basic.yaml
```

**Verify:**
```powershell
kubectl get httproute
kubectl describe httproute my-app-route
```

### 4. ingress-equivalent.yaml

Shows the equivalent Nginx Ingress configuration for comparison. This is for reference only - don't apply this if you're using Gateway API.

## Complete Setup Order

Follow these steps in order:

1. **⚠️ Install Gateway API CRDs (REQUIRED FIRST STEP):**
   ```powershell
   kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.2.1" | kubectl apply -f -
   ```
   
   Verify installation:
   ```powershell
   kubectl get crd | Select-String gateway
   ```

2. **Install NGINX Gateway Fabric** (see Prerequisites above):
   ```powershell
   helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway
   ```

3. **Apply GatewayClass** (optional - NGINX Gateway Fabric creates one automatically):
   ```powershell
   kubectl apply -f gatewayclass.yaml
   ```
4. **Apply Gateway**:
   ```powershell
   kubectl apply -f gateway.yaml
   ```
5. **Apply HTTPRoute**:
   ```powershell
   kubectl apply -f httproute-basic.yaml
   ```

## Troubleshooting

### Error: "no matches for kind 'GatewayClass'"

**Problem:** Gateway API CRDs are not installed.

**Solution:** Install CRDs first (see Prerequisites section above).

### Error: "no matches for kind 'Gateway'"

**Problem:** Gateway API CRDs are not installed.

**Solution:** Install CRDs first (see Prerequisites section above).

### Gateway Status Shows "Not Ready"

**Possible causes:**
- NGINX Gateway Fabric is not installed or not running
- GatewayClass doesn't exist or has wrong controller name
- Network policies blocking traffic

**Check:**
```powershell
kubectl get pods -n nginx-gateway
kubectl get gatewayclass
kubectl describe gateway my-gateway
```

## Related Documentation

- [Core Concepts Documentation](/docs/02-core-concepts)
- [NGINX Gateway Fabric Installation Guide](https://docs.nginx.com/nginx-gateway-fabric/installation/)
- [NGINX Gateway Fabric Docs](https://docs.nginx.com/nginx-gateway-fabric/)

