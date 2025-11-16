'use client'

import { memo } from 'react'

interface TrafficSplittingProps {
  stableWeight?: number
  canaryWeight?: number
  showComparison?: boolean
}

function TrafficSplitting({ stableWeight = 90, canaryWeight = 10, showComparison = true }: TrafficSplittingProps) {
  const totalWeight = stableWeight + canaryWeight
  const stablePercent = Math.round((stableWeight / totalWeight) * 100)
  const canaryPercent = Math.round((canaryWeight / totalWeight) * 100)

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
        Traffic Splitting Visualization
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        How Gateway API splits traffic between backends using weights
      </p>

      {showComparison && (
        <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Nginx Ingress:</strong> Requires two separate Ingress resources with canary annotations
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <strong>Gateway API:</strong> Single HTTPRoute with native weighted routing
          </p>
        </div>
      )}

      {/* Traffic Flow Diagram */}
      <div className="space-y-6">
        {/* Incoming Traffic */}
        <div className="text-center">
          <div className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
            Incoming Traffic
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-1 h-12 bg-gray-400"></div>
        </div>

        {/* Gateway */}
        <div className="text-center">
          <div className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
            Gateway
          </div>
          <p className="text-xs text-gray-600 mt-2">Routes based on weights</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-1 h-12 bg-gray-400"></div>
        </div>

        {/* Split Visualization */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Stable Service */}
          <div className="space-y-3">
            <div className="text-center">
              <div 
                className="bg-blue-500 text-white px-4 py-6 rounded-lg font-semibold shadow-md"
                style={{ 
                  width: '100%',
                  minHeight: `${stablePercent * 2}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <div className="text-lg md:text-xl mb-1">Stable Service</div>
                <div className="text-sm opacity-90">Weight: {stableWeight}</div>
                <div className="text-xs opacity-75 mt-1">{stablePercent}% of traffic</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700">stable-service:80</div>
              <div className="text-xs text-gray-600 mt-1">Production-ready version</div>
            </div>
          </div>

          {/* Canary Service */}
          <div className="space-y-3">
            <div className="text-center">
              <div 
                className="bg-yellow-500 text-white px-4 py-6 rounded-lg font-semibold shadow-md"
                style={{ 
                  width: '100%',
                  minHeight: `${canaryPercent * 2}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <div className="text-lg md:text-xl mb-1">Canary Service</div>
                <div className="text-sm opacity-90">Weight: {canaryWeight}</div>
                <div className="text-xs opacity-75 mt-1">{canaryPercent}% of traffic</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700">canary-service:80</div>
              <div className="text-xs text-gray-600 mt-1">New version being tested</div>
            </div>
          </div>
        </div>

        {/* Weight Calculation */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
          <p className="text-sm text-gray-700 mb-2">
            <strong>How weights work:</strong>
          </p>
          <div className="text-xs md:text-sm text-gray-600 space-y-1 font-mono">
            <div>Stable: {stableWeight} / ({stableWeight} + {canaryWeight}) = {stablePercent}%</div>
            <div>Canary: {canaryWeight} / ({stableWeight} + {canaryWeight}) = {canaryPercent}%</div>
          </div>
        </div>

        {/* Example YAML Snippet */}
        <div className="mt-6 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto">
          <pre className="text-xs md:text-sm">
{`backendRefs:
  - name: stable-service
    port: 80
    weight: ${stableWeight}
  - name: canary-service
    port: 80
    weight: ${canaryWeight}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default memo(TrafficSplitting)

