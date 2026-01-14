import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visitsaharadesert.com'

async function getTours() {
  try {
    const tours = await client.fetch(toursListQuery)
    return tours || []
  } catch (error) {
    console.error('Error fetching tours for sitemap:', error)
    return []
  }
}

async function getStories() {
  try {
    const stories = await client.fetch(`
      *[_type == "story" && !(_id match "drafts.*")] | order(publishedAt desc) {
        slug,
        publishedAt,
        _updatedAt
      }
    `)
    return stories || []
  } catch (error) {
    console.error('Error fetching stories for sitemap:', error)
    return []
  }
}

export default async function sitemap() {
  const tours = await getTours()
  const stories = await getStories()

  const routes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tours/marrakech`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tours/fes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tours/casablanca`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tours/agadir`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tours/errachidia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/culture`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/sustainability`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/music`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Filter out tours and stories with invalid or empty slugs
  const tourRoutes = tours
    .filter((tour) => tour.slug?.current && tour.slug.current.trim() !== '')
    .map((tour) => ({
      url: `${siteUrl}/tours/${tour.slug.current}`,
      lastModified: tour.publishedAt ? new Date(tour.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

  const storyRoutes = stories
    .filter((story) => story.slug?.current && story.slug.current.trim() !== '')
    .map((story) => ({
      url: `${siteUrl}/stories/${story.slug.current}`,
      lastModified: story._updatedAt
        ? new Date(story._updatedAt)
        : story.publishedAt
        ? new Date(story.publishedAt)
        : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  // Combine all routes and ensure no duplicate URLs
  const allRoutes = [...routes, ...tourRoutes, ...storyRoutes]
  const uniqueRoutes = Array.from(
    new Map(allRoutes.map((route) => [route.url, route])).values()
  )

  return uniqueRoutes
}

