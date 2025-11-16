import type { Metadata } from 'next'
import { DocMetadata } from './content'

const baseUrl = 'https://gatewayapi.stanho.dev'
const siteName = 'Gateway API Learning'

/**
 * Generate structured data (JSON-LD) for the website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    description: 'Comprehensive learning resource for Kubernetes Gateway API, featuring interactive tutorials, examples, and guides for NGINX Gateway Fabric',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate structured data for an article/documentation page
 */
export function generateArticleSchema(
  title: string,
  description: string,
  slug: string,
  datePublished?: string,
  dateModified?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `${baseUrl}/docs/${slug}`,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/docs/${slug}`,
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate Course/Educational content schema
 */
export function generateCourseSchema(
  title: string,
  description: string,
  url: string,
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
) {
  const educationalLevel = {
    beginner: 'beginner',
    intermediate: 'intermediate',
    advanced: 'advanced',
  }[difficulty || 'beginner']

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description: description,
    url: url,
    educationalLevel: educationalLevel,
    provider: {
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
    },
  }
}

/**
 * Generate metadata for a documentation page
 */
export function generateDocMetadata(doc: DocMetadata, content?: string): Metadata {
  const description = doc.description || 
    `Learn about ${doc.title} in Kubernetes Gateway API. Comprehensive guide with examples and best practices.`
  
  const url = `${baseUrl}/docs/${doc.slug}`
  
  // Extract first paragraph as description if not provided
  let metaDescription = description
  if (content && !doc.description) {
    const firstParagraph = content
      .split('\n')
      .find(line => line.trim().length > 50 && !line.startsWith('#'))
    if (firstParagraph) {
      metaDescription = firstParagraph.substring(0, 160).trim()
    }
  }

  return {
    title: `${doc.title} | ${siteName}`,
    description: metaDescription,
    keywords: [
      'Gateway API',
      'Kubernetes',
      'NGINX Gateway Fabric',
      'HTTPRoute',
      doc.title,
      'Kubernetes Networking',
    ],
    openGraph: {
      title: doc.title,
      description: metaDescription,
      type: 'article',
      url: url,
      siteName: siteName,
      locale: 'en_US',
      // TODO: Add og:image when images are available
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: metaDescription,
    },
    alternates: {
      canonical: url,
    },
  }
}

