import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import fs from 'fs'
import { getExampleCategories, getExampleFile } from '@/lib/examples'
import { getExampleSourceAttribution } from '@/lib/sources'
import { ScrollToAnchor } from '@/components/examples/ScrollToAnchor'
import { CodeBlock } from '@/components/examples/CodeBlock'
import { Alert } from '@/components/content/Alert'
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

  // Sort files: README files first, then others alphabetically
  const sortedFiles = [...category.files].sort((a, b) => {
    const aIsReadme = a.name.toLowerCase().startsWith('readme')
    const bIsReadme = b.name.toLowerCase().startsWith('readme')
    
    if (aIsReadme && !bIsReadme) return -1
    if (!aIsReadme && bIsReadme) return 1
    return a.name.localeCompare(b.name)
  })

  // Create a map of file contents for MDX components to access
  // Read from original Examples directory if files don't exist in website/content/examples
  const filesMap: Record<string, string> = {}
  const originalExamplesDir = path.join(process.cwd(), '..', 'Examples', category.name)
  const contentExamplesDir = path.join(process.cwd(), 'content', 'examples', category.name)
  
  // Try to read YAML files from content/examples first, then fall back to original Examples directory
  category.files.forEach((file) => {
    if (file.name.endsWith('.yaml') || file.name.endsWith('.yml')) {
      filesMap[file.name] = file.content
    }
  })
  
  // Also check original Examples directory for YAML files that might not be in content/examples
  if (fs.existsSync(originalExamplesDir)) {
    try {
      const originalFiles = fs.readdirSync(originalExamplesDir)
      originalFiles
        .filter((file) => (file.endsWith('.yaml') || file.endsWith('.yml')) && !filesMap[file])
        .forEach((file) => {
          const filePath = path.join(originalExamplesDir, file)
          try {
            const content = fs.readFileSync(filePath, 'utf8')
            filesMap[file] = content
          } catch (e) {
            // File doesn't exist or can't be read
          }
        })
    } catch (e) {
      // Directory doesn't exist or can't be read
    }
  }

  // Find YAML files that are embedded in MDX files (to exclude from display)
  const embeddedYamlFiles = new Set<string>()
  category.files.forEach((file) => {
    if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
      // Extract CodeBlock filename references from MDX content
      const codeBlockMatches = file.content.matchAll(/<CodeBlock\s+filename=["']([^"']+\.ya?ml)["']/gi)
      for (const match of codeBlockMatches) {
        embeddedYamlFiles.add(match[1])
      }
    }
  })

  // Filter out YAML files that are embedded in MDX files
  const filesToDisplay = sortedFiles.filter((file) => {
    if (file.name.endsWith('.yaml') || file.name.endsWith('.yml')) {
      return !embeddedYamlFiles.has(file.name)
    }
    return true
  })

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

      <h1 className="text-2xl font-bold mb-4">
        {category.name
          .split('-')
          .filter((word) => !/^\d+$/.test(word)) // Filter out numeric-only words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </h1>

      <div className="space-y-8 mt-8">
        {filesToDisplay.map((file) => {
          const sources = getExampleSourceAttribution(
            category.name,
            file.name,
            file.path
          )

          // Create ID from filename (remove extension, make lowercase, replace dots with dashes)
          const fileId = file.name.replace(/\.(yaml|yml|md|mdx)$/, '').toLowerCase().replace(/\./g, '-')
          
          // Check if file is markdown or MDX
          const isMarkdown = file.name.endsWith('.md') || file.name.endsWith('.mdx')
          
          // Hide filename header for markdown/MDX files (they have their own headings)
          const shouldHideHeader = isMarkdown
          
          return (
            <div key={file.name} id={fileId} className="bg-white rounded-lg shadow-md p-6 scroll-mt-24">
              {!shouldHideHeader && <h2 className="text-xl font-semibold mb-4">{file.name}</h2>}
              
              {isMarkdown ? (
                // Render markdown/MDX as formatted content
                <div className="prose prose-base max-w-none prose-table:overflow-x-auto">
                  <MDXRemote 
                    source={file.content}
                    components={{
                      Alert,
                      CodeBlock: (props: any) => {
                        const { filename, content } = props
                        const fileContent = content || filesMap[filename] || ''
                        return <CodeBlock filename={filename} content={fileContent} />
                      },
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
                      scope: {
                        files: filesMap,
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

              {/* Show Sources & References for YAML files, or at the end for MDX files */}
              {!isMarkdown && (
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
              )}
            </div>
          )
        })}
        
        {/* Show Sources & References once at the bottom for all MDX files in the category */}
        {filesToDisplay.some(f => f.name.endsWith('.mdx')) && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-base font-semibold mb-3">Sources & References</h3>
            <div className="space-y-2 text-sm">
              {(() => {
                // Collect all unique sources from MDX files
                const allSources = new Map<string, any>()
                filesToDisplay
                  .filter(f => f.name.endsWith('.mdx'))
                  .forEach(file => {
                    const fileSources = getExampleSourceAttribution(
                      category.name,
                      file.name,
                      file.path
                    )
                    fileSources.sources.forEach((source: any) => {
                      const key = source.type === 'local' 
                        ? `local-${source.name}` 
                        : `external-${source.url}`
                      if (!allSources.has(key)) {
                        allSources.set(key, source)
                      }
                    })
                  })
                return Array.from(allSources.values())
              })().map((source: any, index: number) => (
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
        )}
      </div>
    </div>
  )
}

