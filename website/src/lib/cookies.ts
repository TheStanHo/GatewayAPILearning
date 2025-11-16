/**
 * Cookie consent management utilities
 * Handles GDPR-compliant cookie consent storage and retrieval
 */

export type CookieConsent = {
  analytics: boolean
  timestamp: number
}

const CONSENT_KEY = 'cookie-consent'
const CONSENT_VERSION = '1' // Increment if consent structure changes

/**
 * Get stored cookie consent
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored)
    // Check version to handle future migrations
    if (parsed.version !== CONSENT_VERSION) {
      // Clear old consent if version changed
      localStorage.removeItem(CONSENT_KEY)
      return null
    }

    return parsed.consent
  } catch {
    return null
  }
}

/**
 * Save cookie consent
 */
export function saveCookieConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return

  try {
    const data = {
      version: CONSENT_VERSION,
      consent: {
        ...consent,
        timestamp: Date.now(),
      },
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save cookie consent:', error)
  }
}

/**
 * Check if user has given consent for analytics
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getCookieConsent()
  return consent?.analytics === true
}

/**
 * Clear all cookie consent
 */
export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CONSENT_KEY)
}

