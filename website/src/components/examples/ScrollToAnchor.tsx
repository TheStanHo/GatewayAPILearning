'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function ScrollToAnchor() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Wait for page to render
    const timer = setTimeout(() => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return null
}

