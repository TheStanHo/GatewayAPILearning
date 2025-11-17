import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getExampleCategories } from '@/lib/examples'
import { getContentBySlug } from '@/lib/mdx'
import { FileCode } from 'lucide-react'
import { Alert } from '@/components/content/Alert'

const components = {
  Alert,
}

export default async function ExamplesPage() {
  const categories = getExampleCategories()
  const content = await getContentBySlug('examples')

  return (
    <div className="max-w-6xl mx-auto">
      {content && content.content ? (
        <div className="prose prose-base max-w-none mb-12">
          <MDXRemote source={content.content} components={components} />
        </div>
      ) : (
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">Code Examples</h1>
          <p className="text-lg text-gray-600 mb-8">
            Working YAML examples with side-by-side comparisons of Gateway API and Ingress.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          // Count only YAML/YML files as examples (exclude markdown/MDX documentation files)
          const exampleCount = category.files.filter(f => !f.name.endsWith('.md') && !f.name.endsWith('.mdx')).length
          
          return (
            <Link
              key={category.name}
              href={`/examples/${category.name}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-[#10b981] hover:border-[#047857] group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#d1fae5] rounded-lg group-hover:bg-[#10b981] transition-colors">
                  <FileCode className="w-5 h-5 text-[#10b981] group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {category.name
                    .split('-')
                    .filter((word) => !/^\d+$/.test(word)) // Filter out numeric-only words
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </h2>
              </div>
              {exampleCount > 0 && (
                <p className="text-gray-600 text-sm leading-relaxed mt-3">
                  {exampleCount} example{exampleCount !== 1 ? 's' : ''}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

