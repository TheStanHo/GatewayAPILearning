'use client'

import { memo } from 'react'
import { Lock, Server, FileKey, Shield } from 'lucide-react'

function TLSFlow() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
        TLS/SSL Configuration Flow
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        How TLS termination and certificate management works in Gateway API
      </p>

      <div className="space-y-8">
        {/* Step 1: Certificate Management */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg font-semibold shadow-md text-center min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileKey className="w-5 h-5" />
              <div className="text-lg md:text-xl">1. Certificate Management</div>
            </div>
            <div className="text-xs md:text-sm font-normal opacity-90 mt-1">
              Store TLS certificates as Kubernetes Secrets
            </div>
          </div>
          <div className="w-1 h-8 bg-gray-400 my-2"></div>
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500 max-w-md text-xs text-gray-700">
            <code className="font-mono">kubectl create secret tls my-cert --cert=cert.pem --key=key.pem</code>
          </div>
        </div>

        {/* Step 2: Gateway Configuration */}
        <div className="flex flex-col items-center">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg font-semibold shadow-md text-center min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Server className="w-5 h-5" />
              <div className="text-lg md:text-xl">2. Gateway Listener</div>
            </div>
            <div className="text-xs md:text-sm font-normal opacity-90 mt-1">
              Configure TLS listener on Gateway resource
            </div>
          </div>
          <div className="w-1 h-8 bg-gray-400 my-2"></div>
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500 max-w-md text-xs text-gray-700">
            <code className="font-mono">listeners: - protocol: HTTPS, port: 443, tls: mode: Terminate</code>
          </div>
        </div>

        {/* Step 3: TLS Termination */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-500 text-white px-6 py-4 rounded-lg font-semibold shadow-md text-center min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-5 h-5" />
              <div className="text-lg md:text-xl">3. TLS Termination</div>
            </div>
            <div className="text-xs md:text-sm font-normal opacity-90 mt-1">
              Gateway terminates TLS and forwards HTTP to backends
            </div>
          </div>
          <div className="w-1 h-8 bg-gray-400 my-2"></div>
          <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 max-w-md text-xs text-gray-700">
            <strong>Mode: Terminate</strong> - Gateway handles TLS, backends receive plain HTTP
          </div>
        </div>

        {/* Step 4: Secure Connection */}
        <div className="flex flex-col items-center">
          <div className="bg-purple-500 text-white px-6 py-4 rounded-lg font-semibold shadow-md text-center min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5" />
              <div className="text-lg md:text-xl">4. Secure Connection</div>
            </div>
            <div className="text-xs md:text-sm font-normal opacity-90 mt-1">
              Client connects via HTTPS, Gateway validates certificate
            </div>
          </div>
        </div>

        {/* TLS Modes Comparison */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">TLS Modes</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-900 mb-2">Terminate</h4>
              <p className="text-sm text-gray-700">
                Gateway terminates TLS and forwards plain HTTP to backends. Most common mode.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-2">Passthrough</h4>
              <p className="text-sm text-gray-700">
                Gateway passes TLS traffic through to backends without termination. Backends handle TLS.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison with Ingress */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
          <p className="text-sm text-gray-700">
            <strong>vs. Ingress:</strong> Gateway API provides more explicit TLS configuration with better certificate management. Ingress requires annotations for advanced TLS features.
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(TLSFlow)

