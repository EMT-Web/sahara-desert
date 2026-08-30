/**
 * Cleanup Duplicate Guides Script
 * Removes duplicate guide documents, keeping only one per guide name
 * Prefers guides with profileImage, or most recent if both have images
 * 
 * Usage: node scripts/cleanup-duplicate-guides.mjs
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Load .env.local file first
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'

async function cleanupDuplicates() {
  console.log('🧹 Starting duplicate guides cleanup...\n')

  const client = getSanityClient()

  try {
    // Fetch all guides (including drafts to see what we have)
    const allGuides = await client.fetch(`
      *[_type == "guide"] | order(_createdAt desc){
        _id,
        name,
        profileImage,
        _createdAt
      }
    `)

    console.log(`📦 Found ${allGuides.length} total guide documents\n`)

    // Group guides by name (case-insensitive)
    const guidesByName = {}
    for (const guide of allGuides) {
      const nameKey = guide.name?.toLowerCase().trim()
      if (!nameKey) continue

      if (!guidesByName[nameKey]) {
        guidesByName[nameKey] = []
      }
      guidesByName[nameKey].push(guide)
    }

    // Find duplicates and decide which to keep
    const toDelete = []
    const toKeep = []

    for (const [nameKey, guides] of Object.entries(guidesByName)) {
      if (guides.length === 1) {
        // Only one guide with this name, keep it
        toKeep.push(guides[0])
        console.log(`✅ ${guides[0].name}: Only one document, keeping it`)
        continue
      }

      // Multiple guides with same name - need to pick one
      console.log(`\n⚠️  ${guides[0].name}: Found ${guides.length} duplicate documents`)

      // Sort: prefer published over drafts, then prefer ones with images, then most recent
      guides.sort((a, b) => {
        // Published first
        const aIsDraft = a._id.startsWith('drafts.')
        const bIsDraft = b._id.startsWith('drafts.')
        if (aIsDraft !== bIsDraft) return aIsDraft ? 1 : -1

        // Has image first
        const aHasImage = !!a.profileImage
        const bHasImage = !!b.profileImage
        if (aHasImage !== bHasImage) return aHasImage ? -1 : 1

        // Most recent first
        return new Date(b._createdAt) - new Date(a._createdAt)
      })

      // Keep the first one (best candidate)
      const keepGuide = guides[0]
      toKeep.push(keepGuide)
      console.log(`   ✅ Keeping: ${keepGuide._id} (has image: ${!!keepGuide.profileImage}, published: ${!keepGuide._id.startsWith('drafts.')})`)

      // Mark others for deletion
      for (let i = 1; i < guides.length; i++) {
        toDelete.push(guides[i])
        console.log(`   ❌ Deleting: ${guides[i]._id} (has image: ${!!guides[i].profileImage}, published: ${!guides[i]._id.startsWith('drafts.')})`)
      }
    }

    console.log(`\n📊 Summary:`)
    console.log(`   ✅ Keeping: ${toKeep.length} guides`)
    console.log(`   ❌ Deleting: ${toDelete.length} duplicate guides\n`)

    if (toDelete.length === 0) {
      console.log('✨ No duplicates found! All guides are unique.\n')
      return
    }

    // Delete duplicates
    console.log('🗑️  Deleting duplicate guides...\n')
    for (const guide of toDelete) {
      try {
        await client.delete(guide._id)
        console.log(`   ✅ Deleted: ${guide._id} (${guide.name})`)
      } catch (error) {
        console.error(`   ❌ Error deleting ${guide._id}:`, error.message)
      }
    }

    console.log(`\n✨ Cleanup complete!`)
    console.log(`   ${toKeep.length} unique guides remaining`)
    console.log(`   ${toDelete.length} duplicates removed\n`)

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message)
    process.exit(1)
  }
}

cleanupDuplicates()

