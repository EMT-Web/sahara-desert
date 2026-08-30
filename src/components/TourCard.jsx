import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

const CITY_IMAGES = {
  marrakech:   ['/images/image00003.jpeg', '/images/desert3.jpeg', '/images/image00004.jpeg', '/images/image00005.jpeg', '/images/desert4.jpeg'],
  fes:         ['/images/image00006.jpeg', '/images/desert1.jpeg', '/images/image00007.jpeg', '/images/image00008.jpeg', '/images/desert2.jpeg'],
  agadir:      ['/images/image00009.jpeg', '/images/desert8.jpeg', '/images/image00010.jpeg', '/images/image00011.jpeg', '/images/camels.jpeg'],
  casablanca:  ['/images/image00012.jpeg', '/images/desert9.jpeg', '/images/image00013.jpeg', '/images/image00014.jpeg', '/images/image00015.jpeg'],
  errachidia:  ['/images/image00016.jpeg', '/images/camels2.jpeg', '/images/image00017.jpeg', '/images/image00018.jpeg', '/images/desert_midday.jpeg'],
  default:     ['/images/camp_in_desert.jpeg', '/images/morningsunset.jpeg', '/images/desert1.jpeg', '/images/camels_farview.jpeg', '/images/evening.jpeg'],
}

function getFallbackImage(city = '', id = '') {
  const pool = CITY_IMAGES[city?.toLowerCase()] || CITY_IMAGES.default
  const index = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return pool[index % pool.length]
}

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function TourCard({ tour }) {
  const imageSrc = tour.mainImage
    ? urlFor(tour.mainImage).width(600).height(400).url()
    : getFallbackImage(tour.departureCity, tour._id || tour.slug?.current || '')

  const excerpt = tour.excerpt || 'Discover an unforgettable journey through the golden dunes and hidden oases of the Sahara Desert.'
  const displayPrice = tour.priceDouble || tour.price

  return (
    <Link
      href={`/tours/${tour.slug?.current ?? ''}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl smooth-transition transform hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={imageSrc}
          alt={`${tour.title} - Sahara Desert Tour`}
          fill
          className="object-cover group-hover:scale-105 smooth-transition"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Duration pill: top left */}
        {tour.duration && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tour.duration}
          </div>
        )}

        {/* City badge: bottom left */}
        {tour.departureCity && (
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
            {capitalize(tour.departureCity)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-0">
        <h3 className="text-base font-serif font-bold text-gray-900 mb-2 group-hover:text-desert-600 smooth-transition leading-snug">
          {tour.title}
        </h3>
        <p className="text-sm text-gray-900 line-clamp-2 leading-relaxed flex-1">
          {excerpt}
        </p>
      </div>

      {/* Price footer */}
      <div className="mt-4 mx-5 mb-5 rounded-xl border border-sand-200 bg-sand-50 flex items-center justify-between px-4 py-3">
        {displayPrice ? (
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-gray-400 font-medium">From</span>
            <span className="text-xl font-bold text-desert-700">€{displayPrice.toLocaleString()}</span>
            <span className="text-xs text-gray-400">/ pp</span>
          </div>
        ) : (
          <span className="text-sm text-gray-400 italic">Contact for pricing</span>
        )}
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-desert-600 group-hover:gap-2 smooth-transition whitespace-nowrap">
          View Tour
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
