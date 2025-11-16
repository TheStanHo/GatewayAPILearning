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
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  We use cookies to analyze website traffic and improve your experience. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <span className="text-sm text-gray-600">You can also:</span>
                  <button
                    onClick={handleCustomize}
                    className="inline-flex items-center min-h-[44px] px-3 py-2 text-sm text-blue-600 hover:text-blue-800 underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    aria-label="Customize cookie preferences"
                  >
                    customize your preferences
                  </button>
                  <span className="text-sm text-gray-600">or</span>
                  <a
                    href="/privacy"
                    className="inline-flex items-center min-h-[44px] px-3 py-2 text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    aria-label="View privacy policy"
                  >
                    view our privacy policy
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={handleRejectAll}
                  className="min-h-[44px] px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Reject all cookies"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Accept all cookies"
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

