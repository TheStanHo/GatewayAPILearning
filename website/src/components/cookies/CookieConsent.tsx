'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings } from 'lucide-react'
import { getCookieConsent, saveCookieConsent, type CookieConsent } from '@/lib/cookies'
import { CookiePreferences } from './CookiePreferences'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    // Only show banner if consent hasn't been given
    const consent = getCookieConsent()
    if (!consent) {
      // Small delay to avoid flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    saveCookieConsent({
      analytics: true,
      timestamp: Date.now(),
    })
    setShowBanner(false)
    // Reload to apply analytics
    window.location.reload()
  }

  const handleRejectAll = () => {
    saveCookieConsent({
      analytics: false,
      timestamp: Date.now(),
    })
    setShowBanner(false)
  }

  const handleCustomize = () => {
    setShowPreferences(true)
  }

  if (!showBanner) {
    return null
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <Cookie className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Cookie Consent
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to analyze website traffic and improve your experience. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                  You can also{' '}
                  <button
                    onClick={handleCustomize}
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    customize your preferences
                  </button>
                  {' '}or{' '}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    view our privacy policy
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPreferences && (
        <CookiePreferences
          onClose={() => {
            setShowPreferences(false)
            const consent = getCookieConsent()
            if (consent) {
              setShowBanner(false)
            }
          }}
        />
      )}
    </>
  )
}

