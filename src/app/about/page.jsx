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
      <section className="section bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <span className="eyebrow">Why travel with us</span>
            <h2 className="heading-lg mt-3">Why We&rsquo;re Different</h2>
            <p className="lede mt-5">
              Every Visit Sahara Desert journey is designed and led by Berber guides who were born in the desert. We
              don&rsquo;t hand you a script. We share the land, the people and the traditions we grew up with, at a pace
              that suits you.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: 'users',
                title: 'Guides Born in the Sahara',
                body: 'Our guides grew up in desert communities and learned its routes, stories and customs from their families. What you hear on the trail is first-hand knowledge, not a memorised commentary.',
              },
              {
                icon: 'music',
                title: 'Living Berber Culture',
                body: 'Music, storytelling, food and hospitality are part of daily life in our villages. We share them as they really are, not as a performance staged for visitors.',
              },
              {
                icon: 'leaf',
                title: 'Responsible, Low-Impact Travel',
                body: 'Private tours and small shared groups, leave-no-trace practice in the dunes, and 10% of our profits reinvested in the desert communities we work with.',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
                className="card p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-desert-50 text-desert-600">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-serif text-xl text-ink-900">{item.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-600">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Signature experiences */}
          <div className="mt-20 rounded-3xl bg-sand-50 px-6 py-12 md:px-12 md:py-14">
            <div className="max-w-2xl" data-reveal>
              <span className="eyebrow">What you can experience</span>
              <h3 className="heading-md mt-3">Our Signature Sahara Experiences</h3>
              <p className="mt-4 leading-relaxed text-ink-600">
                Each itinerary is built around you. These are the experiences our guests ask for most, and any of them can
                be added to a private or small-group tour.
              </p>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: 'route', title: 'Camel Trekking', body: 'Ride across the dunes of Erg Chebbi (Merzouga) or Erg Chigaga at sunrise or sunset, following old caravan routes.' },
                { icon: 'tent', title: 'Desert Camps', body: 'Spend the night in a traditional Berber camp, from simple nomad tents to luxury camps with private bathrooms.' },
                { icon: 'mountain', title: 'Sandboarding', body: 'Board down the highest dunes of the Sahara, with equipment and guidance provided.' },
                { icon: 'users', title: 'Nomad Family Visits', body: 'Share mint tea with a nomadic family and see how desert life, crafts and herding continue today.' },
                { icon: 'leaf', title: 'Oases & Gorges', body: 'Walk through palm groves, springs and canyons such as the Todra and Dades gorges.' },
                { icon: 'camera', title: 'Desert Photography', body: 'Time your stops for the best light on the dunes, kasbahs and valleys, with guides who know the angles.' },
                { icon: 'moon', title: 'Stargazing Evenings', body: 'Far from any city lights, enjoy one of the clearest night skies on earth around the campfire.' },
                { icon: 'music', title: 'Music & Desert Cuisine', body: 'Join Gnawa and Berber drumming at camp and learn to cook tagine and sand-baked bread.' },
              ].map((exp) => (
                <li key={exp.title} className="flex gap-4" data-reveal>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-desert-600 shadow-sm">
                    <Icon name={exp.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-serif text-lg text-ink-900">{exp.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{exp.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link href="/tours" className="btn-primary">Explore our tours</Link>
            </div>
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
