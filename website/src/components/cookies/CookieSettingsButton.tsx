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
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
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

