import Image from 'next/image'
import PageHero from '@/components/PageHero'
import CTASection from '@/components/CTASection'
import Link from 'next/link'
import { team } from '@/data/team'
import SectionTitle from '@/components/SectionTitle'
import GuideCard from '@/components/GuideCard'
import { client } from '@/lib/sanity'
import { guidesQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Our Berber Desert Guides in Morocco',
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
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        image="/images/people.JPEG"
        imageAlt="Sahara Desert Berber guides"
        eyebrow="The People Behind the Magic"
        title="Our Expert Guides"
        subtitle="Born in the Sahara, raised on its stories: meet the people who will make your journey unforgettable"
      />

      {/* Trust bar */}
      <section className="bg-desert-700 text-white">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '100%', label: 'Native Berber Guides' },
              { value: '8+', label: 'Languages Spoken' },
              { value: '10+', label: 'Years Avg. Experience' },
              { value: '5★', label: 'Guest Rated' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-2xl md:text-3xl font-serif font-medium text-desert-200">{stat.value}</span>
                <span className="text-xs md:text-sm text-white/70 mt-1 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-ink-600 leading-relaxed">
              Every guide on our team grew up in the Sahara Desert. They know its moods, its stars, its silence.
              Their knowledge isn&apos;t learned from a textbook, it&apos;s inherited from generations of desert nomads who
              navigated these dunes long before GPS existed.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-20 bg-white">
        <div className="container-site">
          {guides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((guide) => (
                <div key={guide.name} className="card overflow-hidden group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand-200">
                    <Image
                      src={guide.image}
                      alt={`${guide.name}: ${guide.role}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                                      </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-medium text-ink-900 mb-1">{guide.name}</h3>
                    <p className="text-desert-700 text-sm font-semibold mb-3">{guide.role}</p>
                    <p className="text-ink-600 text-sm mb-4 leading-relaxed">{guide.bio}</p>
                    <p className="text-sm text-ink-500"><span className="font-semibold text-ink-700 mr-1">Languages:</span>{guide.languages.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-sand-50 py-14 border-t border-sand-200">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-medium text-ink-900 mb-6">Explore More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/about" className="group bg-white rounded-xl p-5 border border-sand-200 hover:shadow-md transition-shadow">
                <p className="font-semibold text-ink-900 group-hover:text-desert-600 transition-colors text-sm">Our Story</p>
                <p className="text-xs text-ink-500 mt-1">How Sahara Desert Travel began and what drives us</p>
              </Link>
              <Link href="/blog/berber-culture-people-of-the-sahara" className="group bg-white rounded-xl p-5 border border-sand-200 hover:shadow-md transition-shadow">
                <p className="font-semibold text-ink-900 group-hover:text-desert-600 transition-colors text-sm">Berber Culture</p>
                <p className="text-xs text-ink-500 mt-1">Learn about the Amazigh people your guides come from</p>
              </Link>
              <Link href="/tours" className="group bg-white rounded-xl p-5 border border-sand-200 hover:shadow-md transition-shadow">
                <p className="font-semibold text-ink-900 group-hover:text-desert-600 transition-colors text-sm">Book a Tour</p>
                <p className="text-xs text-ink-500 mt-1">Choose a journey and meet your guide in person</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        image="/images/image00002.jpeg"
        imageAlt="Sahara Desert dunes"
        eyebrow="Your Guide Awaits"
        title="Ready to Explore with a Local Expert?"
        text="Let one of our Berber guides take you deep into the Sahara, places no map can show you."
      />
    </>
  )
}
