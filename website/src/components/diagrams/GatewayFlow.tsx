'use client'

import { memo } from 'react'

function GatewayFlow() {
  const components = [
    { id: 1, name: 'Client', color: 'bg-blue-500' },
    { id: 2, name: 'Gateway', color: 'bg-green-500' },
    { id: 3, name: 'HTTPRoute', color: 'bg-yellow-500' },
    { id: 4, name: 'Service', color: 'bg-purple-500' },
    { id: 5, name: 'Pods', color: 'bg-pink-500' },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Gateway API Traffic Flow</h2>
      <div className="flex items-center justify-center gap-4 mb-8">
        {components.map((component, index) => (
          <div key={component.id} className="flex items-center">
            <div
              className={`w-24 h-24 ${component.color} rounded-lg flex items-center justify-center text-white font-semibold shadow-md text-sm text-center px-2 animate-scale-in`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              {component.name}
            </div>
            {index < components.length - 1 && (
              <div
                className="w-12 h-0.5 bg-gray-400 mx-2 animate-line-in"
                style={{ 
                  animationDelay: `${index * 0.2 + 0.3}s`,
                  animationFillMode: 'both'
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>Traffic flows from Client through Gateway and HTTPRoute to your application Pods</p>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">
          <strong className="text-gray-700">NGINX Ingress Controller Equivalent:</strong>
        </p>
        <p className="text-sm text-gray-600">
          In NGINX Ingress, this flow is handled by a single <code className="bg-gray-100 px-1 rounded">Ingress</code> resource that combines Gateway and HTTPRoute functionality. The NGINX Ingress Controller acts as the Gateway, and the Ingress resource defines the routing rules.
        </p>
      </div>
    </div>
  )
}

export default memo(GatewayFlow)

