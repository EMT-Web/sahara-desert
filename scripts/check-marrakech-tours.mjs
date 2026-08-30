import { createClient } from '@sanity/client'
const client = createClient({ projectId: '2nicu1vl', dataset: 'production', apiVersion: '2024-11-21', useCdn: false })
const tours = await client.fetch(`*[_type == "tour" && departureCity == "marrakech" && !(_id in path("drafts.**"))]{ _id, title, "slug": slug.current, duration, price } | order(duration asc)`)
console.log(JSON.stringify(tours, null, 2))
