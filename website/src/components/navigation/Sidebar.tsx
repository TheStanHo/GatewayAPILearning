'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  BookOpen, 
  Rocket, 
  Settings, 
  BookMarked, 
  FileCode, 
  GraduationCap,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  contentType?: 'docs' | 'examples' | 'guides'
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Basics',
    href: '#',
    icon: BookOpen,
    difficulty: 'beginner',
    contentType: 'docs',
    children: [
      {
        title: 'Introduction',
        href: '/docs/01-introduction',
        icon: BookOpen,
      },
      {
        title: 'Core Concepts',
        href: '/docs/02-core-concepts',
        icon: BookOpen,
      },
      {
        title: 'Basic Routing',
        href: '/docs/03-basic-routing',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'Intermediate',
    href: '#',
    icon: Rocket,
    difficulty: 'intermediate',
    contentType: 'docs',
    children: [
      {
        title: 'Advanced Routing',
        href: '/docs/04-advanced-routing',
        icon: Rocket,
      },
      {
        title: 'Traffic Splitting',
        href: '/docs/05-traffic-splitting',
        icon: Rocket,
      },
      {
        title: 'TLS/SSL',
        href: '/docs/06-tls-ssl',
        icon: Rocket,
      },
    ],
  },
  {
    title: 'Advanced',
    href: '#',
    icon: Settings,
    difficulty: 'advanced',
    contentType: 'docs',
    children: [
      {
        title: 'Request/Response Modifications',
        href: '/docs/07-request-response-modifications',
        icon: Settings,
      },
      {
        title: 'Policies',
        href: '/docs/08-policies',
        icon: Settings,
      },
    ],
  },
  {
    title: 'Guides',
    href: '#',
    icon: BookMarked,
    contentType: 'guides',
    children: [
      {
        title: 'Migration Guide',
        href: '/docs/09-migration-guide',
        icon: BookMarked,
      },
      {
        title: 'Best Practices',
        href: '/docs/10-best-practices',
        icon: BookMarked,
      },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              Gateway API
            </Link>
            <p className="text-sm text-gray-300 mt-1">Learning Resource</p>
          </div>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-1 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
          <ul className="space-y-6">
            {navItems.map((item, index) => {
              const hasActiveChild = item.children?.some((child) => pathname === child.href)
              const Icon = item.icon
              
              // Get active background color class (using direct color values)
              const getActiveBgClass = () => {
                if (item.difficulty === 'beginner') return 'bg-[#10b981]'
                if (item.difficulty === 'intermediate') return 'bg-[#f59e0b]'
                if (item.difficulty === 'advanced') return 'bg-[#ef4444]'
                if (item.contentType === 'guides') return 'bg-[#8b5cf6]'
                return 'bg-[#3b82f6]'
              }
              
              // Get text color class - using lighter colors for better contrast on bg-gray-900
              const getTextColorClass = () => {
                if (item.difficulty === 'beginner') return 'text-[#10b981]'
                if (item.difficulty === 'intermediate') return 'text-[#f59e0b]'
                if (item.difficulty === 'advanced') return 'text-[#ef4444]'
                if (item.contentType === 'guides') return 'text-[#8b5cf6]'
                return 'text-gray-300' // Changed from text-gray-400 for better contrast
              }
              
              return (
                <li key={`nav-item-${index}-${item.title}`}>
                  <div className={`
                    text-xs font-semibold uppercase tracking-wider mb-3 px-4 
                    flex items-center gap-2
                    ${getTextColorClass()}
                  `}>
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  {item.children && (
                    <ul className="space-y-1.5">
                      {item.children.map((child) => {
                        const isActive = pathname === child.href
                        const ChildIcon = child.icon
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`
                                flex items-center gap-2 px-4 py-2.5 rounded-lg 
                                transition-all text-sm group
                                ${
                                  isActive
                                    ? `${getActiveBgClass()} text-white font-semibold shadow-md`
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }
                              `}
                              onClick={() => setIsOpen(false)}
                            >
                              <ChildIcon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
                              <span className="flex-1">{child.title}</span>
                              {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-700 space-y-2">
            <Link
              href="/examples"
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm group
                ${
                  pathname.startsWith('/examples')
                    ? 'bg-[#10b981] text-white font-semibold shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              <FileCode className={`w-4 h-4 flex-shrink-0 ${pathname.startsWith('/examples') ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
              <span>Examples</span>
              {pathname.startsWith('/examples') && <ChevronRight className="w-4 h-4" />}
            </Link>
            <Link
              href="/learn"
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm group
                ${
                  pathname.startsWith('/learn')
                    ? 'bg-[#8b5cf6] text-white font-semibold shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              <GraduationCap className={`w-4 h-4 flex-shrink-0 ${pathname.startsWith('/learn') ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
              <span>Learn</span>
              {pathname.startsWith('/learn') && <ChevronRight className="w-4 h-4" />}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

