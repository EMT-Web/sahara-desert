import { createClient } from '@sanity/client'
const client = createClient({ projectId: '2nicu1vl', dataset: 'production', apiVersion: '2024-11-21', useCdn: false })
const slugs = ['3-days-marrakech-to-fes','4-days-marrakech-to-fes','7-days-marrakech-casablanca-via-fes','9-days-marrakech-to-casablanca','12-days-ultimate-morocco-circuit']
const tours = await client.fetch(`*[_type == "tour" && slug.current in $slugs]{ "slug": slug.current, highlights, "itinerary": itinerary[]{ day, title, "descLen": length(description) } }`, { slugs })
for (const t of tours) {
  console.log(`\n${t.slug}`)
  console.log(`  highlights: ${t.highlights?.length ?? 0} items`)
  for (const d of t.itinerary) console.log(`  ${d.day} | descLen: ${d.descLen} | ${d.title?.slice(0,50)}`)
}
