/**
 * Expand thin itinerary descriptions across all tours.
 * Finds days with descriptions under 200 chars and expands them
 * using a keyword-based rich-content library.
 *
 * Usage: node scripts/expand-itinerary.mjs
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

import { getSanityClient } from './utils/sanity-client.mjs'

const client = getSanityClient()

// Rich content library keyed by location/activity keyword
const richContent = {
  casablanca: `Casablanca is Morocco's economic capital and largest city, a vibrant blend of Art Deco architecture, modern boulevards, and traditional medina streets. The iconic Hassan II Mosque — one of the largest mosques in the world — stands dramatically on a promontory over the Atlantic Ocean, its minaret visible for miles.`,
  'hassan ii mosque': `The Hassan II Mosque is an architectural masterpiece and one of the largest mosques in the world, with a 210-metre minaret and a retractable roof. Built partly over the ocean, it can accommodate 25,000 worshippers inside and 80,000 on its surrounding esplanade. A guided visit reveals its breathtaking mosaics, carved plasterwork, and cedar wood ceiling.`,
  rabat: `Rabat, Morocco's administrative capital, is a UNESCO World Heritage city known for its well-preserved historic medina, the unfinished Hassan Tower, and the ornate Mausoleum of Mohammed V. Stroll through the Andalusian Gardens, explore the ancient Chellah necropolis, and experience the elegant blend of French colonial and traditional Moroccan architecture.`,
  chefchaouen: `Chefchaouen — the famous Blue City — is one of Morocco's most photogenic destinations. Nestled in the Rif Mountains, its labyrinthine medina is painted in countless shades of blue and white, creating an almost surreal atmosphere. Explore narrow winding alleys, discover artisan workshops, sip mint tea on a rooftop terrace, and hike to the Spanish Mosque for panoramic views over the city and valley below.`,
  'rif mountains': `The Rif Mountains form a dramatic backdrop to northern Morocco, with cedar forests, deep gorges, and traditional Berber villages clinging to the slopes. The drive through these mountains offers spectacular scenery — terraced hillsides, ancient olive groves, and glimpses of rural Moroccan life far removed from the tourist trail.`,
  volubilis: `Volubilis is Morocco's best-preserved Roman ruins, a UNESCO World Heritage Site dating back to the 3rd century BC. Wander through the ancient forum, admire remarkably intact floor mosaics depicting Neptune and Orpheus, and explore the triumphal arch of Caracalla. The site sits in a fertile plain with sweeping views of the surrounding countryside.`,
  meknes: `Meknes was one of Morocco's four imperial capitals under Sultan Moulay Ismail in the 17th century. The massive Bab Mansour gate — considered the finest gate in North Africa — guards the entrance to the old medina. Explore the vast granaries, the Royal Stables that once housed 12,000 horses, and the atmospheric souks selling traditional crafts.`,
  fes: `Fes el-Bali, the world's largest medieval urban area and a UNESCO World Heritage Site, is a sensory labyrinth of over 9,000 narrow streets, souks, mosques, and madrassas. With a local guide, discover the famous Chouara tanneries — where leather has been dyed using the same methods for centuries — the intricate tilework of the Bou Inania Medersa, and the bustling Nejjarine Square with its ornate fountain.`,
  'fez': `Fes is one of the world's great medieval cities, its ancient medina a UNESCO-listed maze of over 9,000 alleyways. Your guided tour will take you through the leather tanneries with their rainbow of dye vats, the ornate Attarine Medersa with its breathtaking Andalusian craftsmanship, the lively spice markets, and the ancient Al-Qarawiyyin University — the oldest continually operating university in the world.`,
  ifrane: `Ifrane is a charming mountain town known as "Morocco's Switzerland" for its European-style chalets and alpine atmosphere, sitting at 1,665 metres above sea level. In winter it becomes a ski resort; in summer its cool air, cedar forests, and pristine parks make it a refreshing contrast to the desert heat.`,
  azrou: `The cedar forest near Azrou is home to a resident population of Barbary macaque monkeys, which visitors can observe in their natural habitat among ancient Atlas cedar trees. The forest is part of the larger Ifrane National Park and represents an important ecosystem with some trees estimated to be over 800 years old.`,
  merzouga: `Merzouga is the gateway to Erg Chebbi, the most dramatic sand dune field in Morocco, with dunes rising up to 150 metres above the surrounding plain. As you arrive, the sheer scale of the golden dunes — glowing amber, rust, and gold in the shifting light — is truly awe-inspiring. The area is also home to Gnawa musicians and nomadic Berber families who have lived alongside these dunes for generations.`,
  'erg chebbi': `Erg Chebbi's towering dunes are among the most spectacular in the Sahara Desert. Rising to 150 metres and stretching over 22 kilometres, they shift colour dramatically through the day — golden at midday, deep orange at sunset, and silver under the desert moon. A camel trek into the dunes at sunset is one of the most memorable experiences Morocco has to offer.`,
  'camel trek': `Your camel trek into the Sahara dunes is the centrepiece of the desert experience. Led by Berber guides who know these sands intimately, you'll ride in traditional fashion as the sun dips towards the horizon, painting the dunes in shades of amber and rose. At camp, enjoy traditional Moroccan music around a fire, a sky blazing with stars, and the profound silence of the desert night.`,
  'desert camp': `Your desert camp is a traditional Berber-style bivouac of comfortable tents equipped with proper beds, bedding, and lighting, set deep within the dunes far from any road or light pollution. Dinner is a tagine cooked over an open fire, accompanied by live Gnawa music and storytelling from your Berber hosts. Fall asleep to the absolute silence of the Sahara and wake at dawn to watch the sunrise ignite the dunes.`,
  'todgha gorges': `The Todgha Gorges are one of Morocco's most dramatic natural wonders — a narrow canyon carved through sheer rose-coloured limestone cliffs that rise 300 metres on both sides. The cool, crystal-clear Todgha River flows along the gorge floor, and the light changes throughout the day in ways that delight photographers. Local Berber villages cling to the canyon walls, their palm groves and irrigated gardens a vivid green against the ochre rock.`,
  'dades valley': `The Dades Valley — known as the Road of a Thousand Kasbahs — is a spectacular river gorge flanked by towering rock formations, ancient kasbahs, and lush palm groves. The winding road through the valley passes through villages where traditional earthen architecture blends into the landscape, and the famous Monkey Fingers rock formations rise dramatically from the valley floor.`,
  'ait ben haddou': `Aït Ben Haddou is a UNESCO World Heritage Site and one of Morocco's most iconic sights — a fortified village (ksar) of earthen clay architecture rising dramatically above the Ounila River. Used as a backdrop in films including Lawrence of Arabia, Gladiator, and Game of Thrones, it remains a living example of southern Moroccan ksour architecture. Your guided walk through the kasbah reveals centuries of history in its towers, granaries, and ancient mosque.`,
  'high atlas': `Crossing the High Atlas Mountains via the Tizi n'Tichka pass (2,260 metres above sea level) is a breathtaking drive through dramatic mountain scenery. Berber villages cling to hillsides among terraced fields, ancient kasbahs crown rocky outcrops, and argan trees — unique to Morocco — dot the slopes below. The descent into Marrakech offers sweeping views across the sun-baked plain.`,
  marrakech: `Marrakech, the "Rose City," is a heady mix of medieval medina streets and 21st-century vitality. Explore the legendary Jemaa el-Fna square — filled with storytellers, snake charmers, acrobats, and food stalls — the Bahia Palace with its intricate carved stucco and zellij tilework, the Saadian Tombs, and the colourful souks where artisans work in copper, leather, wood, and textiles just as they have for centuries.`,
  essaouira: `Essaouira is a windswept Atlantic port city of extraordinary charm — a fortified medina of white-and-blue houses, a working harbour fragrant with fresh fish, and broad sandy beaches popular with wind and kite surfers. Stroll the rampart walls, browse the blue boats of the fishing port, discover galleries showcasing Gnawa musicians and local artists, and watch the sun set over the Atlantic Ocean.`,
  'rissani': `Rissani is a historic market town at the edge of the Sahara, gateway to the ancient salt trade routes and home to one of the region's most authentic weekly souks. Visit the 17th-century ksar of Oulad Abdelhalim, browse stalls heaped with dates, spices, and Berber jewellery, and feel the pulse of a town where the ancient caravan culture of the Sahara is still very much alive.`,
  taroudant: `Taroudant is often called "Little Marrakech" — a beautifully preserved walled city surrounded by rose-pink ramparts and home to a vibrant souk known for its antiques, Berber silver jewellery, and locally produced argan oil products. The city is less visited than Marrakech but offers an equally authentic experience without the crowds.`,
  taznakht: `Taznakht is renowned throughout Morocco for its Berber carpet-weaving tradition. Women from the surrounding Ouarzazate region use natural dyes and geometric designs passed down through generations to create the distinctive Glaoua-style rugs and blankets. A visit to a local cooperative offers a fascinating window into this living craft tradition.`,
  zagora: `Zagora is a desert outpost town on the edge of the Draa Valley, Morocco's longest river valley, a lush ribbon of palm groves and kasbahs stretching south into the Sahara. The town is known as the starting point of the ancient camel caravan routes to Timbuktu — a sign at the edge of town once read "Tombouctou 52 jours" (52 days by camel).`,
  'draa valley': `The Draa Valley is Morocco's longest river valley — a 200-kilometre ribbon of date palm oases, ancient kasbahs, and Berber villages stretching from the High Atlas to the edges of the Sahara. Along the valley floor, the deep green of the palmeries contrasts vividly with the tawny desert beyond, and fortified ksour villages rise from the earth like ancient monuments.`,
  sunrise: `Waking before dawn to watch the Sahara sunrise is an unforgettable experience. As the sky lightens from deep violet to amber to blazing gold, the dunes transform — their sharp ridgelines casting long blue shadows across slopes that shimmer with warmth in the first light. The silence is absolute, broken only by the distant call to prayer drifting from a distant village.`,
  'gnawa': `Gnawa music is one of Morocco's most ancient and spiritually powerful musical traditions, brought to Morocco by sub-Saharan enslaved people centuries ago. The guembri (three-stringed bass lute) and qraqeb (iron castanets) create hypnotic rhythms used in healing ceremonies called lilas. Around the desert campfire, a Gnawa performance is a deeply moving connection to the desert's cultural soul.`,
  'nomad': `Meeting nomadic Berber families in the desert is one of the most genuine cultural encounters of any Sahara journey. These communities, who have navigated the erg for generations following seasonal pastures with their camels, goats, and sheep, welcome visitors with the boundless hospitality for which the Berber people are known — sharing mint tea, flat bread baked in the sand, and stories of desert life.`,
  'agadir': `Agadir is Morocco's premier beach resort city, rebuilt after a devastating 1960 earthquake and now home to one of the finest sandy beaches in Africa — 10 kilometres of golden sand lapped by the warm Atlantic. The Souk El Had is one of the largest traditional markets in Morocco, and the hilltop kasbah offers sweeping views over the bay and the Atlas Mountains beyond.`,
  'taroudant': `Taroudant's ancient ramparts — among the best-preserved in Morocco — enclose a medina that has changed little in centuries. The town sits in the fertile Souss Plain between the High and Anti-Atlas Mountains, surrounded by orange and argan orchards. Its souks are famous for locally produced argan oil cosmetics, Berber silver jewellery, and handwoven carpets.`,
  'airport': `Your journey concludes with a private transfer to the airport, giving you time to reflect on the extraordinary landscapes, cultures, and experiences of your Moroccan desert adventure. Your guide will ensure a smooth and comfortable journey to your departure terminal with time to spare.`,
  'departure': `Your adventure comes to an end today. After a leisurely morning, your driver will transfer you to your onward destination. The memories of golden dunes, starlit nights, ancient kasbahs, and the warmth of Berber hospitality will stay with you long after you leave Morocco.`,
  'arrival': `Upon arrival, your private driver will meet you and transfer you to your hotel. The rest of the day is yours to relax, settle in, and begin exploring at your own pace. Your guide will meet you in the evening to brief you on the journey ahead and answer any questions about the days to come.`,
  'relax': `Today is your opportunity to explore independently, rest, or enjoy optional activities. Wander through the medina, discover local restaurants serving fresh-caught seafood and traditional tagines, browse artisan boutiques, or simply sit at a rooftop café and watch the world go by. Your guide is available to suggest the best local spots for lunch, coffee, and shopping.`,
  '4x4': `Your 4x4 desert excursion takes you off-road into the Sahara's most remote corners — areas inaccessible on foot or by camel. Visit nomadic settlements hidden among the dunes, discover the "Lac de Merzouga" (a seasonal desert lake that attracts flamingos and other migratory birds), and explore the vast fossil beds that reveal the ocean that once covered this land millions of years ago.`,
  'atlantic': `The Atlantic coast of Morocco is a world apart from the Sahara — wild, windswept, and hauntingly beautiful. Cliffs drop dramatically to surf-pounded beaches, whitewashed fishing villages cling to rocky headlands, and the ocean air is thick with salt and the cry of seabirds. The drive along this coast is one of Morocco's great road journeys.`,
}

function expandDescription(description, dayTitle) {
  const combined = `${dayTitle || ''} ${description || ''}`.toLowerCase()
  let expanded = description || ''

  // Find matching rich content blocks
  const additions = []
  for (const [keyword, richText] of Object.entries(richContent)) {
    if (combined.includes(keyword) && !expanded.toLowerCase().includes(richText.substring(0, 40).toLowerCase())) {
      additions.push(richText)
      if (additions.length >= 2) break // max 2 additions per day
    }
  }

  if (additions.length > 0) {
    expanded = [expanded.trim(), ...additions].filter(Boolean).join(' ')
  }

  return expanded
}

async function run() {
  console.log('🔍 Fetching all published tours...\n')

  const tours = await client.fetch(`
    *[_type == "tour" && !(_id in path("drafts.**"))] {
      _id, title, departureCity,
      itinerary[]{ day, title, description, overnight }
    }
  `)

  let patchedTours = 0
  let patchedDays = 0

  for (const tour of tours) {
    if (!tour.itinerary || tour.itinerary.length === 0) {
      console.log(`⚠️  "${tour.title}" — no itinerary, skipping`)
      continue
    }

    const newItinerary = tour.itinerary.map(item => {
      const currentLen = (item.description || '').length
      if (currentLen >= 200) return item // already good

      const expanded = expandDescription(item.description, item.title)
      if (expanded.length > currentLen + 50) {
        patchedDays++
        return { ...item, description: expanded }
      }
      return item
    })

    const changed = newItinerary.some((item, i) =>
      item.description !== tour.itinerary[i].description
    )

    if (!changed) {
      console.log(`✓ "${tour.title}" — all days already full`)
      continue
    }

    try {
      await client.patch(tour._id).set({ itinerary: newItinerary }).commit()
      const days = newItinerary.filter((item, i) => item.description !== tour.itinerary[i].description).length
      console.log(`✅ "${tour.title}" — expanded ${days} day(s)`)
      patchedTours++
    } catch (err) {
      console.error(`❌ Failed "${tour.title}": ${err.message}`)
    }

    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n✅ Done. ${patchedTours} tours updated, ${patchedDays} day descriptions expanded.`)
}

run().catch(err => {
  console.error('❌', err)
  process.exit(1)
})
