'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { hasAnalyticsConsent } from '@/lib/cookies'

// Google Analytics Tracking ID - public value, safe to hardcode
const GA_ID = 'G-4CQRNDYJY5'

export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Check consent on client side
    if (hasAnalyticsConsent()) {
      setShouldLoad(true)
    }
  }, [])

  if (!shouldLoad) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}

