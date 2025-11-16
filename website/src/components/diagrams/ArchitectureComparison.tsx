'use client'

import { memo } from 'react'

function ArchitectureComparison() {
  const ingressComponents = [
    {
      name: 'Ingress Class',
      description: 'Defines which controller to use',
      color: 'bg-blue-500',
      borderColor: 'border-blue-600',
    },
    {
      name: 'Ingress Resource',
      description: 'Single resource for all routing',
      subDescription: 'Uses annotations for advanced features',
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-600',
    },
    {
      name: 'Nginx Ingress Controller',
      description: 'Processes Ingress resources',
      color: 'bg-green-500',
      borderColor: 'border-green-600',
    },
  ]

  const gatewayComponents = [
    {
      name: 'GatewayClass',
      description: 'Defines type of Gateway',
      color: 'bg-blue-500',
      borderColor: 'border-blue-600',
    },
    {
      name: 'Gateway',
      description: 'Infrastructure team manages',
      subDescription: 'Defines ports, TLS, protocols',
      color: 'bg-green-500',
      borderColor: 'border-green-600',
    },
    {
      name: 'HTTPRoute',
      description: 'Application team manages',
      subDescription: 'Defines hostnames, paths, backends',
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-600',
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
        Architecture Comparison
      </h2>
      <p className="text-center text-gray-600 mb-8">
        See how Gateway API improves upon the Ingress model
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingress Architecture */}
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nginx Ingress Controller</h3>
            <p className="text-sm text-gray-600">Traditional approach</p>
          </div>
          
          <div className="space-y-4">
            {ingressComponents.map((component, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`${component.color} ${component.borderColor} border-2 rounded-lg p-4 text-white font-semibold shadow-md text-center min-w-[200px] animate-slide-up`}
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="text-lg mb-1">{component.name}</div>
                  <div className="text-xs font-normal opacity-90 mt-1">
                    {component.description}
                  </div>
                  {component.subDescription && (
                    <div className="text-xs font-normal opacity-75 mt-1">
                      {component.subDescription}
                    </div>
                  )}
                </div>
                {index < ingressComponents.length - 1 && (
                  <div
                    className="w-0.5 h-8 bg-gray-400 my-2 animate-line-in"
                    style={{
                      animationDelay: `${index * 0.15 + 0.2}s`,
                      animationFillMode: 'both',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
            <p className="text-sm text-gray-700">
              <strong>Limitations:</strong> Single resource, vendor-specific annotations, limited role separation
            </p>
          </div>
        </div>

        {/* Gateway API Architecture */}
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Gateway API</h3>
            <p className="text-sm text-gray-600">Modern, role-oriented approach</p>
          </div>
          
          <div className="space-y-4">
            {gatewayComponents.map((component, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`${component.color} ${component.borderColor} border-2 rounded-lg p-4 text-white font-semibold shadow-md text-center min-w-[200px] animate-slide-up`}
                  style={{
                    animationDelay: `${index * 0.15 + 0.3}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="text-lg mb-1">{component.name}</div>
                  <div className="text-xs font-normal opacity-90 mt-1">
                    {component.description}
                  </div>
                  {component.subDescription && (
                    <div className="text-xs font-normal opacity-75 mt-1">
                      {component.subDescription}
                    </div>
                  )}
                </div>
                {index < gatewayComponents.length - 1 && (
                  <div
                    className="w-0.5 h-8 bg-gray-400 my-2 animate-line-in"
                    style={{
                      animationDelay: `${index * 0.15 + 0.5}s`,
                      animationFillMode: 'both',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>Benefits:</strong> Role separation, standardized API, more expressive routing
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-700 mb-1">Role Separation</div>
            <div className="text-gray-600">
              Gateway API separates infrastructure (Gateway) from application (HTTPRoute) concerns
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700 mb-1">Portability</div>
            <div className="text-gray-600">
              Standard API works across implementations (Nginx, Istio, Contour, etc.)
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700 mb-1">Expressiveness</div>
            <div className="text-gray-600">
              Native support for advanced routing, traffic splitting, and policies
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ArchitectureComparison)

