import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import TourCard from '@/components/TourCard'
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
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/image00024.jpeg" alt="Sahara Desert tours from Agadir" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
            <span>/</span>
            <span className="text-white/70">Agadir</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">
            Departing from Agadir
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Sahara Desert Tours from Agadir
          </h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Climb the Anti-Atlas, descend into the Draa Valley, and reach the dunes through Morocco&apos;s most dramatic landscapes
          </p>
        </div>
      </section>

      {/* Route highlights */}
      <section className="bg-sand-50 py-14 border-b border-sand-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold tracking-widest uppercase text-desert-500 mb-8">
            Your Journey East
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { stop: 'Agadir', note: 'Departure point, Atlantic coast resort city' },
              { stop: 'Tafraoute', note: 'Pink granite boulders in the Anti-Atlas' },
              { stop: 'Draa Valley', note: 'Long oasis valley lined with kasbahs and palms' },
              { stop: 'Zagora', note: 'Gateway to the Sahara, sand dunes and camel tracks' },
            ].map((item, i, arr) => (
              <div key={item.stop} className="flex items-start gap-3">
                <div className="flex flex-col items-center flex-shrink-0 mt-1">
                  <div className="w-7 h-7 rounded-full bg-desert-600 text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block w-px flex-1 bg-desert-200 mt-1 min-h-[2rem]" />
                  )}
                </div>
                <div>
                  <p className="font-serif font-bold text-gray-900">{item.stop}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {tours.length > 0 ? (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  Available Tours from Agadir
                </h2>
                <p className="text-gray-500">
                  {tours.length} {tours.length === 1 ? 'tour' : 'tours'} departing from Agadir
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-sand-50 rounded-2xl p-14 max-w-2xl mx-auto border border-sand-200">
                <svg className="w-16 h-16 text-desert-300 mx-auto mb-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Tours Coming Soon</h3>
                <p className="text-gray-900 leading-relaxed mb-8">
                  We are preparing our Agadir departure tours. Contact us to plan a custom adventure in the meantime.
                </p>
                <a href="/contact" className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg smooth-transition">
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* From Our Blog */}
      <section className="bg-sand-50 py-16 border-t border-sand-200">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">From Our Blog</h2>
            <p className="text-gray-500 text-sm">Tips and stories to inspire your Agadir desert journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-xl p-6 border border-sand-200 hover:shadow-md transition-shadow">
                <span className="text-xs font-semibold text-desert-600 uppercase tracking-wide">{post.category}</span>
                <h3 className="font-serif font-bold text-gray-900 mt-2 mb-2 text-base leading-snug group-hover:text-desert-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-900 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <span className="text-desert-600 text-sm font-medium mt-3 inline-block group-hover:underline">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src="/images/image00048.jpeg" alt="Sahara Desert landscape from Agadir" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-4">Your Journey Awaits</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 max-w-2xl leading-tight">
            Beyond the Atlas Lies the Sahara
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl">
            The road from Agadir to the desert is one of Morocco&apos;s great secrets. Let us take you there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/contact" className="px-10 py-4 bg-desert-600 hover:bg-desert-500 text-white font-semibold rounded-lg shadow-lg smooth-transition hover:scale-105 transition-transform">
              Plan My Trip
            </a>
            <a href="/tours" className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 smooth-transition backdrop-blur-sm">
              All Tours
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
