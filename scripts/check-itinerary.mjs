import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'

const client = getSanityClient()
const tours = await client.fetch(`
  *[_type == "tour" && !(_id in path("drafts.**"))] | order(departureCity asc) {
    title, departureCity,
    itinerary[]{ day, title, "descLen": length(description), description }
  }
`)

for (const tour of tours) {
  const avgLen = tour.itinerary?.length
    ? Math.round(tour.itinerary.reduce((s, i) => s + (i.descLen || 0), 0) / tour.itinerary.length)
    : 0
  const short = tour.itinerary?.filter(i => (i.descLen || 0) < 100) || []
  console.log(`\n[${tour.departureCity}] ${tour.title}`)
  console.log(`  ${tour.itinerary?.length || 0} days | avg ${avgLen} chars/day | ${short.length} days under 100 chars`)
  if (short.length > 0) {
    short.forEach(i => console.log(`    - ${i.day}: "${(i.description || '').substring(0, 80)}..."`))
  }
}
