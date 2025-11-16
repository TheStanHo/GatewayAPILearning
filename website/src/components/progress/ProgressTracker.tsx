'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DocProgress {
  slug: string
  title: string
  completed: boolean
  lastViewed?: number
}

const DOC_SLUGS = [
  '01-introduction',
  '02-core-concepts',
  '03-basic-routing',
  '04-advanced-routing',
  '05-traffic-splitting',
  '06-tls-ssl',
  '07-request-response-modifications',
  '08-policies',
  '09-migration-guide',
  '10-best-practices',
]

const DOC_TITLES: Record<string, string> = {
  '01-introduction': 'Introduction',
  '02-core-concepts': 'Core Concepts',
  '03-basic-routing': 'Basic Routing',
  '04-advanced-routing': 'Advanced Routing',
  '05-traffic-splitting': 'Traffic Splitting',
  '06-tls-ssl': 'TLS/SSL',
  '07-request-response-modifications': 'Request/Response Modifications',
  '08-policies': 'Policies',
  '09-migration-guide': 'Migration Guide',
  '10-best-practices': 'Best Practices',
}

export function ProgressTracker() {
  const pathname = usePathname()
  const [progress, setProgress] = useState<DocProgress[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const loadProgress = () => {
    const saved = localStorage.getItem('doc-progress')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Ensure all docs are present (merge with defaults)
        const allDocs = DOC_SLUGS.map(slug => {
          const existing = parsed.find((p: DocProgress) => p.slug === slug)
          return existing || {
            slug,
            title: DOC_TITLES[slug] || slug,
            completed: false,
          }
        })
        setProgress(allDocs)
      } catch (e) {
        console.error('Failed to parse progress:', e)
        // Initialize with defaults on error
        const initial = DOC_SLUGS.map(slug => ({
          slug,
          title: DOC_TITLES[slug] || slug,
          completed: false,
        }))
        setProgress(initial)
      }
    } else {
      // Initialize with all docs
      const initial = DOC_SLUGS.map(slug => ({
        slug,
        title: DOC_TITLES[slug] || slug,
        completed: false,
      }))
      setProgress(initial)
    }
  }

  useEffect(() => {
    loadProgress()
  }, [])

  // Listen for storage events to sync with Learn page
  useEffect(() => {
    const handleStorageChange = () => {
      loadProgress()
    }

    // Listen for custom events (for same-page updates from Learn page)
    const handleCustomEvent = () => {
      loadProgress()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('doc-progress-updated', handleCustomEvent)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('doc-progress-updated', handleCustomEvent)
    }
  }, [])

  useEffect(() => {
    // Mark current page as viewed
    if (pathname?.startsWith('/docs/')) {
      const slug = pathname.replace('/docs/', '')
      if (DOC_SLUGS.includes(slug)) {
        setProgress(prev => {
          const updated = prev.map(doc => {
            if (doc.slug === slug) {
              return { ...doc, lastViewed: Date.now() }
            }
            return doc
          })
          localStorage.setItem('doc-progress', JSON.stringify(updated))
          return updated
        })
      }
    }
  }, [pathname])

  const markComplete = (slug: string) => {
    setProgress(prev => {
      const updated = prev.map(doc => {
        if (doc.slug === slug) {
          return { ...doc, completed: !doc.completed, lastViewed: Date.now() }
        }
        return doc
      })
      localStorage.setItem('doc-progress', JSON.stringify(updated))
      // Dispatch custom event to notify Learn page on same page
      window.dispatchEvent(new Event('doc-progress-updated'))
      return updated
    })
  }

  const completedCount = progress.filter(p => p.completed).length
  const totalCount = progress.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  if (progress.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold">
            {completedCount}/{totalCount}
          </div>
          <div className="w-24 h-2 bg-blue-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[101]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-[102]">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-1">
                Learning Progress
              </h3>
              <p className="text-sm text-gray-600">
                {percentage}% Complete ({completedCount} of {totalCount})
              </p>
            </div>
            <div className="p-2" onClick={(e) => {
              // Handle button clicks at the container level using event delegation
              const target = e.target as HTMLElement
              const button = target.closest('button[data-slug]') as HTMLButtonElement
              if (button) {
                const slug = button.getAttribute('data-slug')
                if (slug) {
                  e.preventDefault()
                  e.stopPropagation()
                  markComplete(slug)
                }
              }
            }}>
              {progress.map((doc) => (
                <div
                  key={doc.slug}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <button
                    data-slug={doc.slug}
                    className="flex-shrink-0 z-[103] relative cursor-pointer pointer-events-auto"
                    aria-label={doc.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    type="button"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {doc.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <Link
                    href={`/docs/${doc.slug}`}
                    className="flex-1 text-sm text-gray-700 hover:text-blue-600"
                    onClick={(e) => {
                      setIsOpen(false)
                    }}
                  >
                    {doc.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

