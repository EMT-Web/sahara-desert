import CityToursTemplate from '@/components/CityToursTemplate'
import { client } from '@/lib/sanity'
import { toursByCityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Tours from Casablanca | Atlantic to the Dunes',
    description: 'Explore Sahara Desert tours departing from Casablanca. Morocco\'s greatest crossing, from the Atlantic coast through Marrakech, Ouarzazate, and into the golden dunes of Erg Chebbi.',
    url: '/tours/casablanca',
    keywords: ['Sahara tours from Casablanca', 'Casablanca to Sahara', 'Casablanca desert tour', 'Casablanca to Merzouga', 'Morocco road trip Casablanca', 'desert trip Casablanca Marrakech', '4 day tour Casablanca'],
  })
}

async function getTours() {
  try {
    const tours = await client.fetch(toursByCityQuery, { city: 'casablanca' })
    return tours || []
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

const stops = [
  { stop: 'Casablanca', note: 'Departure point, Morocco\'s modern capital' },
  { stop: 'Marrakech', note: 'Overnight in the Red City\'s medina' },
  { stop: 'Ouarzazate', note: 'Gateway to the desert, kasbah country' },
  { stop: 'Erg Chebbi', note: 'The Sahara\'s most iconic dune sea' },
]

export default async function CasablancaToursPage() {
  const tours = await getTours()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'Tours from Casablanca', url: '/tours/casablanca' },
  ])

  const blogPosts = [
    { slug: 'marrakech-to-merzouga-road-trip', category: 'Itineraries', title: 'Marrakech to Merzouga: The Ultimate Road Trip', excerpt: 'Everything you need to know about the classic journey through the High Atlas and Draa Valley to reach the golden dunes.' },
    { slug: '10-things-to-know-sahara-desert', category: 'Travel Tips', title: '10 Things to Know Before Your First Sahara Trip', excerpt: 'The Sahara is unlike any destination on earth. Here is what every first-time visitor needs to know before stepping onto the sand.' },
    { slug: 'moroccan-food-desert-tour', category: 'Culture', title: 'Moroccan Food on a Desert Tour: What to Expect', excerpt: 'From tagines in mountain villages to mint tea under the stars, the food on a Morocco desert tour is an experience in itself.' },
  ]

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CityToursTemplate
        city="Casablanca"
        tours={tours}
        hero={{
          title: 'Sahara Desert Tours from Casablanca',
          subtitle: "Morocco's great crossing, from the Atlantic coast to the heart of the Sahara in one epic journey",
          image: '/images/image00013.jpeg',
          imageAlt: 'View of the Sahara through a blue Moroccan archway',
        }}
        stops={stops}
        note={null}
        posts={blogPosts}
        cta={{
          title: 'From the Atlantic to the Sahara',
          text: "Morocco's greatest road trip. Ancient cities, mountain passes, desert kasbahs, and finally, the silence of the dunes.",
          image: '/images/image00031.jpeg',
          imageAlt: 'Sahara Desert landscape',
        }}
      />
    </>
  )
}
