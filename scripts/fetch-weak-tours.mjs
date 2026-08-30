import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })
import { getSanityClient } from './utils/sanity-client.mjs'

const client = getSanityClient()
const tours = await client.fetch(`*[_type == "tour" && !(_id in path("drafts.**"))] | order(departureCity asc) { _id, title, departureCity, itinerary[]{ day, title, description, overnight } }`)

const seen = new Set()
const weak = tours.filter(t => {
  if (seen.has(t._id)) return false
  seen.add(t._id)
  if (!t.itinerary || t.itinerary.length === 0) return false
  const avg = t.itinerary.reduce((s, i) => s + (i.description || '').length, 0) / t.itinerary.length
  return avg < 500
})

console.log(JSON.stringify(weak, null, 2))
