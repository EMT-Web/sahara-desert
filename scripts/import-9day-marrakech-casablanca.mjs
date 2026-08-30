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

const tour = {
  _type: 'tour',
  title: '9 Days Grand Morocco Desert Tour: Marrakech to Casablanca',
  slug: { _type: 'slug', current: '9-days-marrakech-to-casablanca' },
  departureCity: 'marrakech',
  duration: '9 Days',
  publishedAt: new Date().toISOString(),
  excerpt:
    'The ultimate Morocco grand circuit — 9 days from Marrakech through the High Atlas, Sahara dunes, Fes medina, blue Chefchaouen, and imperial Rabat to Casablanca. Camel rides, luxury desert camps, Roman ruins, and the best of Morocco in one epic journey.',
  focusAreas: ['culture', 'adventure', 'photography', 'music', 'sunsets'],
  body: `Day 1: Arrival in Marrakech
Your journey begins upon arrival in the vibrant Red City. Your private driver meets you at the airport and transfers you to your boutique riad in the heart of the ancient medina. Spend the afternoon relaxing over traditional mint tea before exploring the evening energy of Jemaa el-Fnaa square.
Overnight in Riad Nessma and Spa or Riad Aslal (Bed & Breakfast)

Day 2: Marrakech Sightseeing with a Local Guide
After breakfast, meet your expert local guide for a comprehensive tour of Marrakech's iconic landmarks: the spectacular Bahia Palace, the towering Koutoubia Mosque, and the historic Saadian Tombs. Navigate the winding, colourful souks before a free evening in the city.
Overnight in Riad Nessma and Spa or Riad Aslal (Bed & Breakfast)

Day 3: Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges
Depart early and ascend the breathtaking High Atlas Mountains, crossing the Tizi n'Tichka Pass at 2,260 metres. Descend to the UNESCO-listed Kasbah of Ait Benhaddou for a walking tour, then drive through Ouarzazate — the Hollywood of Africa. Continue through the fragrant Roses Valley and wind into the dramatic rock formations of the Dades Gorges.
Overnight in Dades Paradise or Dar Blues (Half Board)

Day 4: Dades Gorges → Todra Gorges → Merzouga Sahara Desert
Travel east to the magnificent Todra Gorges, walking beneath 300-metre-high limestone cliff walls. Journey deeper into the Sahara until you reach the Erg Chebbi dunes in Merzouga. Embark on a magical camel ride across the golden dunes at sunset, arriving at your luxury desert camp for a traditional Moroccan dinner, Berber music around the campfire, and star-gazing under a crystal-clear sky.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 5: Full Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake
A full day immersed in the Sahara. A thrilling 4x4 excursion takes you across the black stone desert to share mint tea with authentic nomadic families in Berber tents. Visit the village of Khamlia for captivating Gnawa music, then head to Dayet Srij — the seasonal flamingo lake where flocks of pink flamingos gather against a backdrop of golden dunes.
Overnight in Tiziri Camp or Sahara Eden Camp (Half Board)

Day 6: Merzouga → Ziz Gorges → Midelt → Cedar Forest → Fes
Wake early to catch sunrise over the dunes before beginning the drive north to Fes. Journey through the stunning Ziz Gorges and the sprawling green palm groves of the Ziz Oasis. Stop in Midelt for lunch, then pass through the ancient cedar forest of Azrou where wild Barbary monkeys roam freely. After a brief stop in alpine Ifrane, descend into the ancient imperial city of Fes.
Overnight in Riad Fez Mahal or La Perle de La Medina (Bed & Breakfast)

Day 7: Fes Old City Walking Tour with a Local Guide
Your expert guide leads you through the Fes Medina — one of the world's largest walled cities and a UNESCO World Heritage site. Explore over 9,000 narrow streets, the majestic Royal Palace gates, vibrant spice markets, the famous Chouara Tannery, the ancient Al-Qarawiyyin University, and finish with a panoramic view from the Merenid Tombs.
Overnight in Riad Fez Mahal or La Perle de La Medina (Bed & Breakfast)

Day 8: Fes → Meknes → Volubilis → Chefchaouen
Drive toward the Rif Mountains, stopping first in the imperial city of Meknes to admire the grand Bab Mansour gate. Then explore the remarkably well-preserved UNESCO-listed Roman ruins of Volubilis with a local guide. Continue to Chefchaouen, Morocco's famous blue-washed mountain city, where the afternoon is free to wander its tranquil blue alleys and browse local handicrafts.
Overnight in Dar Echchaouen or Riad Cherifa (Bed & Breakfast)

Day 9: Chefchaouen → Rabat → Casablanca
Begin the coastal journey with a stop in the imperial capital of Rabat: the striking Mechouar of the Royal Palace, the historic Hassan Tower beside the Mausoleum of Mohammed V, and the beautiful blue-and-white Kasbah of the Udayas overlooking the ocean. After lunch, drive the Atlantic coast to Casablanca for a safe drop-off at your hotel or the airport — the end of your grand 9-day Moroccan expedition.`,
  itinerary: [
    {
      day: 'Day 1',
      title: 'Arrival in Marrakech',
      description:
        'Your journey begins upon arrival in the vibrant Red City. Your private driver meets you at the airport and transfers you to your boutique riad in the heart of the ancient medina. Spend the afternoon relaxing over traditional mint tea before experiencing the evening energy of Jemaa el-Fnaa square.',
      overnight: 'Riad Nessma and Spa or Riad Aslal',
    },
    {
      day: 'Day 2',
      title: 'Marrakech Sightseeing with a Local Guide',
      description:
        'After breakfast, meet your expert local guide for a comprehensive tour of the Bahia Palace, the Koutoubia Mosque, and the Saadian Tombs. Navigate the winding souks filled with spices, textiles, and artisan workshops before a free evening in the city.',
      overnight: 'Riad Nessma and Spa or Riad Aslal',
    },
    {
      day: 'Day 3',
      title: 'Marrakech → High Atlas Mountains → Ait Benhaddou → Ouarzazate → Roses Valley → Dades Gorges',
      description:
        'Depart early and cross the Tizi n\'Tichka Pass at 2,260 metres in the High Atlas Mountains. Descend to the UNESCO-listed Kasbah of Ait Benhaddou for a walking tour, then drive through Ouarzazate — the Hollywood of Africa. Continue through the fragrant Roses Valley into the dramatic rock formations of the Dades Gorges.',
      overnight: 'Dades Paradise or Dar Blues',
    },
    {
      day: 'Day 4',
      title: 'Dades Gorges → Todra Gorges → Merzouga Sahara Desert Luxury Camp',
      description:
        'Stretch your legs at the magnificent Todra Gorges beneath 300-metre limestone cliff walls. Journey to the Erg Chebbi dunes in Merzouga and embark on a magical sunset camel ride to your luxury desert camp. Enjoy a traditional Moroccan dinner, Berber music around the campfire, and star-gazing under a crystal-clear Saharan sky.',
      overnight: 'Tiziri Camp or Sahara Eden Camp',
    },
    {
      day: 'Day 5',
      title: 'Full Merzouga Desert Excursion — Nomads, Gnawa Music & Flamingo Lake',
      description:
        'A full day immersed in the Sahara. A thrilling 4x4 excursion crosses the black stone desert to share mint tea with nomadic families. Visit Khamlia village for captivating Gnawa music, then explore Dayet Srij — the seasonal flamingo lake where pink flamingos gather against a backdrop of golden dunes.',
      overnight: 'Tiziri Camp or Sahara Eden Camp',
    },
    {
      day: 'Day 6',
      title: 'Merzouga → Ziz Gorges → Midelt → Cedar Forest of Azrou → Fes',
      description:
        'Watch sunrise over the dunes before driving north through the stunning Ziz Gorges and the lush Ziz Oasis palm groves. Stop in Midelt for lunch, then pass through the ancient cedar forest of Azrou where wild Barbary monkeys roam. After a stop in alpine Ifrane, descend into the imperial city of Fes.',
      overnight: 'Riad Fez Mahal or La Perle de La Medina',
    },
    {
      day: 'Day 7',
      title: 'Fes Old City Walking Tour',
      description:
        'A full guided walking tour of the Fes Medina — a UNESCO World Heritage site and one of the world\'s largest walled cities. Explore the Royal Palace gates, Chouara Tannery, vibrant spice markets, the Al-Qarawiyyin University, and finish at the Merenid Tombs for a panoramic view over the entire city.',
      overnight: 'Riad Fez Mahal or La Perle de La Medina',
    },
    {
      day: 'Day 8',
      title: 'Fes → Meknes → Volubilis → Chefchaouen',
      description:
        'Drive through the imperial city of Meknes to admire the grand Bab Mansour gate, then explore the UNESCO-listed Roman ruins of Volubilis with a local guide. Wind through the Rif Mountains to reach Chefchaouen, where the afternoon is free to wander the famous blue-washed alleys and browse local handicrafts.',
      overnight: 'Dar Echchaouen or Riad Cherifa',
    },
    {
      day: 'Day 9',
      title: 'Chefchaouen → Rabat → Casablanca',
      description:
        'Begin the coastal journey with stops in imperial Rabat: the Mechouar of the Royal Palace, the Hassan Tower and Mausoleum of Mohammed V, and the Kasbah of the Udayas overlooking the ocean. After lunch, drive the Atlantic coastline to Casablanca for drop-off at your hotel or airport — the end of your grand 9-day expedition.',
      overnight: 'Hotel or airport drop-off in Casablanca',
    },
  ],
  included: [
    'Private transport in an air-conditioned 4x4 or minivan for all 9 days',
    '8 nights accommodation (riads, mountain hotel, and luxury desert camp)',
    'Breakfast daily',
    'Dinner at desert camp nights (Days 4 and 5)',
    'Airport pick-up on Day 1',
    'Sunset camel ride at Erg Chebbi',
    '4x4 desert excursion in Merzouga',
    'Expert local guides in Marrakech, Ait Benhaddou, Fes, and Volubilis',
    'Drop-off at hotel or airport in Casablanca on Day 9',
  ],
  notIncluded: [
    'Lunches',
    'Beverages (tea, soft drinks, bottled water, alcohol)',
    'Entrance fees (Bahia Palace, Saadian Tombs, Volubilis, etc.)',
    'Tips for guides and drivers',
    'Personal expenses',
    'International flights',
    'Travel insurance',
  ],
  seoKeywords:
    '9-day Morocco desert tour, Marrakech to Casablanca tour, Morocco grand circuit, Sahara Fes Chefchaouen tour, Erg Chebbi Marrakech, Ait Benhaddou tour, Volubilis Roman ruins tour, Chefchaouen blue city, Morocco 9 days itinerary, Morocco private tour, Berber desert camp',
}

console.log('Creating tour:', tour.title)
const result = await client.create(tour)
console.log('Created successfully:', result._id)
console.log('Slug:', result.slug.current)
