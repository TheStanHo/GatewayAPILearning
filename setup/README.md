# NGINX Gateway Fabric Setup Guide

This directory contains the YAML files needed to set up NGINX Gateway Fabric with Gateway API in Kubernetes.

## Prerequisites

Before you begin, ensure you have:

1. **Kubernetes cluster** running (minikube, kind, or cloud cluster)
2. **kubectl** installed and configured
3. **Helm 3.0 or later** installed

## Installation Steps

Follow these steps in order:

### Step 1: Install Gateway API CRDs

**You must install the Gateway API CRDs before installing NGINX Gateway Fabric.**

Install Gateway API resources from the standard channel (recommended):

```powershell
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.2.1" | kubectl apply -f -
```

**Alternative:** Install from experimental channel (includes additional experimental features):

```powershell
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/experimental?ref=v2.2.1" | kubectl apply -f -
```

**Verify CRDs are installed:**
```powershell
kubectl get crd | Select-String gateway
```

You should see CRDs like:
- `gatewayclasses.gateway.networking.k8s.io`
- `gateways.gateway.networking.k8s.io`
- `httproutes.gateway.networking.k8s.io`

### Step 2: Install NGINX Gateway Fabric with Helm

**Option A: Install from OCI Registry (Recommended)**

Install NGINX Gateway Fabric from the OCI registry:

```powershell
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway
```

**If you encounter network errors**, try **Option B** below.

**Option B: Install from Sources (Alternative)**

If OCI registry access fails, install directly from sources:

```powershell
# Pull the Helm chart
helm pull oci://ghcr.io/nginx/charts/nginx-gateway-fabric --untar

# Navigate to the chart directory
cd nginx-gateway-fabric

# Install from local chart
helm install ngf . --create-namespace -n nginx-gateway

# Return to original directory
cd ..
```

**Option C: Install using Manifests (No Helm Required)**

If Helm continues to have issues, you can install using raw manifests:

```powershell
kubectl apply -f https://raw.githubusercontent.com/nginxinc/nginx-gateway-fabric/v2.2.1/deploy/manifests/install.yaml
```

**Wait for deployment to be ready:**
```powershell
kubectl wait --timeout=5m -n nginx-gateway deployment/ngf-nginx-gateway-fabric --for=condition=Available
```

**Verify installation:**
```powershell
kubectl get pods -n nginx-gateway
kubectl get gatewayclass
```

You should see:
- NGINX Gateway Fabric pods running
- A GatewayClass named `nginx` (created automatically by NGINX Gateway Fabric)

> **Note:** NGINX Gateway Fabric creates a GatewayClass named `nginx` by default. The file `01-gatewayclass.yaml` is optional unless you want to customize it.

### Step 3: Create Gateway (Optional - if not using default)

If you want to use a custom GatewayClass, apply:

```powershell
kubectl apply -f 01-gatewayclass.yaml
```

**Note:** This step is usually not needed as NGINX Gateway Fabric creates the GatewayClass automatically.

### Step 4: Create Gateway

Create your Gateway resource:

```powershell
kubectl apply -f 02-gateway.yaml
```

**Verify Gateway:**
```powershell
kubectl get gateway
kubectl describe gateway my-gateway
```

The Gateway status should show `Ready` and have an address assigned.

### Step 5: Create HTTPRoute

Create your HTTPRoute to define routing rules:

```powershell
kubectl apply -f 03-httproute.yaml
```

**Verify HTTPRoute:**
```powershell
kubectl get httproute
kubectl describe httproute my-app-route
```

## Quick Setup (All Commands)

If you want to run everything at once:

```powershell
# Step 1: Install Gateway API CRDs
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.2.1" | kubectl apply -f -

# Step 2: Install NGINX Gateway Fabric
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway

# Wait for deployment
kubectl wait --timeout=5m -n nginx-gateway deployment/ngf-nginx-gateway-fabric --for=condition=Available

# Step 3: Create Gateway (optional - NGINX creates GatewayClass automatically)
# kubectl apply -f 01-gatewayclass.yaml

# Step 4: Create Gateway
kubectl apply -f 02-gateway.yaml

# Step 5: Create HTTPRoute
kubectl apply -f 03-httproute.yaml
```

## Accessing Your Gateway

When a Gateway resource is created, NGINX Gateway Fabric provisions a Service in the same namespace.

**Get the Gateway Service:**
```powershell
kubectl get svc -n default
```

Look for a service named `<gatewayName>-<gatewayClassName>` (e.g., `my-gateway-nginx`).

**Get the external IP or hostname:**
```powershell
kubectl get svc my-gateway-nginx -n default
```

- **LoadBalancer type:** Use the `EXTERNAL-IP` or DNS name
- **NodePort type:** Use any node IP with the allocated ports

## Customization

Before applying the YAML files, you may need to customize:

### Gateway (`02-gateway.yaml`)
- Change `namespace` if not using `default`
- Modify `allowedRoutes.namespaces.from` for namespace restrictions
- Remove or comment out the HTTPS listener if you don't have TLS certificates

### HTTPRoute (`03-httproute.yaml`)
- Update `hostnames` to match your actual domain
- Change `backendRefs` to point to your actual service
- Ensure the service exists before applying

## NGINX Plus (Optional)

If you want to use NGINX Plus instead of NGINX Open Source:

1. **Download JWT from MyF5**
2. **Create Docker registry secret:**
   ```powershell
   kubectl create namespace nginx-gateway
   kubectl create secret docker-registry nginx-plus-registry-secret --docker-server=private-registry.nginx.com --docker-username=<JWT Token> --docker-password=none -n nginx-gateway
   ```
3. **Create NGINX Plus license secret:**
   ```powershell
   kubectl create secret generic nplus-license --from-file license.jwt -n nginx-gateway
   ```
4. **Install with NGINX Plus:**
   ```powershell
   helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --set nginx.image.repository=private-registry.nginx.com/nginx-gateway-fabric/nginx-plus --set nginx.plus=true --set nginx.imagePullSecret=nginx-plus-registry-secret -n nginx-gateway
   ```

## Troubleshooting

### Network/Connection Issues

**If Helm OCI registry connection fails:**
- Try Option B (install from sources) or Option C (manifests) above
- Check your internet connection and firewall settings
- Try using IPv4 if IPv6 is causing issues
- Wait a few minutes and retry (registry may be temporarily unavailable)

**Verify Helm can access OCI registry:**
```powershell
helm pull oci://ghcr.io/nginx/charts/nginx-gateway-fabric --debug
```

### Installation Verification

**Check Gateway status:**
```powershell
kubectl describe gateway my-gateway
```

**Check NGINX Gateway Fabric pods:**
```powershell
kubectl get pods -n nginx-gateway
```

**Check NGINX Gateway Fabric logs:**
```powershell
kubectl logs -n nginx-gateway deployment/ngf-nginx-gateway-fabric
```

**Check if Gateway API CRDs are installed:**
```powershell
kubectl get crd | Select-String gateway
```

**Verify GatewayClass exists:**
```powershell
kubectl get gatewayclass
```

**Check Helm releases:**
```powershell
helm list -n nginx-gateway
```

## Uninstall

To uninstall everything:

```powershell
# Uninstall NGINX Gateway Fabric
helm uninstall ngf -n nginx-gateway

# Remove namespace and CRDs
kubectl delete ns nginx-gateway
kubectl delete -f https://raw.githubusercontent.com/nginx/nginx-gateway-fabric/v2.2.1/deploy/crds.yaml

# Remove Gateway API resources (WARNING: removes all Gateway API resources cluster-wide)
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.2.1" | kubectl delete -f -
```

## References

- [NGINX Gateway Fabric Documentation](https://docs.nginx.com/nginx-gateway-fabric/)
- [Gateway API Documentation](https://gateway-api.sigs.k8s.io/)
