import { getDocMetadata } from './content'
import { getAllDocs } from './mdx'

export interface SearchResult {
  slug: string
  title: string
  excerpt: string
  score?: number
}

export async function getSearchableDocs() {
  const docs = await getAllDocs()
  const metadata = getDocMetadata()
  
  return docs.map((doc) => {
    const meta = metadata.find(m => m.slug === doc.slug)
    // Extract first paragraph as excerpt
    const excerpt = doc.content
      .split('\n')
      .find(line => line.trim().length > 50 && !line.startsWith('#')) || ''
    
    return {
      slug: doc.slug,
      title: meta?.title || doc.slug,
      content: doc.content,
      excerpt: excerpt.substring(0, 150) + (excerpt.length > 150 ? '...' : ''),
    }
  })
}

