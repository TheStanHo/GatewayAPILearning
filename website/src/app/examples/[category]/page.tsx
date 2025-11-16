import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getExampleCategories, getExampleFile } from '@/lib/examples'
import { getExampleSourceAttribution } from '@/lib/sources'
import { ScrollToAnchor } from '@/components/examples/ScrollToAnchor'
import path from 'path'

const CodeViewer = dynamic(
  () => import('@/components/code-viewer/CodeViewer'),
  { ssr: false }
)

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getExampleCategories()
  return categories.map((category) => ({
    category: category.name,
  }))
}

export default function ExampleCategoryPage({ params }: PageProps) {
  const categories = getExampleCategories()
  const category = categories.find((c) => c.name === params.category)

  if (!category) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ScrollToAnchor />
      <div className="mb-6">
        <Link
          href="/examples"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to Examples
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">
        {category.name
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </h1>

      <div className="space-y-8 mt-8">
        {category.files.map((file) => {
          const sources = getExampleSourceAttribution(
            category.name,
            file.name,
            file.path
          )

          // Create ID from filename (remove extension, make lowercase, replace dots with dashes)
          const fileId = file.name.replace(/\.(yaml|yml|md)$/, '').toLowerCase().replace(/\./g, '-')
          
          return (
            <div key={file.name} id={fileId} className="bg-white rounded-lg shadow-md p-6 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4">{file.name}</h2>
              <CodeViewer
                code={file.content}
                language="yaml"
                filename={file.name}
              />

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Sources & References</h3>
                <div className="space-y-2 text-sm">
                  {sources.sources.map((source, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-gray-500 mr-2">•</span>
                      {source.type === 'local' ? (
                        <div>
                          <span className="font-medium">{source.name}</span>
                          {source.lastUpdated && (
                            <span className="text-gray-500 ml-2">
                              (Last updated: {source.lastUpdated})
                            </span>
                          )}
                        </div>
                      ) : (
                        <div>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {source.name}
                          </a>
                          {source.version && (
                            <span className="text-gray-500 ml-2">
                              (Version: {source.version})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

