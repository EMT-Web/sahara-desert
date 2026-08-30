import { createClient } from '@sanity/client'
const client = createClient({ projectId: '2nicu1vl', dataset: 'production', apiVersion: '2024-11-21', useCdn: false })

const slugs = [
  '3-days-marrakech-to-fes',
  '4-days-marrakech-to-fes',
  '7-days-marrakech-casablanca-via-fes',
  '9-days-marrakech-to-casablanca',
  '12-days-ultimate-morocco-circuit',
]

const tours = await client.fetch(
  `*[_type == "tour" && slug.current in $slugs]{
    title, "slug": slug.current, duration,
    "hasBody": defined(body) && length(body) > 10,
    "bodyLen": length(body),
    "itineraryCount": count(itinerary),
    "includedCount": count(included),
    "notIncludedCount": count(notIncluded),
    "hasFocusAreas": defined(focusAreas),
    "hasExcerpt": defined(excerpt),
    priceSingle, priceDouble
  }`,
  { slugs }
)

for (const t of tours) {
  console.log(`\n${t.title}`)
  console.log(`  body: ${t.hasBody ? `YES (${t.bodyLen} chars)` : 'MISSING'}`)
  console.log(`  itinerary days: ${t.itineraryCount}`)
  console.log(`  included items: ${t.includedCount}`)
  console.log(`  notIncluded items: ${t.notIncludedCount}`)
  console.log(`  excerpt: ${t.hasExcerpt ? 'YES' : 'MISSING'}`)
  console.log(`  focusAreas: ${t.hasFocusAreas ? 'YES' : 'MISSING'}`)
  console.log(`  price: $${t.priceDouble} (double)`)
}
