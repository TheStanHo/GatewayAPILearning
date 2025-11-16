'use client'

import { memo } from 'react'

function CoreConceptsRelationship() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
        Gateway API Resource Relationships
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        How GatewayClass, Gateway, and HTTPRoute work together
      </p>

      <div className="space-y-8">
        {/* Top Level: GatewayClass */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg font-semibold shadow-md text-center min-w-[250px] md:min-w-[300px]">
            <div className="text-lg md:text-xl mb-1">GatewayClass</div>
            <div className="text-xs md:text-sm font-normal opacity-90 mt-1">
              Defines the type of Gateway
            </div>
            <div className="text-xs font-normal opacity-75 mt-1">
              Cluster-wide resource
            </div>
          </div>
          <div className="w-1 h-8 bg-gray-400 my-2"></div>
          <p className="text-xs text-gray-600 text-center max-w-xs">
            Managed by cluster administrators
          </p>
        </div>

        {/* Middle Level: Gateway */}
        <div className="flex flex-col items-center">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg font-semibold shadow-md text-center min-w-[250px] md:min-w-[300px]">
            <div className="text-lg md:text-xl mb-1">Gateway</div>
            <div className="text-xs md:text-sm font-normal opacity-90 mt-1">
              Defines network endpoints
            </div>
            <div className="text-xs font-normal opacity-75 mt-1">
              References GatewayClass
            </div>
          </div>
          <div className="w-1 h-8 bg-gray-400 my-2"></div>
          <p className="text-xs text-gray-600 text-center max-w-xs">
            Managed by infrastructure/operations teams
          </p>
          <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-500 max-w-md">
            <p className="text-xs text-gray-700">
              <strong>Defines:</strong> Ports, protocols, TLS certificates, listeners
            </p>
          </div>
        </div>

        {/* Bottom Level: HTTPRoute */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-500 text-white px-6 py-4 rounded-lg font-semibold shadow-md text-center min-w-[250px] md:min-w-[300px]">
            <div className="text-lg md:text-xl mb-1">HTTPRoute</div>
            <div className="text-xs md:text-sm font-normal opacity-90 mt-1">
              Defines routing rules
            </div>
            <div className="text-xs font-normal opacity-75 mt-1">
              References Gateway (parentRefs)
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center max-w-xs mt-2">
            Managed by application developers
          </p>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 max-w-md">
            <p className="text-xs text-gray-700">
              <strong>Defines:</strong> Hostnames, paths, headers, backends, weights
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-gray-700 mb-1">Role Separation</div>
              <div className="text-xs text-gray-600">
                Infrastructure (Gateway) and application (HTTPRoute) teams work independently
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-gray-700 mb-1">Standardized</div>
              <div className="text-xs text-gray-600">
                Works across different implementations (Nginx, Istio, Contour, etc.)
              </div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="font-semibold text-gray-700 mb-1">Expressive</div>
              <div className="text-xs text-gray-600">
                Native support for advanced routing, traffic splitting, and policies
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
          <p className="text-sm text-gray-700">
            <strong>vs. Ingress:</strong> Ingress uses a single resource for everything. Gateway API separates concerns, making it easier to manage and more secure.
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(CoreConceptsRelationship)

