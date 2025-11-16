import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

export interface MarkdownContent {
  content: string
  data: {
    title?: string
    description?: string
    [key: string]: any
  }
  html: string
  slug: string
}

const docsDirectory = path.join(process.cwd(), '../Documentation')

export function getDocSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(docsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md') && name !== 'README.md')
    .map((name) => name.replace(/\.md$/, ''))
}

export function getDocBySlug(slug: string): MarkdownContent | null {
  const fullPath = path.join(docsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Process markdown synchronously for better performance
  const processedContent = remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .processSync(content)

  let html = String(processedContent)
  
  // Add IDs to headings for anchor links (optimized regex)
  const headingRegex = /<h([2-3])>(.+?)<\/h\1>/gi
  html = html.replace(headingRegex, (match, level, content) => {
    // Extract text from HTML (remove any HTML tags inside)
    const text = content.replace(/<[^>]*>/g, '').trim()
    if (!text) return match // Skip empty headings
    // Generate ID from text (same logic as table of contents)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    return `<h${level} id="${id}">${content}</h${level}>`
  })

  return {
    content,
    data: data as any,
    html,
    slug,
  }
}

export function getAllDocs(): MarkdownContent[] {
  const slugs = getDocSlugs()
  return slugs.map((slug) => getDocBySlug(slug)).filter(Boolean) as MarkdownContent[]
}

