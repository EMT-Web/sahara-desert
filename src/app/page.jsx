import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import TourCard from '@/components/TourCard'
import BlogCard from '@/components/BlogCard'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import { client } from '@/lib/sanity'
import { homepageQuery, toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateFAQSchema } from '@/lib/seo'
import { blogPosts } from '@/data/blogPosts'

const homepageFAQs = [
  { question: 'What is the best time of year to visit the Sahara?', answer: 'October to April is ideal: temperatures are comfortable (15–28°C by day) and the nights are cool and clear for stargazing. July and August bring extreme heat (40°C+) and are not recommended for desert treks.' },
  { question: 'Are your tours suitable for first-time desert travellers?', answer: 'Absolutely. Our guides are experienced with travellers of all backgrounds. We provide full briefings, quality equipment, and adjust the pace of every tour to suit the group. No prior desert experience is required.' },
  { question: 'What should I pack for a Sahara desert tour?', answer: 'We send a full packing list after booking. Key essentials include a light scarf (for dust), sunscreen, a warm layer for cold nights, comfortable walking shoes, and a reusable water bottle. We supply sleeping bags and tents.' },
  { question: 'How do I get to the Sahara from major Moroccan cities?', answer: 'We offer tours departing from Marrakech, Fes, Casablanca, Agadir, and Errachidia. All tours include private transport: no need to arrange your own. We pick you up from your hotel or riad.' },
  { question: 'What languages do your guides speak?', answer: 'Our Berber guides are fluent in English, French, and Arabic, with many also speaking Spanish and German. We can accommodate most European languages with advance notice.' },
  { question: 'How far in advance should I book?', answer: 'We recommend booking at least 2–4 weeks in advance, especially for peak season (December–February). Last-minute bookings are sometimes possible: contact us via WhatsApp for availability.' },
  { question: 'Are the tours eco-friendly?', answer: 'Yes. We operate small groups only (max 8 people), use no single-use plastics in the desert, partner exclusively with local Berber villages, and contribute 10% of every booking to desert community programmes.' },
  { question: 'What is your cancellation policy?', answer: 'Full refund for cancellations made 14+ days before departure. 50% refund between 7–14 days. No refund within 7 days, but we offer free date changes. Contact us and we will always do our best to help.' },
]

export async function generateMetadata() {
  const homepage = await client.fetch(homepageQuery)
  return generateSEOMetadata({
    title: 'Authentic Sahara Desert Experiences',
    description:
      homepage?.heroSubtitle ||
      'Visit Sahara Desert offers authentic Morocco desert tours with expert Berber guides, sustainable travel, camel trekking, and unforgettable journeys through golden dunes and desert oases.',
    image: homepage?.heroImage,
    url: '/',
  })
}

async function getHomepageData() {
  try {
    const [homepage, allTours] = await Promise.all([
      client.fetch(homepageQuery),
      client.fetch(toursListQuery),
    ])
    
    // Group tours by departure city
    const toursByCity = {}
    allTours?.forEach((tour) => {
      const city = tour.departureCity || 'other'
      if (!toursByCity[city]) {
        toursByCity[city] = []
      }
      toursByCity[city].push(tour)
    })
    
    // Select up to 6 tours, distributing across different cities
    // Priority: cities with more tours first, then distribute evenly
    const cities = Object.keys(toursByCity).sort(
      (a, b) => toursByCity[b].length - toursByCity[a].length
    )
    
    const featuredTours = []
    const maxTours = 6
    
    if (cities.length > 0) {
      // Calculate how many tours per city (distribute evenly)
      const toursPerCity = Math.floor(maxTours / cities.length)
      const extraTours = maxTours % cities.length
      
      for (let i = 0; i < cities.length; i++) {
        if (featuredTours.length >= maxTours) break
        
        const city = cities[i]
        // Give extra tours to cities with more available tours
        const count = toursPerCity + (i < extraTours ? 1 : 0)
        const cityTours = toursByCity[city].slice(0, count)
        featuredTours.push(...cityTours)
      }
    }
    
    return { homepage, tours: featuredTours }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return { homepage: null, tours: [] }
  }
}

export default async function HomePage() {
  const { homepage, tours } = await getHomepageData()

  const faqSchema = generateFAQSchema(homepageFAQs)

  return (
    <>
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Hero
        heroTitle={homepage?.heroTitle || "Where the dunes sing at sunset"}
        heroSubtitle={homepage?.heroSubtitle || "Discover authentic Saharan culture, music, and unforgettable desert experiences"}
        heroImage={homepage?.heroImage}
        heroVideo={homepage?.heroVideo}
        ambientSound={homepage?.ambientSound}
        carouselSlides={(() => {
          const seen = new Set()
          return tours.map(t => ({
            image: t.mainImage,
            title: t.title,
            city: t.departureCity,
          })).filter(s => {
            if (!s.image) return false
            const ref = s.image._ref || s.image.asset?._ref || JSON.stringify(s.image)
            if (seen.has(ref)) return false
            seen.add(ref)
            return true
          }).slice(0, 3)
        })()}
      />

      {/* Stats bar */}
      <section className="bg-desert-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: `${tours.length}+`, label: 'Desert Tours' },
              { value: '10+', label: 'Years of Experience' },
              { value: '100%', label: 'Berber-Guided' },
              { value: '5★', label: 'Guest Rating' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-2xl md:text-3xl font-serif font-bold text-desert-200">{stat.value}</span>
                <span className="text-xs md:text-sm text-white/70 mt-1 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <SectionTitle
          title="Featured Desert Tours"
          subtitle="Embark on an unforgettable journey through the golden sands of the Sahara"
        />
        
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Our tours are being prepared. Please check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="/tours"
            className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition"
          >
            View All Tours
          </a>
        </div>
      </section>

      <section className="bg-sand-50 py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Why Travel With Us?"
            subtitle="A decade of desert expertise: small groups, real Berber guides, zero compromise on authenticity"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                ),
                title: 'Born in the Desert',
                body: 'Every guide is a native Berber who grew up in the Sahara. No scripts, just real stories passed down through generations.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Low-Impact Travel',
                body: 'Small groups only. We partner with local villages, leave no trace, and put 10% of profits back into desert communities.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                ),
                title: 'Rated 5★ Consistently',
                body: 'Hundreds of travellers from 40+ countries. We don\'t just meet expectations: the desert tends to exceed them.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-sand-100"
              >
                <div className="w-12 h-12 bg-desert-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-desert-100 transition-colors">
                  <svg className="w-6 h-6 text-desert-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-900 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Traveller quote */}
          <div className="mt-14 bg-desert-700 rounded-2xl px-8 py-10 text-center text-white">
            <svg className="w-8 h-8 text-desert-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg md:text-xl font-serif italic text-white/90 max-w-2xl mx-auto leading-relaxed">
              &ldquo;Sleeping under the Saharan stars with nothing but silence and sand, this wasn&apos;t a tour, it was a transformation.&rdquo;
            </p>
            <p className="mt-4 text-sm text-desert-300 font-medium">Sarah K., Verified Traveller · United Kingdom</p>
          </div>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="py-4 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
          {[
            { src: '/images/morningsunset.jpeg', alt: 'Morning light over the Sahara dunes' },
            { src: '/images/camels2.jpeg', alt: 'Camel trek at dusk' },
            { src: '/images/desert4.jpeg', alt: 'Golden hour dunes' },
            { src: '/images/desert9.jpeg', alt: 'Desert horizon at sunset' },
          ].map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection />

      {/* Latest from Our Blog */}
      <section className="bg-sand-50 py-20 border-t border-sand-200">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="From Our Blog"
            subtitle="Tips, stories, and insights from a decade of desert journeys"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-block px-8 py-4 border-2 border-desert-600 text-desert-600 hover:bg-desert-600 hover:text-white font-semibold rounded-lg smooth-transition"
            >
              Read All Articles
            </Link>
          </div>
        </div>
      </section>


      <section className="relative overflow-hidden">
        <Image src="/images/evening.jpeg" alt="Sahara Desert at evening" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-4">
            Your Journey Awaits
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 max-w-2xl leading-tight">
            Ready for Your Desert Adventure?
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl">
            Let our Berber guides take you deep into the Sahara. Camel treks, starlit camps, and memories that last a lifetime.
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
