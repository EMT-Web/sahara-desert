import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'
import { createDocuments } from './utils/content-helpers.mjs'
import { toursFromCasablanca } from './parsers/tours-casablanca.mjs'

function transformTours(tours) {
  return tours.map(tour => ({
    title: tour.title,
    slug: { current: typeof tour.slug === 'string' ? tour.slug : tour.slug?.current || tour.slug },
    departureCity: 'casablanca',
    duration: tour.duration?.split(' / ')[0] || tour.duration || '',
    excerpt: tour.excerpt || '',
    body: tour.body || tour.itinerary?.map(item => `${item.day}: ${item.title}\n${item.description || ''}`).join('\n\n') || '',
    included: tour.included || tour.inclusions || [],
    notIncluded: tour.notIncluded || tour.exclusions || [],
    itinerary: tour.itinerary?.map(item => ({
      day: item.day || '',
      title: item.title || '',
      description: item.description || '',
      overnight: item.overnight || ''
    })) || [],
    focusAreas: tour.focusAreas || [],
    seoKeywords: Array.isArray(tour.seoKeywords) ? tour.seoKeywords.join(', ') : (tour.seoKeywords || ''),
    publishedAt: tour.publishedAt || new Date().toISOString()
  }))
}

async function importCasablancaTours() {
  console.log('🚀 Starting Casablanca tours import...\n')

  try {
    const client = getSanityClient()

    console.log('📦 Importing tours from Casablanca...\n')
    const transformedTours = transformTours(toursFromCasablanca)
    await createDocuments(client, 'tour', transformedTours, 500)
    console.log(`✅ Imported ${transformedTours.length} tours from Casablanca\n`)

    console.log('✅ Casablanca tours import complete!')
    console.log(`\n📊 Summary: ${transformedTours.length} tours imported`)
  } catch (error) {
    console.error('❌ Error importing Casablanca tours:', error.message)
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

importCasablancaTours()
