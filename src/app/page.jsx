import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import TourCard from '@/components/TourCard'
import BlogCard from '@/components/BlogCard'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import Icon from '@/components/Icon'
import { client } from '@/lib/sanity'
import { homepageQuery, toursListQuery, contactQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateFAQSchema } from '@/lib/seo'
import { blogPosts } from '@/data/blogPosts'
import { team } from '@/data/team'
import { DEPARTURE_CITIES } from '@/lib/site'

const homepageFAQs = [
  { question: 'What is the best time of year to visit the Sahara?', answer: 'October to April is ideal: temperatures are comfortable (15–28°C by day) and the nights are cool and clear for stargazing. July and August bring extreme heat (40°C+) and are not recommended for desert treks.' },
  { question: 'Are your tours private or shared?', answer: 'Both. Most of our guests travel privately, with their own driver-guide and vehicle, at their own pace. We also run shared small-group tours of up to 17 people for travellers who prefer company and a lower price.' },
  { question: 'Are your tours suitable for first-time desert travellers?', answer: 'Absolutely. Our guides are experienced with travellers of all backgrounds. We provide full briefings, quality equipment, and adjust the pace of every tour to suit the group. No prior desert experience is required.' },
  { question: 'How do I get to the Sahara from major Moroccan cities?', answer: 'We offer tours departing from Marrakech, Fes, Casablanca, Agadir, and Errachidia. All tours include private transport: no need to arrange your own. We pick you up from your hotel or riad.' },
  { question: 'Can you build a custom itinerary for us?', answer: 'Yes, most of our trips are tailor-made. Tell us your dates, starting and ending city, interests and preferred comfort level, and we will send a personalised day-by-day itinerary with a clear price.' },
  { question: 'What languages do your guides speak?', answer: 'We operate tours in 5 languages: English, French, Arabic, Spanish, and German. Our Berber guides are fluent in English, French, and Arabic, with many also speaking Spanish and German, and we can accommodate most other European languages with advance notice.' },
  { question: 'How far in advance should I book?', answer: 'We recommend booking at least 2–4 weeks in advance, especially for peak season (December–February). Last-minute bookings are sometimes possible: contact us via WhatsApp for availability.' },
  { question: 'What is your cancellation policy?', answer: 'Full refund for cancellations made 14+ days before departure. 50% refund between 7–14 days. No refund within 7 days, but we offer free date changes. Contact us and we will always do our best to help.' },
]

const EXPERIENCES = [
  { title: 'Camel treks at sunset', text: 'Ride into Erg Chebbi as the dunes turn copper, with a guide who grew up here.', image: '/images/image00020.jpeg', alt: 'Camel caravan climbing a dune ridge at dusk', href: '/merzouga-erg-chebbi' },
  { title: 'Nights in a desert camp', text: 'From simple Berber tents to private luxury camps with en-suite bathrooms.', image: '/images/desert9.jpeg', alt: 'Luxury desert camp lounge at sunset', href: '/luxury-desert-camps' },
  { title: 'Kasbahs, gorges & mountains', text: 'Aït Benhaddou, the Dades and Todra gorges and the High Atlas passes.', image: '/images/image00041.jpeg', alt: 'Winding road through the Dades gorges', href: '/tours/marrakech' },
  { title: 'Music, tea & Berber life', text: 'Gnawa rhythms by the fire, mint tea with nomad families, bread baked in the sand.', image: '/images/image00022.jpeg', alt: 'Gnawa musicians in white robes', href: '/culture' },
]

const REASONS = [
  { icon: 'compass', title: 'Born in the desert', text: 'Our guides are Berber people from the Sahara, not hired scripts. They share their own villages, families and stories.' },
  { icon: 'users', title: 'Private by default', text: 'Your own driver-guide and vehicle, your pace, your stops. Small shared groups available too.' },
  { icon: 'route', title: 'Tailor-made routes', text: 'Every itinerary is adjusted to your dates, interests and comfort level, at no extra cost.' },
  { icon: 'chat', title: 'Real people, fast replies', text: 'Plan directly with our team on WhatsApp or email. No call centres, no middlemen.' },
  { icon: 'shield', title: 'Clear, fair pricing', text: 'Per-person prices shown upfront, free cancellation up to 14 days before departure.' },
  { icon: 'leaf', title: 'Travel that gives back', text: 'We work with local camps, cooks and families, and leave no trace in the dunes.' },
]

const STEPS = [
  { n: '01', title: 'Tell us your plans', text: 'Send your dates, group size and wishes through our short form or on WhatsApp.' },
  { n: '02', title: 'Receive your itinerary', text: 'Within hours, we reply with a personalised day-by-day route and a clear price.' },
  { n: '03', title: 'Refine & confirm', text: 'Adjust anything you like. Once you are happy, we confirm every booking in writing.' },
  { n: '04', title: 'Travel with us', text: 'We meet you at your hotel or the airport and take care of every detail from there.' },
]

export async function generateMetadata() {
  const homepage = await client.fetch(homepageQuery).catch(() => null)
  return generateSEOMetadata({
    title: 'Sahara Desert Tours in Morocco from Marrakech & Fes',
    description:
      'Private Sahara Desert tours with local Berber guides: camel treks in Merzouga, desert camps and 2 to 15 day trips from Marrakech, Fes, Casablanca and Agadir.',
    image: homepage?.heroImage,
    url: '/',
  })
}

async function getHomepageData() {
  try {
    const [homepage, allTours, contact] = await Promise.all([
      client.fetch(homepageQuery),
      client.fetch(toursListQuery),
      client.fetch(contactQuery).catch(() => null),
    ])

    // Group tours by departure city and pick up to 6, spread across cities.
    const toursByCity = {}
    allTours?.forEach((tour) => {
      const city = tour.departureCity || 'other'
      if (!toursByCity[city]) toursByCity[city] = []
      toursByCity[city].push(tour)
    })
    const cities = Object.keys(toursByCity).sort((a, b) => toursByCity[b].length - toursByCity[a].length)
    const featuredTours = []
    const maxTours = 6
    if (cities.length > 0) {
      const toursPerCity = Math.floor(maxTours / cities.length)
      const extraTours = maxTours % cities.length
      for (let i = 0; i < cities.length && featuredTours.length < maxTours; i++) {
        const count = Math.max(1, toursPerCity + (i < extraTours ? 1 : 0))
        featuredTours.push(...toursByCity[cities[i]].slice(0, count))
      }
    }
    const cityCounts = Object.fromEntries(Object.entries(toursByCity).map(([k, v]) => [k, v.length]))

    return { homepage, tours: featuredTours.slice(0, maxTours), total: allTours?.length || 0, cityCounts, contact }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return { homepage: null, tours: [], total: 0, cityCounts: {}, contact: null }
  }
}

export default async function HomePage() {
  const { homepage, tours, total, cityCounts, contact } = await getHomepageData()
  const faqSchema = generateFAQSchema(homepageFAQs)

  return (
    <>
      {faqSchema && (
        <script id="faq-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <Hero
        title={homepage?.heroTitle || 'Private Sahara Desert Tours, Guided by Berber Locals'}
        subtitle={
          homepage?.heroSubtitle ||
          'Camel treks at sunset, nights under a sky full of stars, and handcrafted journeys through Morocco from Marrakech, Fes and Casablanca, planned personally by our team.'
        }
        whatsapp={contact?.whatsapp}
      />

      {/* 1. Who we are / what we offer */}
      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="eyebrow">Welcome to Visit Sahara Desert</p>
            <h2 className="heading-lg mt-3">A local Moroccan team, sharing the desert we call home</h2>
            <p className="lede mt-6">
              Since 2014 we have guided travellers from around the world across Morocco&apos;s mountains, kasbahs and golden dunes. We are a locally owned company with Berber roots, and every journey is run by our own guides, drivers and camp hosts.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                { icon: 'route', title: 'Private & tailor-made tours', text: 'From 2-day desert escapes to 15-day grand tours of Morocco.' },
                { icon: 'tent', title: 'Sahara camps for every style', text: 'Authentic nomad tents or luxury glamping in Erg Chebbi.' },
                { icon: 'users', title: 'Shared small-group departures', text: 'Great value, up to 17 guests, same local guides.' },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-desert-50 text-desert-700">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink-900">{item.title}</h3>
                    <p className="mt-0.5 text-sm text-ink-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/about" className="btn-outline">Our story</Link>
              <Link href="/guides" className="link-arrow px-2">Meet our guides <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /></Link>
            </div>
          </div>

          <div className="relative grid grid-cols-5 gap-3 sm:gap-4" data-reveal>
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-2xl bg-sand-200">
              <Image src="/images/image00006.jpeg" alt="Berber guide in traditional dress on the dunes of Erg Chebbi" fill sizes="(max-width: 1024px) 60vw, 380px" className="object-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-3 pt-10 sm:gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand-200">
                <Image src="/images/image00024.jpeg" alt="Mint tea around a low table inside a Berber tent" fill sizes="(max-width: 1024px) 40vw, 250px" className="object-cover" />
              </div>
              <div className="rounded-2xl bg-night-800 p-5 text-white">
                <p className="font-serif text-3xl">10+</p>
                <p className="mt-1 text-xs leading-snug text-white/75">years guiding travellers from 40+ countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature experiences */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionTitle
            eyebrow="Signature experiences"
            title="The Morocco you came for"
            subtitle="Every tour weaves together the moments travellers remember most: the dunes, the camps, the kasbah roads and the people."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCES.map((e, i) => (
              <Link
                key={e.title}
                href={e.href}
                className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl bg-night-800 sm:aspect-[3/4]"
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <Image src={e.image} alt={e.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]" />
                <span className="scrim-b absolute inset-0" />
                <span className="relative p-6 text-white">
                  <span className="block font-serif text-2xl leading-tight">{e.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-white/80">{e.text}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Discover <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular tours */}
      <section className="section">
        <div className="container-site">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">Popular tours</p>
              <h2 className="heading-lg mt-3">Journeys our guests love</h2>
              <p className="lede mt-4">Every tour can be taken privately and adapted to your dates. Prices are per person and include your driver-guide, transport and desert camp.</p>
            </div>
            <Link href="/tours" className="btn-outline shrink-0 self-start md:self-auto">
              View all {total > 0 ? `${total} ` : ''}tours <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          {tours.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour, i) => (
                <div key={tour._id} data-reveal style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card flex flex-col items-center p-10 text-center">
              <p className="text-ink-600">Our full tour collection is loading. Browse every tour or tell us what you have in mind.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/tours" className="btn-primary">Browse tours</Link>
                <Link href="/contact" className="btn-outline">Plan a custom trip</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Destinations: start from your city */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionTitle
            eyebrow="Where we travel"
            title="Start your journey from any city"
            subtitle="We pick you up from your riad, hotel or the airport. Most routes cross the Atlas Mountains and end in the Erg Chebbi dunes near Merzouga."
          />
          <div className="no-scrollbar scroll-px-4 sm:scroll-px-6 lg:scroll-px-0 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
            {DEPARTURE_CITIES.map((c, i) => (
              <Link
                key={c.slug}
                href={`/tours/${c.slug}`}
                className="group w-[70%] shrink-0 snap-start sm:w-[42%] lg:w-auto"
                data-reveal
                style={{ '--reveal-delay': `${i * 70}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand-200">
                  <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 1024px) 70vw, 240px" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]" />
                  <span className="scrim-b absolute inset-0" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="block text-xs uppercase tracking-[0.16em] text-white/75">Tours from</span>
                    <span className="block font-serif text-2xl">{c.name}</span>
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink-600">{c.tagline}</p>
                {cityCounts[c.slug] > 0 && (
                  <p className="mt-1 text-xs font-semibold text-desert-700">{cityCounts[c.slug]} tours</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why travel with us */}
      <section className="section relative overflow-hidden bg-night-900 text-white">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:sticky lg:top-28">
              <Image src="/images/gathering_team.JPG" alt="Our team playing traditional Berber music around a candlelit table in the desert camp" fill sizes="(max-width: 1024px) 100vw, 500px" className="object-cover" />
            </div>
          </div>
          <div>
            <div data-reveal>
              <p className="eyebrow-light">Why travel with us</p>
              <h2 className="heading-lg mt-3 !text-white">Local knowledge you can feel in every detail</h2>
              <p className="mt-5 max-w-xl text-white/75 md:text-lg">
                Big agencies resell the same routes. We run ours ourselves, which means better guides, better camps and someone who actually answers when you message.
              </p>
            </div>
            <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {REASONS.map((r, i) => (
                <div key={r.title} data-reveal style={{ '--reveal-delay': `${(i % 2) * 90}ms` }}>
                  <Icon name={r.icon} className="h-7 w-7 text-desert-300" strokeWidth={1.5} />
                  <h3 className="mt-4 font-serif text-xl !text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. How it works */}
      <section className="section">
        <div className="container-site">
          <SectionTitle
            eyebrow="How it works"
            title="Planning with us is simple"
            subtitle="No booking engines or hidden fees. Just a conversation with the people who will host you."
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.n} className="card relative p-7" data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
                <span className="font-serif text-4xl text-desert-300">{s.n}</span>
                <h3 className="mt-4 font-serif text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" data-reveal>
            <Link href="/contact" className="btn-primary">Start planning <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /></Link>
            <p className="text-sm text-ink-500">Free, no-obligation itinerary</p>
          </div>
        </div>
      </section>

      {/* 7. Reviews */}
      <TestimonialsSection />

      {/* 8. Meet the team */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">The people behind your trip</p>
              <h2 className="heading-lg mt-3">Meet our guides</h2>
            </div>
            <Link href="/guides" className="link-arrow shrink-0">All guides <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /></Link>
          </div>
          <div className="no-scrollbar scroll-px-4 sm:scroll-px-6 lg:scroll-px-0 -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
            {team.map((g) => (
              <figure key={g.name} className="w-40 shrink-0 snap-start lg:w-auto" data-reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand-200">
                  <Image src={g.image} alt={`${g.name}, ${g.role}`} fill sizes="180px" className="object-cover" />
                </div>
                <figcaption className="mt-3">
                  <p className="font-serif text-lg leading-tight text-ink-900">{g.name}</p>
                  <p className="text-xs text-ink-500">{g.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <FAQSection faqs={homepageFAQs} />

      {/* 10. Travel inspiration */}
      <section className="section">
        <div className="container-site">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">Travel guide</p>
              <h2 className="heading-lg mt-3">Inspiration for your journey</h2>
            </div>
            <Link href="/blog" className="link-arrow shrink-0">All articles <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /></Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <div key={post.slug} data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Custom trip CTA */}
      <CTASection
        image="/images/evening.jpeg"
        imageAlt="Fiery sunset over the Sahara dunes"
        eyebrow="Your journey, designed around you"
        title="Plan your private Morocco journey"
        whatsapp={contact?.whatsapp}
      />
    </>
  )
}
