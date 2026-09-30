import CityToursTemplate from '@/components/CityToursTemplate'
import { client } from '@/lib/sanity'
import { toursByCityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Tours from Marrakech | Marrakech to Merzouga',
    description: 'Book Sahara Desert tours departing from Marrakech. Cross the High Atlas, visit UNESCO-listed Aït Benhaddou, trace the Draa Valley, and reach the golden dunes of Erg Chebbi. 2-day to 5-day tours available.',
    url: '/tours/marrakech',
    keywords: ['Sahara tours from Marrakech', 'Marrakech to Merzouga', 'Marrakech desert tour', 'Aït Benhaddou tour', 'Draa Valley tour', 'Erg Chebbi from Marrakech', '3 day desert tour Marrakech', 'camel trek Marrakech', 'High Atlas crossing'],
  })
}

async function getTours() {
  try {
    const tours = await client.fetch(toursByCityQuery, { city: 'marrakech' })
    return tours || []
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

const stops = [
  { stop: 'Marrakech', note: 'Departure point, the Red City' },
  { stop: 'Aït Benhaddou', note: 'UNESCO kasbah on the old caravan route' },
  { stop: 'Draa Valley', note: '150 km of palmeries and kasbahs' },
  { stop: 'Erg Chebbi', note: 'Golden dunes up to 150 m high' },
]

export default async function MarrakechToursPage() {
  const tours = await getTours()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'Tours from Marrakech', url: '/tours/marrakech' },
  ])

  const blogPosts = [
    { slug: 'marrakech-to-merzouga-road-trip', category: 'Itineraries', title: 'Marrakech to Merzouga: The Ultimate Road Trip', excerpt: 'Everything you need to know about the classic journey through the High Atlas and Draa Valley to reach the golden dunes.' },
    { slug: 'camel-trekking-morocco-what-to-expect', category: 'Experiences', title: 'Camel Trekking in Morocco: What to Really Expect', excerpt: 'Everyone imagines themselves atop a camel at sunset. Here is the honest, unfiltered version of what camel trekking is actually like.' },
    { slug: 'how-to-choose-desert-camp', category: 'Planning', title: 'How to Choose Your Desert Camp in Morocco', excerpt: 'Basic Berber tent or luxury glamping? The right choice depends on what you want from your night in the Sahara.' },
  ]

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CityToursTemplate
        city="Marrakech"
        tours={tours}
        hero={{
          title: 'Sahara Desert Tours from Marrakech',
          subtitle: 'Cross the High Atlas, trace the Draa Valley, and arrive where the dunes rise above everything',
          image: '/images/image00042.jpeg',
          imageAlt: 'Road through the Todra gorge on the route from Marrakech to the Sahara',
        }}
        stops={stops}
        note={null}
        posts={blogPosts}
        cta={{
          title: 'Ready to leave Marrakech behind?',
          text: 'The Sahara is calling. Let our Berber guides take you from the medina to the most spectacular dunes on earth.',
          image: '/images/image00001.jpeg',
          imageAlt: 'Sahara Desert landscape',
        }}
      />
    </>
  )
}
