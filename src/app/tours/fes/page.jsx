import CityToursTemplate from '@/components/CityToursTemplate'
import { client } from '@/lib/sanity'
import { toursByCityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Tours from Fes | Fes to Merzouga Erg Chebbi',
    description: 'Discover Sahara Desert tours from Fes. Journey through the Middle Atlas cedar forests, Ziz Valley, and reach the legendary Erg Chebbi dunes near Merzouga. 2-day to 4-day tours available.',
    url: '/tours/fes',
    keywords: ['Sahara tours from Fes', 'Fes to Merzouga', 'Fes desert tour', 'Middle Atlas tour', 'Ziz Valley tour', 'Erg Chebbi from Fes', '3 day desert tour Fes', 'desert trip from Fes Morocco'],
  })
}

async function getTours() {
  try {
    const tours = await client.fetch(toursByCityQuery, { city: 'fes' })
    return tours || []
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

const stops = [
  { stop: 'Fes', note: 'Departure point, oldest imperial city' },
  { stop: 'Ifrane & Azrou', note: 'Middle Atlas cedar forests and Barbary macaques' },
  { stop: 'Ziz Valley', note: 'A ribbon of green palms through the red gorges' },
  { stop: 'Erg Chebbi', note: 'The great orange sea of dunes near Merzouga' },
]

export default async function FesToursPage() {
  const tours = await getTours()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'Tours from Fes', url: '/tours/fes' },
  ])

  const blogPosts = [
    { slug: 'best-time-to-visit-sahara-desert', category: 'Planning', title: 'The Best Time to Visit the Sahara Desert', excerpt: 'October to April is the golden window, but the right month depends on what you want. Here is the complete seasonal guide.' },
    { slug: 'berber-culture-people-of-the-sahara', category: 'Culture', title: 'Berber Culture: The People of the Sahara', excerpt: 'The Amazigh people have called the Sahara home for millennia. A guide to the culture you will encounter on your journey south from Fes.' },
    { slug: 'complete-desert-packing-list', category: 'Travel Tips', title: 'The Complete Desert Packing List', excerpt: 'Everything you actually need, and what to leave at home, for a comfortable and memorable Sahara Desert trip.' },
  ]

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CityToursTemplate
        city="Fes"
        tours={tours}
        hero={{
          title: 'Sahara Desert Tours from Fes',
          subtitle: 'From ancient medina to endless dunes, descend through cedar forests and the Ziz Valley to reach Erg Chebbi',
          image: '/images/image00019.jpeg',
          imageAlt: 'Travellers riding camels through the Erg Chebbi dunes',
          imagePosition: 'center 70%',
        }}
        stops={stops}
        note={null}
        posts={blogPosts}
        cta={{
          title: 'From the medina to the dunes',
          text: "The route from Fes to the Sahara passes through some of Morocco's most dramatic landscapes. Let us guide you through every kilometre.",
          image: '/images/image00045.jpeg',
          imageAlt: 'Sahara Desert landscape',
        }}
      />
    </>
  )
}
