import { createClient } from '@sanity/client'
const client = createClient({ projectId: '2nicu1vl', dataset: 'production', apiVersion: '2024-11-21', useCdn: false })
const tours = await client.fetch(
  `*[_type == "tour" && departureCity == "marrakech" && !(_id in path("drafts.**"))]{ _id, title, "slug": slug.current, duration, excerpt, "days": itinerary[]{ day, title, overnight } } | order(duration asc)`
)
for (const t of tours) {
  console.log(`\n=== ${t.title} (${t.duration}) ===`)
  console.log('Slug:', t.slug)
  console.log('Excerpt:', t.excerpt?.slice(0, 120))
  for (const d of (t.days || [])) {
    console.log(`  ${d.day}: ${d.title} | overnight: ${d.overnight}`)
  }
}
