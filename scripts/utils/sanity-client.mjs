/**
 * Sanity Client Setup
 * Reusable Sanity client for all import scripts
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Load .env.local file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../../.env.local') })

export function getSanityClient() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID not found in environment variables')
  }

  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('SANITY_API_TOKEN not found. Get it from https://sanity.io/manage → API → Tokens')
  }

  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-21',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })
}

