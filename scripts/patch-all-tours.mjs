/**
 * Patch All Tours Script
 * ----------------------
 * Fixes existing Sanity tours that are missing excerpt, body, included/notIncluded,
 * or mainImage. Matches tours by slug to the parser data and patches each one.
 *
 * Usage: node scripts/patch-all-tours.mjs
 *
 * Prerequisites:
 *   - SANITY_API_TOKEN in .env.local (Editor permissions)
 *   - Run after tours have been imported
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'
import { parseMarrakechTours } from './parsers/tours-marrakech.js'
import { parseFesTours } from './parsers/tours-fes.js'
import { parseErrachidiaTours } from './parsers/tours-errachidia.mjs'
import { toursFromAgadir } from './parsers/tours-agadir.mjs'
import { toursFromCasablanca } from './parsers/tours-casablanca.mjs'

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// Normalize a tour from any parser into a consistent shape
function normalize(tour, city) {
  const slug = typeof tour.slug === 'string'
    ? tour.slug
    : tour.slug?.current || ''

  return {
    slug,
    departureCity: city || tour.departureCity || '',
    excerpt: tour.excerpt || '',
    body: tour.body || tour.itinerary?.map(
      item => `${item.day}: ${item.title}\n${item.description || ''}`
    ).join('\n\n') || '',
    included: tour.included || tour.inclusions || [],
    notIncluded: tour.notIncluded || tour.exclusions || [],
    itinerary: (tour.itinerary || []).map(item => ({
      day: item.day || '',
      title: item.title || '',
      description: item.description || '',
      overnight: item.overnight || '',
    })),
    focusAreas: tour.focusAreas || [],
    seoKeywords: Array.isArray(tour.seoKeywords)
      ? tour.seoKeywords.join(', ')
      : (tour.seoKeywords || ''),
  }
}

// Build a slug → data map from all parsers
function buildParserMap() {
  const map = new Map()

  const sources = [
    ...parseMarrakechTours().map(t => normalize(t, 'marrakech')),
    ...parseFesTours().map(t => normalize(t, 'fes')),
    ...parseErrachidiaTours().map(t => normalize(t, 'errachidia')),
    ...toursFromAgadir.map(t => normalize(t, 'agadir')),
    ...toursFromCasablanca.map(t => normalize(t, 'casablanca')),
  ]

  for (const tour of sources) {
    if (tour.slug) map.set(tour.slug, tour)
  }

  return map
}

async function run() {
  console.log('🔧 Patching all tours in Sanity...\n')

  const client = getSanityClient()
  const parserMap = buildParserMap()

  console.log(`📚 Loaded ${parserMap.size} tours from parsers`)

  // Fetch all published tours from Sanity
  const sanityTours = await client.fetch(`
    *[_type == "tour" && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) asc) {
      _id,
      title,
      slug,
      departureCity,
      excerpt,
      body,
      included,
      notIncluded,
      mainImage,
      itinerary,
    }
  `)

  console.log(`📦 Found ${sanityTours.length} published tours in Sanity\n`)

  // Also fetch draft tours so we can patch them too
  const draftTours = await client.fetch(`
    *[_type == "tour" && _id in path("drafts.**")] | order(coalesce(publishedAt, _createdAt) asc) {
      _id,
      title,
      slug,
      departureCity,
      excerpt,
      body,
      included,
      notIncluded,
      mainImage,
      itinerary,
    }
  `)

  console.log(`📝 Found ${draftTours.length} draft tours in Sanity\n`)

  const allTours = [...sanityTours, ...draftTours]

  // Fetch available image assets to assign to tours without mainImage
  const imageAssets = await client.fetch(`
    *[_type == "sanity.imageAsset"] | order(_createdAt asc) {
      _id,
      originalFilename
    }
  `)

  console.log(`🖼  Found ${imageAssets.length} image assets in Sanity\n`)

  // Filter assets that look like desert/travel images (not guide portraits)
  const portraitNames = ['mustafa', 'ahmad', 'youssef', 'said', 'abdul', 'hsayn', 'anwar']
  const tourImageAssets = imageAssets.filter(asset => {
    const name = (asset.originalFilename || '').toLowerCase()
    return !portraitNames.some(p => name.includes(p))
  })

  let patched = 0
  let skipped = 0
  let noMatch = 0
  let imageIdx = 0

  for (const tour of allTours) {
    const slug = tour.slug?.current || ''
    const parserData = parserMap.get(slug)

    const needsExcerpt = !tour.excerpt || tour.excerpt.trim() === ''
    const needsBody = !tour.body || tour.body.trim() === ''
    const needsIncluded = !tour.included || tour.included.length === 0
    const needsNotIncluded = !tour.notIncluded || tour.notIncluded.length === 0
    const needsImage = !tour.mainImage || !tour.mainImage.asset || !tour.mainImage.asset._ref

    if (!needsExcerpt && !needsBody && !needsIncluded && !needsNotIncluded && !needsImage) {
      console.log(`   ✓ "${tour.title}" — complete, skipping`)
      skipped++
      continue
    }

    const patch = {}

    if (parserData) {
      if (needsExcerpt && parserData.excerpt)       patch.excerpt       = parserData.excerpt
      if (needsBody && parserData.body)             patch.body          = parserData.body
      if (needsIncluded && parserData.included?.length > 0)
                                                     patch.included      = parserData.included
      if (needsNotIncluded && parserData.notIncluded?.length > 0)
                                                     patch.notIncluded   = parserData.notIncluded
      if (!tour.departureCity && parserData.departureCity)
                                                     patch.departureCity = parserData.departureCity
    } else {
      // No parser match — generate excerpt from itinerary if possible
      if (needsExcerpt && tour.itinerary?.length > 0) {
        patch.excerpt = `Experience this ${tour.title.toLowerCase()} with expert Berber guides, camel trekking, and authentic Sahara Desert adventures.`
      }
      noMatch++
    }

    // Assign image from Sanity assets if tour has none
    if (needsImage && tourImageAssets.length > 0) {
      const asset = tourImageAssets[imageIdx % tourImageAssets.length]
      imageIdx++
      patch.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      }
    }

    if (Object.keys(patch).length === 0) {
      skipped++
      continue
    }

    try {
      await client.patch(tour._id).set(patch).commit()
      const fields = Object.keys(patch).join(', ')
      console.log(`✅ Patched "${tour.title}" — updated: ${fields}`)
      patched++
    } catch (err) {
      console.error(`❌ Failed to patch "${tour.title}": ${err.message}`)
    }

    await sleep(300)
  }

  console.log('\n─────────────────────────────────────')
  console.log(`✅ Done. ${patched} tours patched, ${skipped} already complete, ${noMatch} had no parser match.`)
  if (patched > 0) {
    console.log('\n⚠️  Patched documents may still be drafts. Publish them in Sanity Studio to make them live.')
    console.log('   Or run: node scripts/publish-tours-and-gallery.mjs')
  }
}

run().catch(err => {
  console.error('❌ Unexpected error:', err)
  process.exit(1)
})
