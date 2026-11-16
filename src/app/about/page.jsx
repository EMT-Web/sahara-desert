import Image from 'next/image'
import PageHero from '@/components/PageHero'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'
import Icon from '@/components/Icon'
import GuideCard from '@/components/GuideCard'
import { client, urlFor } from '@/lib/sanity'
import { aboutQuery, guidesQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { FAQList } from '@/components/FAQSection'
import { OPERATOR, OPERATOR_FAQS } from '@/lib/site'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'About Us: Berber Desert Guides Since 2014',
    description: 'Meet the Berber guides behind Visit Sahara Desert, operated by Escorted Morocco Tours (EMT), a licensed Moroccan tour operator. Our story, values and how bookings work.',
    url: '/about',
    keywords: ['Escorted Morocco Tours', 'EMT licensed tour operator', 'licensed Morocco tour operator', 'About Sahara Desert Travel', 'Berber desert guides', 'Morocco travel company', 'sustainable desert tourism', 'authentic Morocco experience', 'local guides Sahara', 'Mustapha Oufota'],
  })
}

async function getAboutData() {
  try {
    const [about, guides] = await Promise.all([
      client.fetch(aboutQuery),
      client.fetch(guidesQuery),
    ])
    return { about, guides: guides || [] }
  } catch (error) {
    console.error('Error fetching about data:', error)
    return { about: null, guides: [] }
  }
}

export default async function AboutPage() {
  const { about, guides } = await getAboutData()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ])

  const faqSchema = generateFAQSchema(OPERATOR_FAQS)

  return (
    <>
      <script id="faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        image="/images/image00018.jpeg"
        imageAlt="Our guides with a group of travellers on the Erg Chebbi dunes"
        eyebrow="Our Company"
        title={about?.title || 'Our Story'}
        subtitle={about?.subtitle || 'Born from a passion for the Sahara and a commitment to authentic experiences'}
      />

      {/* Stats bar */}
      <section className="bg-desert-700 text-white">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '20+', label: 'Years in the Desert' },
              { value: '7+', label: 'Expert Guides' },
              { value: '40+', label: 'Countries Welcomed' },
              { value: '100%', label: 'Berber-Led' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-2xl md:text-3xl font-serif font-medium text-desert-200">{stat.value}</span>
                <span className="text-xs md:text-sm text-white/70 mt-1 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Story */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="How It Began"
              subtitle="A journey that started with love for the land and a desire to share it with the world"
            />

            {about?.foundersStory && (
              <div className="mt-10 text-ink-700 leading-relaxed whitespace-pre-line text-lg">
                {about.foundersStory}
              </div>
            )}

            {about?.foundersImages && about.foundersImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
                {about.foundersImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={urlFor(image).width(800).height(600).url()}
                      alt="Sahara Desert Travel team"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
                {[
                  { src: '/images/gathering_team.JPG', alt: 'The Sahara Desert Travel team in the field' },
                  { src: '/images/people.JPEG', alt: 'Our guides and guests in the desert' },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Licensed operator: who runs the brand, who you pay */}
      <section id="licensed-operator" className="section bg-sand-50 border-y border-sand-200">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div data-reveal>
              <span className="eyebrow">Licensed &amp; accountable</span>
              <h2 className="heading-lg mt-3">Operated by {OPERATOR.name} ({OPERATOR.shortName})</h2>
              <div className="mt-6 space-y-4 text-ink-700 leading-relaxed">
                <p>
                  Visit Sahara Desert is a brand of{' '}
                  <a href={OPERATOR.url} target="_blank" rel="nofollow noopener" className="font-medium text-desert-700 underline underline-offset-2 hover:text-desert-800">
                    {OPERATOR.name}
                  </a>{' '}
                  ({OPERATOR.shortName}), a registered and licensed tour operator in Morocco. Our Berber guides design and lead
                  the journeys; {OPERATOR.shortName} is the legal company that stands behind every one of them.
                </p>
                <p>
                  That means your trip is not arranged by a freelancer or an anonymous middleman. {OPERATOR.shortName} holds the
                  operating licence, contracts the licensed drivers, guides, desert camps and hotels on your itinerary, and is
                  accountable to you from the first quote to the final transfer.
                </p>
                <p>
                  All official paperwork carries {OPERATOR.shortName}&rsquo;s name: your booking confirmation, contract, invoice and
                  receipts are issued by {OPERATOR.name}, and every deposit or balance payment is made to {OPERATOR.name}.
                </p>
              </div>
            </div>

            <div data-reveal style={{ '--reveal-delay': '90ms' }}>
              <ul className="grid gap-4">
                {[
                  { icon: 'shield', title: 'Licensed Moroccan tour operator', body: `Tours run under the licence of ${OPERATOR.name}, with vehicles authorised for tourist transport and professionally licensed drivers and guides.` },
                  { icon: 'mail', title: 'Official documents in EMT\u2019s name', body: 'Booking confirmations, contracts, invoices and receipts are all issued by Escorted Morocco Tours.' },
                  { icon: 'check', title: 'Payments made to EMT only', body: 'Deposits and balances are paid to Escorted Morocco Tours. If anyone asks you to pay a private person or another company, contact us first.' },
                ].map((item) => (
                  <li key={item.title} className="card flex gap-4 p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-desert-50 text-desert-600">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-ink-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl" data-reveal>
            <h3 className="heading-md mb-4">Bookings, licensing and payments</h3>
            <FAQList faqs={OPERATOR_FAQS} />
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="bg-sand-50 py-20">
        <div className="container-site">
          <SectionTitle
            title="Why We're Different"
            subtitle="Our team brings generations of Saharan wisdom to every journey"
          />

          {about?.localExpertise && (
            <p className="text-center text-lg text-ink-600 max-w-3xl mx-auto -mt-4 mb-14 leading-relaxed">
              {about.localExpertise}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
                title: 'Born in the Desert',
                body: 'Our guides grew up in Saharan communities, learning traditions passed down through generations. No scripts, just real stories.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                ),
                title: 'Cultural Guardians',
                body: 'We preserve and share Berber traditions, music, and storytelling, living culture, not a performance for tourists.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Low-Impact Travel',
                body: 'Small groups only. We put 10% of profits back into desert communities and follow leave-no-trace principles on every journey.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-sand-100"
              >
                <div className="w-12 h-12 bg-desert-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-desert-100 transition-colors">
                  <svg className="w-6 h-6 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-medium mb-3 text-ink-900">{item.title}</h3>
                <p className="text-sm text-ink-900 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Guides */}
      {guides.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-site">
            <SectionTitle
              title="Meet Our Expert Guides"
              subtitle="Local experts who bring the Sahara to life"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {guides.slice(0, 6).map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href="/guides"
                className="inline-block px-8 py-4 border-2 border-desert-600 text-desert-600 hover:bg-desert-600 hover:text-white font-semibold rounded-lg smooth-transition"
              >
                Meet All Our Guides
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Sustainability Commitment */}
      <section className="bg-gradient-to-r from-desert-700 to-desert-800 py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-desert-300 text-xs font-semibold tracking-widest uppercase mb-4 block">Our Promise</span>
            <h2 className="text-4xl font-serif font-medium text-white mb-6">
              Protecting the Sahara for Future Generations
            </h2>
            <p className="text-xl text-white/85 leading-relaxed mb-10">
              {about?.sustainabilityCommitment ||
                'We follow leave-no-trace principles, support local communities, and preserve the cultural heritage of the region. Every journey with us contributes to sustainable tourism that benefits both travellers and the desert communities we call home.'}
            </p>
            <a
              href="/sustainability"
              className="inline-block px-8 py-4 bg-white text-desert-700 font-semibold rounded-lg shadow-lg hover:bg-sand-100 smooth-transition"
            >
              Learn About Our Initiatives
            </a>
          </div>
        </div>
      </section>

      {/* From Our Blog */}
      <section className="bg-white py-16 border-t border-sand-200">
        <div className="container-site">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-ink-900 mb-2">From Our Blog</h2>
            <p className="text-ink-500 text-sm">Stories and insights from a decade in the desert</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { slug: 'berber-culture-people-of-the-sahara', category: 'Culture', title: 'Berber Culture: The People of the Sahara', excerpt: 'The Amazigh people have called the Sahara home for millennia. Meet the communities who share the desert with our travellers.' },
              { slug: 'sustainable-travel-sahara', category: 'Sustainability', title: 'How to Travel the Sahara Sustainably', excerpt: 'Responsible travel in the desert means protecting fragile ecosystems and investing in the communities that call it home.' },
              { slug: '10-things-to-know-sahara-desert', category: 'Travel Tips', title: '10 Things to Know Before Your First Sahara Trip', excerpt: 'The Sahara is unlike any destination on earth. Here is what every first-time visitor needs to know before stepping onto the sand.' },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-sand-50 rounded-xl p-6 border border-sand-200 hover:shadow-md transition-shadow">
                <span className="text-xs font-semibold text-desert-600 uppercase tracking-wide">{post.category}</span>
                <h3 className="font-serif font-medium text-ink-900 mt-2 mb-2 text-base leading-snug group-hover:text-desert-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-ink-900 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <span className="text-desert-600 text-sm font-medium mt-3 inline-block group-hover:underline">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
