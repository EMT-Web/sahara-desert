import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahara-desert-travel.com'

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

  const tourRoutes = tours.map((tour) => ({
    url: `${siteUrl}/tours/${tour.slug?.current || ''}`,
    lastModified: tour.publishedAt ? new Date(tour.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const storyRoutes = stories.map((story) => ({
    url: `${siteUrl}/stories/${story.slug?.current || ''}`,
    lastModified: story._updatedAt
      ? new Date(story._updatedAt)
      : story.publishedAt
      ? new Date(story.publishedAt)
      : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...routes, ...tourRoutes, ...storyRoutes]
}

