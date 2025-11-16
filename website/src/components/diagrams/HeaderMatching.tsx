'use client'

import { memo } from 'react'
import { Filter, Check, X } from 'lucide-react'

function HeaderMatching() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
        Header & Query Parameter Matching
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        How Gateway API routes traffic based on HTTP headers and query parameters
      </p>

      <div className="space-y-6">
        {/* Request Flow */}
        <div className="bg-gray-50 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Request Flow</h3>
          
          <div className="space-y-4">
            {/* Incoming Request */}
            <div className="text-center">
              <div className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                Incoming HTTP Request
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gray-400"></div>
            </div>

            {/* Matching Process */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">HTTPRoute Matching Rules</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">Header Match</div>
                    <div className="text-xs text-gray-600 mt-1 font-mono">
                      X-Environment: staging
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">Query Parameter Match</div>
                    <div className="text-xs text-gray-600 mt-1 font-mono">
                      version=v2
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded border-l-4 border-red-500">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">No Match</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Request doesn&apos;t match any rules
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gray-400"></div>
            </div>

            {/* Routing Result */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-100 rounded-lg p-4 border-l-4 border-green-500">
                <div className="font-semibold text-gray-900 mb-2">Match Found</div>
                <div className="text-sm text-gray-700">
                  Request routed to matching backend service
                </div>
              </div>
              <div className="bg-red-100 rounded-lg p-4 border-l-4 border-red-500">
                <div className="font-semibold text-gray-900 mb-2">No Match</div>
                <div className="text-sm text-gray-700">
                  Request returns 404 or default route
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Match Types */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Match Types</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-900 mb-2">Exact Match</h4>
              <p className="text-xs text-gray-700 mb-2">Header value must match exactly</p>
              <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                X-Env: staging
              </code>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-2">Prefix Match</h4>
              <p className="text-xs text-gray-700 mb-2">Header value starts with prefix</p>
              <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                X-Env: staging-*
              </code>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-gray-900 mb-2">Regular Expression</h4>
              <p className="text-xs text-gray-700 mb-2">Complex pattern matching</p>
              <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                X-Env: /^staging-.*$/
              </code>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
          <h4 className="font-semibold text-gray-900 mb-2">Common Use Cases</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>A/B testing based on user headers</li>
            <li>Environment routing (staging, production)</li>
            <li>Feature flags via headers</li>
            <li>API versioning via query parameters</li>
          </ul>
        </div>

        {/* Comparison */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
          <p className="text-sm text-gray-700">
            <strong>vs. Ingress:</strong> Gateway API has native header/query matching. Ingress requires custom Nginx configuration snippets or annotations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(HeaderMatching)

