import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import Icon from '@/components/Icon'
import { fallbackImageFor } from '@/lib/tourImages'

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function TourCard({ tour, priority = false }) {
  // `cardImage` is set by withUniqueCardImages() when this tour's own photo is
  // missing or already shown by another card in the same list.
  const imageSrc = tour.cardImage
    || (tour.mainImage ? urlFor(tour.mainImage).width(800).height(600).quality(75).url() : fallbackImageFor(tour))

  const excerpt = tour.excerpt || 'Discover an unforgettable journey through the golden dunes and hidden oases of the Sahara Desert.'
  const displayPrice = tour.priceDouble || tour.price

  return (
    <Link
      href={`/tours/${tour.slug?.current ?? ''}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200/70 bg-white shadow-soft transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-sand-200">
        <Image
          src={imageSrc}
          alt={`${tour.title}: Sahara Desert tour`}
          fill
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          priority={priority}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-2">
          {tour.duration && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-900 shadow-sm">
              <Icon name="clock" className="h-3.5 w-3.5 text-desert-600" strokeWidth={2} />
              {tour.duration}
            </span>
          )}
        </div>
        {tour.departureCity && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-xs font-medium text-white">
            <Icon name="pin" className="h-3.5 w-3.5" strokeWidth={2} />
            From {capitalize(tour.departureCity)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-lg font-medium leading-snug text-ink-900 transition-colors group-hover:text-desert-700 md:text-xl">
          {tour.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-600">{excerpt}</p>
        <div className="mt-5 flex items-end justify-between border-t border-sand-200 pt-4">
          {displayPrice ? (
            <p className="leading-none">
              <span className="block text-[0.7rem] uppercase tracking-wider text-ink-500">From</span>
              <span className="mt-1 inline-block font-serif text-2xl text-ink-900">€{displayPrice.toLocaleString()}</span>
              <span className="ml-1 text-xs text-ink-500">per person</span>
            </p>
          ) : (
            <span className="text-sm text-ink-500">Price on request</span>
          )}
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 text-ink-800 transition-all duration-300 group-hover:border-desert-600 group-hover:bg-desert-600 group-hover:text-white" aria-hidden="true">
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  )
}
