/**
 * Import Experiences Script
 * Imports all experiences into Sanity
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
import { parseExperiences } from './parsers/experiences-parser.js'

async function importExperiences() {
  console.log('🌟 Starting experiences import...\n')

  try {
    const client = getSanityClient()
    const experiences = parseExperiences()

    console.log(`📦 Found ${experiences.length} experiences to import\n`)

    await createDocuments(client, 'experience', experiences, 500)

    console.log('\n✅ Experiences import complete!')
  } catch (error) {
    console.error('❌ Error importing experiences:', error.message)
    process.exit(1)
  }
}

importExperiences()

