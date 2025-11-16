import fs from 'fs'
import path from 'path'
import { getDocBySlug, getDocSlugs, getAllDocs } from './mdx'

export interface DocMetadata {
  slug: string
  title: string
  description?: string
  order?: number
  category?: string
}

const docsDirectory = path.join(process.cwd(), 'content', 'docs')

export function getDocMetadata(): DocMetadata[] {
  const slugs = getDocSlugs()
  
  return slugs.map((slug) => {
    // Try .mdx first, then .md
    let fullPath = path.join(docsDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(docsDirectory, `${slug}.md`)
    }
    if (!fs.existsSync(fullPath)) {
      return { slug, title: slug }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const lines = fileContents.split('\n')
    
    // Extract title from first # heading
    let title = slug
    for (const line of lines) {
      if (line.startsWith('# ')) {
        title = line.replace('# ', '').trim()
        break
      }
    }

    // Extract order from filename (e.g., 01-introduction.md -> 1)
    const orderMatch = slug.match(/^(\d+)-/)
    const order = orderMatch ? parseInt(orderMatch[1], 10) : undefined

    return {
      slug,
      title,
      order,
    }
  }).sort((a, b) => {
    // Sort by order if available, otherwise alphabetically
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    if (a.order !== undefined) return -1
    if (b.order !== undefined) return 1
    return a.slug.localeCompare(b.slug)
  })
}

export { getDocBySlug, getDocSlugs, getAllDocs }

