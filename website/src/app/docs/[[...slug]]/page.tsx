import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getDocBySlug, getDocMetadata } from '@/lib/content'
import { getContentBySlug } from '@/lib/mdx'
import { getSourceAttribution } from '@/lib/sources'
import TableOfContents from '@/components/TableOfContents'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { BookOpen, BookMarked } from 'lucide-react'
import dynamic from 'next/dynamic'
import path from 'path'
import remarkGfm from 'remark-gfm'
import { CopyButton } from '@/components/code/CopyButton'
import { Alert } from '@/components/content/Alert'

// Components available in MDX
const ArchitectureComparison = dynamic(
  () => import('@/components/diagrams/ArchitectureComparison'),
  { ssr: false }
)

// Helper function to extract text from React children
const extractText = (children: any): string => {
  if (typeof children === 'string') {
    return children
  }
  if (typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('')
  }
  if (children?.props?.children) {
    return extractText(children.props.children)
  }
  return ''
}

// Custom heading components with IDs for anchor links
const createHeadingComponent = (level: number) => {
  return function Heading({ children, ...props }: any) {
    const text = extractText(children)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
    return <HeadingTag id={id} className="scroll-mt-24" {...props}>{children}</HeadingTag>
  }
}

const components = {
  ArchitectureComparison,
  Alert,
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
  pre: (props: any) => {
    const { children, ...rest } = props
    // Extract code from children - handle both string and React elements
    let codeContent = ''
    if (typeof children === 'string') {
      codeContent = children
    } else if (children?.props?.children) {
      const childContent = children.props.children
      if (typeof childContent === 'string') {
        codeContent = childContent
      } else if (Array.isArray(childContent)) {
        codeContent = childContent.map((c: any) => 
          typeof c === 'string' ? c : (c?.props?.children || String(c || ''))
        ).join('')
      } else {
        codeContent = String(childContent || '')
      }
    } else {
      codeContent = String(children || '')
    }
    
    return (
      <div className="relative group">
        <pre {...rest} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
          {children}
        </pre>
        <CopyButton code={codeContent.trim()} />
      </div>
    )
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
}

interface PageProps {
  params: {
    slug?: string[]
  }
}

export async function generateStaticParams() {
  const docs = getDocMetadata()
  // Include empty array for /docs index page
  const params: Array<{ slug: string[] }> = [{ slug: [] }]
  // Add all doc slugs
  docs.forEach((doc) => {
    params.push({ slug: [doc.slug] })
  })
  return params
}

export default async function DocPage({ params }: PageProps) {
  // If no slug provided, show the docs index
  if (!params.slug || params.slug.length === 0) {
    const docs = getDocMetadata()
    const content = await getContentBySlug('docs')
    
    return (
      <div className="max-w-4xl mx-auto">
        {content && content.content ? (
          <div className="prose prose-lg max-w-none mb-12">
            <MDXRemote source={content.content} components={components} />
          </div>
        ) : (
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-8">Documentation</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive guides covering Gateway API concepts, from basics to advanced topics.
            </p>
          </div>
        )}

        <div className="grid gap-6">
          {docs.map((doc) => {
            // Determine difficulty for color coding
            const getDifficultyStyles = () => {
              if (doc.slug.startsWith('01-') || doc.slug.startsWith('02-') || doc.slug.startsWith('03-')) {
                return {
                  border: 'border-[#10b981]',
                  bg: 'bg-[#d1fae5]',
                  bgHover: 'group-hover:bg-[#10b981]',
                  text: 'text-[#10b981]',
                }
              }
              if (doc.slug.startsWith('04-') || doc.slug.startsWith('05-') || doc.slug.startsWith('06-')) {
                return {
                  border: 'border-[#f59e0b]',
                  bg: 'bg-[#fef3c7]',
                  bgHover: 'group-hover:bg-[#f59e0b]',
                  text: 'text-[#f59e0b]',
                }
              }
              if (doc.slug.startsWith('07-') || doc.slug.startsWith('08-')) {
                return {
                  border: 'border-[#ef4444]',
                  bg: 'bg-[#fee2e2]',
                  bgHover: 'group-hover:bg-[#ef4444]',
                  text: 'text-[#ef4444]',
                }
              }
              if (doc.slug.startsWith('09-') || doc.slug.startsWith('10-')) {
                return {
                  border: 'border-[#8b5cf6]',
                  bg: 'bg-[#ede9fe]',
                  bgHover: 'group-hover:bg-[#8b5cf6]',
                  text: 'text-[#8b5cf6]',
                }
              }
              return {
                border: 'border-[#3b82f6]',
                bg: 'bg-[#dbeafe]',
                bgHover: 'group-hover:bg-[#3b82f6]',
                text: 'text-[#3b82f6]',
              }
            }
            
            const styles = getDifficultyStyles()
            const isGuide = doc.slug.startsWith('09-') || doc.slug.startsWith('10-')
            const Icon = isGuide ? BookMarked : BookOpen
            
            return (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className={`block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 ${styles.border} group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${styles.bg} ${styles.bgHover} transition-colors`}>
                    <Icon className={`w-5 h-5 ${styles.text} group-hover:text-white transition-colors`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">
                      {doc.title}
                    </h2>
                    {doc.description && (
                      <p className="text-gray-600 leading-relaxed">{doc.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  const slug = params.slug[0]
  
  // Get doc from MDX (all docs are now in website/content/docs/)
  const doc = await getDocBySlug(slug)
  
  if (!doc) {
    notFound()
  }
  
  // All docs should be MDX now
  if (!doc.mdxSource) {
    console.error(`Document ${slug} is not in MDX format. Please convert to .mdx`)
    notFound()
  }

  // Get file path for source attribution
  const docsDirectory = path.join(process.cwd(), 'content', 'docs')
  const filePath = path.join(docsDirectory, `${slug}.mdx`)
  const sources = getSourceAttribution(slug, filePath)

  // Extract headings for table of contents
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; id: string }> = []
  let match

  while ((match = headingRegex.exec(doc.content)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    headings.push({ level, text, id })
  }

  // Extract title from content if not in frontmatter
  const title = doc.data?.title || doc.content.split('\n').find(line => line.startsWith('# '))?.replace('# ', '') || slug

  // Get all docs for navigation
  const allDocs = getDocMetadata()
  const currentIndex = allDocs.findIndex(d => d.slug === slug)
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

  // Determine difficulty level based on slug
  const getDifficulty = (): 'beginner' | 'intermediate' | 'advanced' | null => {
    if (slug.startsWith('01-') || slug.startsWith('02-') || slug.startsWith('03-')) {
      return 'beginner'
    }
    if (slug.startsWith('04-') || slug.startsWith('05-') || slug.startsWith('06-')) {
      return 'intermediate'
    }
    if (slug.startsWith('07-') || slug.startsWith('08-')) {
      return 'advanced'
    }
    return null
  }

  const difficulty = getDifficulty()

  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose prose-lg max-w-none">
        <div className="mb-6 space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {difficulty && (
            <DifficultyBadge level={difficulty} />
          )}
        </div>
        
        {headings.length > 0 && (
          <div className="my-4 md:my-6">
            <TableOfContents headings={headings} />
          </div>
        )}

        <div className="markdown-content prose prose-lg max-w-none">
          {doc.content ? (
            <div className="[&>h1]:hidden">
              <MDXRemote 
                source={doc.content} 
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [],
                  },
                }}
              />
            </div>
          ) : (
            <div className="text-red-500">Error: MDX content not available</div>
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Sources & References</h2>
          <div className="space-y-3">
            {sources.sources.map((source, index) => (
              <div key={index} className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                {source.type === 'local' ? (
                  <div>
                    <span className="font-medium">{source.name}</span>
                    {source.lastUpdated && (
                      <span className="text-gray-500 text-sm ml-2">
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
                      <span className="text-gray-500 text-sm ml-2">
                        (Version: {source.version})
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Version Compatibility:</strong> This content is based on Gateway API{' '}
              {sources.apiVersion} and NGINX Gateway Fabric{' '}
              {sources.nginxGatewayFabricVersion}. Please verify compatibility with your
              cluster&apos;s Gateway API implementation and version.
            </p>
          </div>
        </div>

        {/* Previous/Next Navigation */}
        {(prevDoc || nextDoc) && (
          <nav className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            {prevDoc ? (
              <Link
                href={`/docs/${prevDoc.slug}`}
                className="flex-1 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div className="text-sm text-gray-500 mb-1">Previous</div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  {prevDoc.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextDoc ? (
              <Link
                href={`/docs/${nextDoc.slug}`}
                className="flex-1 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group text-right"
              >
                <div className="text-sm text-gray-500 mb-1">Next</div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600 flex items-center justify-end gap-2">
                  {nextDoc.title}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        )}
      </article>
    </div>
  )
}

