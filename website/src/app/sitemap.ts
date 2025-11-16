import { MetadataRoute } from 'next'
import { getDocMetadata } from '@/lib/content'
import { getExampleCategories } from '@/lib/examples'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gatewayapi.stanho.dev'
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Add all documentation pages
  const docs = getDocMetadata()
  docs.forEach((doc) => {
    routes.push({
      url: `${baseUrl}/docs/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Add all example category pages
  const categories = getExampleCategories()
  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/examples/${category.name}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return routes
}

