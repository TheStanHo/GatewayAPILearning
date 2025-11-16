'use client'

import { memo } from 'react'
import { Check, X } from 'lucide-react'

interface PathExample {
  path: string
  matchType: 'Exact' | 'PathPrefix' | 'RegularExpression'
  matches: string[]
  noMatches: string[]
}

function PathMatching() {
  const examples: PathExample[] = [
    {
      path: '/api',
      matchType: 'Exact',
      matches: ['/api'],
      noMatches: ['/api/', '/api/v1', '/api/users', '/apis'],
    },
    {
      path: '/api',
      matchType: 'PathPrefix',
      matches: ['/api', '/api/', '/api/v1', '/api/users', '/api/users/123'],
      noMatches: ['/apis', '/api-docs'],
    },
    {
      path: '/api/.*',
      matchType: 'RegularExpression',
      matches: ['/api/v1', '/api/users', '/api/v2/status'],
      noMatches: ['/api', '/apis'],
    },
  ]

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case 'Exact':
        return 'bg-blue-500 border-blue-600'
      case 'PathPrefix':
        return 'bg-green-500 border-green-600'
      case 'RegularExpression':
        return 'bg-purple-500 border-purple-600'
      default:
        return 'bg-gray-500 border-gray-600'
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
        Path Matching Types
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        How different path match types work in Gateway API
      </p>

      <div className="space-y-6">
        {examples.map((example, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 md:p-6 bg-gray-50">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`${getMatchTypeColor(example.matchType)} text-white px-4 py-2 rounded-lg font-semibold text-sm`}>
                {example.matchType}
              </div>
              <div className="flex-1">
                <code className="text-sm md:text-base font-mono bg-gray-800 text-gray-100 px-3 py-1 rounded">
                  {example.path}
                </code>
              </div>
            </div>

            {/* Matches */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Matches
                </h4>
                <div className="space-y-1">
                  {example.matches.map((match, i) => (
                    <div key={i} className="text-xs md:text-sm font-mono bg-green-50 text-green-800 px-2 py-1 rounded border border-green-200">
                      {match}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Does Not Match
                </h4>
                <div className="space-y-1">
                  {example.noMatches.map((noMatch, i) => (
                    <div key={i} className="text-xs md:text-sm font-mono bg-red-50 text-red-800 px-2 py-1 rounded border border-red-200">
                      {noMatch}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">Match Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Use Case</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">Exact</td>
                <td className="border border-gray-300 px-3 py-2">Exact path match only</td>
                <td className="border border-gray-300 px-3 py-2 font-mono text-xs">/api</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">PathPrefix</td>
                <td className="border border-gray-300 px-3 py-2">Matches path and all sub-paths</td>
                <td className="border border-gray-300 px-3 py-2 font-mono text-xs">/api → /api, /api/v1, /api/users</td>
              </tr>
              <tr className="bg-purple-50">
                <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">RegularExpression</td>
                <td className="border border-gray-300 px-3 py-2">Complex pattern matching</td>
                <td className="border border-gray-300 px-3 py-2 font-mono text-xs">/api/.*</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison with Ingress */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
        <p className="text-sm text-gray-700">
          <strong>vs. Ingress:</strong> Ingress uses <code className="bg-gray-200 px-1 rounded">pathType</code> with similar options (Exact, Prefix, ImplementationSpecific). Gateway API provides clearer semantics and better support for regular expressions.
        </p>
      </div>
    </div>
  )
}

export default memo(PathMatching)

