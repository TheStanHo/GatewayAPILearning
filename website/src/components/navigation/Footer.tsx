import Link from 'next/link'
import { getVersionString } from '@/lib/version'
import { CookieSettingsButton } from '@/components/cookies/CookieSettingsButton'

export default function Footer() {
  const versionString = getVersionString()
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto mb-8">
          {/* Disclaimer */}
          <div className="p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Disclaimer</h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              This website is an <strong>independent educational resource</strong> and is not affiliated with, 
              endorsed by, or sponsored by the Gateway API project, Kubernetes SIG Network, NGINX, Inc., or 
              any other organization. All content is provided for educational purposes only. While we strive 
              for accuracy, please verify information with{' '}
              <a 
                href="https://gateway-api.sigs.k8s.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                official Gateway API documentation
              </a>
              {' '}and{' '}
              <a 
                href="https://docs.nginx.com/nginx-gateway-fabric/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                NGINX Gateway Fabric documentation
              </a>
              . Examples are provided as-is without warranty. Use at your own risk.
            </p>
          </div>
        </div>

        {/* Footer Links - Full width on desktop for better spacing */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <span className="text-gray-700 font-medium">© {new Date().getFullYear()} Gateway API Learning</span>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <Link 
                  href="/docs" 
                  className="inline-flex items-center min-h-[44px] px-3 py-2 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Documentation
                </Link>
                <Link 
                  href="/examples" 
                  className="inline-flex items-center min-h-[44px] px-3 py-2 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Examples
                </Link>
                <Link 
                  href="/privacy" 
                  className="inline-flex items-center min-h-[44px] px-3 py-2 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </Link>
                <CookieSettingsButton />
                <a
                  href="https://gateway-api.sigs.k8s.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] px-3 py-2 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Official Docs
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <span className="text-xs text-gray-400 font-mono">
                {versionString}
              </span>
              <span className="text-gray-500">Created by</span>
              <a
                href="https://stanho.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[44px] px-3 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                stanho.dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

