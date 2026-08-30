import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2nicu1vl'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-21'

const isSanityConfigured = !!projectId

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
    })
  : {
      fetch: async () => null,
    }

const realClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null

const builder = realClient ? imageUrlBuilder(realClient) : null

export function urlFor(source) {
  if (!builder || !source) return { url: () => '' }
  return builder.image(source)
}
