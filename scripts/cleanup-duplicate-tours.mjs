/**
 * Deletes 26 duplicate/broken tour documents identified by scan-duplicate-tours.mjs.
 * - 25 newer copies all created 2026-05-20 (re-import duplicates of 2025 originals)
 * - 1 broken-slug Agadir copy (slug had a space instead of hyphen)
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-11-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const TO_DELETE = [
  // --- Marrakech duplicates (2026-05-20) ---
  { id: 'dxwzgBoWQavI6yhGiBHa9z', label: '3 Days Marrakech to Merzouga' },
  { id: 'dxwzgBoWQavI6yhGiBHaIJ', label: '4 Days Atlas Mountains & Sahara from Marrakech' },
  { id: 'O4505RdNaSikVebRwUMP4b', label: '5 Days Marrakech to Erg Chigaga' },
  { id: 'O4505RdNaSikVebRwUMP6z', label: '7 Days Grand Sahara from Marrakech' },
  { id: 'O4505RdNaSikVebRwUMP9N', label: '10 Days Ultimate Morocco from Marrakech' },
  // --- Fes duplicates (2026-05-20) ---
  { id: 'ApnQUSenpum1vRtsuIgjyv', label: '2 Days Fes to Merzouga Express' },
  { id: 'dxwzgBoWQavI6yhGiBHaQd', label: '3 Days Sahara from Fes to Merzouga' },
  { id: 'dxwzgBoWQavI6yhGiBHaYx', label: '4 Days Fes to Sahara via Ziz Valley' },
  { id: 'dxwzgBoWQavI6yhGiBHahH', label: '6 Days Middle Atlas & Sahara from Fes' },
  { id: 'O4505RdNaSikVebRwUMPDY', label: '8 Days Desert & Imperial Cities from Fes' },
  // --- Errachidia duplicates (2026-05-20) ---
  { id: 'dxwzgBoWQavI6yhGiBHapb', label: '2 Day Sahara from Errachidia' },
  { id: 'dxwzgBoWQavI6yhGiBHb00', label: '3-Day Errachidia to Marrakech' },
  { id: 'ApnQUSenpum1vRtsuIgllD', label: '3-Day Errachidia to Fes' },
  { id: 'O4505RdNaSikVebRwUMPK7', label: '4-Day Errachidia to Marrakech' },
  { id: 'dxwzgBoWQavI6yhGiBHbGe', label: '5-Day Errachidia to Marrakech' },
  { id: 'O4505RdNaSikVebRwUMPRs', label: '5-Day Sahara Trekking from Errachidia' },
  // --- Casablanca duplicates (2026-05-20) ---
  { id: 'O4505RdNaSikVebRwUMPdo', label: '8-Day Imperial Cities & Sahara from Casablanca' },
  { id: 'ApnQUSenpum1vRtsuIgoQe', label: '8-Day Imperial Cities, Chefchaouen & Sahara from Casablanca' },
  { id: 'ApnQUSenpum1vRtsuIgolr', label: '11-Day Imperial Cities, Chefchaouen & Sahara from Casablanca' },
  { id: 'ApnQUSenpum1vRtsuIgp2p', label: '12-Day Imperial Cities, Sahara & Coastal from Casablanca' },
  { id: 'ApnQUSenpum1vRtsuIgpJn', label: '15-Day Imperial Cities, Sahara & Coastal from Casablanca' },
  // --- Agadir duplicates (2026-05-20) ---
  { id: 'ApnQUSenpum1vRtsuIgmRd', label: '3 Days Sahara from Agadir' },
  { id: 'O4505RdNaSikVebRwUMPVS', label: '4-Day Agadir to Marrakech' },
  { id: 'O4505RdNaSikVebRwUMPZ2', label: '5 Days Visit Sahara from Agadir' },
  { id: 'ApnQUSenpum1vRtsuIgnkE', label: '7-Day Sahara from Agadir (2026-05-20 copy)' },
  // --- Broken slug (space instead of hyphen, created 2025-12-29) ---
  { id: 'FWoaewO3AQZvYTIacNN9Wy', label: '7-Day Sahara from Agadir (broken slug: "from agadir")' },
]

console.log(`Deleting ${TO_DELETE.length} duplicate/broken tours...\n`)

let deleted = 0
let failed = 0

for (const { id, label } of TO_DELETE) {
  try {
    await client.delete(id)
    console.log(`  ✅ Deleted: ${label}`)
    deleted++
  } catch (err) {
    console.error(`  ❌ Failed:  ${label} — ${err.message}`)
    failed++
  }
  await new Promise(r => setTimeout(r, 150))
}

console.log(`\nDone. Deleted: ${deleted}  Failed: ${failed}`)
if (failed === 0) console.log('All 26 duplicates removed. 27 unique tours remain.')
