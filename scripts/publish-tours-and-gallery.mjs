/**
 * Publish Tours and Gallery Items Script
 * --------------------------------------
 * Publishes all tours and gallery items in Sanity.
 * 
 * Usage:
 *   node scripts/publish-tours-and-gallery.mjs
 */

import { getSanityClient } from './utils/sanity-client.mjs'

// Helper: small sleep between API calls
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function publishAllTours(client) {
  try {
    // Fetch all tours (including drafts)
    const tours = await client.fetch(
      `*[_type == "tour"] | order(_createdAt desc)`
    )

    if (!tours || tours.length === 0) {
      console.log('⚠️  No tours found.')
      return 0
    }

    console.log(`📦 Found ${tours.length} tours to publish...\n`)

    let publishedCount = 0
    for (const tour of tours) {
      try {
        await client.patch(tour._id).publish()
        console.log(`  ✅ Published: ${tour.title || tour.slug?.current || 'Untitled'}`)
        publishedCount++
        await sleep(200) // Small delay between publishes
      } catch (error) {
        console.error(`  ❌ Error publishing tour "${tour._id}":`, error.message)
      }
    }

    return publishedCount
  } catch (error) {
    console.error('❌ Error fetching tours:', error.message)
    return 0
  }
}

async function publishAllGalleryItems(client) {
  try {
    // Fetch all gallery items (including drafts)
    const items = await client.fetch(
      `*[_type == "galleryItem"] | order(_createdAt desc)`
    )

    if (!items || items.length === 0) {
      console.log('⚠️  No gallery items found.')
      return 0
    }

    console.log(`📦 Found ${items.length} gallery items to publish...\n`)

    let publishedCount = 0
    for (const item of items) {
      try {
        await client.patch(item._id).publish()
        console.log(`  ✅ Published: ${item.title || 'Untitled'}`)
        publishedCount++
        await sleep(200) // Small delay between publishes
      } catch (error) {
        console.error(`  ❌ Error publishing gallery item "${item._id}":`, error.message)
      }
    }

    return publishedCount
  } catch (error) {
    console.error('❌ Error fetching gallery items:', error.message)
    return 0
  }
}

async function run() {
  console.log('🚀 Starting publish process...\n')

  const client = getSanityClient()

  // Publish tours
  console.log('📸 Publishing tours...\n')
  const toursPublished = await publishAllTours(client)

  // Publish gallery items
  console.log('\n🖼️  Publishing gallery items...\n')
  const galleryPublished = await publishAllGalleryItems(client)

  console.log('\n✨ Publish process complete!')
  console.log(`\n📊 Summary:`)
  console.log(`   - Tours published: ${toursPublished}`)
  console.log(`   - Gallery items published: ${galleryPublished}`)
  console.log(`\n✅ All content is now live on your website!`)
}

run().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})

