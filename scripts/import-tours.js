/**
 * Import Tours Script
 * Imports all tours from all cities into Sanity
 * 
 * Usage: node scripts/import-tours.js
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
import { parseMarrakechTours } from './parsers/tours-marrakech.js'
import { parseFesTours } from './parsers/tours-fes.js'

async function importTours() {
  console.log('🚀 Starting tours import...\n')

  try {
    const client = getSanityClient()

    // Import Marrakech tours
    console.log('📦 Importing tours from Marrakech...\n')
    const marrakechTours = parseMarrakechTours()
    await createDocuments(client, 'tour', marrakechTours, 500)
    console.log(`✅ Imported ${marrakechTours.length} tours from Marrakech\n`)

    // Import Fes tours
    console.log('📦 Importing tours from Fes...\n')
    const fesTours = parseFesTours()
    await createDocuments(client, 'tour', fesTours, 500)
    console.log(`✅ Imported ${fesTours.length} tours from Fes\n`)

    // TODO: Add other cities (Errachidia, Casablanca, Agadir) in separate files
    // For now, we have 10 tours imported (5 from Marrakech + 5 from Fes)

    console.log('✅ Tours import complete!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Marrakech tours: ${marrakechTours.length}`)
    console.log(`   - Fes tours: ${fesTours.length}`)
    console.log(`   - Total: ${marrakechTours.length + fesTours.length} tours`)
    console.log('\n📝 Note: More tours from other cities can be added later')
  } catch (error) {
    console.error('❌ Error importing tours:', error.message)
    if (error.message.includes('SANITY_API_TOKEN')) {
      console.log('\n📝 To get a token:')
      console.log('1. Go to https://sanity.io/manage')
      console.log('2. Select your project')
      console.log('3. Go to API → Tokens')
      console.log('4. Create a new token with Editor permissions')
      console.log('5. Add it to .env.local: SANITY_API_TOKEN=your-token-here')
    }
    process.exit(1)
  }
}

importTours()

