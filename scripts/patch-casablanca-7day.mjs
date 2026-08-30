import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })
import { getSanityClient } from './utils/sanity-client.mjs'

const client = getSanityClient()
const TOUR_ID = '27997c0e-2277-4c75-be21-15cbac336af0'

const patch = {
  excerpt: 'A classic 7-day journey from Casablanca through Morocco\'s Imperial Cities to the golden dunes of the Sahara, ending in the legendary city of Marrakech. Experience the medieval medina of Fes, camel trekking at Erg Chebbi, ancient kasbahs, and the dramatic landscapes of the High Atlas Mountains.',

  body: `This 7-day tour from Casablanca to Marrakech is one of the great Moroccan journeys — a route that takes you from the Atlantic coast through Morocco's most storied imperial cities, across the dramatic landscapes of the Middle Atlas Mountains, and deep into the golden heart of the Sahara Desert before finishing in the vibrant rose city of Marrakech.

Departing from Casablanca, you will visit the breathtaking Hassan II Mosque — one of the largest in the world — before heading north to Rabat, Morocco's elegant administrative capital with its UNESCO-listed medina and royal palace. From there the route leads to Fes, the ancient spiritual and intellectual capital of Morocco, where a full day of guided exploration reveals the medieval world of the Fes el-Bali medina: the Chouara tanneries, the Bou Inania Medersa, the spice souks, and the ancient Al-Qarawiyyin mosque-university.

Leaving Fes, the road climbs through the cedar forests of the Middle Atlas — home to wild Barbary macaques — before descending into the arid pre-Saharan plains and arriving at Merzouga, gateway to the spectacular Erg Chebbi dunes. A sunset camel trek and overnight in a traditional Berber desert camp, sleeping under an extraordinary canopy of stars, is the unforgettable centrepiece of this journey.

The final days follow the legendary Road of a Thousand Kasbahs southward: through the spectacular Todgha Gorges, the lush Dades Valley, and the UNESCO-listed kasbah of Aït Ben Haddou, before crossing the High Atlas Mountains via the Tizi n'Tichka pass and descending into Marrakech — a city of souks, palaces, and the legendary Jemaa el-Fna square.`,

  included: [
    'Private air-conditioned vehicle and experienced driver throughout',
    'English-speaking local guide',
    '6 nights accommodation (riads in cities, traditional desert camp)',
    'Daily breakfast and selected dinners',
    'Camel trek at Erg Chebbi dunes',
    'Guided tour of Fes medina',
    'All transport between destinations',
    'Hassan II Mosque exterior visit',
    'Berber music and dinner at desert camp',
  ],

  notIncluded: [
    'International flights',
    'Travel insurance',
    'Lunches and dinners not specified in program',
    'Personal expenses and shopping',
    'Tips for guides and drivers',
    'Entry fees to museums and monuments (approx. €15–25 total)',
    'Optional 4x4 desert excursion (available at extra cost)',
  ],

  itinerary: [
    {
      day: 'Day 1',
      title: 'Casablanca to Fes via Rabat',
      description: 'Your journey begins in Casablanca, Morocco\'s cosmopolitan economic capital. Your guide will collect you from your hotel and take you first to the Hassan II Mosque — an architectural masterpiece rising dramatically from the Atlantic shoreline, with a 210-metre minaret that is the tallest religious structure in the world. The interior tour reveals breathtaking mosaics, hand-carved plasterwork, and a retractable roof that opens to the sky. From Casablanca you drive north to Rabat, Morocco\'s refined administrative capital and a UNESCO World Heritage city. Visit the unfinished Hassan Tower and its surrounding forest of columns, the ornate Mausoleum of Mohammed V, and the Kasbah of the Udayas — a peaceful Andalusian-influenced fortress quarter overlooking the mouth of the Bou Regreg river. After lunch in Rabat, continue northeast to Fes, arriving in the early evening. Overnight in a traditional riad in the heart of the medina.',
      overnight: 'Fes medina riad',
    },
    {
      day: 'Day 2',
      title: 'Full Day in Fes — The Ancient Imperial City',
      description: 'Fes el-Bali is the world\'s largest living medieval city and a UNESCO World Heritage Site — a labyrinth of over 9,000 narrow streets that has changed little in the past thousand years. Your expert local guide leads you through this extraordinary urban landscape, beginning at the famous Chouara Tanneries, where leather has been dyed in the same stone vats using natural pigments — saffron for yellow, poppy for red, indigo for blue — since the 11th century. Continue to the Bou Inania Medersa, one of the finest examples of Marinid architecture in the world, its courtyard decorated with breathtaking carved stucco, hand-painted zellij tilework, and intricately carved cedarwood. Visit the Al-Qarawiyyin Mosque and University — founded in 859 AD, it is the oldest continually operating university in the world. Wander through the spice souk, the copper market, and the woodworkers\' quarter, before a traditional lunch in a rooftop restaurant with views over the medina roofscape. The afternoon is free to explore independently, browse artisan shops, or relax in your riad. Overnight in Fes.',
      overnight: 'Fes medina riad',
    },
    {
      day: 'Day 3',
      title: 'Fes to Merzouga — Through the Middle Atlas to the Sahara',
      description: 'Today\'s drive is one of the great Moroccan journeys — a full-day traverse from the medieval city of Fes to the edge of the Sahara Desert, passing through some of the country\'s most spectacular and varied landscapes. Leaving Fes, you climb into the Middle Atlas Mountains, stopping at Azrou to walk among the ancient Atlas cedar forest, where troops of wild Barbary macaques — golden-furred primates found nowhere else on Earth — live among the trees. Continuing through the mountain town of Ifrane — a Swiss-chalet-style resort town sitting at 1,665 metres — you cross the high plateau and descend through Midelt, the "city of apples," where the mountains give way to the pre-Saharan plain. The landscape becomes increasingly dramatic as the vegetation thins and the earth turns terracotta-red. Passing through the palm groves of the Ziz Valley, with its string of oasis villages and ancient mud-brick ksour, you arrive at Merzouga as the afternoon light turns the Erg Chebbi dunes from gold to deep amber. Your guide will lead you on a sunset camel trek into the dunes to your traditional Berber desert camp. Overnight in the Sahara Desert under a sky blazing with stars.',
      overnight: 'Berber desert camp, Erg Chebbi',
    },
    {
      day: 'Day 4',
      title: 'Sunrise in the Sahara — Desert Camp and 4x4 Excursion',
      description: 'Wake before dawn for the most magical moment of the journey: watching the Sahara sunrise from the crest of a dune. As the sky shifts from deep violet to rose to blazing gold, the 150-metre dunes of Erg Chebbi are gradually illuminated — each ripple of sand casting long blue shadows, the silence broken only by the wind and, in the distance, the call to prayer from a village mosque. Camel back to camp for a Berber breakfast of msemen flatbread, amlou (almond and argan dip), fresh dates, and mint tea. The morning is yours to explore on foot or relax in the camp before the optional 4x4 desert excursion in the afternoon — one of the most exhilarating ways to experience the desert. Your 4x4 takes you off-road across the open hammada (rocky desert), visiting the Gnawa village of Khamlia — where the descendants of sub-Saharan Africans brought to Morocco centuries ago maintain their extraordinary tradition of hypnotic spiritual music — the seasonal Lac de Merzouga (a desert lake that attracts flamingos and migratory birds), and the fossil beds that reveal the ancient ocean that once covered this land. Dinner and a night of live Gnawa music around the campfire. Second night in the desert camp.',
      overnight: 'Berber desert camp, Erg Chebbi',
    },
    {
      day: 'Day 5',
      title: 'Merzouga to Dades Valley — Todgha Gorges and the Road of Kasbahs',
      description: 'This morning you depart the Sahara and begin the long, spectacular drive westward along the "Route des Kasbahs" — one of the world\'s great road journeys. The road follows the pre-Saharan corridor between the High Atlas Mountains to the north and the Jebel Sarhro range to the south, passing through a continuous landscape of palmeries, ancient kasbahs, and fortified ksour villages built from the red earth of the valley floor. The first major stop is the Rissani market town, once the capital of the Tafilalt oasis — the largest oasis in Morocco and historically the most important staging post on the trans-Saharan caravan routes. Continue to the spectacular Todgha Gorges: a narrow canyon carved through sheer rose-coloured limestone cliffs that rise 300 metres on either side, with the crystal-clear Todgha River running along the gorge floor. Lunch is served in a local restaurant beside the river. The afternoon drive continues through the Dades Valley — past dramatic rock formations known as the "Monkey Fingers" and through a series of ancient Berber villages — to your overnight hotel in the valley. Overnight in Dades Valley.',
      overnight: 'Hotel in Dades Valley',
    },
    {
      day: 'Day 6',
      title: 'Dades Valley to Marrakech via Aït Ben Haddou',
      description: 'The final driving day is a spectacular crossing from the pre-Saharan south to the cultural capital of the north, taking in two of Morocco\'s most iconic sights. Leaving the Dades Valley, you pass through the Valley of Roses — named for the vast plantations of Rosa damascena whose petals are harvested each May for the famous local rosewater and attar of roses — and into the Draa Valley with its long corridor of date palm oases. The first major stop is Aït Ben Haddou, a UNESCO World Heritage Site of extraordinary beauty: a fortified clay village (ksar) rising in tiers above the Ounila River, used as the backdrop for films including Lawrence of Arabia, Gladiator, and Game of Thrones. Your guided walk through the kasbah reveals centuries of Saharan architecture — earthen towers, granaries, a mosque, and the panoramic views from the hill above the village. From Aït Ben Haddou the road climbs into the High Atlas Mountains, crossing the Tizi n\'Tichka pass at 2,260 metres above sea level — the highest road pass in North Africa — with breathtaking views of snow-capped peaks and deep mountain valleys. The descent brings you into the red plain surrounding Marrakech. Overnight in Marrakech.',
      overnight: 'Riad in Marrakech',
    },
    {
      day: 'Day 7',
      title: 'Marrakech — The Rose City',
      description: 'Your final day is spent in Marrakech, one of the world\'s great cities — a heady, intoxicating blend of medieval souks, ornate palaces, and the extraordinary energy of Jemaa el-Fna, the UNESCO-listed central square that comes alive each evening with storytellers, acrobats, musicians, henna artists, and food stalls serving everything from snails to lamb tagine. Your guided morning tour takes in the Bahia Palace — a late 19th-century riad palace of breathtaking scale, its dozens of rooms decorated with hand-carved plasterwork, painted cedar ceilings, and intricate zellij tilework — and the nearby Saadian Tombs, where the 16th-century sultans of the Saadian dynasty lie in elaborately decorated marble mausoleums. The labyrinthine souks of the medina are divided by craft: the copper market (kissaria), the spice souk (souk des épices), the leather workers, the weavers, and the lantern makers. The afternoon is free for independent exploration, shopping, or visiting the Jardin Majorelle — the iconic blue garden created by French painter Jacques Majorelle and later owned by Yves Saint Laurent. In the evening, your guide will arrange a farewell dinner in a traditional restaurant before your transfer to the airport or onward destination. Your Moroccan adventure concludes, but its memories — of golden dunes, ancient cities, Berber hospitality, and the silence of the desert night — will stay with you for a lifetime.',
      overnight: 'Riad in Marrakech',
    },
  ],
}

const result = await client.patch(TOUR_ID).set(patch).commit()
console.log('✅ Patched:', result.title)
console.log('   Days:', patch.itinerary.length)
console.log('   Excerpt:', patch.excerpt.substring(0, 80) + '...')
