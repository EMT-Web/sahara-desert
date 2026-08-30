/**
 * Remove Duplicate Tours Script
 * ------------------------------
 * Removes duplicate tours from Sanity.
 * Identifies duplicates by slug (current value).
 * Keeps the oldest version of each tour.
 * 
 * Usage:
 *   node scripts/remove-duplicate-tours.mjs
 */

import { getSanityClient } from './utils/sanity-client.mjs'

// Helper: small sleep between API calls
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function removeDuplicateTours() {
  console.log('🔍 Starting duplicate tours removal...\n')

  const client = getSanityClient()

  try {
    // Fetch all tours (including drafts)
    const allTours = await client.fetch(
      `*[_type == "tour"] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        departureCity
      } | order(_createdAt asc)`
    )

    if (!allTours || allTours.length === 0) {
      console.log('⚠️  No tours found.')
      return
    }

    console.log(`📦 Found ${allTours.length} tours\n`)

    // Group tours by slug
    const toursBySlug = {}
    for (const tour of allTours) {
      if (tour.slug) {
        if (!toursBySlug[tour.slug]) {
          toursBySlug[tour.slug] = []
        }
        toursBySlug[tour.slug].push(tour)
      }
    }

    // Find duplicates (tours with same slug)
    const duplicates = []
    const toKeep = new Set()

    for (const [slug, tours] of Object.entries(toursBySlug)) {
      if (tours.length > 1) {
        // Sort by creation date, keep the oldest one
        tours.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt))
        
        // Keep the first one (oldest)
        toKeep.add(tours[0]._id)
        console.log(`  📌 Keeping: "${tours[0].title}" (${tours[0].departureCity || 'N/A'}) - Created: ${new Date(tours[0]._createdAt).toLocaleDateString()}`)
        
        // Mark the rest as duplicates
        for (let i = 1; i < tours.length; i++) {
          duplicates.push(tours[i])
          console.log(`  🗑️  Marked for removal: "${tours[i].title}" (${tours[i].departureCity || 'N/A'}) - Created: ${new Date(tours[i]._createdAt).toLocaleDateString()}`)
        }
      } else {
        // Only one tour with this slug, keep it
        toKeep.add(tours[0]._id)
      }
    }

    if (duplicates.length === 0) {
      console.log('\n✅ No duplicates found!')
      return
    }

    console.log(`\n🔍 Found ${duplicates.length} duplicate tours to remove\n`)

    // Group duplicates by city for summary
    const duplicatesByCity = {}
    for (const dup of duplicates) {
      const city = dup.departureCity || 'unknown'
      if (!duplicatesByCity[city]) {
        duplicatesByCity[city] = []
      }
      duplicatesByCity[city].push(dup)
    }

    console.log('📊 Duplicates by city:')
    for (const [city, cityDups] of Object.entries(duplicatesByCity)) {
      console.log(`   - ${city}: ${cityDups.length} duplicates`)
    }
    console.log('')

    // Remove duplicates
    let removedCount = 0
    for (const duplicate of duplicates) {
      try {
        // Check if it's a draft
        const isDraft = duplicate._id.startsWith('drafts.')
        
        if (isDraft) {
          // Delete draft
          await client.delete(duplicate._id)
          console.log(`  ✅ Removed draft: "${duplicate.title}" (${duplicate.slug})`)
        } else {
          // Delete published version
          await client.delete(duplicate._id)
          console.log(`  ✅ Removed: "${duplicate.title}" (${duplicate.slug})`)
        }
        
        removedCount++
        await sleep(200) // Small delay between deletions
      } catch (error) {
        console.error(`  ❌ Error removing "${duplicate._id}":`, error.message)
      }
    }

    console.log('\n✨ Duplicate removal complete!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Total tours found: ${allTours.length}`)
    console.log(`   - Duplicates removed: ${removedCount}`)
    console.log(`   - Unique tours remaining: ${allTours.length - removedCount}`)
    
    // Show breakdown by city
    const remainingByCity = {}
    for (const tour of allTours) {
      if (!duplicates.find(d => d._id === tour._id)) {
        const city = tour.departureCity || 'unknown'
        remainingByCity[city] = (remainingByCity[city] || 0) + 1
      }
    }
    
    console.log(`\n📈 Remaining tours by city:`)
    for (const [city, count] of Object.entries(remainingByCity)) {
      console.log(`   - ${city}: ${count} tours`)
    }
    
    console.log(`\n✅ All duplicates removed!`)
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

removeDuplicateTours()

