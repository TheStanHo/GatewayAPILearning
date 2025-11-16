import Link from 'next/link'
import { getVersionString } from '@/lib/version'
import { CookieSettingsButton } from '@/components/cookies/CookieSettingsButton'

export default function Footer() {
  const versionString = getVersionString()
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Disclaimer */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Disclaimer</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
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

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span>© {new Date().getFullYear()} Gateway API Learning</span>
              <span className="hidden md:inline">•</span>
              <Link 
                href="/docs" 
                className="hover:text-gray-900 transition-colors"
              >
                Documentation
              </Link>
              <span className="hidden md:inline">•</span>
              <Link 
                href="/examples" 
                className="hover:text-gray-900 transition-colors"
              >
                Examples
              </Link>
              <span className="hidden md:inline">•</span>
              <Link 
                href="/privacy" 
                className="hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="hidden md:inline">•</span>
              <CookieSettingsButton />
              <span className="hidden md:inline">•</span>
              <a
                href="https://gateway-api.sigs.k8s.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                Official Docs
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span className="text-xs text-gray-400 font-mono">
                {versionString}
              </span>
              <span className="hidden md:inline text-gray-400">•</span>
              <span className="text-gray-500">Created by</span>
              <a
                href="https://stanho.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
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

