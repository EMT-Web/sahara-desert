import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import TourCard from '@/components/TourCard'
import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Morocco Honeymoon Tours',
    description: 'A private Sahara Desert honeymoon: sunset camel treks, a luxury desert camp under the stars, and custom-built Morocco itineraries for couples, from the High Atlas to the Erg Chigaga dunes.',
    url: '/honeymoon-morocco-tours',
    keywords: ['Morocco honeymoon tour', 'Sahara desert honeymoon', 'romantic Morocco tour', 'honeymoon desert camp Morocco', 'private Morocco tour for couples'],
  })
}

async function getTours() {
  try {
    return (await client.fetch(toursListQuery)) || []
  } catch (error) {
    console.error('Error fetching tours for honeymoon page:', error)
    return []
  }
}

// Real tours well suited to a couple's trip: the remote/exclusive Erg Chigaga
// route, and longer grand-circuit itineraries with a luxury camp night.
const CURATED_SLUGS = [
  '5-days-marrakech-erg-chigaga',
  '7-days-grand-sahara-marrakech',
  '5-days-fes-marrakech-sahara-tour',
  '4-day-morocco-sahara-desert-tour-agadir-to-marrakech',
  '9-days-fes-marrakech-sahara-tour',
]

export default async function HoneymoonMoroccoToursPage() {
  const tours = await getTours()
  const curated = CURATED_SLUGS
    .map((slug) => tours.find((t) => t.slug?.current === slug))
    .filter(Boolean)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Honeymoon Morocco Tours', url: '/honeymoon-morocco-tours' },
  ])

  return (
    <div className="min-h-screen bg-white">
      <Script id="breadcrumb-schema-honeymoon" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/evening.jpeg" alt="Sahara Desert dunes at dusk" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">For Two</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Morocco Honeymoon Tours</h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Private journeys through the Atlas and the dunes, built around the two of you
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-600 leading-relaxed text-base mb-6">
            A honeymoon in the Sahara has a rhythm all its own: mountain passes and kasbahs by day, then a camel
            trek into the dunes as the light turns gold, ending at a desert camp under a sky with no city light to
            compete with it. For the most private, exclusive version of that night, our route to{' '}
            <strong className="text-desert-700 font-semibold">Erg Chigaga</strong> — Morocco's largest and most remote
            dune field, reached via Zagora and M'Hamid — trades a little travel time for a camp that sits well away
            from the road.
          </p>
          <p className="text-gray-600 leading-relaxed text-base mb-6">
            If you would rather combine the desert with more of Morocco's imperial cities — Marrakech, Fes, or a
            longer grand circuit — our 5 to 9-day routes below fold in a luxury camp night alongside the High Atlas,
            historic kasbahs, and time in the medinas. Every tour on this site can be booked as a private, just-the-two-of-you
            experience rather than joining a larger group — mention that when you get in touch.
          </p>
          <p className="text-gray-600 leading-relaxed text-base">
            We don't publish a dedicated honeymoon package or set-price add-ons (a private room upgrade, for
            example, is already reflected in the per-person double-room pricing on each tour), so the best way to
            plan a honeymoon itinerary — timing around your wedding, a specific camp, or an anniversary surprise —
            is to select "Custom Tour" on our{' '}
            <Link href="/contact" className="text-desert-600 hover:underline">contact form</Link> or message us on
            WhatsApp directly.
          </p>
        </div>
      </section>

      {/* Tours */}
      <section className="py-16 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-desert-500 mb-3">Built for Couples</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Romantic Sahara Desert Routes</h2>
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
            <Link href="/luxury-desert-camps" className="inline-flex items-center gap-2 text-desert-600 font-semibold hover:underline">
              See our luxury desert camp guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
