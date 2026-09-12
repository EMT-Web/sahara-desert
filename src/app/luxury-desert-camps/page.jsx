import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import TourCard from '@/components/TourCard'
import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Luxury Sahara Desert Camps',
    description: 'Private en-suite tents, gourmet Moroccan dinners, and a night under the stars in the Erg Chebbi or Erg Chigaga dunes — see which Visit Sahara Desert tours include a luxury desert camp night.',
    url: '/luxury-desert-camps',
    keywords: ['luxury Sahara desert camp', 'luxury desert camp Morocco', 'Erg Chebbi luxury camp', 'Erg Chigaga luxury camp', 'glamping Sahara Desert', 'desert glamping Morocco'],
  })
}

async function getTours() {
  try {
    return (await client.fetch(toursListQuery)) || []
  } catch (error) {
    console.error('Error fetching tours for luxury camps page:', error)
    return []
  }
}

// Real tours whose itineraries include a luxury desert camp / glamping night.
const CURATED_SLUGS = [
  '5-days-marrakech-erg-chigaga',
  '3-days-errachidia-round-trip',
  '3-days-sahara-desert-tour-from-agadir',
  '4-day-morocco-sahara-desert-tour-agadir-to-marrakech',
  '12-days-agadir-imperial-cities-sahara-circuit',
  '7-day-morocco-sahara-desert-tour-from-agadir',
]

export default async function LuxuryDesertCampsPage() {
  const tours = await getTours()
  const curated = CURATED_SLUGS
    .map((slug) => tours.find((t) => t.slug?.current === slug))
    .filter(Boolean)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Luxury Desert Camps', url: '/luxury-desert-camps' },
  ])

  return (
    <div className="min-h-screen bg-white">
      <Script id="breadcrumb-schema-luxury-camps" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/camp_in_desert.jpeg" alt="Desert camp set among the dunes of the Sahara" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">Where You Will Sleep</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Luxury Sahara Desert Camps</h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            A night in the dunes, without giving up comfort
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-600 leading-relaxed text-base mb-6">
            Luxury camping in the Sahara has come a long way from a basic canvas tent. On our multi-night tours
            that include a luxury desert camp, you can expect a private en-suite bathroom with a hot shower, a
            proper bed with quality linen rather than a floor mattress, and a gourmet Moroccan dinner served in a
            shared lounge tent — all inside a camp positioned among the dunes rather than beside a car park.
          </p>
          <p className="text-gray-600 leading-relaxed text-base mb-6">
            We work with two very different dune systems. <strong className="text-desert-700 font-semibold">Erg Chebbi</strong>,
            near Merzouga, is the more accessible of the two and features on most of our tours — see our{' '}
            <Link href="/merzouga-erg-chebbi" className="text-desert-600 hover:underline">Merzouga &amp; Erg Chebbi guide</Link>{' '}
            for the full picture. <strong className="text-desert-700 font-semibold">Erg Chigaga</strong>, reached via
            Zagora and {"M'Hamid"}, is the largest and most remote dune field in Morocco — camps here sit further
            from any road, which means a longer 4x4 approach but a genuinely quieter, more exclusive night in the dunes.
          </p>
          <p className="text-gray-600 leading-relaxed text-base">
            Not every tour includes a luxury camp night by default, and comfort levels vary between traditional,
            mid-range, and luxury tents. If you want to understand those differences in more depth before you
            book, read{' '}
            <Link href="/blog/how-to-choose-desert-camp" className="text-desert-600 hover:underline">how to choose the right desert camp for your budget</Link>{' '}
            on our blog, or message us on WhatsApp and we will point you to the right tour.
          </p>
        </div>
      </section>

      {/* Tours with luxury camp nights */}
      <section className="py-16 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-desert-500 mb-3">Book a Night in the Dunes</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Tours That Include a Luxury Desert Camp</h2>
          </div>
          {curated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {curated.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Tours coming soon, check back shortly!</p>
          )}
          <div className="text-center mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 text-desert-600 font-semibold hover:underline">
              Not sure which camp is right for you? Ask us directly →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
