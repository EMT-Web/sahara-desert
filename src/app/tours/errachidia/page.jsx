import CityToursTemplate from '@/components/CityToursTemplate'
import { client } from '@/lib/sanity'
import { toursByCityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Tours from Errachidia | Closest City to Erg Chebbi',
    description: 'Book Sahara Desert tours from Errachidia, the closest major city to Erg Chebbi, just 80 km from Merzouga. Experience Ziz Gorges, Erfoud fossil city, and the golden dunes in minimum travel time.',
    url: '/tours/errachidia',
    keywords: ['Sahara tours from Errachidia', 'Errachidia to Merzouga', 'Errachidia desert tour', 'closest city Erg Chebbi', 'Ziz Gorges tour', 'Erfoud desert tour', 'desert camp Errachidia', 'Merzouga from Errachidia'],
  })
}

async function getTours() {
  try {
    const tours = await client.fetch(toursByCityQuery, { city: 'errachidia' })
    return tours || []
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

const stops = [
  { stop: 'Errachidia', note: 'Departure point, heart of the Tafilalt region' },
  { stop: 'Ziz Gorges', note: 'Dramatic canyon carved through red rock by the Ziz river' },
  { stop: 'Erfoud', note: 'Fossil city on the edge of the Sahara' },
  { stop: 'Merzouga', note: 'Door to Erg Chebbi, dunes begin right outside town' },
]

export default async function ErrachidiaToursPage() {
  const tours = await getTours()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'Tours from Errachidia', url: '/tours/errachidia' },
  ])

  const blogPosts = [
    { slug: 'night-under-stars-erg-chebbi', category: 'Stories', title: 'A Night Under the Stars at Erg Chebbi', excerpt: 'What happens when the last tourist leaves and only the desert remains. A first-hand account of sleeping in the dunes near Merzouga.' },
    { slug: 'merzouga-vs-zagora-sahara', category: 'Destinations', title: 'Merzouga vs Zagora: Which Sahara Destination Is Right for You?', excerpt: 'Two very different desert experiences. Here is how to decide which one matches your travel style and itinerary.' },
    { slug: 'how-to-photograph-sahara-desert', category: 'Photography', title: 'How to Photograph the Sahara Desert', excerpt: 'Gear, timing, composition, and the one mistake every first-timer makes. A practical guide to capturing the desert on camera.' },
  ]

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CityToursTemplate
        city="Errachidia"
        tours={tours}
        hero={{
          title: 'Sahara Desert Tours from Errachidia',
          subtitle: 'The closest gateway to Erg Chebbi: gorges, oases, and golden dunes within reach in a single day',
          image: '/images/image00060.jpeg',
          imageAlt: 'Seasonal lake among the dunes near Merzouga',
        }}
        stops={stops}
        note={'Why Errachidia? It is the closest major city to Erg Chebbi, just 80 km from Merzouga. Ideal for travellers who want to spend more time in the desert and less time on the road.'}
        posts={blogPosts}
        cta={{
          title: 'The Sahara starts here',
          text: 'No other city puts you closer to Erg Chebbi. From Errachidia, the dunes are already on the horizon.',
          image: '/images/image00059.jpeg',
          imageAlt: 'Sahara Desert landscape',
        }}
      />
    </>
  )
}
