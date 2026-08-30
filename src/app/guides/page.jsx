import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import SectionTitle from '@/components/SectionTitle'
import GuideCard from '@/components/GuideCard'
import { client } from '@/lib/sanity'
import { guidesQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Our Berber Desert Guides | Sahara Desert Travel',
    description: 'Meet our native Berber guides, born in the Sahara, fluent in 8+ languages, with over a decade of desert expertise. Every guide grew up in these dunes and knows them by heart.',
    url: '/guides',
    keywords: ['Berber desert guides', 'local Sahara guides', 'Morocco tour guides', 'native guides Merzouga', 'Erg Chebbi guide', 'Sahara expert guides'],
  })
}

async function getGuides() {
  try {
    const guides = await client.fetch(guidesQuery)
    return guides || []
  } catch (error) {
    console.error('Error fetching guides:', error)
    return []
  }
}

export default async function GuidesPage() {
  const guides = await getGuides()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Our Guides', url: '/guides' },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/people.JPEG" alt="Sahara Desert Berber guides" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">The People Behind the Magic</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Our Expert Guides</h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Born in the Sahara, raised on its stories: meet the people who will make your journey unforgettable
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-desert-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '100%', label: 'Native Berber Guides' },
              { value: '8+', label: 'Languages Spoken' },
              { value: '10+', label: 'Years Avg. Experience' },
              { value: '5★', label: 'Guest Rated' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-2xl md:text-3xl font-serif font-bold text-desert-200">{stat.value}</span>
                <span className="text-xs md:text-sm text-white/70 mt-1 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-600 leading-relaxed">
              Every guide on our team grew up in the Sahara Desert. They know its moods, its stars, its silence.
              Their knowledge isn&apos;t learned from a textbook, it&apos;s inherited from generations of desert nomads who
              navigated these dunes long before GPS existed.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4">
          {guides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Mustapha', role: 'Lead Desert Guide', image: '/images/mustafa.jpg', bio: 'Born in the Draa Valley, Mustapha has been guiding expeditions across Erg Chebbi and Erg Zgid for over 15 years.', languages: ['Arabic', 'Tamazight', 'French', 'English'] },
                { name: 'Said', role: 'Camel Trek Specialist', image: '/images/said.jpg', bio: 'A third-generation cameleer, Said knows every dune by name and every star by story.', languages: ['Arabic', 'Tamazight', 'French'] },
                { name: 'Youssef', role: 'Cultural Guide', image: '/images/Youssef.jpg', bio: 'Youssef bridges ancient Berber tradition and modern travel, a storyteller, musician, and expert desert host.', languages: ['Arabic', 'Tamazight', 'French', 'English', 'Spanish'] },
                { name: 'Abdul', role: 'Desert Navigator', image: '/images/abdul.jpg', bio: 'Abdul leads multi-day treks into the deep desert, navigating by stars and landscape with no GPS required.', languages: ['Arabic', 'Tamazight', 'French'] },
                { name: 'Ahmad', role: 'Camp Host & Cook', image: '/images/ahmad.jpg', bio: "Ahmad's campfire tagines and traditional Berber bread have become a highlight of every tour he leads.", languages: ['Arabic', 'Tamazight', 'French', 'English'] },
                { name: 'Anwar', role: 'Photography Guide', image: '/images/anwar.jpg', bio: 'Anwar knows the exact dune, hour, and light to take you to for the perfect shot, sunrise or moonrise.', languages: ['Arabic', 'Tamazight', 'French', 'English'] },
                { name: 'Hsayn', role: 'Senior Guide', image: '/images/hsayn.jpg', bio: 'With 20 years in the Sahara, Hsayn is the guide other guides call when they want to learn something new.', languages: ['Arabic', 'Tamazight', 'French'] },
              ].map((guide) => (
                <div key={guide.name} className="bg-sand-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={`${guide.name}: ${guide.role}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{guide.name}</h3>
                    <p className="text-desert-600 font-semibold mb-3">{guide.role}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{guide.bio}</p>
                    <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700 mr-1">Languages:</span>{guide.languages.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-sand-50 py-14 border-t border-sand-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Explore More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/about" className="group bg-white rounded-xl p-5 border border-sand-200 hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900 group-hover:text-desert-600 transition-colors text-sm">Our Story</p>
                <p className="text-xs text-gray-500 mt-1">How Sahara Desert Travel began and what drives us</p>
              </Link>
              <Link href="/blog/berber-culture-people-of-the-sahara" className="group bg-white rounded-xl p-5 border border-sand-200 hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900 group-hover:text-desert-600 transition-colors text-sm">Berber Culture</p>
                <p className="text-xs text-gray-500 mt-1">Learn about the Amazigh people your guides come from</p>
              </Link>
              <Link href="/tours" className="group bg-white rounded-xl p-5 border border-sand-200 hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900 group-hover:text-desert-600 transition-colors text-sm">Book a Tour</p>
                <p className="text-xs text-gray-500 mt-1">Choose a journey and meet your guide in person</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src="/images/desert5.jpg" alt="Sahara Desert dunes" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-4">Your Guide Awaits</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 max-w-2xl leading-tight">
            Ready to Explore with a Local Expert?
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl">
            Let one of our Berber guides take you deep into the Sahara, places no map can show you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="px-10 py-4 bg-desert-600 hover:bg-desert-500 text-white font-semibold rounded-lg shadow-lg smooth-transition hover:scale-105 transition-transform"
            >
              Plan My Trip
            </a>
            <a
              href="/tours"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 smooth-transition backdrop-blur-sm"
            >
              Browse Tours
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
