'use client'

import { memo } from 'react'
import { ArrowRight, ArrowLeft, Edit, Link as LinkIcon } from 'lucide-react'

function RequestModification() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
        Request/Response Modification Flow
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        How Gateway API modifies requests and responses using filters
      </p>

      <div className="space-y-8">
        {/* Request Flow */}
        <div className="bg-blue-50 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Request Modification
          </h3>
          
          <div className="space-y-4">
            {/* Original Request */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
              <div className="font-semibold text-gray-900 mb-2">Original Request</div>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded space-y-1">
                <div>GET /api/v1/users</div>
                <div>Host: example.com</div>
                <div>X-Custom: value</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>

            {/* Filters Applied */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-500">
              <div className="font-semibold text-gray-900 mb-3">Filters Applied</div>
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <div className="text-xs font-semibold text-gray-900">URL Rewrite</div>
                  <div className="text-xs text-gray-600 font-mono">/api/v1/users → /users</div>
                </div>
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <div className="text-xs font-semibold text-gray-900">Header Add</div>
                  <div className="text-xs text-gray-600 font-mono">X-Forwarded-By: gateway</div>
                </div>
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <div className="text-xs font-semibold text-gray-900">Header Remove</div>
                  <div className="text-xs text-gray-600 font-mono">X-Custom: removed</div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </div>

            {/* Modified Request */}
            <div className="bg-white rounded-lg p-4 border-2 border-purple-500">
              <div className="font-semibold text-gray-900 mb-2">Modified Request to Backend</div>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded space-y-1">
                <div>GET /users</div>
                <div>Host: example.com</div>
                <div>X-Forwarded-By: gateway</div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Flow */}
        <div className="bg-green-50 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Response Modification
          </h3>
          
          <div className="space-y-4">
            {/* Backend Response */}
            <div className="bg-white rounded-lg p-4 border-2 border-purple-500">
              <div className="font-semibold text-gray-900 mb-2">Backend Response</div>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded space-y-1">
                <div>Status: 200 OK</div>
                <div>Content-Type: application/json</div>
                <div>X-Backend-Version: v1.0</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <Edit className="w-6 h-6 text-green-600" />
            </div>

            {/* Response Filters */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-500">
              <div className="font-semibold text-gray-900 mb-3">Response Filters Applied</div>
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <div className="text-xs font-semibold text-gray-900">Header Add</div>
                  <div className="text-xs text-gray-600 font-mono">X-Gateway-Version: 2.0</div>
                </div>
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <div className="text-xs font-semibold text-gray-900">Header Remove</div>
                  <div className="text-xs text-gray-600 font-mono">X-Backend-Version: removed</div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </div>

            {/* Modified Response */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
              <div className="font-semibold text-gray-900 mb-2">Modified Response to Client</div>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded space-y-1">
                <div>Status: 200 OK</div>
                <div>Content-Type: application/json</div>
                <div>X-Gateway-Version: 2.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Types */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Available Filters</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">URL Rewrite</h4>
              </div>
              <p className="text-xs text-gray-700">
                Modify request path before forwarding to backend
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-2">
                <Edit className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Header Modification</h4>
              </div>
              <p className="text-xs text-gray-700">
                Add, remove, or modify HTTP headers in requests/responses
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-gray-900">Redirect</h4>
              </div>
              <p className="text-xs text-gray-700">
                Redirect requests to different URLs
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Request Mirroring</h4>
              </div>
              <p className="text-xs text-gray-700">
                Send copy of request to another backend for testing
              </p>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
          <p className="text-sm text-gray-700">
            <strong>vs. Ingress:</strong> Gateway API provides native filter support. Ingress requires Nginx annotations like <code className="bg-gray-200 px-1 rounded">nginx.ingress.kubernetes.io/rewrite-target</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(RequestModification)

