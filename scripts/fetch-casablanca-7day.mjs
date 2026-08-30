import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })
import { getSanityClient } from './utils/sanity-client.mjs'
const client = getSanityClient()
const tour = await client.fetch(
  `*[_type == "tour" && title == "7 Days Morocco Sahara Desert Tour from Casablanca to Marrakech"][0]{ _id, title, slug, departureCity, duration, excerpt, body, included, notIncluded }`
)
console.log(JSON.stringify(tour, null, 2))
