import { createClient } from '@sanity/client'
const client = createClient({ projectId: '2nicu1vl', dataset: 'production', apiVersion: '2024-11-21', useCdn: false })
const tour = await client.fetch(`*[_type == "tour" && slug.current == "7-days-grand-sahara-marrakech"][0]`)
console.log(JSON.stringify(tour, null, 2))
