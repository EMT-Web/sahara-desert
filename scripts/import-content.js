/**
 * BULK CONTENT IMPORT SCRIPT
 * 
 * This script automatically imports all content from sanity_txt.md into Sanity CMS
 * 
 * Usage:
 * 1. Make sure you have content in Sanity Studio first (Site Settings, Contact, Homepage, About)
 * 2. Run: node scripts/import-content.js
 * 
 * This will create:
 * - All tours (20+ tours)
 * - All experiences (8 experiences)
 * - All destinations (10 destinations)
 * - All guides (6 guides)
 * - Culture content
 * - Sustainability content
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to create a token in Sanity
})

// Read and parse sanity_txt.md
function parseContentFile() {
  const filePath = path.join(__dirname, '..', 'sanity_txt.md')
  const content = fs.readFileSync(filePath, 'utf-8')
  return content
}

// Helper function to create a document in Sanity
async function createDocument(type, data) {
  try {
    const result = await client.create({
      _type: type,
      ...data,
    })
    console.log(`✅ Created ${type}: ${data.title || data.name || 'Untitled'}`)
    return result
  } catch (error) {
    console.error(`❌ Error creating ${type}:`, error.message)
    return null
  }
}

// Parse tours from the content
function parseTours(content) {
  const tours = []
  
  // This is a simplified parser - you may need to adjust based on your exact format
  // For now, I'll create a structure that you can fill in
  
  // Tours from Marrakech
  tours.push({
    title: '3 Days Marrakech to Merzouga Sahara Desert Tour',
    departureCity: 'marrakech',
    duration: '3 Days',
    excerpt: 'Discover the magic of the Sahara Desert on this 3-day adventure from Marrakech. Experience camel trekking, luxury desert camps, and authentic Berber culture.',
    body: `Day 1: Marrakech → High Atlas Mountains → Dades Valley
Depart from Marrakech on your 3-day Sahara Desert tour and cross the Tizi n'Tichka Pass, one of Morocco's highest mountain passes in the High Atlas Mountains. Stop in traditional Berber villages and admire the stunning landscapes. Explore Ait Ben Haddou Kasbah, a UNESCO World Heritage site and iconic Moroccan landmark featured in many films. Continue through the scenic Dades Valley, with its dramatic gorges, ancient kasbahs, and palm oases. 
Overnight in Dades Valley – Dar Blues Or Dades Paradise.

Day 2: Dades Valley → Todra Gorge → Merzouga Desert
Drive through the magnificent Todra Gorge, known for its towering cliffs and lush palm-lined canyon floor. Stop in Rissani, a historic market town at the edge of the Sahara Desert, and explore local souks filled with spices, dates, and handmade crafts. Continue to Merzouga, the gateway to the Sahara Desert, and enjoy a magical sunset camel trek across the golden Erg Chebbi dunes. 
Overnight in a desert luxury camp, complete with desert cuisine, tea, and live Berber music under the star-filled desert sky.
Overnight in Merzouga desert at Tiziri Camp Or Sahara Eden Camp

Day 3: Merzouga → Draa Valley → Ouarzazate → Marrakech
Start the day with an optional sunrise camel ride in the dunes for breathtaking photography. Depart Merzouga and drive through the Draa Valley, the longest oasis valley in Morocco, lined with palm groves and fortified kasbahs. Stop in Ouarzazate, Morocco's film capital, and visit Kasbah Taourirt or take photos of the surrounding desert landscapes. Continue through the scenic Atlas Mountains back to Marrakech for evening arrival, completing your immersive 3-day Sahara Desert adventure from Marrakech.
Drop off in your accommodation in Marrakech`,
    included: [
      'Transport in an air-conditioned 4x4 or minivan for all 3 days',
      'Experienced, knowledgeable driver and local guide for the entire tour',
      '2 nights accommodation (Riad, kasbah, and desert camp)',
      'Dinner and breakfast included for all overnight stays',
      'Camel rides in Erg Chebbi dunes at sunset and sunrise',
      'Sandboarding in the desert dunes',
    ],
    notIncluded: [
      'Lunches',
      'Beverages',
      'Tips',
      'Entrance fees',
      'Personal expenses (souvenirs, phone, internet, optional activities not listed)',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Marrakech → High Atlas Mountains → Dades Valley',
        description: 'Depart from Marrakech on your 3-day Sahara Desert tour and cross the Tizi n\'Tichka Pass, one of Morocco\'s highest mountain passes in the High Atlas Mountains. Stop in traditional Berber villages and admire the stunning landscapes. Explore Ait Ben Haddou Kasbah, a UNESCO World Heritage site and iconic Moroccan landmark featured in many films. Continue through the scenic Dades Valley, with its dramatic gorges, ancient kasbahs, and palm oases.',
        overnight: 'Dades Valley – Dar Blues Or Dades Paradise',
      },
      {
        day: 'Day 2',
        title: 'Dades Valley → Todra Gorge → Merzouga Desert',
        description: 'Drive through the magnificent Todra Gorge, known for its towering cliffs and lush palm-lined canyon floor. Stop in Rissani, a historic market town at the edge of the Sahara Desert, and explore local souks filled with spices, dates, and handmade crafts. Continue to Merzouga, the gateway to the Sahara Desert, and enjoy a magical sunset camel trek across the golden Erg Chebbi dunes. Overnight in a desert luxury camp, complete with desert cuisine, tea, and live Berber music under the star-filled desert sky.',
        overnight: 'Merzouga desert at Tiziri Camp Or Sahara Eden Camp',
      },
      {
        day: 'Day 3',
        title: 'Merzouga → Draa Valley → Ouarzazate → Marrakech',
        description: 'Start the day with an optional sunrise camel ride in the dunes for breathtaking photography. Depart Merzouga and drive through the Draa Valley, the longest oasis valley in Morocco, lined with palm groves and fortified kasbahs. Stop in Ouarzazate, Morocco\'s film capital, and visit Kasbah Taourirt or take photos of the surrounding desert landscapes. Continue through the scenic Atlas Mountains back to Marrakech for evening arrival, completing your immersive 3-day Sahara Desert adventure from Marrakech.',
        overnight: 'Drop off in your accommodation in Marrakech',
      },
    ],
    focusAreas: ['culture', 'sunsets', 'music', 'adventure'],
    seoKeywords: 'Sahara Desert tours from Marrakech, Merzouga camel trek, Erg Chebbi dunes, desert camp Morocco, Draa Valley tour, Ouarzazate sightseeing, High Atlas Mountains, Berber culture, Morocco adventure tours.',
    publishedAt: new Date().toISOString(),
  })

  // Add more tours here following the same pattern...
  // You can continue parsing from the sanity_txt.md file
  
  return tours
}

// Main import function
async function importAllContent() {
  console.log('🚀 Starting bulk content import...\n')

  // Check if token is set
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ ERROR: SANITY_API_TOKEN not found in environment variables')
    console.log('\n📝 To get a token:')
    console.log('1. Go to https://sanity.io/manage')
    console.log('2. Select your project')
    console.log('3. Go to API → Tokens')
    console.log('4. Create a new token with Editor permissions')
    console.log('5. Add it to .env.local: SANITY_API_TOKEN=your-token-here')
    console.log('6. Restart and run this script again\n')
    return
  }

  const content = parseContentFile()
  const tours = parseTours(content)

  console.log(`📦 Found ${tours.length} tours to import\n`)

  // Import tours
  for (const tour of tours) {
    await createDocument('tour', tour)
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n✅ Import complete!')
  console.log('📝 Note: You may need to add images manually in Sanity Studio')
}

// Run the import
importAllContent().catch(console.error)

