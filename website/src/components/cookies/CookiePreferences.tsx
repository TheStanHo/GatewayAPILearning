'use client'

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'
import { getCookieConsent, saveCookieConsent, type CookieConsent } from '@/lib/cookies'

interface CookiePreferencesProps {
  onClose: () => void
}

export function CookiePreferences({ onClose }: CookiePreferencesProps) {
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = getCookieConsent()
    if (consent) {
      setAnalytics(consent.analytics)
    }
  }, [])

  const handleSave = () => {
    saveCookieConsent({
      analytics,
      timestamp: Date.now(),
    })
    onClose()
    // Reload to apply changes
    window.location.reload()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cookie className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Cookie Preferences</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-6">
              We use cookies to enhance your browsing experience and analyze website traffic. 
              You can choose which cookies to accept below.
            </p>
          </div>

          {/* Analytics Cookies */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Analytics Cookies
                </h3>
                <p className="text-sm text-gray-600">
                  These cookies help us understand how visitors interact with our website by 
                  collecting and reporting information anonymously. We use Google Analytics 
                  to track page views, user behavior, and improve our content.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              <strong>Used by:</strong> Google Analytics
              <br />
              <strong>Purpose:</strong> Website analytics and performance monitoring
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              For more information about how we handle your data, please read our{' '}
              <a
                href="/privacy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

