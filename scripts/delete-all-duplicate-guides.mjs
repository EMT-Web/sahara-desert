/**
 * Delete All Duplicate Guides Script
 * Aggressively removes ALL duplicate guides, keeping only ONE per name
 * Deletes both published and draft duplicates
 * 
 * Usage: node scripts/delete-all-duplicate-guides.mjs
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Load .env.local file first
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'

async function deleteAllDuplicates() {
  console.log('🧹 Aggressively cleaning ALL duplicate guides...\n')

  const client = getSanityClient()

  try {
    // Fetch ALL guides (published and drafts)
    const allGuides = await client.fetch(`
      *[_type == "guide"] | order(name asc, _createdAt desc){
        _id,
        name,
        profileImage,
        _createdAt
      }
    `)

    console.log(`📦 Found ${allGuides.length} total guide documents\n`)

    // Group by name (case-insensitive)
    const guidesByName = {}
    for (const guide of allGuides) {
      const nameKey = (guide.name || 'unnamed').toLowerCase().trim()
      if (!guidesByName[nameKey]) {
        guidesByName[nameKey] = []
      }
      guidesByName[nameKey].push(guide)
    }

    const toDelete = []
    const toKeep = []

    for (const [nameKey, guides] of Object.entries(guidesByName)) {
      const displayName = guides[0].name || 'Unnamed'
      
      if (guides.length === 1) {
        toKeep.push(guides[0])
        console.log(`✅ ${displayName}: Only one document, keeping it`)
        continue
      }

      // Multiple guides - pick the best one
      console.log(`\n⚠️  ${displayName}: Found ${guides.length} documents`)

      // Sort: published first, then has image, then most recent
      guides.sort((a, b) => {
        const aIsDraft = a._id.startsWith('drafts.')
        const bIsDraft = b._id.startsWith('drafts.')
        if (aIsDraft !== bIsDraft) return aIsDraft ? 1 : -1

        const aHasImage = !!a.profileImage
        const bHasImage = !!b.profileImage
        if (aHasImage !== bHasImage) return aHasImage ? -1 : 1

        return new Date(b._createdAt) - new Date(a._createdAt)
      })

      const keepGuide = guides[0]
      toKeep.push(keepGuide)
      const isDraft = keepGuide._id.startsWith('drafts.')
      console.log(`   ✅ Keeping: ${keepGuide._id} (${isDraft ? 'DRAFT' : 'PUBLISHED'}, has image: ${!!keepGuide.profileImage})`)

      // Delete ALL others
      for (let i = 1; i < guides.length; i++) {
        toDelete.push(guides[i])
        const delIsDraft = guides[i]._id.startsWith('drafts.')
        console.log(`   ❌ Deleting: ${guides[i]._id} (${delIsDraft ? 'DRAFT' : 'PUBLISHED'}, has image: ${!!guides[i].profileImage})`)
      }
    }

    console.log(`\n📊 Summary:`)
    console.log(`   ✅ Keeping: ${toKeep.length} guides`)
    console.log(`   ❌ Deleting: ${toDelete.length} duplicates\n`)

    if (toDelete.length === 0) {
      console.log('✨ No duplicates found!\n')
      return
    }

    // Delete all duplicates
    console.log('🗑️  Deleting all duplicate guides...\n')
    let deleted = 0
    let errors = 0

    for (const guide of toDelete) {
      try {
        await client.delete(guide._id)
        deleted++
        console.log(`   ✅ Deleted: ${guide._id} (${guide.name})`)
      } catch (error) {
        errors++
        console.error(`   ❌ Error deleting ${guide._id}:`, error.message)
      }
    }

    console.log(`\n✨ Cleanup complete!`)
    console.log(`   ✅ ${toKeep.length} unique guides remaining`)
    console.log(`   🗑️  ${deleted} duplicates deleted`)
    if (errors > 0) {
      console.log(`   ⚠️  ${errors} errors occurred`)
    }
    console.log('')

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message)
    process.exit(1)
  }
}

deleteAllDuplicates()

