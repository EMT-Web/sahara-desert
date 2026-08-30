import { cache } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { tourDetailQuery, relatedToursQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateTourSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import TourCard from '@/components/TourCard'

// cache() deduplicates the Sanity fetch so generateMetadata and the page
// component share one request instead of making two separate calls.
const fetchTour = cache(async (slug) => {
  try {
    const tour = await client.fetch(tourDetailQuery, { slug })
    const relatedTours = tour?.departureCity
      ? await client.fetch(relatedToursQuery, { slug, city: tour.departureCity }).catch(() => [])
      : []
    return { tour, relatedTours }
  } catch {
    return { tour: null, relatedTours: [] }
  }
})

export async function generateStaticParams() {
  const tours = await import('@/lib/sanity').then(m =>
    m.client.fetch(`*[_type == "tour" && !(_id in path("drafts.**"))]{ "slug": slug.current }`)
  )
  return (tours || []).filter(t => t.slug).map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const { tour } = await fetchTour(slug)
  const departureCityName = tour?.departureCity
    ? tour.departureCity.charAt(0).toUpperCase() + tour.departureCity.slice(1)
    : undefined
  return generateSEOMetadata({
    title: tour?.title || 'Tour | Sahara Desert Travel',
    description: tour?.excerpt || 'Explore an unforgettable desert experience in the Sahara',
    image: tour?.mainImage,
    url: `/tours/${slug}`,
    type: 'article',
    publishedTime: tour?.publishedAt,
    keywords: ['Sahara Tour', tour?.title, departureCityName, 'Desert Adventure', 'Morocco Travel'],
  })
}

export default async function TourDetailPage({ params }) {
  const { slug } = params
  const { tour, relatedTours } = await fetchTour(slug)

  if (!tour) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-8">The tour you are looking for could not be found.</p>
          <Link href="/tours" className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition">
            Browse All Tours
          </Link>
        </div>
      </div>
    )
  }

  const departureCityLabel = tour.departureCity
    ? tour.departureCity.charAt(0).toUpperCase() + tour.departureCity.slice(1)
    : 'the departure city'

  const tourFAQs = [
    { question: 'Is this tour suitable for first-time desert travelers?', answer: 'Absolutely. Our guides are experienced with travelers of all backgrounds and will make sure you feel comfortable and safe throughout the journey. No prior desert experience is required.' },
    { question: 'What type of accommodation is used?', answer: 'We use a mix of traditional riad hotels in cities and authentic Berber desert camps with private tents, comfortable bedding, and camp lighting. Luxury glamping options are available on request.' },
    { question: 'Are meals included in the tour?', answer: "Most meals are included as listed in the \"What's Included\" section. Breakfast is provided at hotels; dinners and breakfasts at the desert camp are always included. Lunches in cities may be at your own expense." },
    { question: 'How do I get to the departure city?', answer: `You are responsible for reaching ${departureCityLabel}. We can recommend trusted transfer services and hotels if needed, just ask when booking.` },
    { question: 'What is the best time of year to visit the Sahara?', answer: 'October to April offers the most comfortable temperatures (15–25°C / 59–77°F during the day). July and August are very hot but manageable with proper preparation. The desert is beautiful year-round.' },
  ]

  const tourSchema = generateTourSchema(tour)
  const tourFAQSchema = generateFAQSchema(tourFAQs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tours/${slug}` },
  ])

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'
  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in booking "${tour.title}". Can you help me?`)
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`

  return (
    <>
      {tourSchema && (
        <Script id="tour-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }} />
      )}
      {tourFAQSchema && (
        <Script id="tour-faq-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourFAQSchema) }} />
      )}
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-20">
        {/* Hero image */}
        {tour.mainImage && (
          <div className="relative h-[55vh] w-full">
            <Image
              src={urlFor(tour.mainImage).width(1920).height(1080).url()}
              alt={`${tour.title}: Sahara Desert Tour`}
              fill className="object-cover" priority sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            {/* Breadcrumb on image */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/70 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
              <span>/</span>
              <span className="text-white line-clamp-1">{tour.title}</span>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="container mx-auto px-4 pt-10 pb-4">
          {tour.departureCity && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-desert-500 mb-3">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Departing from {departureCityLabel}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 max-w-4xl">
            {tour.title}
          </h1>
          {tour.excerpt && (
            <p className="text-lg text-gray-900 max-w-4xl leading-relaxed">{tour.excerpt}</p>
          )}
        </div>

        {/* Quick info bar */}
        <div className="border-y border-sand-200 bg-sand-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-0 divide-x divide-sand-200">
              {tour.duration && (
                <div className="flex items-center gap-2.5 px-6 py-4 min-w-0">
                  <svg className="w-5 h-5 text-desert-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p><p className="text-sm font-semibold text-gray-800">{tour.duration}</p></div>
                </div>
              )}
              <div className="flex items-center gap-2.5 px-6 py-4 min-w-0">
                <svg className="w-5 h-5 text-desert-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <div><p className="text-xs text-gray-400 uppercase tracking-wide">Group Size</p><p className="text-sm font-semibold text-gray-800">6 – 16 people</p></div>
              </div>
              <div className="flex items-center gap-2.5 px-6 py-4 min-w-0">
                <svg className="w-5 h-5 text-desert-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
                <div><p className="text-xs text-gray-400 uppercase tracking-wide">Languages</p><p className="text-sm font-semibold text-gray-800">English</p></div>
              </div>
              <div className="flex items-center gap-2.5 px-6 py-4 min-w-0">
                <svg className="w-5 h-5 text-desert-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <div><p className="text-xs text-gray-400 uppercase tracking-wide">Activity Level</p><p className="text-sm font-semibold text-gray-800">Easy to Moderate</p></div>
              </div>
              <div className="flex items-center gap-2.5 px-6 py-4 min-w-0">
                <svg className="w-5 h-5 text-desert-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <div><p className="text-xs text-gray-400 uppercase tracking-wide">Availability</p><p className="text-sm font-semibold text-gray-800">Year-round</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content + sidebar */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Tour Overview */}
              <div className="bg-gradient-to-br from-desert-50 to-sand-50 rounded-2xl p-8 border border-desert-100">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Tour Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {tour.excerpt || `Embark on an authentic Sahara Desert experience departing from ${tour.departureCity ? departureCityLabel : 'Morocco'}. This journey takes you deep into the golden dunes of the Moroccan desert, guided by expert local Berber guides who have navigated these landscapes for generations.`}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  From towering sand dunes and ancient kasbahs to starlit nights in a traditional desert camp, every moment of this tour is designed to connect you with the raw beauty and rich culture of the Sahara. Whether you ride a camel at sunset, share mint tea with a Berber family, or wake up to the silence of the desert at dawn, this is an experience that stays with you for life.
                </p>
                {tour.focusAreas && tour.focusAreas.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tour.focusAreas.map((area, i) => (
                      <span key={i} className="text-xs bg-desert-100 text-desert-700 px-3 py-1 rounded-full font-medium">{area}</span>
                    ))}
                  </div>
                )}
              </div>

              {tour.highlights && tour.highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Highlights</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tour.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <svg className="w-5 h-5 text-desert-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.itinerary && tour.itinerary.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Itinerary</h2>
                  <div className="space-y-4">
                    {tour.itinerary.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-desert-100 text-desert-600 flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </div>
                          {i < tour.itinerary.length - 1 && (
                            <div className="w-px flex-1 bg-sand-200 mt-1" />
                          )}
                        </div>
                        <div className="pb-6">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.day && item.day.toLowerCase().includes('day') ? item.day : `Day ${i + 1}`}
                            {item.title ? `: ${item.title}` : ''}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.description || item.content}
                          </p>
                          {item.overnight && (
                            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-desert-600 bg-desert-50 px-2.5 py-1 rounded-full">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                              Overnight: {item.overnight}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tour.gallery && tour.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tour.gallery.map((image, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                        <Image
                          src={urlFor(image).width(400).height(400).url()}
                          alt={`${tour.title}: photo ${i + 1}`}
                          fill className="object-cover hover:scale-110 smooth-transition"
                          sizes="(max-width: 768px) 50vw, 33vw" loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Practical Information */}
              <div className="bg-sand-50 rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Practical Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-desert-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      Meeting Point
                    </h3>
                    <p className="text-sm text-gray-600">Your hotel lobby in {tour.departureCity ? departureCityLabel : 'your departure city'}, typically at 7:00 – 8:00 AM. Exact time confirmed upon booking.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-desert-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      Cancellation Policy
                    </h3>
                    <p className="text-sm text-gray-600">Free cancellation up to 14 days before departure. 50% refund between 7–14 days. No refund within 7 days of departure.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-desert-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                      What to Bring
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Comfortable, loose-fitting clothing</li>
                      <li>• High-SPF sunscreen &amp; sunglasses</li>
                      <li>• Warm layer for cool desert nights</li>
                      <li>• Water bottle (1.5L minimum per day)</li>
                      <li>• Headscarf or hat for sun protection</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-desert-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                      Physical Requirements
                    </h3>
                    <p className="text-sm text-gray-600">Suitable for most fitness levels. Light walking and camel riding involved. No prior experience needed. Not recommended for serious mobility difficulties.</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {tourFAQs.map((faq, i) => (
                    <details key={i} className="group border border-sand-200 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-white hover:bg-sand-50 transition-colors">
                        <span className="font-medium text-gray-900 text-sm pr-4">{faq.question}</span>
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                      </summary>
                      <div className="px-6 pb-4 pt-2 bg-white text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: sticky booking sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-sand-100 overflow-hidden sticky top-24">
                {/* Price header */}
                <div className="bg-desert-700 px-6 py-5 text-white">
                  {tour.priceDouble ? (
                    <>
                      <p className="text-desert-200 text-xs uppercase tracking-widest mb-1">From</p>
                      <p className="text-4xl font-bold">€{tour.priceDouble}</p>
                      <p className="text-desert-300 text-xs mt-1">per person · double room</p>
                    </>
                  ) : tour.price ? (
                    <>
                      <p className="text-desert-200 text-xs uppercase tracking-widest mb-1">From</p>
                      <p className="text-4xl font-bold">€{tour.price}</p>
                      <p className="text-desert-300 text-xs mt-1">per person</p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold">Contact for pricing</p>
                  )}
                  {tour.duration && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-desert-600">
                      <svg className="w-4 h-4 text-desert-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-desert-200">{tour.duration}</span>
                    </div>
                  )}
                </div>

                {/* Full pricing table */}
                {(tour.priceSingle || tour.priceDouble || tour.priceTriple || tour.priceQuad) && (
                  <div className="px-6 pt-5 pb-2">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Per Person (EUR)</h3>
                    <div className="rounded-xl overflow-hidden border border-sand-200 text-sm">
                      <div className="grid grid-cols-2 bg-sand-100 text-gray-500 text-xs font-semibold uppercase tracking-wide">
                        <div className="px-3 py-2">Room Type</div>
                        <div className="px-3 py-2 text-right">Per Person</div>
                      </div>
                      {tour.priceSingle && (
                        <div className="grid grid-cols-2 border-t border-sand-200 bg-white hover:bg-sand-50 transition-colors">
                          <div className="px-3 py-2.5 text-gray-700">
                            <span className="font-medium">Single</span>
                            <span className="block text-xs text-gray-400">1 person / room</span>
                          </div>
                          <div className="px-3 py-2.5 text-right font-bold text-gray-900">€{tour.priceSingle}</div>
                        </div>
                      )}
                      {tour.priceDouble && (
                        <div className="grid grid-cols-2 border-t border-sand-200 bg-desert-50">
                          <div className="px-3 py-2.5 text-gray-700">
                            <span className="font-medium text-desert-700">Double</span>
                            <span className="block text-xs text-desert-500">2 people / room</span>
                          </div>
                          <div className="px-3 py-2.5 text-right font-bold text-desert-700">€{tour.priceDouble}</div>
                        </div>
                      )}
                      {tour.priceTriple && (
                        <div className="grid grid-cols-2 border-t border-sand-200 bg-white hover:bg-sand-50 transition-colors">
                          <div className="px-3 py-2.5 text-gray-700">
                            <span className="font-medium">Triple</span>
                            <span className="block text-xs text-gray-400">3 people / room</span>
                          </div>
                          <div className="px-3 py-2.5 text-right font-bold text-gray-900">€{tour.priceTriple}</div>
                        </div>
                      )}
                      {tour.priceQuad && (
                        <div className="grid grid-cols-2 border-t border-sand-200 bg-white hover:bg-sand-50 transition-colors">
                          <div className="px-3 py-2.5 text-gray-700">
                            <span className="font-medium">Quadruple</span>
                            <span className="block text-xs text-gray-400">4 people / room</span>
                          </div>
                          <div className="px-3 py-2.5 text-right font-bold text-gray-900">€{tour.priceQuad}</div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">All prices per person in euros · includes taxes</p>
                  </div>
                )}

                <div className="px-6 py-5 space-y-5">
                  {/* Included */}
                  {tour.included && tour.included.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">What&apos;s Included</h3>
                      <ul className="space-y-1.5">
                        {tour.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Not included */}
                  {tour.notIncluded && tour.notIncluded.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Not Included</h3>
                      <ul className="space-y-1.5">
                        {tour.notIncluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="space-y-3 pt-2">
                    <Link
                      href="/contact"
                      className="block w-full px-6 py-3.5 bg-desert-600 hover:bg-desert-700 text-white text-center text-sm font-semibold rounded-xl shadow-md smooth-transition"
                    >
                      Book This Tour
                    </Link>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Ask on WhatsApp
                    </a>
                  </div>

                  {/* Trust note */}
                  <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Free cancellation · 14 days notice
                  </p>

                  {/* Helpful reads */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Helpful Reads</p>
                    <ul className="space-y-2">
                      <li><Link href="/blog/camel-trekking-morocco-what-to-expect" className="text-xs text-desert-600 hover:text-desert-700 transition-colors">What to expect on a camel trek →</Link></li>
                      <li><Link href="/blog/complete-desert-packing-list" className="text-xs text-desert-600 hover:text-desert-700 transition-colors">Complete desert packing list →</Link></li>
                      <li><Link href="/blog/best-time-to-visit-sahara-desert" className="text-xs text-desert-600 hover:text-desert-700 transition-colors">Best time to visit the Sahara →</Link></li>
                      <li><Link href="/blog/how-to-choose-desert-camp" className="text-xs text-desert-600 hover:text-desert-700 transition-colors">How to choose a desert camp →</Link></li>
                      <li><Link href="/guides" className="text-xs text-desert-600 hover:text-desert-700 transition-colors">Meet our local Berber guides →</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related tours */}
        {relatedTours.length > 0 && (
          <div className="bg-sand-50 py-16 mt-10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                More Tours from {departureCityLabel}
              </h2>
              <p className="text-gray-500 text-sm mb-8">You might also like these experiences</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedTours.map(t => (
                  <TourCard key={t._id} tour={t} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
