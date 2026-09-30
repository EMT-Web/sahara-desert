import { cache } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { tourDetailQuery, relatedToursQuery, contactQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateTourSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import TourCard from '@/components/TourCard'
import ItineraryTimeline from '@/components/ItineraryTimeline'
import { FAQList } from '@/components/FAQSection'
import Icon, { WhatsAppIcon } from '@/components/Icon'

// The real WhatsApp number, used only if the Sanity contact document has no
// whatsapp field set — never the old '212600000000' placeholder, which was
// silently live on every tour page's "Ask on WhatsApp" button because
// NEXT_PUBLIC_WHATSAPP_NUMBER was never set in Vercel.
const FALLBACK_WHATSAPP = '212670707151'

// cache() deduplicates the Sanity fetch so generateMetadata and the page
// component share one request instead of making two separate calls.
const fetchTour = cache(async (slug) => {
  try {
    const [tour, contact] = await Promise.all([
      client.fetch(tourDetailQuery, { slug }),
      client.fetch(contactQuery).catch(() => null),
    ])
    const relatedTours = tour?.departureCity
      ? await client.fetch(relatedToursQuery, { slug, city: tour.departureCity }).catch(() => [])
      : []
    return { tour, relatedTours, contact }
  } catch {
    return { tour: null, relatedTours: [], contact: null }
  }
})

export async function generateStaticParams() {
  const tours = await import('@/lib/sanity').then(m =>
    m.client.fetch(`*[_type == "tour" && !(_id in path("drafts.**"))]{ "slug": slug.current }`)
  ).catch(() => [])
  return (tours || []).filter(t => t.slug).map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const { tour } = await fetchTour(slug)
  const departureCityName = tour?.departureCity
    ? tour.departureCity.charAt(0).toUpperCase() + tour.departureCity.slice(1)
    : undefined
  return generateSEOMetadata({
    title: tour?.title || 'Sahara Desert Tour',
    description: tour?.excerpt || 'Explore an unforgettable desert experience in the Sahara',
    image: tour?.mainImage,
    url: `/tours/${slug}`,
    type: 'article',
    publishedTime: tour?.publishedAt,
    keywords: ['Sahara Tour', tour?.title, departureCityName, 'Desert Adventure', 'Morocco Travel'],
  })
}


function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-sand-200 py-12 first:border-t-0 first:pt-0 md:py-14">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="heading-md mt-2">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

const ROOM_TYPES = [
  { key: 'priceSingle', label: 'Single', note: '1 person per room' },
  { key: 'priceDouble', label: 'Double', note: '2 people per room', featured: true },
  { key: 'priceTriple', label: 'Triple', note: '3 people per room' },
  { key: 'priceQuad', label: 'Quadruple', note: '4 people per room' },
]

export default async function TourDetailPage({ params }) {
  const { slug } = params
  const { tour, relatedTours, contact } = await fetchTour(slug)

  if (!tour) {
    // Return a real 404 (not a 200 "not found" page) so this doesn't get
    // indexed as a soft 404 — see the 2026-09-12 SEO audit.
    notFound()
  }

  const departureCityLabel = tour.departureCity
    ? tour.departureCity.charAt(0).toUpperCase() + tour.departureCity.slice(1)
    : 'the departure city'

  const tourFAQs = [
    { question: 'Is this tour private or shared?', answer: 'You can take this tour privately, with your own driver-guide and vehicle, or join a shared small-group departure (up to 17 guests) where available. Tell us which you prefer when you enquire.' },
    { question: 'Is this tour suitable for first-time desert travelers?', answer: 'Absolutely. Our guides are experienced with travelers of all backgrounds and will make sure you feel comfortable and safe throughout the journey. No prior desert experience is required.' },
    { question: 'What type of accommodation is used?', answer: 'We use a mix of traditional riad hotels in cities and authentic Berber desert camps with private tents, comfortable bedding, and camp lighting. Luxury glamping options are available on request.' },
    { question: 'Are meals included in the tour?', answer: "Most meals are included as listed in the \"What's Included\" section. Breakfast is provided at hotels; dinners and breakfasts at the desert camp are always included. Lunches in cities may be at your own expense." },
    { question: 'How do I get to the departure city?', answer: `We pick you up from your hotel or riad in ${departureCityLabel}. We can also arrange airport transfers and recommend trusted hotels if needed, just ask when booking.` },
    { question: 'Can I change the itinerary?', answer: 'Yes. Every private tour can be adjusted: add a night, swap a stop, upgrade your desert camp or finish in a different city. We will send an updated itinerary and price.' },
    { question: 'What is the best time of year to visit the Sahara?', answer: 'October to April offers the most comfortable temperatures (15–25°C / 59–77°F during the day). July and August are very hot but manageable with proper preparation. The desert is beautiful year-round.' },
  ]

  const tourSchema = generateTourSchema(tour)
  const tourFAQSchema = generateFAQSchema(tourFAQs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tours/${slug}` },
  ])

  const whatsappNumber = contact?.whatsapp || FALLBACK_WHATSAPP
  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in booking "${tour.title}". Can you help me?`)
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`
  const enquireHref = `/contact?tour=${encodeURIComponent(tour.title)}`

  const fromPrice = tour.priceDouble || tour.price
  const rooms = ROOM_TYPES.filter((r) => tour[r.key])
  const overview = (tour.body || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const heroImage = tour.mainImage ? urlFor(tour.mainImage).width(2000).height(1125).quality(72).url() : '/images/image00015.jpeg'

  const facts = [
    tour.duration && { icon: 'clock', label: 'Duration', value: tour.duration },
    { icon: 'pin', label: 'Starts in', value: `${departureCityLabel} (hotel pick-up)` },
    { icon: 'users', label: 'Travel style', value: 'Private or small group (max 17)' },
    { icon: 'globe', label: 'Guides speak', value: 'English, French, Spanish, German, Arabic' },
    { icon: 'sun', label: 'Season', value: 'Year-round, best Oct–Apr' },
    { icon: 'compass', label: 'Activity level', value: 'Easy to moderate' },
  ].filter(Boolean)

  const sections = [
    { id: 'overview', label: 'Overview' },
    tour.itinerary?.length > 0 && { id: 'itinerary', label: 'Itinerary' },
    (tour.included?.length > 0 || tour.notIncluded?.length > 0) && { id: 'included', label: "What's included" },
    rooms.length > 0 && { id: 'prices', label: 'Prices' },
    { id: 'faq', label: 'FAQ' },
  ].filter(Boolean)

  return (
    <>
      {tourSchema && (
        <script id="tour-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }} />
      )}
      {tourFAQSchema && (
        <script id="tour-faq-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourFAQSchema) }} />
      )}
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-night-900 md:min-h-[600px]">
        <Image src={heroImage} alt={`${tour.title}: Sahara Desert tour`} fill priority sizes="100vw" quality={72} className="hero-zoom object-cover" />
        <div className="scrim-b absolute inset-0" />
        <div className="container-site relative pb-10 pt-32 md:pb-14">
          <nav aria-label="Breadcrumb" className="fade-up mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/tours" className="hover:text-white">Tours</Link></li>
              {tour.departureCity && (
                <>
                  <li aria-hidden="true">/</li>
                  <li><Link href={`/tours/${tour.departureCity}`} className="hover:text-white">From {departureCityLabel}</Link></li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="heading-xl fade-up max-w-4xl !text-white text-shadow" style={{ animationDelay: '80ms' }}>{tour.title}</h1>
          <div className="fade-up mt-6 flex flex-wrap gap-2" style={{ animationDelay: '160ms' }}>
            {tour.duration && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm text-white backdrop-blur-sm">
                <Icon name="clock" className="h-4 w-4" /> {tour.duration}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm text-white backdrop-blur-sm">
              <Icon name="pin" className="h-4 w-4" /> From {departureCityLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm text-white backdrop-blur-sm">
              <Icon name="users" className="h-4 w-4" /> Private or small group
            </span>
            {fromPrice && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-900">
                From €{fromPrice.toLocaleString()} pp
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Sticky in-page navigation */}
      <div className="sticky top-16 z-30 border-b border-sand-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container-site">
          <nav aria-label="Tour sections" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap border-b-2 border-transparent px-3 py-4 text-sm font-medium text-ink-600 transition-colors hover:border-desert-600 hover:text-ink-900">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container-site py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          {/* Main column */}
          <div className="min-w-0">
            <Section id="overview" eyebrow="The journey" title="Tour overview">
              {tour.excerpt && <p className="text-lg leading-relaxed text-ink-800 md:text-xl">{tour.excerpt}</p>}
              {overview.length > 0 ? (
                <div className="prose-site mt-5">
                  {overview.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              ) : (
                <div className="prose-site mt-5">
                  <p>
                    This journey takes you deep into Morocco&apos;s Sahara from {departureCityLabel}, guided by local Berber guides who have travelled these landscapes all their lives. From towering dunes and ancient kasbahs to starlit nights in a traditional desert camp, every moment is designed to connect you with the beauty and culture of the desert.
                  </p>
                </div>
              )}

              <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sand-200 bg-sand-200 sm:grid-cols-2 xl:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start gap-3 bg-white p-4">
                    <Icon name={f.icon} className="mt-0.5 h-5 w-5 shrink-0 text-desert-600" />
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-500">{f.label}</dt>
                      <dd className="mt-0.5 text-sm font-medium text-ink-900">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {tour.highlights?.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-serif text-xl">Highlights</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {tour.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[0.97rem] text-ink-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-desert-100 text-desert-700">
                          <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.focusAreas?.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {tour.focusAreas.map((area, i) => <span key={i} className="chip">{area}</span>)}
                </div>
              )}
            </Section>

            {tour.itinerary?.length > 0 && (
              <Section id="itinerary" eyebrow="Day by day" title="Itinerary">
                <ItineraryTimeline days={tour.itinerary} />
                <p className="mt-6 rounded-xl bg-sand-100 p-4 text-sm text-ink-700">
                  Want to add a night, slow the pace or end in another city? Every private itinerary can be adjusted. <Link href={enquireHref} className="font-semibold text-desert-700 underline underline-offset-2">Ask us to customise it</Link>.
                </p>
              </Section>
            )}

            {tour.gallery?.length > 0 && (
              <section className="border-t border-sand-200 py-12 md:py-14">
                <h2 className="heading-md">Gallery</h2>
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {tour.gallery.map((image, i) => (
                    <div key={i} className={`relative overflow-hidden rounded-xl bg-sand-200 ${i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}>
                      <Image
                        src={urlFor(image).width(i === 0 ? 900 : 500).height(i === 0 ? 900 : 500).quality(72).url()}
                        alt={`${tour.title}: photo ${i + 1}`}
                        fill className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes={i === 0 ? '(max-width: 768px) 100vw, 520px' : '(max-width: 768px) 50vw, 260px'}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(tour.included?.length > 0 || tour.notIncluded?.length > 0) && (
              <Section id="included" eyebrow="Good to know" title="What's included">
                <div className="grid gap-6 md:grid-cols-2">
                  {tour.included?.length > 0 && (
                    <div className="rounded-2xl border border-sand-200 bg-white p-6">
                      <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-ink-900">Included</h3>
                      <ul className="mt-4 space-y-3">
                        {tour.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-ink-700">
                            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-green-700" strokeWidth={2.5} /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.notIncluded?.length > 0 && (
                    <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
                      <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-ink-900">Not included</h3>
                      <ul className="mt-4 space-y-3">
                        {tour.notIncluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-ink-700">
                            <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" strokeWidth={2.2} /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {rooms.length > 0 && (
              <Section id="prices" eyebrow="Per person, in euros" title="Prices">
                <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-sand-100 text-xs uppercase tracking-wider text-ink-600">
                      <tr><th scope="col" className="px-5 py-3 font-semibold">Room type</th><th scope="col" className="px-5 py-3 text-right font-semibold">Price per person</th></tr>
                    </thead>
                    <tbody className="divide-y divide-sand-200">
                      {rooms.map((r) => (
                        <tr key={r.key} className={r.featured ? 'bg-desert-50/60' : ''}>
                          <td className="px-5 py-4">
                            <span className="font-medium text-ink-900">{r.label}</span>
                            <span className="block text-xs text-ink-500">{r.note}</span>
                          </td>
                          <td className="px-5 py-4 text-right font-serif text-xl text-ink-900">€{tour[r.key].toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-ink-500">Prices include taxes. Groups, children and camp upgrades priced on request.</p>
              </Section>
            )}

            <Section id="practical" eyebrow="Before you go" title="Practical information">
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { icon: 'pin', title: 'Meeting point', text: `Your hotel or riad in ${departureCityLabel}, usually between 7:00 and 8:00 AM. Exact time confirmed on booking.` },
                  { icon: 'shield', title: 'Cancellation', text: 'Free cancellation up to 14 days before departure. 50% refund between 7 and 14 days. Free date changes whenever possible.' },
                  { icon: 'sun', title: 'What to bring', text: 'Comfortable layers, a warm jacket for desert nights, sunglasses, high-SPF sunscreen and a scarf or hat.' },
                  { icon: 'compass', title: 'Fitness', text: 'Suitable for most fitness levels. Light walking and an optional camel ride. Tell us about any mobility needs.' },
                ].map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-100 text-desert-700"><Icon name={p.icon} className="h-5 w-5" /></span>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-ink-900">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="faq" eyebrow="Questions" title="Frequently asked questions">
              <FAQList faqs={tourFAQs} />
            </Section>
          </div>

          {/* Booking sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-36 space-y-4">
              <div className="card overflow-hidden">
                <div className="border-b border-sand-200 p-6">
                  {fromPrice ? (
                    <>
                      <p className="text-xs uppercase tracking-wider text-ink-500">From</p>
                      <p className="mt-1 font-serif text-4xl text-ink-900">€{fromPrice.toLocaleString()}</p>
                      <p className="mt-1 text-sm text-ink-500">per person{tour.priceDouble ? ', sharing a double room' : ''}</p>
                    </>
                  ) : (
                    <p className="font-serif text-2xl text-ink-900">Price on request</p>
                  )}
                </div>
                <div className="space-y-3 p-6">
                  <Link href={enquireHref} className="btn-primary w-full">Request This Tour</Link>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                    <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
                  </a>
                  <ul className="space-y-2 pt-3 text-sm text-ink-600">
                    <li className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-green-700" strokeWidth={2.5} /> Free, no-obligation quote</li>
                    <li className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-green-700" strokeWidth={2.5} /> Free cancellation up to 14 days</li>
                    <li className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-green-700" strokeWidth={2.5} /> Reply within a few hours</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-sand-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Helpful reads</p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  <li><Link href="/blog/camel-trekking-morocco-what-to-expect" className="text-ink-700 hover:text-desert-700">What to expect on a camel trek</Link></li>
                  <li><Link href="/blog/complete-desert-packing-list" className="text-ink-700 hover:text-desert-700">Complete desert packing list</Link></li>
                  <li><Link href="/blog/best-time-to-visit-sahara-desert" className="text-ink-700 hover:text-desert-700">Best time to visit the Sahara</Link></li>
                  <li><Link href="/blog/how-to-choose-desert-camp" className="text-ink-700 hover:text-desert-700">How to choose a desert camp</Link></li>
                  <li><Link href="/guides" className="text-ink-700 hover:text-desert-700">Meet our local Berber guides</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="section bg-white">
          <div className="container-site">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">You might also like</p>
                <h2 className="heading-lg mt-3">More tours from {departureCityLabel}</h2>
              </div>
              {tour.departureCity && (
                <Link href={`/tours/${tour.departureCity}`} className="link-arrow">All tours from {departureCityLabel} <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /></Link>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((t) => <TourCard key={t._id} tour={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand-200 bg-white/95 backdrop-blur pb-safe lg:hidden">
        <div className="container-site flex items-center gap-3 pt-3">
          <div className="min-w-0 flex-1">
            {fromPrice ? (
              <p className="leading-tight"><span className="text-xs text-ink-500">From </span><span className="font-serif text-xl text-ink-900">€{fromPrice.toLocaleString()}</span><span className="text-xs text-ink-500"> pp</span></p>
            ) : (
              <p className="text-sm font-medium text-ink-900">Price on request</p>
            )}
            {tour.duration && <p className="truncate text-xs text-ink-500">{tour.duration}</p>}
          </div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Ask about this tour on WhatsApp" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1faa59] text-white">
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Link href={enquireHref} className="btn-primary shrink-0 !px-5">Request tour</Link>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </>
  )
}
