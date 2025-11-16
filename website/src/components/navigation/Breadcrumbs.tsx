'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/')
    const label = path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return {
      href,
      label,
      isLast: index === paths.length - 1,
    }
  })

  return (
    <nav className="bg-gray-50 border-b" aria-label="Breadcrumb">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {crumb.isLast ? (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-gray-500 hover:text-gray-700">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

