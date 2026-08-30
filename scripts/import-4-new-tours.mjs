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

const tours = [
  // ─── 3-Day Marrakech to Fes ───────────────────────────────────────────────
  {
    _type: 'tour',
    title: '3 Days Sahara Desert Tour: Marrakech to Fes',
    slug: { _type: 'slug', current: '3-days-marrakech-to-fes' },
    departureCity: 'marrakech',
    duration: '3 Days',
    publishedAt: new Date().toISOString(),
    excerpt:
      'The ultimate 3-day express route from Marrakech to Fes — cross the High Atlas, walk through the UNESCO kasbah of Ait Benhaddou, ride camels at sunset over Erg Chebbi, then journey north through the Ziz Oasis and cedar forests to Fes.',
    focusAreas: ['culture', 'adventure', 'photography', 'sunsets'],
    body: `Day 1: Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges
An early morning pickup from your Marrakech accommodation launches your Morocco desert tour. We cross the breathtaking High Atlas Mountains via the famous Tizi n'Tichka Pass at 2,260 metres, with panoramic views over rugged peaks and terraced Berber villages. Descending the eastern slopes we reach the UNESCO World Heritage-listed Kasbah of Ait Benhaddou — a masterpiece of earthen architecture and celebrated Hollywood filming location — for a guided walking tour. We then drive through Ouarzazate, the "Hollywood of Africa," and continue along the Road of a Thousand Kasbahs through the fragrant Roses Valley before winding up into the dramatic Dades Gorges.
Overnight in Dades Paradise or Dar Blues (Half Board)

Day 2: Dades Gorges → Todra Gorges → Merzouga Sahara Desert
After a hearty breakfast, travel east to the magnificent Todra Gorges, walking beneath 300-metre limestone cliff walls. Journey deeper into the Sahara to reach the Erg Chebbi dunes in Merzouga. Embark on a magical sunset camel ride across the golden dunes, then arrive at your luxury desert camp for a traditional Moroccan dinner, Berber music around the campfire, and star-gazing under a crystal-clear Saharan sky.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 3: Merzouga → Ziz Oasis & Gorges → Cedar Forest → Fes Drop-off
Wake early to catch sunrise over the dunes before breakfast at camp. Drive north through the stunning Ziz Gorges and the sprawling green palm groves of the Ziz Oasis — an incredible contrast against the red desert rocks. Ascend into the Middle Atlas and stop in the alpine town of Ifrane, known as the "Switzerland of Morocco," to visit the ancient cedar forests and meet the famous wild Barbary monkeys. Your driver delivers you safely to your hotel or riad in Fes, the cultural capital of Morocco.`,
    itinerary: [
      {
        day: 'Day 1',
        title: 'Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges',
        description:
          'Depart Marrakech early and cross the Tizi n\'Tichka Pass at 2,260 metres in the High Atlas Mountains. Visit the UNESCO-listed Kasbah of Ait Benhaddou, drive through Ouarzazate, pass the fragrant Roses Valley, and wind into the dramatic rock formations of the Dades Gorges.',
        overnight: 'Dades Paradise or Dar Blues',
      },
      {
        day: 'Day 2',
        title: 'Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp',
        description:
          'Walk beneath the 300-metre limestone walls of the Todra Gorges, then journey to the Erg Chebbi dunes in Merzouga. Ride camels at sunset across the golden dunes and arrive at your luxury desert camp for a traditional Moroccan dinner, Berber music, and star-gazing.',
        overnight: 'Tiziri Camp or Sahara Eden Camp',
      },
      {
        day: 'Day 3',
        title: 'Merzouga → Ziz Oasis & Gorges → Cedar Forest of Ifrane → Fes Drop-off',
        description:
          'Catch sunrise over the dunes before driving north through the Ziz Gorges and Ziz Oasis palm groves. Stop in Ifrane to visit the cedar forest and see wild Barbary monkeys, then continue to Fes for drop-off at your hotel or riad.',
        overnight: 'Drop-off in Fes',
      },
    ],
    included: [
      'Private transport in an air-conditioned 4x4 or minivan for all 3 days',
      '2 nights accommodation (mountain guesthouse and luxury desert camp)',
      'Breakfast daily',
      'Dinner on Days 1 and 2 (half board)',
      'Sunset camel ride at Erg Chebbi',
      'Guided walking tour at Ait Benhaddou',
      'Airport/hotel pick-up in Marrakech',
      'Drop-off at hotel or riad in Fes',
    ],
    notIncluded: [
      'Lunches',
      'Beverages (tea, soft drinks, bottled water, alcohol)',
      'Entrance fees (Ait Benhaddou, etc.)',
      'Tips for guides and drivers',
      'Personal expenses',
    ],
    seoKeywords:
      '3-day Marrakech to Fes tour, Marrakech Fes desert tour, Erg Chebbi camel ride, Ait Benhaddou tour, Todra Gorges, Ziz Oasis, Morocco 3-day desert tour, Sahara from Marrakech to Fes',
  },

  // ─── 4-Day Marrakech to Fes ───────────────────────────────────────────────
  {
    _type: 'tour',
    title: '4 Days Sahara Desert Tour: Marrakech to Fes',
    slug: { _type: 'slug', current: '4-days-marrakech-to-fes' },
    departureCity: 'marrakech',
    duration: '4 Days',
    publishedAt: new Date().toISOString(),
    excerpt:
      '4 days from Marrakech to Fes with a full day in the Sahara — High Atlas, Ait Benhaddou, Todra Gorges, camel ride at Erg Chebbi, 4x4 desert excursion with nomads and Gnawa music, Ziz Oasis, cedar forests, and Fes drop-off.',
    focusAreas: ['culture', 'adventure', 'photography', 'music', 'sunsets'],
    body: `Day 1: Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges
An early morning pickup from your Marrakech accommodation begins this premier Morocco desert tour. Cross the High Atlas Mountains via the Tizi n'Tichka Pass (2,260 m), with panoramic views of rugged peaks and terraced Berber villages. Visit the UNESCO World Heritage-listed Kasbah of Ait Benhaddou for a walking tour, drive through Ouarzazate ("Hollywood of Africa"), pass through the fragrant Roses Valley, and wind into the dramatic Dades Gorges.
Overnight in Dades Paradise or Dar Blues (Half Board)

Day 2: Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp
After a hearty breakfast, visit the magnificent Todra Gorges — a narrow canyon with 300-metre limestone walls. Journey to the Erg Chebbi dunes in Merzouga and embark on a magical sunset camel ride across the golden dunes. Arrive at your luxury desert camp for a traditional Moroccan dinner, Berber music around the campfire, and star-gazing under the Saharan sky.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 3: Complete Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake
A full day dedicated to the wonders of the Sahara. A thrilling 4x4 excursion crosses the black stone desert to share mint tea with nomadic families in traditional Berber tents. Visit Khamlia village for captivating Gnawa music performed by local musicians whose ancestral heritage spans centuries. Explore Dayet Srij — the seasonal flamingo lake where flocks of pink flamingos gather against golden dunes. In the afternoon, try sandboarding the massive peaks of Erg Chebbi or simply relax before another evening of campfire music and star-gazing.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 4: Merzouga → Ziz Oasis & Gorges → Cedar Forest → Fes Drop-off
Watch sunrise over the dunes before breakfast at camp. Drive north through the stunning Ziz Gorges and the lush Ziz Oasis palm groves. Ascend into the Middle Atlas and stop in alpine Ifrane to visit the ancient cedar forests and meet wild Barbary monkeys. Your driver delivers you safely to your hotel or riad in Fes.`,
    itinerary: [
      {
        day: 'Day 1',
        title: 'Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges',
        description:
          'Depart Marrakech early and cross the Tizi n\'Tichka Pass at 2,260 metres. Visit the UNESCO kasbah of Ait Benhaddou, drive through Ouarzazate and the Roses Valley, and arrive at the Dades Gorges.',
        overnight: 'Dades Paradise or Dar Blues',
      },
      {
        day: 'Day 2',
        title: 'Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp',
        description:
          'Walk beneath the towering 300-metre limestone walls of the Todra Gorges, then journey to the Erg Chebbi dunes in Merzouga for a sunset camel ride and your first night at the luxury desert camp.',
        overnight: 'Tiziri Camp or Sahara Eden Camp',
      },
      {
        day: 'Day 3',
        title: 'Full Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake',
        description:
          'A full day in the Sahara: 4x4 excursion across the black desert, mint tea with nomadic families, Gnawa music in Khamlia, flamingo lake at Dayet Srij, sandboarding on Erg Chebbi, and another night under the stars.',
        overnight: 'Tiziri Camp or Sahara Eden Camp',
      },
      {
        day: 'Day 4',
        title: 'Merzouga → Ziz Oasis & Gorges → Cedar Forest of Ifrane → Fes Drop-off',
        description:
          'Sunrise over the dunes then drive north through the Ziz Gorges, Ziz Oasis palm groves, and the cedar forests of Ifrane (Barbary monkeys). Drop-off at your hotel or riad in Fes.',
        overnight: 'Drop-off in Fes',
      },
    ],
    included: [
      'Private transport in an air-conditioned 4x4 or minivan for all 4 days',
      '3 nights accommodation (mountain guesthouse and 2 nights luxury desert camp)',
      'Breakfast daily',
      'Dinner on Days 1, 2, and 3 (half board)',
      'Sunset camel ride at Erg Chebbi',
      '4x4 desert excursion in Merzouga',
      'Guided walking tour at Ait Benhaddou',
      'Pick-up in Marrakech and drop-off in Fes',
    ],
    notIncluded: [
      'Lunches',
      'Beverages (tea, soft drinks, bottled water, alcohol)',
      'Entrance fees',
      'Tips for guides and drivers',
      'Personal expenses',
    ],
    seoKeywords:
      '4-day Marrakech to Fes tour, Marrakech Fes desert 4 days, Erg Chebbi 4x4 excursion, nomad tea Merzouga, Gnawa music Khamlia, flamingo lake Merzouga, Todra Gorges, Ait Benhaddou, Morocco Sahara tour',
  },

  // ─── 7-Day Marrakech to Casablanca via Fes ───────────────────────────────
  {
    _type: 'tour',
    title: '7 Days Morocco Desert Tour: Marrakech to Casablanca via Fes',
    slug: { _type: 'slug', current: '7-days-marrakech-casablanca-via-fes' },
    departureCity: 'marrakech',
    duration: '7 Days',
    publishedAt: new Date().toISOString(),
    excerpt:
      '7 days from Marrakech to Casablanca via the Sahara and Imperial cities — High Atlas, Ait Benhaddou, Erg Chebbi dunes, 4x4 desert excursion, Fes medina tour, Meknes, Volubilis Roman ruins, blue Chefchaouen, and imperial Rabat.',
    focusAreas: ['culture', 'adventure', 'photography', 'music', 'sunsets'],
    body: `Day 1: Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges
Early morning pickup from Marrakech. Cross the High Atlas via the Tizi n'Tichka Pass (2,260 m), stopping at the UNESCO World Heritage-listed Kasbah of Ait Benhaddou for a guided walking tour. Drive through Ouarzazate, pass the fragrant Roses Valley, and wind into the Dades Gorges.
Overnight in Dades Paradise or Dar Blues (Half Board)

Day 2: Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp
Travel east to the Todra Gorges, walking beneath 300-metre limestone cliff walls. Journey to the Erg Chebbi dunes in Merzouga for a sunset camel ride across the golden sand. Arrive at your luxury desert camp for a Moroccan dinner, Berber music around the campfire, and star-gazing.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 3: Full Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake
A full day exploring the Sahara by 4x4. Visit nomadic families in traditional Berber tents for mint tea, experience spiritual Gnawa music in Khamlia village, and explore the seasonal flamingo lake of Dayet Srij. Try sandboarding the giant dunes of Erg Chebbi before another evening of campfire music and star-gazing.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 4: Merzouga → Ziz Gorges → Midelt → Cedar Forest of Azrou → Fes
Watch sunrise over the dunes before breakfast at camp. Drive north through the Ziz Gorges and Ziz Oasis palm groves, stop in Midelt for lunch, and pass through the cedar forest of Azrou (wild Barbary monkeys). After a brief stop in alpine Ifrane, descend into the ancient imperial city of Fes.
Overnight in Riad Fez Mahal or La Perle de La Medina (Bed & Breakfast)

Day 5: Fes Old City Walking Tour with a Local Guide
A full guided walking tour of the Fes Medina — a UNESCO World Heritage site and one of the world's largest walled cities. Explore the Royal Palace gates, vibrant spice markets, the famous Chouara Tannery, the Al-Qarawiyyin University, and finish with a panoramic view from the Merenid Tombs.
Overnight in Riad Fez Mahal or La Perle de La Medina (Bed & Breakfast)

Day 6: Fes → Meknes → Volubilis → Chefchaouen
Drive to the imperial city of Meknes to admire the grand Bab Mansour gate, then explore the UNESCO-listed Roman ruins of Volubilis with a local guide. Wind through the Rif Mountains to the famous blue-washed city of Chefchaouen for a free afternoon exploring the tranquil blue alleys and local handicraft shops.
Overnight in Dar Echchaouen or Riad Cherifa (Bed & Breakfast)

Day 7: Chefchaouen → Rabat → Casablanca Drop-off
Enjoy breakfast over the blue town before heading to the Atlantic coast. Stop in imperial Rabat to visit the Royal Palace Mechouar, the Hassan Tower and Mausoleum of Mohammed V, and the Kasbah of the Udayas overlooking the ocean. After lunch, drive the coast to Casablanca for drop-off at your hotel or airport — the end of your grand 7-day expedition.`,
    itinerary: [
      {
        day: 'Day 1',
        title: 'Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges',
        description:
          'Cross the Tizi n\'Tichka Pass in the High Atlas and visit the UNESCO kasbah of Ait Benhaddou. Drive through Ouarzazate and the Roses Valley to the Dades Gorges.',
        overnight: 'Dades Paradise or Dar Blues',
      },
      {
        day: 'Day 2',
        title: 'Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp',
        description:
          'Walk the Todra Gorges beneath 300-metre limestone walls, then arrive at Erg Chebbi for a sunset camel ride and first night at the luxury desert camp.',
        overnight: 'Tiziri Camp or Sahara Eden Camp',
      },
      {
        day: 'Day 3',
        title: 'Full Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake',
        description:
          '4x4 excursion across the Sahara: mint tea with nomads, Gnawa music in Khamlia, flamingo lake at Dayet Srij, sandboarding on Erg Chebbi, and a second night under the stars.',
        overnight: 'Tiziri Camp or Sahara Eden Camp',
      },
      {
        day: 'Day 4',
        title: 'Merzouga → Ziz Gorges → Midelt → Cedar Forest of Azrou → Fes',
        description:
          'Drive north through the Ziz Gorges and Ziz Oasis, stop in Midelt for lunch, and visit the cedar forest of Azrou (wild Barbary monkeys) before arriving in Fes.',
        overnight: 'Riad Fez Mahal or La Perle de La Medina',
      },
      {
        day: 'Day 5',
        title: 'Fes Old City Walking Tour with a Local Guide',
        description:
          'Full guided tour of the UNESCO-listed Fes Medina: Royal Palace gates, Chouara Tannery, Al-Qarawiyyin University, spice markets, and a panoramic view from the Merenid Tombs.',
        overnight: 'Riad Fez Mahal or La Perle de La Medina',
      },
      {
        day: 'Day 6',
        title: 'Fes → Meknes → Volubilis Roman Ruins → Chefchaouen',
        description:
          'Visit the imperial city of Meknes (Bab Mansour gate), then the UNESCO-listed Roman ruins of Volubilis. Wind through the Rif Mountains to blue-painted Chefchaouen.',
        overnight: 'Dar Echchaouen or Riad Cherifa',
      },
      {
        day: 'Day 7',
        title: 'Chefchaouen → Rabat → Casablanca Drop-off',
        description:
          'Drive to Rabat to visit the Royal Palace, Hassan Tower, Mausoleum of Mohammed V, and Kasbah of the Udayas. Continue along the Atlantic coast to Casablanca for drop-off at hotel or airport.',
        overnight: 'Drop-off in Casablanca',
      },
    ],
    included: [
      'Private transport in an air-conditioned 4x4 or minivan for all 7 days',
      '6 nights accommodation (mountain guesthouse, 2 nights luxury desert camp, 2 nights riad in Fes, 1 night in Chefchaouen)',
      'Breakfast daily',
      'Dinner on Days 1, 2, and 3 (half board)',
      'Sunset camel ride at Erg Chebbi',
      '4x4 desert excursion in Merzouga',
      'Expert local guides in Ait Benhaddou, Fes, and Volubilis',
      'Pick-up in Marrakech and drop-off in Casablanca',
    ],
    notIncluded: [
      'Lunches',
      'Beverages (tea, soft drinks, bottled water, alcohol)',
      'Entrance fees (Ait Benhaddou, Volubilis, etc.)',
      'Tips for guides and drivers',
      'Personal expenses',
    ],
    seoKeywords:
      '7-day Morocco tour Marrakech to Casablanca, Marrakech Fes Casablanca tour, Morocco imperial cities tour, Erg Chebbi desert tour, Chefchaouen blue city, Volubilis Roman ruins, Fes medina tour, Morocco 7-day itinerary',
  },

  // ─── 12-Day Ultimate Morocco Circuit ────────────────────────────────────
  {
    _type: 'tour',
    title: '12 Days Ultimate Morocco Circuit: Marrakech, Sahara, Fes & Essaouira',
    slug: { _type: 'slug', current: '12-days-ultimate-morocco-circuit' },
    departureCity: 'marrakech',
    duration: '12 Days',
    publishedAt: new Date().toISOString(),
    excerpt:
      'The ultimate 12-day Morocco grand circuit starting and ending in Marrakech — High Atlas, Ait Benhaddou, Sahara dunes, 4x4 desert excursion, Fes medina, Meknes, Volubilis, blue Chefchaouen, imperial Rabat, Casablanca, and the bohemian Atlantic coast of Essaouira.',
    focusAreas: ['culture', 'adventure', 'photography', 'music', 'sunsets'],
    body: `Day 1: Arrival in Marrakech
Arrive in the vibrant Red City of Marrakech. Your private driver meets you at the airport and transfers you to your boutique riad in the heart of the ancient medina. Spend the rest of the day relaxing over traditional Moroccan mint tea before exploring the evening energy of Jemaa el-Fnaa square.
Overnight in Riad Nessma and Spa or Riad Aslal (Bed & Breakfast)

Day 2: Marrakech Sightseeing with a Local Guide
After breakfast, your expert local guide leads a comprehensive tour of Marrakech's iconic landmarks — the spectacular Bahia Palace, the Koutoubia Mosque, and the historic Saadian Tombs. Navigate the winding souks filled with spices, textiles, and artisan workshops before a free evening in the city.
Overnight in Riad Nessma and Spa or Riad Aslal (Bed & Breakfast)

Day 3: Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges
Leave Marrakech early and cross the High Atlas Mountains via the Tizi n'Tichka Pass (2,260 m). Visit the UNESCO-listed Kasbah of Ait Benhaddou for a guided walking tour, drive through Ouarzazate, pass through the fragrant Roses Valley, and wind into the dramatic Dades Gorges.
Overnight in Dades Paradise or Dar Blues (Half Board)

Day 4: Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp
Travel east to the Todra Gorges beneath 300-metre limestone cliff walls, then journey to the Erg Chebbi dunes in Merzouga. Embark on a magical sunset camel ride across the golden dunes before arriving at your luxury desert camp for a Moroccan dinner, Berber music around the campfire, and star-gazing.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 5: Full Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake
A full day immersed in the Sahara. A 4x4 excursion takes you across the black stone desert to share mint tea with nomadic families in traditional Berber tents. Visit Khamlia village for captivating Gnawa music, explore the seasonal flamingo lake of Dayet Srij, and try sandboarding the giant dunes of Erg Chebbi.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 6: Merzouga → Ziz Gorges → Midelt → Cedar Forest of Azrou → Fes
Watch sunrise over the dunes before breakfast at camp. Drive north through the Ziz Gorges and Ziz Oasis palm groves, stop in Midelt for lunch, pass through the cedar forest of Azrou (wild Barbary monkeys), and descend into the ancient imperial city of Fes.
Overnight in Riad Fez Mahal or La Perle de La Medina (Bed & Breakfast)

Day 7: Fes Old City Walking Tour with a Local Guide
Your expert local guide leads a full walking tour of the Fes Medina — a UNESCO World Heritage site and one of the world's largest walled cities. Explore the Royal Palace gates, Chouara Tannery, Al-Qarawiyyin University, spice markets, and finish with a panoramic view from the Merenid Tombs.
Overnight in Riad Fez Mahal or La Perle de La Medina (Bed & Breakfast)

Day 8: Fes → Meknes → Volubilis → Chefchaouen
Drive to the imperial city of Meknes to admire the grand Bab Mansour gate, then explore the UNESCO-listed Roman ruins of Volubilis with a local guide. Wind through the Rif Mountains to reach the famous blue-washed city of Chefchaouen for an afternoon exploring its tranquil blue alleys and local handicraft shops.
Overnight in Dar Echchaouen or Riad Cherifa (Bed & Breakfast)

Day 9: Chefchaouen → Rabat → Casablanca
Enjoy breakfast over the blue town, then drive to imperial Rabat to visit the Royal Palace Mechouar, Hassan Tower, Mausoleum of Mohammed V, and the Kasbah of the Udayas overlooking the ocean. Continue along the Atlantic coast to Casablanca for a relaxing evening on the coast or a walk through the downtown boulevards.
Overnight in Val d'Anfa Hotel or Casa Diamond (Bed & Breakfast)

Day 10: Casablanca → Hassan II Mosque → Essaouira
After breakfast, visit the magnificent Hassan II Mosque — one of the largest in the world, built directly over the Atlantic Ocean. Then travel southwest along the coast to the bohemian, UNESCO-listed fortified port town of Essaouira, famous for its sea breezes, whitewashed houses, and vibrant art scene.
Overnight in Riad Mimouna or Riad Malaika (Bed & Breakfast)

Day 11: Essaouira at Leisure
A free day to explore at your own pace. Walk the historic Skala de la Ville ramparts where brass cannons face the ocean, visit the traditional fishing port, browse the medina for thuya wood carvings and handmade silver jewellery, relax at a beachside café, or watch an Atlantic sunset over the Mogador islands.
Overnight in Riad Mimouna or Riad Malaika (Bed & Breakfast)

Day 12: Essaouira → Argan Cooperatives → Marrakech Drop-off
After a leisurely morning, leave the coast and drive east toward Marrakech. Pass through rolling plains lined with Argan trees — spot the famous tree-climbing goats and stop at a women's cooperative producing organic Argan oil. Arrive in Marrakech for drop-off at your hotel, riad, or airport — the end of your grand 12-day Moroccan expedition.`,
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Marrakech',
        description:
          'Airport pick-up and transfer to your boutique riad in the medina. Relax over mint tea and explore the evening energy of Jemaa el-Fnaa square.',
        overnight: 'Riad Nessma and Spa or Riad Aslal',
      },
      {
        day: 'Day 2',
        title: 'Marrakech Sightseeing with a Local Guide',
        description:
          'Guided tour of Bahia Palace, Koutoubia Mosque, Saadian Tombs, and the souks. Free evening to explore the city.',
        overnight: 'Riad Nessma and Spa or Riad Aslal',
      },
      {
        day: 'Day 3',
        title: 'Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges',
        description:
          'Cross the Tizi n\'Tichka Pass in the High Atlas. Walking tour at UNESCO-listed Ait Benhaddou. Drive through Ouarzazate and the Roses Valley to the Dades Gorges.',
        overnight: 'Dades Paradise or Dar Blues',
      },
      {
        day: 'Day 4',
        title: 'Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp',
        description:
          'Walk the Todra Gorges beneath 300-metre limestone walls. Sunset camel ride at Erg Chebbi and first night at the luxury desert camp.',
        overnight: 'Tiziri Camp or Sahara Eden Camp',
      },
      {
        day: 'Day 5',
        title: 'Full Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake',
        description:
          '4x4 desert excursion: mint tea with nomads, Gnawa music in Khamlia, flamingo lake at Dayet Srij, and sandboarding on Erg Chebbi.',
        overnight: 'Tiziri Camp or Sahara Eden Camp',
      },
      {
        day: 'Day 6',
        title: 'Merzouga → Ziz Gorges → Midelt → Cedar Forest of Azrou → Fes',
        description:
          'Sunrise over the dunes, then drive north through the Ziz Gorges, Ziz Oasis, cedar forest of Azrou (Barbary monkeys), and down into Fes.',
        overnight: 'Riad Fez Mahal or La Perle de La Medina',
      },
      {
        day: 'Day 7',
        title: 'Fes Old City Walking Tour with a Local Guide',
        description:
          'Guided tour of the UNESCO Fes Medina: Royal Palace gates, Chouara Tannery, Al-Qarawiyyin University, and panoramic view from the Merenid Tombs.',
        overnight: 'Riad Fez Mahal or La Perle de La Medina',
      },
      {
        day: 'Day 8',
        title: 'Fes → Meknes → Volubilis Roman Ruins → Chefchaouen',
        description:
          'Meknes grand Bab Mansour gate, UNESCO Roman ruins at Volubilis, then wind through the Rif Mountains to blue-painted Chefchaouen.',
        overnight: 'Dar Echchaouen or Riad Cherifa',
      },
      {
        day: 'Day 9',
        title: 'Chefchaouen → Rabat → Casablanca',
        description:
          'Drive to Rabat for the Royal Palace, Hassan Tower, Mausoleum of Mohammed V, and Kasbah of the Udayas. Continue to Casablanca for a coastal evening.',
        overnight: "Val d'Anfa Hotel or Casa Diamond",
      },
      {
        day: 'Day 10',
        title: 'Casablanca → Hassan II Mosque → Essaouira',
        description:
          'Visit the Hassan II Mosque built over the Atlantic Ocean, then drive southwest to the bohemian UNESCO-listed port town of Essaouira.',
        overnight: 'Riad Mimouna or Riad Malaika',
      },
      {
        day: 'Day 11',
        title: 'Essaouira at Leisure',
        description:
          'Free day to explore the ramparts, fishing port, medina, beaches, and seafood restaurants of Essaouira at your own pace.',
        overnight: 'Riad Mimouna or Riad Malaika',
      },
      {
        day: 'Day 12',
        title: 'Essaouira → Argan Cooperatives → Marrakech Drop-off',
        description:
          'Drive east through rolling Argan plains — spot tree-climbing goats and visit a women\'s Argan oil cooperative. Drop-off in Marrakech at your hotel, riad, or airport.',
        overnight: 'Drop-off in Marrakech',
      },
    ],
    included: [
      'Private transport in an air-conditioned 4x4 or minivan for all 12 days',
      '11 nights accommodation (riads, mountain guesthouse, 2 nights luxury desert camp, riad in Fes, Chefchaouen, Casablanca, 2 nights in Essaouira)',
      'Breakfast daily',
      'Dinner on Days 3, 4, and 5 (half board)',
      'Airport pick-up in Marrakech on Day 1',
      'Sunset camel ride at Erg Chebbi',
      '4x4 desert excursion in Merzouga',
      'Expert local guides in Marrakech, Ait Benhaddou, Fes, and Volubilis',
      'Drop-off at hotel, riad, or airport in Marrakech on Day 12',
    ],
    notIncluded: [
      'Lunches',
      'Beverages (tea, soft drinks, bottled water, alcohol)',
      'Entrance fees (Bahia Palace, Saadian Tombs, Volubilis, Hassan II Mosque, etc.)',
      'Tips for guides and drivers',
      'Personal expenses',
      'International flights',
      'Travel insurance',
    ],
    seoKeywords:
      '12-day Morocco tour, Morocco ultimate circuit, Marrakech Sahara Fes Chefchaouen Essaouira tour, Morocco grand tour 12 days, Erg Chebbi desert tour, Morocco imperial cities, Essaouira Atlantic coast, Morocco private tour 12 days',
  },
]

for (const tour of tours) {
  console.log(`\nCreating: ${tour.title}`)
  const result = await client.create(tour)
  console.log(`  Created: ${result._id} | slug: ${tour.slug.current}`)
}
console.log('\nAll done.')
