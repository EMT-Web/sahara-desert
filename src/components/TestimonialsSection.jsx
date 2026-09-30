import { TRIPADVISOR_URL, testimonials } from '@/data/testimonials'
import Icon, { Stars } from '@/components/Icon'

// Guest reviews. Server component: every review is in the HTML (matches the
// Review JSON-LD built from the same data), scrolls horizontally on phones.
export default function TestimonialsSection() {
  const [featured, ...rest] = testimonials

  return (
    <section className="section overflow-hidden bg-sand-100">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">Guest reviews</p>
            <h2 className="heading-lg mt-3">In our travellers&apos; words</h2>
            <div className="mt-6 flex items-center gap-4">
              <p className="font-serif text-5xl text-ink-900">5.0</p>
              <div>
                <Stars count={5} />
                <p className="mt-1 text-sm text-ink-600">Rated Excellent on Tripadvisor</p>
              </div>
            </div>
            <a href={TRIPADVISOR_URL} target="_blank" rel="noopener noreferrer" className="link-arrow mt-6">
              Read all reviews on Tripadvisor <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>

          {featured && (
            <figure className="relative" data-reveal>
              <span className="absolute -left-2 -top-10 select-none font-serif text-[7rem] leading-none text-desert-200" aria-hidden="true">&ldquo;</span>
              <blockquote className="relative font-serif text-2xl leading-snug text-ink-900 md:text-[1.9rem]">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm text-ink-600">
                <span className="font-semibold text-ink-900">{featured.name}</span> · {featured.tour} · {featured.date}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="no-scrollbar scroll-px-4 sm:scroll-px-6 lg:scroll-px-0 -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {rest.map((t) => (
            <figure key={t.name + t.date} className="card flex w-[82%] shrink-0 snap-start flex-col p-6 sm:w-[60%] md:w-auto" data-reveal>
              <Stars count={t.rating} className="h-3.5 w-3.5" />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 border-t border-sand-200 pt-4">
                <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                <p className="text-xs text-ink-500">{t.country} · {t.date}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
