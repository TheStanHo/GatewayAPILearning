import { NextResponse } from 'next/server'
import { getAllDocs } from '@/lib/mdx'
import { getDocMetadata } from '@/lib/content'

export async function GET() {
  try {
    const docs = await getAllDocs()
    const metadata = getDocMetadata()
    
    const searchableDocs = docs.map((doc) => {
      const meta = metadata.find(m => m.slug === doc.slug)
      // Extract first paragraph as excerpt
      const excerpt = doc.content
        .split('\n')
        .find(line => line.trim().length > 50 && !line.startsWith('#')) || ''
      
      return {
        slug: doc.slug,
        title: meta?.title || doc.slug,
        content: doc.content.substring(0, 5000), // Limit content size
        excerpt: excerpt.substring(0, 150) + (excerpt.length > 150 ? '...' : ''),
      }
    })
    
    return NextResponse.json(searchableDocs)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to load search data' },
      { status: 500 }
    )
  }
}

