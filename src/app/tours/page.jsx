import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import FilterableTours from '@/components/FilterableTours'
import CTASection from '@/components/CTASection'
import Icon from '@/components/Icon'
import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import { DEPARTURE_CITIES } from '@/lib/site'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Tours & Private Morocco Tours',
    description: 'Browse private Sahara Desert tours and custom Morocco itineraries from Marrakech, Fes, Casablanca, Agadir, and Errachidia — camel trekking, luxury desert camps, and Berber-guided desert adventures.',
    url: '/tours',
    keywords: ['Sahara Desert Tours', 'Morocco Desert Tours', 'Private Morocco Tours', 'Camel Trekking Morocco', 'Luxury Sahara Desert Camp', 'Erg Chebbi Tours', 'Merzouga Tours', 'Zagora Tours'],
  })
}

async function getTours() {
  try {
    return (await client.fetch(toursListQuery)) || []
  } catch {
    return []
  }
}

const STYLES = [
  { title: 'Luxury desert camps', href: '/luxury-desert-camps', image: '/images/image00029.jpeg' },
  { title: 'Honeymoon tours', href: '/honeymoon-morocco-tours', image: '/images/image00030.jpeg' },
  { title: 'Family tours', href: '/family-morocco-tours', image: '/images/image00018.jpeg' },
  { title: 'Merzouga & Erg Chebbi', href: '/merzouga-erg-chebbi', image: '/images/image00012.jpeg' },
]

// Photos this page already shows (hero, style tiles, closing banner), so tour cards avoid them.
const PAGE_IMAGES = ['/images/image00016.jpeg', '/images/image00021.jpeg', ...STYLES.map((s) => s.image)]

export default async function ToursPage() {
  const tours = await getTours()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
  ])

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        image="/images/image00016.jpeg"
        imageAlt="Camels crossing the golden dunes of Erg Chebbi"
        eyebrow="Morocco & Sahara tours"
        title="Find your Sahara journey"
        subtitle="Private and small-group tours from Marrakech, Fes, Casablanca, Agadir and Errachidia. Every itinerary can be tailored to your dates and pace."
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Tours' }]}
      />

      {/* Quick routes by city */}
      <section className="border-b border-sand-200 bg-white">
        <div className="container-site no-scrollbar flex gap-2 overflow-x-auto py-5">
          <span className="flex shrink-0 items-center pr-2 text-sm font-medium text-ink-500">Departing from:</span>
          {DEPARTURE_CITIES.map((c) => (
            <Link key={c.slug} href={`/tours/${c.slug}`} className="chip shrink-0 !px-4 !py-2 !text-sm hover:border-desert-500 hover:text-desert-700">
              <Icon name="pin" className="h-3.5 w-3.5" /> {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section !pt-10">
        <div className="container-site">
          <FilterableTours tours={tours} excludeImages={PAGE_IMAGES} />
        </div>
      </section>

      <section className="section border-t border-sand-200 bg-white">
        <div className="container-site">
          <p className="eyebrow">Travel your way</p>
          <h2 className="heading-lg mt-3">Explore by travel style</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STYLES.map((s) => (
              <Link key={s.href} href={s.href} className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl bg-night-800">
                <Image src={s.image} alt="" fill sizes="(max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105" />
                <span className="scrim-b absolute inset-0" />
                <span className="relative flex w-full items-end justify-between gap-2 p-4 text-white md:p-5">
                  <span className="font-serif text-lg leading-tight md:text-xl">{s.title}</span>
                  <Icon name="arrow" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Can't find the perfect tour?" text="Most of our guests travel on a tailor-made itinerary. Tell us your dates, starting city and interests and we will design one around you, free of charge." secondary={null} />
    </>
  )
}
