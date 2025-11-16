'use client'

import { memo } from 'react'
import { CheckCircle, Circle, ArrowRight } from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
  completed?: boolean
}

function MigrationFlow() {
  const steps: Step[] = [
    {
      id: 1,
      title: 'Inventory & Plan',
      description: 'Document all Ingress resources and annotations',
    },
    {
      id: 2,
      title: 'Install Gateway API',
      description: 'Install CRDs and Gateway implementation',
    },
    {
      id: 3,
      title: 'Create GatewayClass',
      description: 'Define the type of Gateway (like IngressClass)',
    },
    {
      id: 4,
      title: 'Create Gateway',
      description: 'Set up network endpoints (replaces Ingress Controller)',
    },
    {
      id: 5,
      title: 'Create HTTPRoutes',
      description: 'Convert Ingress resources to HTTPRoute resources',
    },
    {
      id: 6,
      title: 'Test & Verify',
      description: 'Test routing, TLS, and all features',
    },
    {
      id: 7,
      title: 'Switch Traffic',
      description: 'Gradually migrate traffic to Gateway API',
    },
    {
      id: 8,
      title: 'Clean Up',
      description: 'Remove old Ingress resources',
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
        Migration Flow: Ingress to Gateway API
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        Step-by-step process for migrating from Nginx Ingress to Gateway API
      </p>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            {/* Step Number/Icon */}
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                step.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 text-white'
              }`}>
                {step.completed ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">
                {step.description}
              </p>
            </div>

            {/* Arrow (except for last step) */}
            {index < steps.length - 1 && (
              <div className="flex-shrink-0 flex flex-col items-center pt-2">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Points */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Pre-Migration Checklist</h4>
            <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
              <li>Inventory all Ingress resources</li>
              <li>Document Nginx annotations</li>
              <li>Plan migration order</li>
              <li>Set up monitoring</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Best Practices</h4>
            <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
              <li>Start with non-critical services</li>
              <li>Test thoroughly before switching</li>
              <li>Keep Ingress running during migration</li>
              <li>Have a rollback plan ready</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> You can run both Ingress and Gateway API simultaneously during migration. This allows gradual migration with zero downtime.
        </p>
      </div>
    </div>
  )
}

export default memo(MigrationFlow)

