# Policies: Advanced Configuration and Control

Policies in Gateway API provide a way to attach advanced configuration to Gateway API resources. This guide covers policy attachments and compares them to Nginx Ingress equivalents.

## What are Policies?

Policies are separate resources that attach to Gateway API resources (Gateway, HTTPRoute, etc.) to provide additional configuration like:
- Retry policies
- Timeout policies
- Rate limiting
- CORS policies
- Client certificate authentication (mTLS)

## Policy Attachment Model

Gateway API uses a policy attachment model (GEP-713) where policies are attached via label selectors.

### Nginx Ingress - Annotations

Nginx Ingress uses annotations for advanced features:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: rate-limit-ingress
  annotations:
    nginx.ingress.kubernetes.io/limit-rps: "100"
    nginx.ingress.kubernetes.io/limit-connections: "10"
spec:
  ingressClassName: nginx
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 80
```

### Gateway API - Policy Resources

Gateway API uses separate policy resources:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: RetryPolicy
metadata:
  name: retry-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: my-route
  default:
    maxRetries: 3
    retryOn:
      - "5xx"
      - "gateway-error"
```

## Common Policy Types

### 1. RetryPolicy

Configures retry behavior for failed requests.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: RetryPolicy
metadata:
  name: api-retry-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: api-route
  default:
    maxRetries: 3
    retryOn:
      - "5xx"
      - "gateway-error"
      - "connect-failure"
    perRetryTimeout: "500ms"
```

**Nginx Ingress Equivalent:**
```yaml
annotations:
  nginx.ingress.kubernetes.io/proxy-next-upstream: "error timeout"
  nginx.ingress.kubernetes.io/proxy-next-upstream-tries: "3"
```

### 2. TimeoutPolicy

Configures request and response timeouts.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: TimeoutPolicy
metadata:
  name: timeout-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: my-route
  request: "30s"
  response: "60s"
```

**Nginx Ingress Equivalent:**
```yaml
annotations:
  nginx.ingress.kubernetes.io/proxy-connect-timeout: "30"
  nginx.ingress.kubernetes.io/proxy-send-timeout: "60"
  nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
```

### 3. RateLimitPolicy

Configures rate limiting (implementation-specific).

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: RateLimitPolicy
metadata:
  name: rate-limit-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: my-route
  default:
    requests: 100
    unit: "second"
```

**Nginx Ingress Equivalent:**
```yaml
annotations:
  nginx.ingress.kubernetes.io/limit-rps: "100"
  nginx.ingress.kubernetes.io/limit-connections: "10"
```

**Note:** Rate limiting policies are implementation-specific. Check your Gateway provider's documentation.

### 4. CORS Policy

Configures Cross-Origin Resource Sharing (CORS).

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: CORSPolicy
metadata:
  name: cors-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: api-route
  allowOrigins:
    - "https://example.com"
    - "https://app.example.com"
  allowMethods:
    - GET
    - POST
    - PUT
    - DELETE
  allowHeaders:
    - Content-Type
    - Authorization
  maxAge: "3600s"
```

**Nginx Ingress Equivalent:**
```yaml
annotations:
  nginx.ingress.kubernetes.io/enable-cors: "true"
  nginx.ingress.kubernetes.io/cors-allow-origin: "https://example.com"
  nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE"
```

### 5. ClientCertificatePolicy (mTLS)

Configures mutual TLS authentication.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: ClientCertificatePolicy
metadata:
  name: mtls-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: my-gateway
  caCertRefs:
    - name: ca-certificate
      kind: Secret
```

**Note:** mTLS policies are implementation-specific.

## Policy Attachment Methods

### Method 1: Direct Reference (targetRef)

Policies can directly reference the resource they attach to:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: RetryPolicy
metadata:
  name: my-retry-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: my-route
    namespace: default
  default:
    maxRetries: 3
```

### Method 2: Label Selector

Policies can use label selectors to attach to multiple resources:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: RetryPolicy
metadata:
  name: default-retry-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    selector:
      matchLabels:
        app: api
  default:
    maxRetries: 3
```

## Policy Inheritance

Policies can be attached at different levels:

1. **Gateway Level**: Applies to all HTTPRoutes attached to the Gateway
2. **HTTPRoute Level**: Applies to specific HTTPRoute
3. **Namespace Level**: Applies to all resources in a namespace

### Gateway-Level Policy

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: TimeoutPolicy
metadata:
  name: gateway-timeout
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: my-gateway
  request: "30s"
  response: "60s"
```

All HTTPRoutes attached to `my-gateway` inherit this timeout.

### HTTPRoute-Level Policy

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: TimeoutPolicy
metadata:
  name: route-timeout
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: slow-route
  request: "120s"
  response: "180s"
```

This overrides the Gateway-level policy for `slow-route`.

## Complete Examples

### Example 1: Retry Policy for API

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: api-route
spec:
  parentRefs:
    - name: my-gateway
  hostnames:
    - api.example.com
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: api-service
          port: 80
---
apiVersion: gateway.networking.k8s.io/v1
kind: RetryPolicy
metadata:
  name: api-retry-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: api-route
  default:
    maxRetries: 3
    retryOn:
      - "5xx"
      - "gateway-error"
    perRetryTimeout: "1s"
```

### Example 2: Timeout Policy

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: TimeoutPolicy
metadata:
  name: api-timeout-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: api-route
  request: "30s"
  response: "60s"
```

### Example 3: Rate Limiting

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: RateLimitPolicy
metadata:
  name: api-rate-limit
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: api-route
  default:
    requests: 100
    unit: "second"
    burst: 20
```

**Note:** Check your Gateway implementation for exact RateLimitPolicy schema.

### Example 4: CORS Policy

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: CORSPolicy
metadata:
  name: api-cors-policy
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: api-route
  allowOrigins:
    - "https://example.com"
    - "https://app.example.com"
  allowMethods:
    - GET
    - POST
    - PUT
    - DELETE
    - OPTIONS
  allowHeaders:
    - Content-Type
    - Authorization
    - X-Requested-With
  allowCredentials: true
  maxAge: "3600s"
```

## Policy Precedence

When multiple policies apply:

1. **HTTPRoute-level** policies override Gateway-level policies
2. **More specific** policies override less specific ones
3. **Namespace-level** policies apply as defaults

## Comparison Table

| Feature | Nginx Ingress | Gateway API |
|---------|--------------|-------------|
| Retry Logic | Annotations | RetryPolicy resource |
| Timeouts | Annotations | TimeoutPolicy resource |
| Rate Limiting | Annotations | RateLimitPolicy resource |
| CORS | Annotations | CORSPolicy resource |
| mTLS | Complex setup | ClientCertificatePolicy |
| Policy Scope | Per Ingress | Gateway/HTTPRoute/Namespace |
| Portability | Nginx-specific | Standard (where supported) |

## Implementation Support

**Important:** Policy support varies by Gateway API implementation:

- **Nginx Gateway Fabric**: Supports RetryPolicy, TimeoutPolicy
- **Istio**: Supports many policies
- **Contour**: Policy support varies
- **Kong**: Has policy support
- **Traefik**: Policy support varies

Always check your Gateway implementation's documentation for supported policies.

## Best Practices

1. **Gateway-Level Defaults**: Set common policies at Gateway level
2. **Route-Specific Overrides**: Override with HTTPRoute-level policies when needed
3. **Policy Documentation**: Document policy behavior for your team
4. **Test Policies**: Test policy behavior thoroughly
5. **Monitor Impact**: Monitor how policies affect traffic
6. **Version Awareness**: Be aware that policies are still evolving in Gateway API

## Common Patterns

### Pattern 1: Default Timeout for All Routes

```yaml
# Gateway-level policy
TimeoutPolicy → Gateway → All HTTPRoutes inherit
```

### Pattern 2: Route-Specific Retry

```yaml
# HTTPRoute-level policy
RetryPolicy → HTTPRoute → Overrides Gateway default
```

### Pattern 3: API Rate Limiting

```yaml
# HTTPRoute-level policy
RateLimitPolicy → HTTPRoute → API-specific limits
```

## Troubleshooting

### Policy Not Applied?

1. Verify policy targetRef matches resource name/kind
2. Check policy is in correct namespace
3. Verify Gateway implementation supports the policy type
4. Check Gateway/HTTPRoute status for policy errors

### Policy Conflicts?

1. Check policy precedence (HTTPRoute overrides Gateway)
2. Verify no conflicting policies
3. Check Gateway implementation logs

## Next Steps

Now that you understand policies, let's learn how to migrate from Nginx Ingress:

👉 **[Next: Migration Guide →](./09-migration-guide.md)**

## Related Examples

Policy examples are implementation-specific. Check your Gateway provider's documentation for working examples.

