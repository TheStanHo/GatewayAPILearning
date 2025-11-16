'use client'

import { useEffect } from 'react'

interface Heading {
  level: number
  text: string
  id: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
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

  return (
    <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6 md:mb-8 border-l-4 border-blue-500">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Table of Contents</h2>
      <ul className="space-y-1.5 md:space-y-2">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={heading.level === 2 ? 'font-medium' : 'ml-4 text-sm'}
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
  )
}

