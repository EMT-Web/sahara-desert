import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import Icon from '@/components/Icon'

// Fallback photos when a tour has no mainImage in Sanity. Pools are chosen
// per departure city; the pick is stable per tour id.
const CITY_IMAGES = {
  marrakech:  ['/images/image00032.jpeg', '/images/desert3.jpeg', '/images/fort.jpg', '/images/image00004.jpeg', '/images/desert4.jpeg'],
  fes:        ['/images/image00017.jpeg', '/images/image00015.jpeg', '/images/image00016.jpeg', '/images/image00008.jpeg', '/images/desert2.jpeg'],
  agadir:     ['/images/image00025.jpeg', '/images/desert8.jpeg', '/images/image00026.jpeg', '/images/image00011.jpeg', '/images/camels.jpeg'],
  casablanca: ['/images/fort2.jpg', '/images/desert9.jpeg', '/images/image00012.jpeg', '/images/image00001.jpeg', '/images/image00027.jpeg'],
  errachidia: ['/images/image00060.jpeg', '/images/camels2.jpeg', '/images/image00059.jpeg', '/images/image00018.jpeg', '/images/desert_midday.jpeg'],
  default:    ['/images/camp_in_desert.jpeg', '/images/image00015.jpeg', '/images/desert1.jpeg', '/images/camels_farview.jpeg', '/images/evening.jpeg'],
}

function getFallbackImage(city = '', id = '') {
  const pool = CITY_IMAGES[city?.toLowerCase()] || CITY_IMAGES.default
  const index = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return pool[index % pool.length]
}

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function TourCard({ tour, priority = false }) {
  const imageSrc = tour.mainImage
    ? urlFor(tour.mainImage).width(800).height(600).quality(75).url()
    : getFallbackImage(tour.departureCity, tour._id || tour.slug?.current || '')

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
