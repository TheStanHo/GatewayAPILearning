'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Heading {
  level: number
  text: string
  id: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const href = target.getAttribute('href')
        if (href) {
          const id = href.substring(1)
          const element = document.getElementById(id)
          if (element) {
            e.preventDefault()
            const headerOffset = 100 // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
            
            // Update URL without triggering scroll
            window.history.pushState(null, '', href)
          }
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  // Get first few headings for preview when collapsed
  const previewHeadings = headings.slice(0, 3)
  const remainingCount = headings.length - previewHeadings.length

  return (
    <div className="bg-gray-50 rounded-lg border-l-4 border-blue-500 mb-4 md:mb-6 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 md:p-4 text-left hover:bg-gray-100 active:bg-gray-200 transition-colors rounded-t-lg group cursor-pointer"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} table of contents`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            Table of Contents
          </h2>
          {!isOpen && (
            <span className="text-xs text-gray-500 font-normal">
              ({headings.length} {headings.length === 1 ? 'section' : 'sections'})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isOpen && (
            <span className="text-xs text-gray-500 hidden sm:inline">Click to expand</span>
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
          )}
        </div>
      </button>
      {!isOpen && previewHeadings.length > 0 && (
        <div className="px-3 md:px-4 pb-2 border-t border-gray-200">
          <ul className="space-y-0.5 text-xs text-gray-600 pt-2">
            {previewHeadings.map((heading, index) => (
              <li
                key={index}
                className={heading.level === 2 ? 'font-medium truncate' : 'ml-3 md:ml-4 truncate'}
              >
                {heading.text}
              </li>
            ))}
            {remainingCount > 0 && (
              <li className="text-gray-400 italic text-xs pt-1">
                +{remainingCount} more {remainingCount === 1 ? 'section' : 'sections'}...
              </li>
            )}
          </ul>
        </div>
      )}
      {isOpen && (
        <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-gray-200">
          <ul className="space-y-1 text-sm">
            {headings.map((heading, index) => (
              <li
                key={index}
                className={heading.level === 2 ? 'font-medium' : 'ml-3 md:ml-4 text-xs md:text-sm'}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(heading.id)
                    if (element) {
                      const headerOffset = 100 // Account for fixed header
                      const elementPosition = element.getBoundingClientRect().top
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                      })
                      
                      // Update URL
                      window.history.pushState(null, '', `#${heading.id}`)
                    }
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

