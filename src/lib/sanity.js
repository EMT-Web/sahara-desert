import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-21',
  useCdn: false, // Disabled for development to see fresh data
  perspective: 'published', // Only fetch published documents, never drafts
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
