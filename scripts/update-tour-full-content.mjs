import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '2nicu1vl',
  dataset: 'production',
  apiVersion: '2024-11-21',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// ─── Fetch existing image refs to reuse for tours missing mainImage ──────────
const existingTours = await client.fetch(`*[_type == "tour" && defined(mainImage)]{
  "slug": slug.current, mainImage
}`)
const imageBySlug = {}
for (const t of existingTours) imageBySlug[t.slug] = t.mainImage

// Use the 3-day Marrakech→Merzouga image as the fallback for Marrakech tours
const fallbackImage =
  imageBySlug['3-days-marrakech-merzouga'] ||
  imageBySlug['7-days-grand-sahara-marrakech'] ||
  Object.values(imageBySlug)[0]

// ─── Shared day descriptions (verbatim from Word documents) ─────────────────

const DAY_MARRAKECH_ATLAS_DADES = {
  title: 'Marrakech, High Atlas Mountains, Aït Benhaddou, Ouarzazate, Roses Valley, and Dades Gorges',
  description: `Your premier Morocco desert tour begins with an early morning pickup from your accommodation in Marrakech. We leave the bustling city behind and ascend into the breathtaking High Atlas Mountains, crossing the famous Tizi n'Tichka pass sitting at an elevation of 2,260 meters. This scenic drive offers unparalleled, panoramic views of rugged peaks and traditional, terraced Berber villages. Descending the eastern slopes, we arrive at the crown jewel of Moroccan earthen architecture: the UNESCO World Heritage-listed Kasbah Aït Benhaddou. This ancient, fortified clay city is a masterpiece of history and a famous Hollywood filming location where you will enjoy a walking tour through its winding, narrow alleys. Next, we drive through Ouarzazate, known as the "Hollywood of Africa," passing by its famous film studios. Our route continues along the "Road of a Thousand Kasbahs," taking us directly through the fragrant Roses Valley, famous for its organic rosewater production. As the afternoon fades, we wind our way up into the dramatic rock formations of the Dades Valley.`,
  overnight: 'Dades Paradise or Dar Blues — Half Board',
}

const DAY_DADES_TODRA_MERZOUGA = {
  title: 'Dades Gorges, Todra Gorges, and the Merzouga Sahara Desert Luxury Camp',
  description: `After a hearty breakfast, we travel further east to stretch our legs at the magnificent Todra Gorges. You will walk beneath the towering, 300-meter-high limestone cliff walls that frame a narrow canyon oasis, which is a true paradise for nature lovers and rock climbers. From the gorges, we journey deeper toward the golden horizons of the Sahara desert in Morocco. Arriving at the edge of the Erg Chebbi dunes in Merzouga, your unforgettable Sahara desert trip hits its peak. You will embark on a magical camel ride across the rolling waves of sand just in time to witness a spectacular Sahara sunset. Upon arrival at your luxury desert camp, comfort meets the wilderness. You will enjoy a decadent, traditional Moroccan dinner. Afterward, everyone gathers around a roaring campfire to listen to spiritual Berber drum music, followed by an unforgettable night of star gazing under the crystal-clear desert sky before retiring to your luxury tent.`,
  overnight: 'Tiziri Camp or Sahara Eden Camp — Half Board',
}

const DAY_MERZOUGA_EXCURSION = {
  title: 'Complete Merzouga Desert Excursion, Nomads, Gnawa Music, and the Seasonal Flamingo Lake',
  description: `Today is dedicated entirely to immersing yourself in the wonders of the Sahara with a thrilling 4x4 desert excursion. After breakfast at the camp, we head off-road across the black stone desert and rolling dunes to meet authentic nomadic families living in traditional Berber tents, where you will sit down to share a warm cup of traditional mint tea with the nomads and learn about their resilient way of life. Next, we travel to the village of Khamlia to experience the captivating rhythms of spiritual Gnawa music, performed by local musicians whose ancestral heritage dates back centuries. Depending on the rainfall, we will also visit the nearby Dayet Srij, the seasonal flamingo lake of Merzouga, where stunning contrasts of blue water and golden dunes attract beautiful flocks of migratory pink flamingos. In the afternoon, you can try sandboarding down the massive peaks of Erg Chebbi or simply relax. As night falls, you return to the exact same campsite to enjoy another exceptional evening of dinner, campfire music, and star gazing under the Saharan sky.`,
  overnight: 'Tiziri Camp or Sahara Eden Camp — Half Board',
}

const DAY_MERZOUGA_TO_FES_3DAY = {
  title: 'Merzouga Desert, Ziz Oasis & Gorges, Ifrane, and Fes Drop-off',
  description: `You can wake up early to catch a breathtaking sunrise over the crest of the dunes before enjoying a fresh breakfast at the camp. We then begin our drive north toward Fes, journeying through the stunning Ziz Gorges and the sprawling green palm groves of the Ziz Oasis, which offers an incredible contrast against the red desert rocks. As we ascend into the Middle Atlas Mountains, we will stop in the alpine town of Ifrane, often called the "Switzerland of Morocco". Here, we will visit the ancient cedar forests where you will get to see and interact with the famous wild Barbary monkeys in their natural habitat. From Ifrane, we make the final drive down to the cultural and spiritual capital of Morocco. Your driver will provide a safe drop-off directly at your hotel or Riad in Fes, marking the end of an epic 3-day Moroccan desert expedition.`,
  overnight: '',
}

const DAY_MERZOUGA_TO_FES_4DAY = {
  title: 'Merzouga Desert, Ziz Oasis & Gorges, Ifrane, and Fes Drop-off',
  description: `You can wake up early to catch a breathtaking sunrise over the crest of the dunes before enjoying a fresh breakfast at the camp. We then begin our drive north toward Fes, journeying through the stunning Ziz Gorges and the sprawling green palm groves of the Ziz Oasis, which offers an incredible contrast against the red desert rocks. As we ascend into the Middle Atlas Mountains, we will stop in the alpine town of Ifrane, often called the "Switzerland of Morocco". Here, we will visit the ancient cedar forests where you will get to see and interact with the famous wild Barbary monkeys in their natural habitat. From Ifrane, we make the final drive down to the cultural and spiritual capital of Morocco. Your driver will provide a safe drop-off directly at your hotel or Riad in Fes, marking the end of an epic 4-day Moroccan desert expedition.`,
  overnight: '',
}

const DAY_MERZOUGA_TO_FES_7DAY = {
  title: 'Merzouga Desert, Ziz Oasis & Gorges, Midelt, Cedar Forest, and Journey to Fes',
  description: `You can wake up early to catch a breathtaking sunrise over the crest of the dunes before enjoying a fresh breakfast at the camp. We then begin our drive north toward Fes, journeying through the stunning Ziz Gorges and the sprawling green palm groves of the Ziz Oasis, which offers an incredible contrast against the red desert rocks. As we ascend into the Middle Atlas Mountains, we will stop in the apple-rich town of Midelt for lunch before passing through the ancient cedar forest of Azrou. Here, you will get to see and interact with the famous wild Barbary monkeys in their natural habitat. After a brief stop in the alpine town of Ifrane, we make the final descent into the ancient imperial city of Fes, where you will check into your beautiful historic accommodation for a relaxing evening.`,
  overnight: 'Riad Fez Mahal or La Perle de La Medina — Bed & Breakfast',
}

const DAY_FES_WALKING_TOUR = {
  title: 'Fes Old City Walking Tour with a Local Guide',
  description: `After enjoying a delicious breakfast at your Riad, you will meet your expert local guide for a comprehensive walking tour of the Fes Medina, one of the world's largest walled cities and a UNESCO World Heritage site. You will step back in time as you navigate the labyrinth of over 9,000 narrow streets, beginning with the exterior of the majestic Royal Palace with its famous golden brass doors. Your guide will lead you through the vibrant spice markets, ancient copper workshops, and the famous, colorful Chouara Tannery, which has operated the same way for centuries. You will visit key historical and spiritual landmarks, including the Al-Qarawiyyin University, the oldest continually operating university in the world, and the stunningly carved madrasas. The afternoon concludes with a panoramic view of the entire city from the ancient Merenid Tombs before returning to your Riad for a peaceful evening.`,
  overnight: 'Riad Fez Mahal or La Perle de La Medina — Bed & Breakfast',
}

const DAY_FES_TO_CHEFCHAOUEN = {
  title: 'Fes to Chefchaouen via Imperial Meknes and Ancient Volubilis',
  description: `Following breakfast, we leave Fes and drive toward the Rif Mountains, stopping first in the imperial city of Meknes to admire the grand Bab Mansour gate and the historic granaries. From Meknes, we journey to the nearby UNESCO World Heritage site of Volubilis to explore the remarkably well-preserved ancient Roman ruins and their vibrant floor mosaics with a local guide. After immersing ourselves in history, we wind through the green hills to reach the famous blue-washed city of Chefchaouen. You will spend the late afternoon wandering through the charming, tranquil blue alleys of the medina, shopping for unique local handicrafts, and watching the sunset over the mountains from a scenic rooftop cafe before checking into your boutique accommodation.`,
  overnight: 'Dar Echchaouen or Riad Cherifa — Bed & Breakfast',
}

const DAY_CHEFCHAOUEN_TO_CASABLANCA = {
  title: 'Chefchaouen to Casablanca via Capital Rabat and Drop-off',
  description: `You will enjoy breakfast looking out over the blue town before we begin our journey down to the Atlantic coast. Our first major stop is the imperial capital city of Rabat, where we will visit the striking Mechouar of the Royal Palace, the historic Hassan Tower standing next to the Mausoleum of Mohammed V, and the beautiful blue-and-white Kasbah of the Udayas overlooking the ocean. After lunch, we make the final short drive along the coast to Casablanca. Your journey concludes with a drop-off at your hotel or the airport in Casablanca, marking the successful end of your grand 7-day Moroccan expedition.`,
  overnight: '',
}

const DAY_ARRIVAL_MARRAKECH = {
  title: 'Arrival in Marrakech',
  description: `Your ultimate Morocco desert tour begins upon your arrival in the vibrant red city of Marrakech. Your private driver will meet you at the airport and transfer you directly to your charming boutique riad in the heart of the ancient medina. You can spend the rest of the day relaxing from your flight, sipping traditional Moroccan mint tea, and taking your first steps out to experience the bustling evening energy of the nearby Jemaa el-Fnaa square.`,
  overnight: 'Riad Nessma and Spa or Riad Aslal — Bed & Breakfast',
}

const DAY_MARRAKECH_SIGHTSEEING = {
  title: 'Marrakech Sightseeing with a Local Guide',
  description: `After enjoying a fresh breakfast, you will meet your expert local guide for a comprehensive sightseeing tour of Marrakech's most iconic historical landmarks. You will explore the spectacular Bahia Palace with its intricate tilework and courtyards, see the towering Koutoubia Mosque minaret, and step into the historic Saadian Tombs. Your guide will then navigate you through the winding, colorful alleys of the souks, vibrant with spices, textiles, and traditional artisan workshops, before leaving you to enjoy a beautiful evening at your own pace.`,
  overnight: 'Riad Nessma and Spa or Riad Aslal — Bed & Breakfast',
}

const DAY_CHEFCHAOUEN_TO_CASABLANCA_OVERNIGHT = {
  title: 'Chefchaouen to Casablanca via Capital Rabat',
  description: `You will enjoy breakfast looking out over the blue town before beginning our journey down toward the coast. Our first major stop is the imperial capital city of Rabat, where we will visit the striking Mechouar of the Royal Palace, the historic Hassan Tower standing next to the Mausoleum of Mohammed V, and the beautiful blue-and-white Kasbah of the Udayas overlooking the ocean. After lunch, we make the final scenic drive down the Atlantic coast to Casablanca. You will check into your upscale city accommodation and spend a relaxing evening on the coast or exploring the downtown boulevards.`,
  overnight: "Val d'Anfa Hotel or Casa Diamond — Bed & Breakfast",
}

const DAY_CASABLANCA_ESSAOUIRA = {
  title: 'Casablanca to the Atlantic Coast of Essaouira',
  description: `Following a fresh breakfast, we will visit the magnificent Hassan II Mosque, one of the largest mosques in the world and an architectural marvel standing directly over the Atlantic Ocean. From Casablanca, we hit the highway traveling southwest along the coast toward the laid-back, bohemian seaside town of Essaouira. Arriving in the afternoon, you can begin exploring this charming UNESCO-listed fortified port town, famous for its strong sea breezes, whitewashed houses, and vibrant art scene, before walking over to your welcoming medina accommodation.`,
  overnight: 'Riad Mimouna or Riad Malaika — Bed & Breakfast',
}

const DAY_ESSAOUIRA_LEISURE = {
  title: 'Essaouira at Leisure',
  description: `Today is completely yours to enjoy at your own relaxed pace. You can walk along the historical Skala de la Ville ramparts where old brass cannons still face the ocean, visit the bustling traditional fishing port to witness the daily catch, or wander the quiet, car-free streets of the medina to browse local thuya wood carvings and handmade silver jewelry. Relax at a beachside cafe, taste freshly grilled seafood right by the water, or enjoy a stunning Atlantic sunset over the Mogador islands.`,
  overnight: 'Riad Mimouna or Riad Malaika — Bed & Breakfast',
}

const DAY_ESSAOUIRA_TO_MARRAKECH = {
  title: 'Essaouira to Marrakech and End of Tour',
  description: `After an open, leisurely morning for last-minute shopping or a walk along the sandy beach, we leave the coast behind and begin our final drive back east toward Marrakech. Along the way, we will pass through rolling plains lined with indigenous Argan trees, where you might spot the famous local tree-climbing goats and visit a women's cooperative producing organic Argan oil. Arriving back in Marrakech by afternoon, your private driver will provide a safe drop-off directly at your hotel, Riad, or the airport, marking the official end of your grand 12-day Moroccan expedition.`,
  overnight: '',
}

// ─── Tour content definitions ────────────────────────────────────────────────

const mkDay = (dayNum, d) => ({
  _key: `day${dayNum}`,
  _type: 'object',
  day: `Day ${dayNum}`,
  title: d.title,
  description: d.description,
  ...(d.overnight ? { overnight: d.overnight } : {}),
})

const tours = [
  {
    slug: '3-days-marrakech-to-fes',
    highlights: [
      "Cross the High Atlas Mountains via the Tizi n'Tichka pass (2,260 m) with panoramic views",
      'Walking tour of the UNESCO-listed Kasbah of Aït Benhaddou — a historic Hollywood filming location',
      'Magical sunset camel ride over the golden Erg Chebbi dunes near Merzouga',
      'Night under the stars at a luxury desert camp with Berber drum music and fireside storytelling',
      'Scenic journey through the Ziz Gorges and vast Ziz Oasis palm groves',
      'Encounter wild Barbary macaques in the ancient cedar forests of the Middle Atlas',
      'Drop-off directly at your hotel or Riad in the cultural capital of Fes',
    ],
    itinerary: [
      mkDay(1, DAY_MARRAKECH_ATLAS_DADES),
      mkDay(2, DAY_DADES_TODRA_MERZOUGA),
      mkDay(3, DAY_MERZOUGA_TO_FES_3DAY),
    ],
  },
  {
    slug: '4-days-marrakech-to-fes',
    highlights: [
      "Cross the High Atlas Mountains via the Tizi n'Tichka pass (2,260 m) with panoramic views",
      'Walking tour of the UNESCO-listed Kasbah of Aït Benhaddou — a historic Hollywood filming location',
      'Magical sunset camel ride over the golden Erg Chebbi dunes near Merzouga',
      'Night under the stars at a luxury desert camp with Berber drum music',
      'Full-day 4x4 desert excursion across the black stone desert and rolling dunes',
      'Share traditional mint tea with authentic nomadic Berber families in the Sahara',
      'Live Gnawa spiritual music performance in the ancient village of Khamlia',
      'Visit the seasonal flamingo lake of Dayet Srij (conditions permitting)',
      'Sandboarding on the towering peaks of Erg Chebbi',
      'Drop-off at your hotel or Riad in the cultural capital of Fes',
    ],
    itinerary: [
      mkDay(1, DAY_MARRAKECH_ATLAS_DADES),
      mkDay(2, DAY_DADES_TODRA_MERZOUGA),
      mkDay(3, DAY_MERZOUGA_EXCURSION),
      mkDay(4, DAY_MERZOUGA_TO_FES_4DAY),
    ],
  },
  {
    slug: '7-days-marrakech-casablanca-via-fes',
    highlights: [
      "Cross the High Atlas Mountains via the Tizi n'Tichka pass (2,260 m)",
      'Walking tour of the UNESCO-listed Kasbah of Aït Benhaddou',
      'Magical sunset camel ride over the golden Erg Chebbi dunes near Merzouga',
      'Night under the stars at a luxury desert camp with Berber drum music',
      'Full-day 4x4 Sahara excursion — nomadic families, Gnawa music, and the flamingo lake',
      'Expert-guided walking tour of the UNESCO Fes Medina — 9,000 alleyways and the Chouara Tannery',
      'Al-Qarawiyyin University, the oldest continually operating university in the world',
      'Roman ruins of Volubilis (UNESCO) with beautifully preserved floor mosaics',
      'Wander the iconic blue alleyways of Chefchaouen in the Rif Mountains',
      'Hassan Tower and Mausoleum of Mohammed V in the capital Rabat',
      'Drop-off at your hotel or the airport in Casablanca',
    ],
    itinerary: [
      mkDay(1, DAY_MARRAKECH_ATLAS_DADES),
      mkDay(2, DAY_DADES_TODRA_MERZOUGA),
      mkDay(3, DAY_MERZOUGA_EXCURSION),
      mkDay(4, DAY_MERZOUGA_TO_FES_7DAY),
      mkDay(5, DAY_FES_WALKING_TOUR),
      mkDay(6, DAY_FES_TO_CHEFCHAOUEN),
      mkDay(7, DAY_CHEFCHAOUEN_TO_CASABLANCA),
    ],
  },
  {
    slug: '9-days-marrakech-to-casablanca',
    highlights: [
      'Two full days of guided sightseeing in Marrakech: Bahia Palace, Koutoubia Mosque, Saadian Tombs, and vibrant souks',
      "Cross the High Atlas Mountains via the Tizi n'Tichka pass (2,260 m)",
      'Walking tour of the UNESCO-listed Kasbah of Aït Benhaddou',
      'Magical sunset camel ride over the golden Erg Chebbi dunes near Merzouga',
      'Night under the stars at a luxury desert camp with Berber drum music',
      'Full-day 4x4 Sahara excursion — nomadic families, Gnawa music, and the flamingo lake',
      'Expert-guided walking tour of the UNESCO Fes Medina — 9,000 alleyways and the Chouara Tannery',
      'Roman ruins of Volubilis (UNESCO) with beautifully preserved floor mosaics',
      'Wander the iconic blue alleyways of Chefchaouen in the Rif Mountains',
      'Hassan Tower and Mausoleum of Mohammed V in Rabat, then drop-off in Casablanca',
    ],
    itinerary: [
      mkDay(1, DAY_ARRIVAL_MARRAKECH),
      mkDay(2, DAY_MARRAKECH_SIGHTSEEING),
      mkDay(3, DAY_MARRAKECH_ATLAS_DADES),
      mkDay(4, DAY_DADES_TODRA_MERZOUGA),
      mkDay(5, DAY_MERZOUGA_EXCURSION),
      mkDay(6, DAY_MERZOUGA_TO_FES_7DAY),
      mkDay(7, DAY_FES_WALKING_TOUR),
      mkDay(8, DAY_FES_TO_CHEFCHAOUEN),
      mkDay(9, { ...DAY_CHEFCHAOUEN_TO_CASABLANCA, title: 'Chefchaouen to Casablanca via Capital Rabat and Drop-off' }),
    ],
  },
  {
    slug: '12-days-ultimate-morocco-circuit',
    highlights: [
      'Guided sightseeing in Marrakech: Bahia Palace, Koutoubia Mosque, Saadian Tombs, and the colorful souks',
      "Cross the High Atlas Mountains via the Tizi n'Tichka pass (2,260 m)",
      'Walking tour of the UNESCO-listed Kasbah of Aït Benhaddou',
      'Magical sunset camel ride over the golden Erg Chebbi dunes near Merzouga',
      'Night under the stars at a luxury desert camp with Berber drum music',
      'Full-day 4x4 Sahara excursion — nomadic families, Gnawa music, and the seasonal flamingo lake',
      'Expert-guided walking tour of the UNESCO Fes Medina — Chouara Tannery and Al-Qarawiyyin University',
      'Roman ruins of Volubilis (UNESCO) with vibrant floor mosaics',
      'Charming blue alleyways of Chefchaouen and sunset from a rooftop cafe',
      'Hassan II Mosque in Casablanca — one of the world\'s largest, built over the Atlantic Ocean',
      'UNESCO-listed fortified port town of Essaouira with its vibrant art scene and sea breezes',
      "Visit a women's Argan oil cooperative and spot tree-climbing goats on the return to Marrakech",
    ],
    itinerary: [
      mkDay(1, DAY_ARRIVAL_MARRAKECH),
      mkDay(2, DAY_MARRAKECH_SIGHTSEEING),
      mkDay(3, DAY_MARRAKECH_ATLAS_DADES),
      mkDay(4, DAY_DADES_TODRA_MERZOUGA),
      mkDay(5, DAY_MERZOUGA_EXCURSION),
      mkDay(6, DAY_MERZOUGA_TO_FES_7DAY),
      mkDay(7, DAY_FES_WALKING_TOUR),
      mkDay(8, DAY_FES_TO_CHEFCHAOUEN),
      mkDay(9, DAY_CHEFCHAOUEN_TO_CASABLANCA_OVERNIGHT),
      mkDay(10, DAY_CASABLANCA_ESSAOUIRA),
      mkDay(11, DAY_ESSAOUIRA_LEISURE),
      mkDay(12, DAY_ESSAOUIRA_TO_MARRAKECH),
    ],
  },
]

// ─── Patch each tour ─────────────────────────────────────────────────────────

for (const tourData of tours) {
  // Fetch current document to get _id and check mainImage
  const doc = await client.fetch(
    `*[_type == "tour" && slug.current == $slug][0]{ _id, mainImage }`,
    { slug: tourData.slug }
  )

  if (!doc) {
    console.log(`❌  NOT FOUND: ${tourData.slug}`)
    continue
  }

  const patch = { itinerary: tourData.itinerary, highlights: tourData.highlights }

  // Set hero image if missing
  if (!doc.mainImage && fallbackImage) {
    patch.mainImage = fallbackImage
    console.log(`   (adding fallback mainImage)`)
  }

  await client.patch(doc._id).set(patch).commit()
  console.log(`✅  ${tourData.slug}  — ${tourData.itinerary.length} days, ${tourData.highlights.length} highlights${patch.mainImage ? ', + hero image' : ''}`)
}

console.log('\nDone.')
