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
    // Fetch all tours (including drafts) - get both published and draft versions
    const allTours = await client.fetch(
      `*[_type == "tour"] | order(_createdAt desc)`
    )

    if (!allTours || allTours.length === 0) {
      console.log('⚠️  No tours found.')
      return 0
    }

    console.log(`📦 Found ${allTours.length} tours to check...\n`)

    let publishedCount = 0
    const processedIds = new Set()

    for (const tour of allTours) {
      // Skip if we've already processed this ID (avoid processing both draft and published)
      const baseId = tour._id.replace('drafts.', '')
      if (processedIds.has(baseId)) {
        continue
      }
      processedIds.add(baseId)

      try {
        // Check if it's a draft
        const isDraft = tour._id.startsWith('drafts.')
        const publishedId = isDraft ? tour._id.replace('drafts.', '') : tour._id

        if (isDraft) {
          // Copy draft to published version
          const { _id, _rev, ...docData } = tour
          await client.createOrReplace({
            ...docData,
            _id: publishedId,
          })
          console.log(`  ✅ Published: ${tour.title || tour.slug?.current || 'Untitled'}`)
          publishedCount++
        } else {
          // Already published, just ensure it exists
          console.log(`  ℹ️  Already published: ${tour.title || tour.slug?.current || 'Untitled'}`)
          publishedCount++
        }
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
    const allItems = await client.fetch(
      `*[_type == "galleryItem"] | order(_createdAt desc)`
    )

    if (!allItems || allItems.length === 0) {
      console.log('⚠️  No gallery items found.')
      return 0
    }

    console.log(`📦 Found ${allItems.length} gallery items to check...\n`)

    let publishedCount = 0
    const processedIds = new Set()

    for (const item of allItems) {
      // Skip if we've already processed this ID
      const baseId = item._id.replace('drafts.', '')
      if (processedIds.has(baseId)) {
        continue
      }
      processedIds.add(baseId)

      try {
        // Check if it's a draft
        const isDraft = item._id.startsWith('drafts.')
        const publishedId = isDraft ? item._id.replace('drafts.', '') : item._id

        if (isDraft) {
          // Copy draft to published version
          const { _id, _rev, ...docData } = item
          await client.createOrReplace({
            ...docData,
            _id: publishedId,
          })
          console.log(`  ✅ Published: ${item.title || 'Untitled'}`)
          publishedCount++
        } else {
          // Already published
          console.log(`  ℹ️  Already published: ${item.title || 'Untitled'}`)
          publishedCount++
        }
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

