# Deploy Test Application with Gateway API

This guide shows how to deploy a simple test application from Artifact Hub and route it through Gateway API.

## Prerequisites

- Gateway API CRDs installed
- NGINX Gateway Fabric installed
- Gateway created (see `02-gateway.yaml`)

## Step 1: Deploy Test Application

We'll use the **Bitnami Nginx** chart from Artifact Hub - it's simple and perfect for testing.

### Option A: Install with Gateway API HTTPRoute (Recommended)

The Bitnami Nginx chart has built-in support for creating HTTPRoute resources! Just enable it:

```powershell
# Add Bitnami Helm repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Install with HTTPRoute enabled
helm install test-nginx bitnami/nginx \
  --namespace default \
  --set httpRoute.enabled=true \
  --set httpRoute.parentRefs[0].name=my-gateway \
  --set httpRoute.parentRefs[0].namespace=default \
  --set httpRoute.hostnames[0]=test-nginx.local
```

### Option B: Use Custom Values File

For more control, use a custom values file:

```powershell
# Pull the chart
helm pull bitnami/nginx --untar

# Install with custom values (see nginx-values-gateway-api.yaml)
helm install test-nginx ./nginx \
  --namespace default \
  -f nginx-values-gateway-api.yaml
```

### Option C: Install Without HTTPRoute (Manual Route Creation)

If you prefer to create the HTTPRoute manually:

```powershell
# Install Nginx without HTTPRoute
helm install test-nginx bitnami/nginx --namespace default

# Then create HTTPRoute manually (see Step 3)
```

## Step 2: Verify Application is Running

```powershell
# Check the deployment
kubectl get deployment test-nginx -n default

# Check the service
kubectl get svc test-nginx -n default

# Check pods
kubectl get pods -l app.kubernetes.io/name=nginx -n default
```

The service should be named `test-nginx` and typically runs on port 80.

## Step 3: Create HTTPRoute for Test Application

### If you used Option A or B (HTTPRoute enabled in Helm)

The HTTPRoute is **automatically created** by the Helm chart! Skip to Step 4.

Verify it was created:
```powershell
kubectl get httproute -n default
kubectl describe httproute test-nginx -n default
```

### If you used Option C (Manual Route Creation)

Create an HTTPRoute manually:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: test-nginx-route
  namespace: default
spec:
  parentRefs:
    - name: my-gateway
      namespace: default
  hostnames:
    - test.local  # Use test.local or your domain
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: test-nginx
          port: 80
```

Apply it:

```powershell
kubectl apply -f 05-httproute-test-app.yaml
```

## Step 4: Test the Route

### Get Gateway Service Address

```powershell
# Get the Gateway service (created automatically by NGINX Gateway Fabric)
kubectl get svc my-gateway-nginx -n default
```

### Access the Application

**For LoadBalancer:**
- Use the `EXTERNAL-IP` from the service
- Add to `/etc/hosts` (or `C:\Windows\System32\drivers\etc\hosts` on Windows):
  ```
  <EXTERNAL-IP> test.local
  ```
- Access: `http://test.local`

**For NodePort:**
- Use any node IP with the allocated port
- Access: `http://<node-ip>:<nodeport>`

**For Minikube:**
```powershell
# Get the service URL
minikube service my-gateway-nginx -n default --url

# Or use port-forward for testing
kubectl port-forward svc/my-gateway-nginx 8080:80 -n default
# Then access: http://localhost:8080
```

## Alternative: Other Simple Test Applications

### Apache HTTP Server

```powershell
helm install test-apache bitnami/apache --namespace default
```

### Simple Web App (if available)

Search Artifact Hub for "hello-world" or "web" applications:
```powershell
# Example (check Artifact Hub for exact chart name)
helm repo add <repo-name> <repo-url>
helm install test-app <repo-name>/<chart-name> --namespace default
```

## Troubleshooting

**Service not found:**
```powershell
# Verify service name matches HTTPRoute backendRef
kubectl get svc -n default
```

**Route not working:**
```powershell
# Check HTTPRoute status
kubectl describe httproute test-nginx-route -n default

# Check Gateway status
kubectl describe gateway my-gateway -n default

# Check NGINX Gateway Fabric logs
kubectl logs -n nginx-gateway deployment/ngf-nginx-gateway-fabric
```

**Can't access application:**
- Verify Gateway service has an external IP or use port-forward
- Check firewall rules
- Verify hostname resolution (if using hostnames)

## Cleanup

```powershell
# Remove HTTPRoute
kubectl delete httproute test-nginx-route -n default

# Remove test application
helm uninstall test-nginx -n default
```

