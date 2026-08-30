import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2nicu1vl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Prices from VST prices.xlsx — per person in USD
// Columns: single (1p/room), double (2p/room), triple (3p/room), quad (4p/room)
const pricesBySlug = {
  '3-days-marrakech-merzouga':          { single: 890,  double: 495,  triple: 387,  quad: 287  },
  '3-days-marrakech-to-fes':            { single: 990,  double: 445,  triple: 421,  quad: 312  },
  '4-days-atlas-sahara-marrakech':      { single: 1090, double: 575,  triple: 447,  quad: 377  },
  '4-days-marrakech-to-fes':            { single: 1190, double: 625,  triple: 482,  quad: 402  },
  '5-days-marrakech-erg-chigaga':       { single: 1498, double: 797,  triple: 648,  quad: 526  },
  '7-days-grand-sahara-marrakech':      { single: 1729, double: 969,  triple: 762,  quad: 617  },
  '7-days-marrakech-casablanca-via-fes':{ single: 1976, double: 1092, triple: 858,  quad: 760  },
  '9-days-marrakech-to-casablanca':     { single: 2613, double: 1365, triple: 1047, quad: 1014 },
  '10-days-ultimate-morocco-marrakech': { single: 2787, double: 1573, triple: 1248, quad: 975  },
}

const slugs = Object.keys(pricesBySlug)
const tours = await client.fetch(
  `*[_type == "tour" && slug.current in $slugs]{ _id, "slug": slug.current }`,
  { slugs }
)

console.log(`Found ${tours.length} matching tours in Sanity\n`)

for (const tour of tours) {
  const p = pricesBySlug[tour.slug]
  if (!p) continue
  await client.patch(tour._id).set({
    priceSingle: p.single,
    priceDouble: p.double,
    priceTriple: p.triple,
    priceQuad:   p.quad,
  }).commit()
  console.log(`✓ ${tour.slug}: single $${p.single} / double $${p.double} / triple $${p.triple} / quad $${p.quad}`)
}

console.log('\nAll prices updated.')
