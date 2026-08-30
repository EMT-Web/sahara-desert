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

const SURVIVING_NUMBER = '+212670707151'

await client
  .patch('contact')
  .set({ phone: SURVIVING_NUMBER, whatsapp: SURVIVING_NUMBER })
  .unset(['whatsapp2'])
  .commit()

const result = await client.fetch(`*[_type == "contact"][0]{ phone, whatsapp, whatsapp2 }`)
console.log('Updated contact document:', result)
