'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'

interface SearchResult {
  slug: string
  title: string
  content: string
  excerpt: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  searchQuery: string
}

export function SearchModal({ isOpen, onClose, searchQuery }: SearchModalProps) {
  const [docs, setDocs] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDocs() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/search-docs')
        if (response.ok) {
          const data = await response.json()
          setDocs(data)
        } else {
          console.error('Failed to load search data')
          setDocs([])
        }
      } catch (error) {
        console.error('Failed to load docs:', error)
        setDocs([])
      } finally {
        setIsLoading(false)
      }
    }
    
    if (isOpen) {
      loadDocs()
    }
  }, [isOpen])

  const fuse = useMemo(() => {
    if (docs.length === 0) return null
    
    return new Fuse(docs, {
      keys: ['title', 'content', 'excerpt'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })
  }, [docs])

  const results = useMemo(() => {
    if (!fuse || !searchQuery.trim()) return []
    
    const searchResults = fuse.search(searchQuery)
    return searchResults.slice(0, 8).map(result => ({
      ...result.item,
      score: result.score,
    }))
  }, [fuse, searchQuery])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-16 md:top-20 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-2xl bg-white rounded-lg shadow-xl z-50 max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Search Documentation</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close search"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : searchQuery.trim() === '' ? (
            <div className="p-8 text-center text-gray-500">
              Start typing to search...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="p-2">
              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/docs/${result.slug}`}
                  onClick={onClose}
                  className="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {result.title}
                  </h3>
                  {result.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {result.excerpt}
                    </p>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    /docs/{result.slug}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

