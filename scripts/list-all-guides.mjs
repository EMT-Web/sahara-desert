/**
 * List All Guides Script
 * Shows all guide documents (published and drafts) to help debug duplicates
 * 
 * Usage: node scripts/list-all-guides.mjs
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Load .env.local file first
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'

async function listAllGuides() {
  console.log('📋 Listing all guide documents...\n')

  const client = getSanityClient()

  try {
    // Fetch ALL guides (published and drafts)
    const allGuides = await client.fetch(`
      *[_type == "guide"] | order(name asc, _createdAt desc){
        _id,
        name,
        hasImage: defined(profileImage),
        _createdAt,
        isDraft: _id match "drafts.*"
      }
    `)

    console.log(`📦 Total guides found: ${allGuides.length}\n`)

    // Group by name
    const byName = {}
    for (const guide of allGuides) {
      const name = guide.name?.toLowerCase().trim() || 'unnamed'
      if (!byName[name]) {
        byName[name] = []
      }
      byName[name].push(guide)
    }

    // Show grouped results
    for (const [nameKey, guides] of Object.entries(byName)) {
      const displayName = guides[0].name || 'Unnamed'
      if (guides.length > 1) {
        console.log(`⚠️  ${displayName}: ${guides.length} documents`)
      } else {
        console.log(`✅ ${displayName}: 1 document`)
      }
      
      for (const guide of guides) {
        const status = guide.isDraft ? 'DRAFT' : 'PUBLISHED'
        const imageStatus = guide.hasImage ? '📸' : '❌'
        console.log(`   ${imageStatus} ${status}: ${guide._id}`)
      }
      console.log('')
    }

    console.log(`\n📊 Summary:`)
    console.log(`   Total documents: ${allGuides.length}`)
    console.log(`   Unique names: ${Object.keys(byName).length}`)
    console.log(`   Duplicates: ${allGuides.length - Object.keys(byName).length}`)

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

listAllGuides()

