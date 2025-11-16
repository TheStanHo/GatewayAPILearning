'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import LearningPath from '@/components/interactive/LearningPath'

// Map step IDs to doc slugs (matching ProgressTracker)
const STEP_TO_SLUG: Record<string, string> = {
  '1': '01-introduction',
  '2': '02-core-concepts',
  '3': '03-basic-routing',
  '4': '04-advanced-routing',
  '5': '05-traffic-splitting',
  '6': '06-tls-ssl',
  '7': '07-request-response-modifications',
  '8': '08-policies',
  '9': '09-migration-guide',
  '10': '10-best-practices',
}

const learningSteps = [
  {
    id: '1',
    title: 'Introduction to Gateway API',
    description: 'Learn what Gateway API is and why it exists',
    href: '/docs/01-introduction',
    completed: false,
    level: 'beginner',
  },
  {
    id: '2',
    title: 'Core Concepts',
    description: 'Understand GatewayClass, Gateway, and HTTPRoute',
    href: '/docs/02-core-concepts',
    completed: false,
    level: 'beginner',
  },
  {
    id: '3',
    title: 'Basic Routing',
    description: 'Learn hostname and path matching',
    href: '/docs/03-basic-routing',
    completed: false,
    level: 'beginner',
  },
  {
    id: '4',
    title: 'Advanced Routing',
    description: 'Header, query parameter, and method matching',
    href: '/docs/04-advanced-routing',
    completed: false,
    level: 'intermediate',
  },
  {
    id: '5',
    title: 'Traffic Splitting',
    description: 'Weighted routing and canary deployments',
    href: '/docs/05-traffic-splitting',
    completed: false,
    level: 'intermediate',
  },
  {
    id: '6',
    title: 'TLS/SSL Configuration',
    description: 'Certificate management and TLS configuration',
    href: '/docs/06-tls-ssl',
    completed: false,
    level: 'intermediate',
  },
  {
    id: '7',
    title: 'Request/Response Modifications',
    description: 'URL rewriting and header modifications',
    href: '/docs/07-request-response-modifications',
    completed: false,
    level: 'advanced',
  },
  {
    id: '8',
    title: 'Policies',
    description: 'Policy attachments and advanced features',
    href: '/docs/08-policies',
    completed: false,
    level: 'advanced',
  },
  {
    id: '9',
    title: 'Migration Guide',
    description: 'Step-by-step migration from Nginx Ingress',
    href: '/docs/09-migration-guide',
    completed: false,
    level: 'guide',
  },
  {
    id: '10',
    title: 'Best Practices',
    description: 'Recommendations and best practices',
    href: '/docs/10-best-practices',
    completed: false,
    level: 'guide',
  },
]

const beginnerSteps = learningSteps.filter((s) => s.level === 'beginner')
const intermediateSteps = learningSteps.filter((s) => s.level === 'intermediate')
const advancedSteps = learningSteps.filter((s) => s.level === 'advanced')
const guideSteps = learningSteps.filter((s) => s.level === 'guide')

interface DocProgress {
  slug: string
  title: string
  completed: boolean
  lastViewed?: number
}

export default function LearnPage() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  // Function to load and sync progress from localStorage
  const loadProgressFromStorage = useCallback(() => {
    const saved = localStorage.getItem('doc-progress')
    if (saved) {
      try {
        const progress: DocProgress[] = JSON.parse(saved)
        const completed = new Set<string>()
        progress.forEach((doc) => {
          if (doc.completed) {
            // Find step ID from slug
            const stepId = Object.entries(STEP_TO_SLUG).find(
              ([_, slug]) => slug === doc.slug
            )?.[0]
            if (stepId) {
              completed.add(stepId)
            }
          }
        })
        setCompletedSteps(completed)
      } catch (e) {
        console.error('Failed to parse progress:', e)
      }
    }
  }, [])

  // Load progress from localStorage on mount
  useEffect(() => {
    loadProgressFromStorage()
  }, [loadProgressFromStorage])

  // Listen for storage events to sync with ProgressTracker
  useEffect(() => {
    // Listen for storage events (from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'doc-progress') {
        loadProgressFromStorage()
      }
    }

    // Listen for custom events (for same-page updates from ProgressTracker)
    const handleCustomEvent = () => {
      loadProgressFromStorage()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('doc-progress-updated', handleCustomEvent)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('doc-progress-updated', handleCustomEvent)
    }
  }, [loadProgressFromStorage])

  const toggleStep = (stepId: string) => {
    const slug = STEP_TO_SLUG[stepId]
    if (!slug) return

    // Update local state
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      const isCompleted = next.has(stepId)
      if (isCompleted) {
        next.delete(stepId)
      } else {
        next.add(stepId)
      }

      // Update localStorage to sync with ProgressTracker
      const saved = localStorage.getItem('doc-progress')
      let progress: DocProgress[] = []
      if (saved) {
        try {
          progress = JSON.parse(saved)
        } catch (e) {
          console.error('Failed to parse progress:', e)
        }
      }

      // Find or create the doc entry
      let docIndex = progress.findIndex((d) => d.slug === slug)
      if (docIndex === -1) {
        // Create new entry
        progress.push({
          slug,
          title: learningSteps.find((s) => s.id === stepId)?.title || slug,
          completed: !isCompleted,
          lastViewed: Date.now(),
        })
      } else {
        // Update existing entry
        progress[docIndex] = {
          ...progress[docIndex],
          completed: !isCompleted,
          lastViewed: Date.now(),
        }
      }

      localStorage.setItem('doc-progress', JSON.stringify(progress))
      
      // Dispatch custom event to notify ProgressTracker on same page
      window.dispatchEvent(new Event('doc-progress-updated'))
      
      return next
    })
  }

  const progress = (completedSteps.size / learningSteps.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Interactive Learning Path</h1>
      <p className="text-xl text-gray-600 mb-8">
        Start with the basics. Master Gateway API step-by-step with clear explanations and hands-on examples.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
        <p className="text-blue-800">
          <strong>New to Gateway API?</strong> Start with the <strong>Basics</strong> section below. 
          Complete those three lessons first before moving to intermediate topics.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">
            {completedSteps.size} / {learningSteps.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">📚 Basics - Start Here!</h2>
        <p className="text-gray-600 mb-4">
          Master these three essential concepts first. This is all you need to get started with Gateway API.
        </p>
        <LearningPath
          steps={beginnerSteps.map((step) => ({
            ...step,
            completed: completedSteps.has(step.id),
          }))}
          onToggleStep={toggleStep}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">🚀 Intermediate</h2>
        <p className="text-gray-600 mb-4">
          Once you&apos;ve mastered the basics, learn more advanced routing and traffic management.
        </p>
        <LearningPath
          steps={intermediateSteps.map((step) => ({
            ...step,
            completed: completedSteps.has(step.id),
          }))}
          onToggleStep={toggleStep}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">⚙️ Advanced</h2>
        <p className="text-gray-600 mb-4">
          Advanced features for complex use cases. Only explore these after mastering the basics.
        </p>
        <LearningPath
          steps={advancedSteps.map((step) => ({
            ...step,
            completed: completedSteps.has(step.id),
          }))}
          onToggleStep={toggleStep}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">📖 Guides</h2>
        <p className="text-gray-600 mb-4">
          Practical guides for real-world scenarios.
        </p>
        <LearningPath
          steps={guideSteps.map((step) => ({
            ...step,
            completed: completedSteps.has(step.id),
          }))}
          onToggleStep={toggleStep}
        />
      </div>
    </div>
  )
}

