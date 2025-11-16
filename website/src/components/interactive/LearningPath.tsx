'use client'

import Link from 'next/link'

interface LearningStep {
  id: string
  title: string
  description: string
  href: string
  completed: boolean
}

interface LearningPathProps {
  steps: LearningStep[]
  onToggleStep: (stepId: string) => void
}

export default function LearningPath({ steps, onToggleStep }: LearningPathProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                {step.id}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                </div>
                <button
                  onClick={() => onToggleStep(step.id)}
                  className={`ml-4 px-4 py-2 rounded-lg transition-colors ${
                    step.completed
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {step.completed ? '✓ Completed' : 'Mark Complete'}
                </button>
              </div>
              <Link
                href={step.href}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

