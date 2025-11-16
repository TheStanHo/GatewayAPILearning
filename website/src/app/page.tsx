import Link from 'next/link'
import dynamic from 'next/dynamic'
import { BookOpen, FileCode, GraduationCap } from 'lucide-react'

// Lazy load diagram components (load after initial page render)
const GatewayFlow = dynamic(() => import('@/components/diagrams/GatewayFlow'), {
  ssr: false,
  loading: () => <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg h-64 animate-pulse" />
})

const GatewayRelationships = dynamic(() => import('@/components/diagrams/GatewayRelationships'), {
  ssr: false,
  loading: () => <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg h-64 animate-pulse" />
})

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Learn Gateway API
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6 px-2">
            Start with the basics. Learn Gateway API step-by-step with clear explanations and hands-on examples.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
            <Link
              href="/learn"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Start Learning Path
            </Link>
            <Link
              href="/docs/01-introduction"
              className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Read Introduction
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-16">
          <Link
            href="/docs"
            className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-all border-l-4 border-[#3b82f6] hover:border-[#1e40af] group"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 bg-[#dbeafe] rounded-lg group-hover:bg-[#3b82f6] transition-colors flex-shrink-0">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#3b82f6] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Documentation</h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Comprehensive guides covering Gateway API concepts, from basics to advanced topics
            </p>
          </Link>

          <Link
            href="/examples"
            className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-all border-l-4 border-[#10b981] hover:border-[#047857] group"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 bg-[#d1fae5] rounded-lg group-hover:bg-[#10b981] transition-colors flex-shrink-0">
                <FileCode className="w-5 h-5 md:w-6 md:h-6 text-[#10b981] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Examples</h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Working YAML examples with side-by-side comparisons of Gateway API and Ingress
            </p>
          </Link>

          <Link
            href="/learn"
            className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-all border-l-4 border-[#8b5cf6] hover:border-[#5b21b6] group"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 bg-[#ede9fe] rounded-lg group-hover:bg-[#8b5cf6] transition-colors flex-shrink-0">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-[#8b5cf6] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Learn</h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Interactive learning paths with step-by-step tutorials and progress tracking
            </p>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <GatewayFlow />
          <GatewayRelationships />
        </div>
      </div>
    </div>
  )
}
