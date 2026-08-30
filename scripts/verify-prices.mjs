import { createClient } from '@sanity/client'
const client = createClient({ projectId: '2nicu1vl', dataset: 'production', apiVersion: '2024-11-21', useCdn: false })
const tours = await client.fetch(
  `*[_type == "tour" && departureCity == "marrakech" && defined(priceDouble) && !(_id in path("drafts.**"))]{ title, "slug": slug.current, priceSingle, priceDouble, priceTriple, priceQuad } | order(priceDouble asc)`
)
console.log(`Tours with prices: ${tours.length}\n`)
for (const t of tours) {
  console.log(`${t.title}`)
  console.log(`  Single: $${t.priceSingle} | Double: $${t.priceDouble} | Triple: $${t.priceTriple} | Quad: $${t.priceQuad}\n`)
}
