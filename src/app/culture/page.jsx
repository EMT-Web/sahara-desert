import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import SectionTitle from '@/components/SectionTitle'
import { client, urlFor } from '@/lib/sanity'
import { cultureQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Berber Culture & Saharan Traditions | Sahara Desert Travel',
    description: 'Discover the living culture of the Sahara: Berber language, Gnawa music, desert hospitality, and traditions passed down for millennia by the Amazigh people of Morocco.',
    url: '/culture',
    keywords: ['Berber culture Morocco', 'Amazigh traditions', 'Saharan culture', 'Gnawa music', 'desert heritage', 'nomadic culture Sahara', 'Berber people Morocco', 'Tamazight language'],
  })
}

function renderFormattedText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-desert-700 font-bold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

async function getCultureContent() {
  try {
    const culture = await client.fetch(cultureQuery)
    return culture
  } catch (error) {
    console.error('Error fetching culture content:', error)
    return null
  }
}

export default async function CulturePage() {
  const culture = await getCultureContent()

  const hasContent = culture?.introduction || culture?.berberTraditions || culture?.campfireStorytelling || culture?.sections?.length > 0

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Saharan Culture', url: '/culture' },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/image00037.jpeg" alt="Berber musicians and travelers gathered around a campfire in the Sahara Desert at night" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">Living Heritage</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            {culture?.title || 'Saharan Culture & Traditions'}
          </h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Discover the rich heritage, customs, and way of life of the Saharan people
          </p>
        </div>
      </section>

      {/* Introduction */}
      {culture?.introduction && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-600 leading-relaxed">
                {culture.introduction}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Cultural highlights */}
      {!culture?.introduction && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-600 leading-relaxed">
                The Sahara is more than sand and sun: it is home to one of the world&apos;s oldest living cultures.
                The Berber people have called this desert home for millennia, building a rich tapestry of language,
                music, art, and tradition that continues to thrive today.
              </p>
            </div>
          </div>
        </section>
      )}

      {hasContent ? (
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">

              {/* Berber Traditions */}
              {culture?.berberTraditions && (
                <div className="bg-sand-50 rounded-2xl p-10 border border-sand-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-desert-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Berber Traditions</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {renderFormattedText(culture.berberTraditions)}
                  </p>
                </div>
              )}

              {/* Campfire Storytelling */}
              {culture?.campfireStorytelling && (
                <div className="bg-gradient-to-br from-desert-50 to-sand-50 rounded-2xl p-10 border border-desert-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-desert-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Campfire Storytelling</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg mb-8">
                    {renderFormattedText(culture.campfireStorytelling)}
                  </p>
                  <blockquote className="border-l-4 border-desert-500 pl-6 py-2">
                    <p className="text-gray-700 italic text-lg leading-relaxed">
                      &ldquo;Under the starlit Saharan sky, around the warm glow of a campfire, stories have been passed down for generations. These tales of desert wisdom, ancient legends, and cultural heritage come alive in the voices of our local guides.&rdquo;
                    </p>
                  </blockquote>
                </div>
              )}

              {/* Dynamic Sections */}
              {culture?.sections && culture.sections.length > 0 && culture.sections.map((section, index) => (
                <div key={index} className="bg-sand-50 rounded-2xl p-10 border border-sand-200">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">{section.heading}</h2>

                  {section.content && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg mb-8">
                      {section.content}
                    </p>
                  )}

                  {section.images && section.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative aspect-video overflow-hidden rounded-xl">
                          <Image
                            src={urlFor(image).width(700).height(450).url()}
                            alt={`${section.heading}: Saharan Culture`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Fallback: no CMS content yet */
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">
              {[
                {
                  title: 'Berber Language & Identity',
                  body: 'The Amazigh (Berber) people are the indigenous inhabitants of North Africa. Their language, Tamazight, is one of the oldest living languages in the world and is deeply embedded in daily life, music, and oral tradition across the Sahara.',
                  image: '/images/fort.jpg',
                },
                {
                  title: 'Music, Dance & Celebration',
                  body: 'Gnawa rhythms, guembri lutes, and communal ahwach dances are central to Berber identity. Music is not entertainment here: it is ritual, memory, and connection to ancestors stretching back thousands of years.',
                  image: '/images/gathering_team.JPG',
                },
                {
                  title: 'Desert Hospitality',
                  body: 'In the Sahara, a stranger is treated as a guest sent by God. The ritual of mint tea, poured three times, each cup with a different meaning, is an act of hospitality that opens doors, settles disputes, and forges friendships.',
                  image: '/images/houses_in_desert.jpeg',
                },
              ].map((item) => (
                <div key={item.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-sand-50 rounded-2xl overflow-hidden border border-sand-200">
                  <div className="relative h-64 md:h-full min-h-[240px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* External Resources + Internal Links */}
      <section className="bg-sand-50 py-14 border-t border-sand-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">Further Reading on Berber Culture</h2>
          <p className="text-gray-500 text-sm mb-6">Authoritative sources to deepen your understanding of Saharan heritage</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { label: 'Berber People: Wikipedia', url: 'https://en.wikipedia.org/wiki/Berber_people', desc: 'History and identity of the Amazigh people of North Africa' },
              { label: 'UNESCO: Intangible Cultural Heritage', url: 'https://ich.unesco.org/', desc: 'UNESCO documentation of Berber oral and living traditions' },
              { label: 'Gnawa Music: Wikipedia', url: 'https://en.wikipedia.org/wiki/Gnawa_music', desc: 'Sacred music traditions of the Sahara region' },
              { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Explore Moroccan culture, festivals, and destinations' },
            ].map((item) => (
              <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-sand-200 hover:border-desert-300 hover:shadow-sm transition-all group">
                <svg className="w-4 h-4 text-desert-400 flex-shrink-0 mt-0.5 group-hover:text-desert-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800 text-sm group-hover:text-desert-700 transition-colors">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="pt-6 border-t border-sand-200">
            <p className="text-sm font-semibold text-gray-700 mb-4">Explore on our site</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog/berber-culture-people-of-the-sahara" className="px-4 py-2 bg-white rounded-lg border border-sand-200 text-sm text-desert-700 font-medium hover:border-desert-400 hover:shadow-sm transition-all">Berber Culture: Blog Post</Link>
              <Link href="/blog/ancient-trans-saharan-trade-routes" className="px-4 py-2 bg-white rounded-lg border border-sand-200 text-sm text-desert-700 font-medium hover:border-desert-400 hover:shadow-sm transition-all">Ancient Trade Routes</Link>
              <Link href="/guides" className="px-4 py-2 bg-white rounded-lg border border-sand-200 text-sm text-desert-700 font-medium hover:border-desert-400 hover:shadow-sm transition-all">Meet Our Berber Guides</Link>
              <Link href="/music" className="px-4 py-2 bg-white rounded-lg border border-sand-200 text-sm text-desert-700 font-medium hover:border-desert-400 hover:shadow-sm transition-all">Saharan Music</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src="/images/fort2.jpg" alt="Desert fortress in Morocco" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-4">Experience It Yourself</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 max-w-2xl leading-tight">
            Immerse Yourself in Saharan Culture
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl">
            Our tours go beyond sightseeing: share a meal with a nomadic family, learn to play the guembri, and sleep under stars that have guided caravans for centuries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/tours"
              className="px-10 py-4 bg-desert-600 hover:bg-desert-500 text-white font-semibold rounded-lg shadow-lg smooth-transition hover:scale-105 transition-transform"
            >
              Explore Our Tours
            </a>
            <a
              href="/contact"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 smooth-transition backdrop-blur-sm"
            >
              Ask a Question
            </a>
          </div>
        </div>
      </section>

    </>
  )
}
