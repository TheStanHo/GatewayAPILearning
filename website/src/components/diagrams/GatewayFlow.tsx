'use client'

import { memo } from 'react'

function GatewayFlow() {
  // Using darker shades (600-700) for better contrast with white text (WCAG AA compliant)
  const components = [
    { id: 1, name: 'Client', color: 'bg-blue-600' },
    { id: 2, name: 'Gateway', color: 'bg-green-600' },
    { id: 3, name: 'HTTPRoute', color: 'bg-yellow-600', textColor: 'text-gray-900' }, // Yellow needs dark text
    { id: 4, name: 'Service', color: 'bg-purple-600' },
    { id: 5, name: 'Pods', color: 'bg-pink-600' },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-gray-900">Gateway API Traffic Flow</h2>
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex items-center justify-center gap-4 mb-8">
        {components.map((component, index) => (
          <div key={component.id} className="flex items-center">
            <div
              className={`w-24 h-24 ${component.color} rounded-lg flex items-center justify-center ${component.textColor || 'text-white'} font-semibold shadow-md text-sm text-center px-2 animate-scale-in`}
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
      {/* Mobile: Vertical layout */}
      <div className="md:hidden flex flex-col items-center gap-3 mb-6">
        {components.map((component, index) => (
          <div key={component.id} className="flex flex-col items-center w-full">
            <div
              className={`w-20 h-20 ${component.color} rounded-lg flex items-center justify-center ${component.textColor || 'text-white'} font-semibold shadow-md text-xs text-center px-2 animate-scale-in`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              {component.name}
            </div>
            {index < components.length - 1 && (
              <div
                className="w-0.5 h-8 bg-gray-400 my-1 animate-line-in"
                style={{ 
                  animationDelay: `${index * 0.2 + 0.3}s`,
                  animationFillMode: 'both'
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8 text-center text-gray-600">
        <p className="text-sm md:text-base px-2">Traffic flows from Client through Gateway and HTTPRoute to your application Pods</p>
      </div>
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
        <p className="text-xs md:text-sm text-gray-500 mb-2">
          <strong className="text-gray-700">NGINX Ingress Controller Equivalent:</strong>
        </p>
        <p className="text-xs md:text-sm text-gray-600 px-2">
          In NGINX Ingress, this flow is handled by a single <code className="bg-gray-100 px-1 rounded">Ingress</code> resource that combines Gateway and HTTPRoute functionality. The NGINX Ingress Controller acts as the Gateway, and the Ingress resource defines the routing rules.
        </p>
      </div>
    </div>
  )
}

export default memo(GatewayFlow)

