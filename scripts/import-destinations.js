/**
 * Import Destinations Script
 * Imports all destinations into Sanity
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Load .env.local file first
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.js'
import { createDocuments } from './utils/content-helpers.js'
import { parseDestinations } from './parsers/destinations-parser.js'

async function importDestinations() {
  console.log('📍 Starting destinations import...\n')

  try {
    const client = getSanityClient()
    const destinations = parseDestinations()

    console.log(`📦 Found ${destinations.length} destinations to import\n`)

    await createDocuments(client, 'destination', destinations, 500)

    console.log('\n✅ Destinations import complete!')
  } catch (error) {
    console.error('❌ Error importing destinations:', error.message)
    process.exit(1)
  }
}

importDestinations()

