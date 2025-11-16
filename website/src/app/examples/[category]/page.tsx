import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getExampleCategories, getExampleFile } from '@/lib/examples'
import { getExampleSourceAttribution } from '@/lib/sources'
import { ScrollToAnchor } from '@/components/examples/ScrollToAnchor'
import path from 'path'

// Note: ssr: false removed for Next.js 16 compatibility
const CodeViewer = dynamic(
  () => import('@/components/code-viewer/CodeViewer')
)

interface PageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const categories = getExampleCategories()
  return categories.map((category) => ({
    category: category.name,
  }))
}

export default async function ExampleCategoryPage({ params }: PageProps) {
  // Await params in Next.js 16
  const resolvedParams = await params
  
  const categories = getExampleCategories()
  const category = categories.find((c) => c.name === resolvedParams.category)

  if (!category) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Suspense fallback={null}>
        <ScrollToAnchor />
      </Suspense>
      <div className="mb-6">
        <Link
          href="/examples"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to Examples
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">
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
          
          // Check if file is markdown
          const isMarkdown = file.name.endsWith('.md')
          
          return (
            <div key={file.name} id={fileId} className="bg-white rounded-lg shadow-md p-6 scroll-mt-24">
              <h2 className="text-xl font-semibold mb-4">{file.name}</h2>
              
              {isMarkdown ? (
                // Render markdown as formatted content
                <div className="prose prose-lg max-w-none prose-table:overflow-x-auto">
                  <MDXRemote 
                    source={file.content}
                    components={{
                      a: (props: any) => {
                        const { href, children, ...rest } = props
                        const isExternal = href?.startsWith('http://') || href?.startsWith('https://')
                        
                        if (isExternal) {
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                              {...rest}
                            >
                              {children}
                            </a>
                          )
                        }
                        
                        return (
                          <Link href={href || '#'} className="text-blue-600 hover:text-blue-800 underline" {...rest}>
                            {children}
                          </Link>
                        )
                      },
                      table: (props: any) => (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full divide-y divide-gray-200 border border-gray-300" {...props} />
                        </div>
                      ),
                      th: (props: any) => (
                        <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900 border-b border-gray-200" {...props} />
                      ),
                      td: (props: any) => (
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200" {...props} />
                      ),
                    }}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [],
                      },
                    }}
                  />
                </div>
              ) : (
                // Render YAML/YML as code
                <CodeViewer
                  code={file.content}
                  language={file.name.endsWith('.yaml') || file.name.endsWith('.yml') ? 'yaml' : 'text'}
                  filename={file.name}
                />
              )}

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-base font-semibold mb-3">Sources & References</h3>
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

