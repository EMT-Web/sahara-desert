import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'
import { createDocuments } from './utils/content-helpers.mjs'
import { parseErrachidiaTours } from './parsers/tours-errachidia.mjs'

async function importErrachidiaTours() {
  console.log('🚀 Starting Errachidia tours import...\n')

  try {
    const client = getSanityClient()

    console.log('📦 Importing tours from Errachidia...\n')
    const errachidiaTours = parseErrachidiaTours()
    await createDocuments(client, 'tour', errachidiaTours, 500)
    console.log(`✅ Imported ${errachidiaTours.length} tours from Errachidia\n`)

    console.log('✅ Errachidia tours import complete!')
    console.log(`\n📊 Summary: ${errachidiaTours.length} tours imported`)
  } catch (error) {
    console.error('❌ Error importing Errachidia tours:', error.message)
    if (error.message.includes('SANITY_API_TOKEN')) {
      console.log('\n📝 To get a token:')
      console.log('1. Go to https://sanity.io/manage')
      console.log('2. Select your project')
      console.log('3. Go to API → Tokens')
      console.log('4. Create a new token with Editor permissions')
      console.log('5. Add it to .env.local: SANITY_API_TOKEN=your-token-here')
    }
    process.exit(1)
  }
}

importErrachidiaTours()
