import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import SectionTitle from '@/components/SectionTitle'
import { client, urlFor } from '@/lib/sanity'
import { sustainabilityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sustainable Desert Tourism | Sahara Desert Travel',
    description: 'We protect the Sahara for future generations. Zero single-use plastic, 100% local suppliers, 10% of profits invested in Berber communities, and leave-no-trace principles on every tour.',
    url: '/sustainability',
    keywords: ['sustainable desert tourism', 'eco-friendly Morocco tours', 'responsible travel Sahara', 'Berber community investment', 'low-impact desert tours', 'leave no trace Morocco', 'conservation Sahara'],
  })
}

async function getSustainabilityContent() {
  try {
    const sustainability = await client.fetch(sustainabilityQuery)
    return sustainability
  } catch (error) {
    console.error('Error fetching sustainability content:', error)
    return null
  }
}

export default async function SustainabilityPage() {
  const sustainability = await getSustainabilityContent()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Sustainability', url: '/sustainability' },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/camp_in_desert.jpeg" alt="Sustainable desert camp in the Sahara" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">Travel with Purpose</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            {sustainability?.title || 'Our Commitment to Sustainability'}
          </h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Protecting the Sahara for future generations through responsible tourism
          </p>
        </div>
      </section>

      {/* Impact stats */}
      <section className="bg-desert-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '10%', label: 'Profits to Communities' },
              { value: '0', label: 'Single-Use Plastic' },
              { value: '100%', label: 'Local Suppliers' },
              { value: '8+', label: 'Villages Supported' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-2xl md:text-3xl font-serif font-bold text-desert-200">{stat.value}</span>
                <span className="text-xs md:text-sm text-white/70 mt-1 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      {sustainability?.introduction && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-600 leading-relaxed">
                {sustainability.introduction}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Initiatives */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Initiatives"
            subtitle="Concrete actions we take on every tour, every day"
          />

          {sustainability?.initiatives && sustainability.initiatives.length > 0 ? (
            <div className="space-y-12 max-w-4xl mx-auto">
              {sustainability.initiatives.map((initiative, index) => (
                <div key={index} className="bg-sand-50 rounded-2xl overflow-hidden border border-sand-200 shadow-sm">
                  {initiative.image && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={urlFor(initiative.image).width(900).height(450).url()}
                        alt={`${initiative.title}: Sustainability Initiative`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{initiative.title}</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{initiative.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback initiatives */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  title: 'Environmental Protection',
                  body: 'We minimise our footprint through leave-no-trace principles, waste reduction, and protecting fragile desert ecosystems on every tour.',
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  ),
                  title: 'Community Investment',
                  body: 'We work directly with local communities, employ Berber guides, source supplies locally, and contribute 10% of profits to community development.',
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  ),
                  title: 'Cultural Preservation',
                  body: 'Our tours respect local traditions, support traditional crafts, and promote genuine cultural exchange that benefits desert communities long-term.',
                },
              ].map((item) => (
                <div key={item.title} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-sand-100">
                  <div className="w-12 h-12 bg-desert-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-desert-100 transition-colors">
                    <svg className="w-6 h-6 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-900 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Pledge */}
      <section className="bg-sand-50 py-20 border-t border-sand-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-center">
              <svg className="w-10 h-10 text-desert-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-2xl font-serif italic text-gray-700 leading-relaxed mb-6">
                &ldquo;The desert does not belong to us. We belong to it. Our job is to share it carefully, and to leave it better than we found it.&rdquo;
              </p>
              <footer className="text-sm text-desert-600 font-semibold tracking-wide uppercase">
                Mustapha, Founder · Sahara Desert Travel
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* External Resources + Internal Links */}
      <section className="bg-white py-14 border-t border-sand-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">Responsible Travel: Further Reading</h2>
          <p className="text-gray-500 text-sm mb-6">Resources on sustainable tourism and desert conservation</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { label: 'UNWTO: Sustainable Tourism Development', url: 'https://www.unwto.org/sustainable-development', desc: 'Global standards and frameworks for responsible travel' },
              { label: 'Leave No Trace: Seven Principles', url: 'https://lnt.org/learn/seven-principles-overview', desc: 'Minimising impact in wild and natural places' },
              { label: 'UNESCO World Heritage: Morocco', url: 'https://whc.unesco.org/en/statesparties/ma', desc: 'Morocco\'s UNESCO-listed heritage sites and their protection' },
              { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Sustainable travel resources for Morocco' },
            ].map((item) => (
              <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-sand-50 rounded-xl border border-sand-200 hover:border-desert-300 hover:shadow-sm transition-all group">
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
            <p className="text-sm font-semibold text-gray-700 mb-4">On our site</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog/sustainable-travel-sahara" className="px-4 py-2 bg-sand-50 rounded-lg border border-sand-200 text-sm text-desert-700 font-medium hover:border-desert-400 hover:shadow-sm transition-all">How to Travel the Sahara Sustainably: Blog</Link>
              <Link href="/about" className="px-4 py-2 bg-sand-50 rounded-lg border border-sand-200 text-sm text-desert-700 font-medium hover:border-desert-400 hover:shadow-sm transition-all">About Our Company</Link>
              <Link href="/tours" className="px-4 py-2 bg-sand-50 rounded-lg border border-sand-200 text-sm text-desert-700 font-medium hover:border-desert-400 hover:shadow-sm transition-all">Browse Responsible Tours</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src="/images/desert8.jpeg" alt="Sahara Desert sustainable tourism" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-4">Travel Responsibly</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 max-w-2xl leading-tight">
            Join a Tour That Gives Back
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl">
            Every booking with us directly supports local Berber communities and desert conservation. Choose travel that makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/tours"
              className="px-10 py-4 bg-desert-600 hover:bg-desert-500 text-white font-semibold rounded-lg shadow-lg smooth-transition hover:scale-105 transition-transform"
            >
              Browse Responsible Tours
            </a>
            <a
              href="/contact"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 smooth-transition backdrop-blur-sm"
            >
              Ask Us Anything
            </a>
          </div>
        </div>
      </section>

    </>
  )
}
