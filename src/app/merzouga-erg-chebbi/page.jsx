import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import TourCard from '@/components/TourCard'
import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Merzouga & Erg Chebbi Desert Guide',
    description: 'Everything to know about Merzouga and the Erg Chebbi dunes: how to get there, what a camel trek and luxury desert camp are really like, and which Sahara tours go there from Marrakech, Fes, Agadir, Casablanca, and Errachidia.',
    url: '/merzouga-erg-chebbi',
    keywords: ['Merzouga', 'Erg Chebbi', 'Erg Chebbi dunes', 'Merzouga desert tour', 'Sahara Desert Morocco', 'Merzouga camel trek', 'Khamlia Gnawa music', 'desert camp Merzouga'],
  })
}

async function getTours() {
  try {
    return (await client.fetch(toursListQuery)) || []
  } catch (error) {
    console.error('Error fetching tours for Merzouga guide:', error)
    return []
  }
}

// Real tours (by slug) that travel to Merzouga / Erg Chebbi, one per departure city
// plus a couple of popular express options, in the order we want them to appear.
const CURATED_SLUGS = [
  '3-days-marrakech-merzouga',
  '2-days-fes-merzouga-express',
  '3-days-sahara-desert-tour-from-agadir',
  '6-days-morocco-sahara-desert-tour-from-casablanca-to-marrakech',
  '2-days-errachidia-merzouga',
  '3-days-errachidia-round-trip',
]

const faqs = [
  {
    question: 'How do I get to Merzouga?',
    answer: 'Merzouga is reached by road from Marrakech, Fes, Casablanca, Agadir, or Errachidia (the closest gateway city). Most travelers join a multi-day guided tour that handles the whole drive, rather than arranging transport independently.',
  },
  {
    question: 'What is Erg Chebbi?',
    answer: 'Erg Chebbi is the great dune field beside Merzouga village, with some dunes rising over 150 metres. It is the most accessible major dune system in Morocco, which is why the majority of Sahara Desert tours end their journey here.',
  },
  {
    question: 'What is included in a typical Merzouga desert camp night?',
    answer: 'A camel trek out to camp (usually timed for sunset), an overnight stay in a desert camp among the dunes, dinner, and traditional music around the fire, followed by the option of a sunrise camel ride or dune walk the next morning. Exact inclusions vary by tour — check each tour page for specifics.',
  },
]

export default async function MerzougaErgChebbiPage() {
  const tours = await getTours()
  const curated = CURATED_SLUGS
    .map((slug) => tours.find((t) => t.slug?.current === slug))
    .filter(Boolean)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Merzouga & Erg Chebbi', url: '/merzouga-erg-chebbi' },
  ])
  const faqSchema = generateFAQSchema(faqs)

  return (
    <div className="min-h-screen bg-white">
      <Script id="breadcrumb-schema-merzouga" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="faq-schema-merzouga" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/camel_caravan_sunset.jpeg" alt="Camel caravan crossing the Erg Chebbi dunes near Merzouga at sunset" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">Destination Guide</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Merzouga &amp; the Erg Chebbi Dunes</h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Morocco's most iconic desert gateway — camel treks, luxury camps, and Morocco's tallest easily-reached dunes
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-600 leading-relaxed text-base mb-6">
            Merzouga is a small village on the edge of the Sahara in southeastern Morocco, and it is the single
            most popular entry point to the desert in the whole country. That is thanks to what sits right beside
            it: Erg Chebbi, a sea of golden dunes reaching well over 150 metres in places, close enough to the
            road that almost every Sahara itinerary from Marrakech, Fes, Casablanca, Agadir, and Errachidia is
            built around ending the day here.
          </p>
          <p className="text-gray-600 leading-relaxed text-base mb-6">
            A typical visit means arriving by 4x4 or minivan in the afternoon, then swapping to camelback for the
            final stretch into the dunes as the light turns gold. You spend the night in a desert camp — canvas
            tents, communal or private depending on the camp, dinner cooked over the fire, and music under a sky
            with none of the light pollution you would see back home. Many tours also stop at Khamlia, a small
            village near Merzouga known for its Gnawa musicians, descendants of West African communities who
            settled in the region generations ago.
          </p>
          <p className="text-gray-600 leading-relaxed text-base">
            Camp comfort levels vary a lot between tours — from simple shared-bathroom Berber tents to private
            en-suite glamping. If you want the full breakdown of what separates a basic camp from a luxury one,
            see our guide to{' '}
            <Link href="/luxury-desert-camps" className="text-desert-600 hover:underline">luxury Sahara desert camps</Link>{' '}
            or the deeper{' '}
            <Link href="/blog/how-to-choose-desert-camp" className="text-desert-600 hover:underline">how to choose a desert camp</Link>{' '}
            article on our blog.
          </p>
        </div>
      </section>

      {/* Tours to Merzouga */}
      <section className="py-16 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-desert-500 mb-3">Get There With Us</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Tours to Merzouga &amp; Erg Chebbi</h2>
            <p className="text-gray-500 mt-3">One route from each of our five departure cities</p>
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
            <Link href="/tours" className="inline-flex items-center gap-2 text-desert-600 font-semibold hover:underline">
              See all Sahara Desert tours →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">Merzouga FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-gray-900 mb-1">{f.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
