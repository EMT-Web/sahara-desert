/**
 * Import Tours Script
 * Imports all tours from all 5 departure cities into Sanity
 *
 * Usage: node scripts/import-tours.mjs
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'
import { createDocuments } from './utils/content-helpers.mjs'
import { parseMarrakechTours } from './parsers/tours-marrakech.js'
import { parseFesTours } from './parsers/tours-fes.js'
import { parseErrachidiaTours } from './parsers/tours-errachidia.mjs'
import { toursFromAgadir } from './parsers/tours-agadir.mjs'
import { toursFromCasablanca } from './parsers/tours-casablanca.mjs'

function transformCityTours(tours, city) {
  return tours.map(tour => ({
    title: tour.title,
    slug: { current: typeof tour.slug === 'string' ? tour.slug : tour.slug?.current || tour.slug },
    departureCity: city,
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

async function importTours() {
  console.log('🚀 Starting tours import for all cities...\n')

  try {
    const client = getSanityClient()

    const cities = [
      { name: 'Marrakech', tours: parseMarrakechTours(), transform: false },
      { name: 'Fes',       tours: parseFesTours(),       transform: false },
      { name: 'Errachidia',tours: parseErrachidiaTours(),transform: false },
      { name: 'Agadir',    tours: toursFromAgadir,       transform: true, city: 'agadir' },
      { name: 'Casablanca',tours: toursFromCasablanca,   transform: true, city: 'casablanca' },
    ]

    let total = 0
    for (const { name, tours, transform, city } of cities) {
      console.log(`📦 Importing tours from ${name}...`)
      const prepared = transform ? transformCityTours(tours, city) : tours
      await createDocuments(client, 'tour', prepared, 400)
      console.log(`✅ ${prepared.length} tours from ${name}\n`)
      total += prepared.length
    }

    console.log(`\n✅ All tours imported successfully!`)
    console.log(`📊 Total: ${total} tours across 5 cities`)
    console.log('\n⚠️  Remember to PUBLISH all tours in Sanity Studio for them to appear on the site.')
    console.log('   Then run: node scripts/import-images.mjs  ← assigns images to tours')
  } catch (error) {
    console.error('❌ Error importing tours:', error.message)
    if (error.message.includes('SANITY_API_TOKEN')) {
      console.log('\n📝 To get a token:')
      console.log('1. Go to https://sanity.io/manage')
      console.log('2. Select your project → API → Tokens')
      console.log('3. Create a token with Editor permissions')
      console.log('4. Add to .env.local: SANITY_API_TOKEN=your-token-here')
    }
    process.exit(1)
  }
}

importTours()
