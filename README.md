# Gateway API Learning Project

A comprehensive learning resource for understanding Kubernetes Gateway API, with a focus on transitioning from Nginx Ingress Controllers to Gateway API.

## 🎯 Project Aim

This repository is designed to help developers and DevOps engineers:

- **Learn Gateway API** - Understand the next-generation Kubernetes service networking standard
- **Compare with Ingress** - See side-by-side comparisons with Nginx Ingress Controllers
- **Practice with Examples** - Work through practical, working examples
- **Migrate Successfully** - Follow step-by-step migration guides
- **Set Up Quickly** - Get NGINX Gateway Fabric running in your cluster

## 📚 What is Gateway API?

Gateway API is the **next-generation standard** for Kubernetes service networking, designed to replace and improve upon the Ingress resource. It provides:

- **Role-oriented design** - Separates infrastructure (Gateway) from application (HTTPRoute) concerns
- **More expressive** - Better support for advanced routing, traffic splitting, and policy
- **Portable** - Standardized API works across implementations (Nginx, Istio, Contour, etc.)
- **Extensible** - Policy attachments and extension points for advanced features

## 📁 Repository Structure

```
GatewayAPILearning/
├── Documentation/          # Comprehensive learning documentation
│   ├── 01-introduction.md
│   ├── 02-core-concepts.md
│   ├── 03-basic-routing.md
│   ├── 04-advanced-routing.md
│   ├── 05-traffic-splitting.md
│   ├── 06-tls-ssl.md
│   ├── 07-request-response-modifications.md
│   ├── 08-policies.md
│   ├── 09-migration-guide.md
│   └── 10-best-practices.md
│
├── Examples/              # Working YAML examples organized by topic
│   ├── 01-basic-setup/
│   ├── 02-path-routing/
│   ├── 03-header-routing/
│   ├── 04-traffic-splitting/
│   ├── 05-tls/
│   ├── 06-filters/
│   ├── 07-advanced/
│   └── 08-migration/
│
└── setup/                 # Quick setup files for NGINX Gateway Fabric
    ├── 01-gatewayclass.yaml
    ├── 02-gateway.yaml
    ├── 03-httproute.yaml
    └── README.md
```

## 🚀 Quick Start

### Prerequisites

- Kubernetes cluster (minikube, kind, or cloud cluster)
- `kubectl` installed and configured
- `helm` 3.0 or later (for NGINX Gateway Fabric installation)

### 1. Install Gateway API CRDs

```powershell
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.2.1" | kubectl apply -f -
```

### 2. Install NGINX Gateway Fabric

```powershell
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric --create-namespace -n nginx-gateway
```

### 3. Create Your Gateway

```powershell
kubectl apply -f setup/02-gateway.yaml
```

### 4. Create Your HTTPRoute

```powershell
kubectl apply -f setup/03-httproute.yaml
```

For detailed setup instructions, see [setup/README.md](./setup/README.md).

## 📖 Learning Path

Follow these documents in order for a progressive learning experience:

1. **[Introduction](./Documentation/01-introduction.md)** - What is Gateway API and why it exists
2. **[Core Concepts](./Documentation/02-core-concepts.md)** - GatewayClass, Gateway, and HTTPRoute
3. **[Basic Routing](./Documentation/03-basic-routing.md)** - Hostname and path matching
4. **[Advanced Routing](./Documentation/04-advanced-routing.md)** - Header, query parameter, and method matching
5. **[Traffic Splitting](./Documentation/05-traffic-splitting.md)** - Weighted routing and canary deployments
6. **[TLS/SSL](./Documentation/06-tls-ssl.md)** - Certificate management and TLS configuration
7. **[Request/Response Modifications](./Documentation/07-request-response-modifications.md)** - URL rewriting and header modifications
8. **[Policies](./Documentation/08-policies.md)** - Policy attachments and advanced features
9. **[Migration Guide](./Documentation/09-migration-guide.md)** - Step-by-step migration from Nginx Ingress
10. **[Best Practices](./Documentation/10-best-practices.md)** - Recommendations and best practices

## 💡 Key Concepts

### The Three Pillars

1. **GatewayClass** - Defines the type of Gateway (like IngressClass)
2. **Gateway** - Defines network endpoints/listeners (like Ingress Controller setup)
3. **HTTPRoute** - Defines routing rules (like Ingress resource)

### Comparison with Nginx Ingress

| Nginx Ingress | Gateway API |
|--------------|-------------|
| IngressClass | GatewayClass |
| Ingress Controller Setup | Gateway |
| Ingress Resource | HTTPRoute |

## 🔧 Tools & Setup

### Minikube Tasks

This repository includes VS Code/Cursor tasks for managing minikube:

- **Minikube: Start** - Start your minikube cluster
- **Minikube: Stop** - Stop your minikube cluster
- **Minikube: Status** - Check minikube status
- **Minikube: Delete** - Delete the minikube cluster

Access via: `Ctrl+Shift+P` → "Run Task" → Select task

## 📝 Examples

All working examples are in the [`Examples/`](./Examples/) directory, organized by topic:

- **Basic Setup** - GatewayClass, Gateway, HTTPRoute
- **Path Routing** - Prefix, exact, and multiple path matching
- **Header Routing** - Header-based routing rules
- **Traffic Splitting** - Weighted routing and canary deployments
- **TLS** - SSL/TLS configuration
- **Filters** - URL rewriting and header modifications
- **Advanced** - Complex matching scenarios
- **Migration** - Before/after comparisons

Each example includes:
- Working YAML configuration
- Comments explaining key fields
- References to documentation
- Nginx Ingress equivalents (where applicable)

## 🎓 Who Is This For?

- **Kubernetes developers** learning Gateway API
- **DevOps engineers** migrating from Ingress to Gateway API
- **Platform engineers** evaluating Gateway API implementations
- **Anyone** wanting to understand modern Kubernetes networking

## 🔗 Resources

- [Gateway API Official Documentation](https://gateway-api.sigs.k8s.io/)
- [NGINX Gateway Fabric Documentation](https://docs.nginx.com/nginx-gateway-fabric/)
- [Kubernetes Gateway API GitHub](https://github.com/kubernetes-sigs/gateway-api)

## 🤝 Contributing

This is a learning project. Feel free to:
- Report issues or suggest improvements
- Add more examples
- Improve documentation
- Share your migration experiences

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

### Content Attribution

This project is an educational resource that references:
- **Gateway API Official Documentation** (Apache License 2.0) - https://gateway-api.sigs.k8s.io/
- **NGINX Gateway Fabric Documentation** - https://docs.nginx.com/nginx-gateway-fabric/

All content is original educational material, properly attributed, and created for educational purposes. See [ATTRIBUTION.md](./website/ATTRIBUTION.md) for full details.

## 🎯 Next Steps

1. **Read the Documentation** - Start with [01-introduction.md](./Documentation/01-introduction.md)
2. **Set Up Your Cluster** - Follow the [setup guide](./setup/README.md)
3. **Try the Examples** - Work through examples in the [`Examples/`](./Examples/) directory
4. **Practice Migration** - Use the [migration guide](./Documentation/09-migration-guide.md) to migrate your own Ingress resources

---

**Happy Learning! 🚀**

