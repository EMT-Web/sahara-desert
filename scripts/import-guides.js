/**
 * Import Guides Script
 * Imports all guides into Sanity
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
import { parseGuides } from './parsers/guides-parser.js'

async function importGuides() {
  console.log('👥 Starting guides import...\n')

  try {
    const client = getSanityClient()
    const guides = parseGuides()

    console.log(`📦 Found ${guides.length} guides to import\n`)

    await createDocuments(client, 'guide', guides, 500)

    console.log('\n✅ Guides import complete!')
  } catch (error) {
    console.error('❌ Error importing guides:', error.message)
    process.exit(1)
  }
}

importGuides()

