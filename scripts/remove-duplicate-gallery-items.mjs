/**
 * Remove Duplicate Gallery Items Script
 * --------------------------------------
 * Removes duplicate gallery items from Sanity.
 * Identifies duplicates by image asset reference.
 * 
 * Usage:
 *   node scripts/remove-duplicate-gallery-items.mjs
 */

import { getSanityClient } from './utils/sanity-client.mjs'

// Helper: small sleep between API calls
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function removeDuplicates() {
  console.log('🔍 Starting duplicate gallery items removal...\n')

  const client = getSanityClient()

  try {
    // Fetch all gallery items (including drafts)
    const allItems = await client.fetch(
      `*[_type == "galleryItem"] {
        _id,
        _createdAt,
        title,
        "imageAsset": image.asset._ref
      } | order(_createdAt asc)`
    )

    if (!allItems || allItems.length === 0) {
      console.log('⚠️  No gallery items found.')
      return
    }

    console.log(`📦 Found ${allItems.length} gallery items\n`)

    // Group items by image asset reference
    const itemsByAsset = {}
    for (const item of allItems) {
      if (item.imageAsset) {
        if (!itemsByAsset[item.imageAsset]) {
          itemsByAsset[item.imageAsset] = []
        }
        itemsByAsset[item.imageAsset].push(item)
      }
    }

    // Find duplicates (items with same image asset)
    const duplicates = []
    const toKeep = new Set()

    for (const [assetId, items] of Object.entries(itemsByAsset)) {
      if (items.length > 1) {
        // Sort by creation date, keep the oldest one
        items.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt))
        
        // Keep the first one (oldest)
        toKeep.add(items[0]._id)
        
        // Mark the rest as duplicates
        for (let i = 1; i < items.length; i++) {
          duplicates.push(items[i])
        }
      } else {
        // Only one item with this asset, keep it
        toKeep.add(items[0]._id)
      }
    }

    if (duplicates.length === 0) {
      console.log('✅ No duplicates found!')
      return
    }

    console.log(`🔍 Found ${duplicates.length} duplicate items to remove\n`)

    // Remove duplicates
    let removedCount = 0
    for (const duplicate of duplicates) {
      try {
        // Check if it's a draft
        const isDraft = duplicate._id.startsWith('drafts.')
        
        if (isDraft) {
          // Delete draft
          await client.delete(duplicate._id)
          console.log(`  ✅ Removed draft: ${duplicate.title || duplicate._id}`)
        } else {
          // Delete published version
          await client.delete(duplicate._id)
          console.log(`  ✅ Removed: ${duplicate.title || duplicate._id}`)
        }
        
        removedCount++
        await sleep(200) // Small delay between deletions
      } catch (error) {
        console.error(`  ❌ Error removing "${duplicate._id}":`, error.message)
      }
    }

    console.log('\n✨ Duplicate removal complete!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Total items found: ${allItems.length}`)
    console.log(`   - Duplicates removed: ${removedCount}`)
    console.log(`   - Items remaining: ${allItems.length - removedCount}`)
    console.log(`\n✅ Gallery is now clean!`)
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

removeDuplicates()

