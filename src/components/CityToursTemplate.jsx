import Link from 'next/link'
import PageHero from '@/components/PageHero'
import TourCard from '@/components/TourCard'
import CTASection from '@/components/CTASection'
import Icon from '@/components/Icon'

// Shared layout for the /tours/<city> departure hubs. Each city page keeps its
// own metadata, copy and data and passes them in.
export default function CityToursTemplate({ city, tours, hero, stops, note, posts, cta }) {
  return (
    <>
      <PageHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        imagePosition={hero.imagePosition}
        eyebrow={`Departing from ${city}`}
        title={hero.title}
        subtitle={hero.subtitle}
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Tours', url: '/tours' }, { name: city }]}
      />

      {/* Route */}
      <section className="border-b border-sand-200 bg-white py-12 md:py-16">
        <div className="container-site">
          <p className="eyebrow">Your journey south</p>
          <ol className="mt-8 grid gap-6 md:grid-cols-4 md:gap-0">
            {stops.map((item, i) => (
              <li key={item.stop} className="relative flex gap-4 md:block md:pr-6" data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
                <div className="flex items-center md:mb-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-desert-600 font-serif text-sm text-white">{i + 1}</span>
                  {i < stops.length - 1 && <span className="ml-3 hidden h-px flex-1 bg-sand-300 md:block" aria-hidden="true" />}
                </div>
                <div>
                  <p className="font-serif text-xl text-ink-900">{item.stop}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
          {note && (
            <p className="mt-10 flex items-start gap-3 rounded-2xl bg-sand-100 p-5 text-sm text-ink-700">
              <Icon name="sparkle" className="mt-0.5 h-5 w-5 shrink-0 text-desert-700" /> {note}
            </p>
          )}
        </div>
      </section>

      {/* Tours */}
      <section className="section">
        <div className="container-site">
          {tours.length > 0 ? (
            <>
              <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="eyebrow">{tours.length} {tours.length === 1 ? 'journey' : 'journeys'}</p>
                  <h2 className="heading-lg mt-3">Tours from {city}</h2>
                </div>
                <p className="max-w-md text-sm text-ink-600">All tours can be private and adjusted to your dates. Prices are per person, from.</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour, i) => (
                  <TourCard key={tour._id} tour={tour} priority={i < 2} />
                ))}
              </div>
            </>
          ) : (
            <div className="card mx-auto max-w-2xl p-10 text-center">
              <h2 className="heading-md">Tailor-made tours from {city}</h2>
              <p className="mt-3 text-ink-600">Tell us your dates and we will design a private route from {city} to the Sahara for you.</p>
              <Link href="/contact" className="btn-primary mt-6">Plan my trip</Link>
            </div>
          )}
          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <p className="text-ink-600">Don&apos;t see the right route?</p>
            <Link href="/contact" className="link-arrow">We&apos;ll design one for you <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /></Link>
          </div>
        </div>
      </section>

      {/* Reading */}
      {posts?.length > 0 && (
        <section className="section border-t border-sand-200 bg-white">
          <div className="container-site">
            <p className="eyebrow">Plan & read</p>
            <h2 className="heading-md mt-2">Before you set off from {city}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group card flex flex-col p-6 transition-shadow hover:shadow-lift">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-desert-700">{post.category}</span>
                  <h3 className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-desert-700">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
                  <span className="link-arrow mt-4">Read <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection image={cta.image} imageAlt={cta.imageAlt} eyebrow="Your journey awaits" title={cta.title} text={cta.text} secondary={{ label: 'All tours', href: '/tours' }} />
    </>
  )
}
