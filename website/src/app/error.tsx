'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Something went wrong</h2>
      <p className="text-xl text-gray-600 mb-8">
        {error.message || 'An unexpected error occurred'}
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

