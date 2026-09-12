import Image from 'next/image'
import FilterableTours from '@/components/FilterableTours'
import { client } from '@/lib/sanity'
import { toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

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
    return await client.fetch(toursListQuery) || []
  } catch {
    return []
  }
}

export default async function ToursPage() {
  const tours = await getTours()

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/image00003.jpeg" alt="Discover Sahara Desert tours" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">Explore the Sahara</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Discover Our Desert Tours</h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Filter by departure city or price to find your perfect Sahara experience
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-desert-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: `${tours.length || '50'}+`, label: 'Desert Tours' },
              { value: '5', label: 'Departure Cities' },
              { value: '100%', label: 'Berber-Guided' },
              { value: '5★', label: 'Guest Rating' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-2xl md:text-3xl font-serif font-bold text-desert-200">{stat.value}</span>
                <span className="text-xs md:text-sm text-white/70 mt-1 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FilterableTours tours={tours} />
        </div>
      </section>
    </>
  )
}
