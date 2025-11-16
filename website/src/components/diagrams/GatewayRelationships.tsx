'use client'

import { memo } from 'react'

function GatewayRelationships() {
  const resources = [
    { 
      name: 'GatewayClass', 
      description: 'Defines controller type',
      color: 'bg-blue-100',
      delay: 0.1
    },
    { 
      name: 'Gateway', 
      description: 'Network entry point',
      color: 'bg-green-100',
      delay: 0.2
    },
    { 
      name: 'HTTPRoute', 
      description: 'Routing rules',
      color: 'bg-yellow-100',
      delay: 0.3
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Gateway API Resource Relationships</h2>
      <div className="flex items-center justify-center gap-6">
        {resources.map((resource, index) => (
          <div key={resource.name} className="flex items-center">
            <div
              className={`${resource.color} rounded-lg p-6 text-center min-w-[160px] animate-slide-up`}
              style={{ 
                animationDelay: `${resource.delay}s`,
                animationFillMode: 'both'
              }}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{resource.name}</h3>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
            {index < resources.length - 1 && (
              <div
                className="mx-2 animate-arrow-in"
                style={{ 
                  animationDelay: `${resource.delay + 0.2}s`,
                  animationFillMode: 'both'
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600 animate-arrow-pulse"
                  style={{ 
                    animationDelay: `${resource.delay + 0.3}s`
                  }}
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-3">
          <strong className="text-gray-700">NGINX Ingress Controller Equivalents:</strong>
        </p>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-700 mb-1">GatewayClass</p>
            <p>No direct equivalent - NGINX Ingress uses a single controller type</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Gateway</p>
            <p>NGINX Ingress Controller itself (the running controller pod/service)</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">HTTPRoute</p>
            <p><code className="bg-gray-100 px-1 rounded">Ingress</code> resource (defines routing rules)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(GatewayRelationships)

