import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

export interface MDXContent {
  content: string
  data: {
    title?: string
    description?: string
    [key: string]: any
  }
  mdxSource?: any
  html?: string
  slug: string
}

const docsDirectory = path.join(process.cwd(), 'content', 'docs')
const contentDirectory = path.join(process.cwd(), 'content')
const examplesDirectory = path.join(process.cwd(), 'content', 'examples')

export function getDocSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(docsDirectory)
  return fileNames
    .filter((name) => (name.endsWith('.md') || name.endsWith('.mdx')) && name !== 'README.md' && name !== 'README.mdx')
    .map((name) => name.replace(/\.(md|mdx)$/, ''))
}

export async function getDocBySlug(slug: string): Promise<MDXContent | null> {
  // Try .mdx first, then .md
  let fullPath = path.join(docsDirectory, `${slug}.mdx`)
  const isMDX = fs.existsSync(fullPath)
  if (!isMDX) {
    fullPath = path.join(docsDirectory, `${slug}.md`)
  }
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content: rawContent } = matter(fileContents)

  // All files should be MDX now - convert .md to MDX if needed
  if (!isMDX) {
    // If it's .md, we'll still process it as MDX (MDX can handle plain markdown)
    console.warn(`Document ${slug} is using .md extension. Consider converting to .mdx for better component support.`)
  }

  // Serialize the full content (including H1 - we'll hide it with CSS or handle in component)
  const mdxSource = await serialize(rawContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
    parseFrontmatter: false, // We're using gray-matter for frontmatter
  })

  return {
    content: rawContent, // Keep original content for TOC extraction
    data: data as any,
    mdxSource,
    slug,
  }
}

export async function getAllDocs(): Promise<MDXContent[]> {
  const slugs = getDocSlugs()
  return Promise.all(
    slugs.map((slug) => getDocBySlug(slug)).filter(Boolean) as Promise<MDXContent>[]
  )
}

// Get content from website/content directory (for index pages)
export async function getContentBySlug(slug: string): Promise<MDXContent | null> {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
    parseFrontmatter: false,
  })

  return {
    content,
    data: data as any,
    mdxSource,
    slug,
  }
}

