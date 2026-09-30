import CityToursTemplate from '@/components/CityToursTemplate'
import { client } from '@/lib/sanity'
import { toursByCityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Tours from Agadir | Anti-Atlas & Draa Valley',
    description: 'Explore Sahara Desert tours from Agadir. Cross the Anti-Atlas mountains, descend into the Draa Valley palmeries, and reach the dunes through Morocco\'s most dramatic southern landscapes.',
    url: '/tours/agadir',
    keywords: ['Sahara tours from Agadir', 'Agadir desert tour', 'Agadir to Zagora', 'Anti-Atlas tour Agadir', 'Draa Valley from Agadir', 'Agadir to Merzouga', 'desert trip south Morocco Agadir'],
  })
}

async function getTours() {
  try {
    const tours = await client.fetch(toursByCityQuery, { city: 'agadir' })
    return tours || []
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

const stops = [
  { stop: 'Agadir', note: 'Departure point, Atlantic coast resort city' },
  { stop: 'Tafraoute', note: 'Pink granite boulders in the Anti-Atlas' },
  { stop: 'Draa Valley', note: 'Long oasis valley lined with kasbahs and palms' },
  { stop: 'Zagora', note: 'Gateway to the Sahara, sand dunes and camel tracks' },
]

export default async function AgadirToursPage() {
  const tours = await getTours()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'Tours from Agadir', url: '/tours/agadir' },
  ])

  const blogPosts = [
    { slug: 'best-time-to-visit-sahara-desert', category: 'Planning', title: 'The Best Time to Visit the Sahara Desert', excerpt: 'October to April is the golden window, but the right month depends on what you want. The complete seasonal guide.' },
    { slug: 'complete-desert-packing-list', category: 'Travel Tips', title: 'The Complete Desert Packing List', excerpt: 'Everything you actually need, and what to leave at home, for a comfortable and memorable Sahara Desert trip.' },
    { slug: 'desert-sunrise-vs-sunset', category: 'Photography', title: 'Desert Sunrise vs Sunset: Which Is Better?', excerpt: 'Both are extraordinary. But they offer completely different experiences. Here is how to decide which to prioritise.' },
  ]

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CityToursTemplate
        city="Agadir"
        tours={tours}
        hero={{
          title: 'Sahara Desert Tours from Agadir',
          subtitle: "Climb the Anti-Atlas, descend into the Draa Valley, and reach the dunes through Morocco's most dramatic landscapes",
          image: '/images/image00025.jpeg',
          imageAlt: 'Soft golden Sahara dunes reached from Agadir',
        }}
        stops={stops}
        note={null}
        posts={blogPosts}
        cta={{
          title: 'Beyond the Atlas lies the Sahara',
          text: "The road from Agadir to the desert is one of Morocco's great secrets. Let us take you there.",
          image: '/images/image00048.jpeg',
          imageAlt: 'Sahara Desert landscape',
        }}
      />
    </>
  )
}
