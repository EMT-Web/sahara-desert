/**
 * Import All Content Script
 * Main script that imports everything
 * 
 * Usage: node scripts/import-all.js
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
import { parseExperiences } from './parsers/experiences-parser.js'
import { parseDestinations } from './parsers/destinations-parser.js'

async function importAll() {
  console.log('🚀 Starting bulk content import...\n')
  console.log('This will import:')
  console.log('  - 6 Guides')
  console.log('  - 8 Experiences')
  console.log('  - 10 Destinations')
  console.log('\n⚠️  Note: Tours will be imported separately (see import-tours.js)\n')

  try {
    const client = getSanityClient()

    // Import guides
    console.log('👥 Importing guides...\n')
    const guides = parseGuides()
    await createDocuments(client, 'guide', guides, 500)
    console.log('✅ Guides imported!\n')

    // Import experiences
    console.log('🌟 Importing experiences...\n')
    const experiences = parseExperiences()
    await createDocuments(client, 'experience', experiences, 500)
    console.log('✅ Experiences imported!\n')

    // Import destinations
    console.log('📍 Importing destinations...\n')
    const destinations = parseDestinations()
    await createDocuments(client, 'destination', destinations, 500)
    console.log('✅ Destinations imported!\n')

    console.log('✅ All content import complete!')
    console.log('\n📝 Next steps:')
    console.log('  1. Run: node scripts/import-tours.js (to import all tours - coming soon)')
    console.log('  2. Upload images in Sanity Studio')
    console.log('  3. Review and adjust content if needed')
  } catch (error) {
    console.error('❌ Error during import:', error.message)
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

importAll()

