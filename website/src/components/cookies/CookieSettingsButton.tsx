'use client'

import { useState } from 'react'
import { Cookie } from 'lucide-react'
import { CookiePreferences } from './CookiePreferences'

export function CookieSettingsButton() {
  const [showPreferences, setShowPreferences] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowPreferences(true)}
        className="inline-flex items-center min-h-[44px] px-2 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        aria-label="Open cookie settings"
      >
        <Cookie className="w-4 h-4" />
        Cookie Settings
      </button>
      {showPreferences && (
        <CookiePreferences
          onClose={() => setShowPreferences(false)}
        />
      )}
    </>
  )
}

