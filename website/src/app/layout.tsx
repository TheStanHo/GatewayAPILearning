import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'
import '../styles/markdown.css'
import Sidebar from '@/components/navigation/Sidebar'
import Header from '@/components/navigation/Header'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import Footer from '@/components/navigation/Footer'
import { ProgressTracker } from '@/components/progress/ProgressTracker'

// Optimize font loading - reduce font weight variants
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'], // Only load needed weights
  variable: '--font-inter',
})

// Monospace font for code
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Gateway API Learning - Learn Kubernetes Gateway API with NGINX Gateway Fabric',
    template: '%s | Gateway API Learning',
  },
  description: 'Comprehensive learning resource for Kubernetes Gateway API, featuring interactive tutorials, examples, and guides for NGINX Gateway Fabric',
  keywords: ['Gateway API', 'Kubernetes', 'NGINX Gateway Fabric', 'HTTPRoute', 'Gateway', 'Kubernetes Networking'],
  authors: [{ name: 'Gateway API Learning' }],
  creator: 'Gateway API Learning',
  publisher: 'Gateway API Learning',
  metadataBase: new URL('https://gatewayapi.stanho.dev'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Gateway API Learning',
    description: 'Learn Kubernetes Gateway API with interactive tutorials and examples',
    type: 'website',
    url: 'https://gatewayapi.stanho.dev',
    siteName: 'Gateway API Learning',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gateway API Learning',
    description: 'Learn Kubernetes Gateway API with interactive tutorials and examples',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans h-full antialiased leading-relaxed">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Sidebar />
        <div className="md:ml-64 min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <Breadcrumbs />
          <main id="main-content" className="container mx-auto px-4 py-6 md:py-10 flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ProgressTracker />
      </body>
    </html>
  )
}
