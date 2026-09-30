import PageHero from '@/components/PageHero'
import Link from 'next/link'
import TourCard from '@/components/TourCard'
import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Family Morocco Tours',
    description: 'Camel treks, Berber cooking classes, and easy-to-moderate desert days: private, family-friendly Sahara Desert tours from Marrakech, Fes, Agadir, Casablanca, and Errachidia, customisable to your children\'s ages.',
    url: '/family-morocco-tours',
    keywords: ['family Morocco tours', 'family Sahara desert tour', 'Morocco tours with kids', 'family friendly desert tour Morocco', 'Morocco family holiday'],
  })
}

async function getTours() {
  try {
    return (await client.fetch(toursListQuery)) || []
  } catch (error) {
    console.error('Error fetching tours for family page:', error)
    return []
  }
}

// Shorter, easy-to-moderate real tours well suited to a first family desert trip.
const CURATED_SLUGS = [
  '3-days-marrakech-merzouga',
  '3-days-marrakech-to-fes',
  '4-days-atlas-sahara-marrakech',
  '3-days-errachidia-marrakech',
  '3-days-sahara-desert-tour-from-agadir',
  '4-days-marrakech-to-fes',
]

export default async function FamilyMoroccoToursPage() {
  const tours = await getTours()
  const curated = CURATED_SLUGS
    .map((slug) => tours.find((t) => t.slug?.current === slug))
    .filter(Boolean)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Family Morocco Tours', url: '/family-morocco-tours' },
  ])

  return (
    <div className="min-h-screen bg-white">
      <script id="breadcrumb-schema-family" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        image="/images/image00003.jpeg"
        imageAlt="Family exploring the Sahara Desert dunes"
        eyebrow="Travel Together"
        title="Family Morocco Tours"
        subtitle="The Sahara, at a pace that works for every age"
      />

      {/* Intro */}
      <section className="py-16">
        <div className="container-site max-w-3xl">
          <p className="text-ink-600 leading-relaxed text-base mb-6">
            A desert trip with children is a different trip to a solo backpacking route — shorter driving days,
            an easy or moderate activity level rather than a demanding one, and guides who know how to keep a camel
            trek fun rather than frightening for a nervous first-timer. Several of our shorter itineraries (3 and 4
            days) are built around exactly that balance: a manageable amount of time in the vehicle each day, a
            comfortable desert camp night, and real cultural moments that hold the attention of children and
            adults alike — riding a camel at sunset, learning a few words of Berber, or watching bread baked in the sand.
          </p>
          <p className="text-ink-600 leading-relaxed text-base mb-6">
            Our guides each bring a different strength to a family group — Abdul teaches simple Berber cooking
            in camp, Said keeps a gentler pace for stargazing and photography, and Ahmad turns the long drives into
            storytelling about desert legends and nomadic life. You can meet the full team on our{' '}
            <Link href="/about" className="text-desert-600 hover:underline">About Us</Link> page.
          </p>
          <p className="text-ink-600 leading-relaxed text-base">
            We do not currently publish a fixed child-discount policy or age restrictions on our tour pages — every
            family is different, so the most reliable way to plan around your children&rsquo;s ages, nap schedules,
            or dietary needs is to tell us directly. Choose the Custom Tour option on our{' '}
            <Link href="/contact" className="text-desert-600 hover:underline">contact form</Link>, or message us on
            WhatsApp, and we will help you adapt any of the itineraries below.
          </p>
        </div>
      </section>

      {/* Tours */}
      <section className="py-16 bg-sand-50">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-desert-600 mb-3">Good Starting Points</p>
            <h2 className="text-3xl font-serif font-medium text-ink-900">Family-Friendly Sahara Tours</h2>
            <p className="text-ink-500 mt-3">Shorter, easy-to-moderate routes from each of our departure cities</p>
          </div>
          {curated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {curated.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-500">Tours coming soon, check back shortly!</p>
          )}
          <div className="text-center mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 text-desert-600 font-semibold hover:underline">
              Tell us your children&rsquo;s ages and we will suggest the right route →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
