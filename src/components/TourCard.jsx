import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

export default function TourCard({ tour }) {
  return (
    <Link
      href={`/tours/${tour.slug.current}`}
      className="group block bg-sand-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition transform hover:-translate-y-2"
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-desert-400 to-sand-600">
        {tour.mainImage ? (
          <Image
            src={urlFor(tour.mainImage).width(600).height(400).url()}
            alt={`${tour.title} - Sahara Desert Tour`}
            fill
            className="object-cover group-hover:scale-110 smooth-transition"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/80">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {tour.price && (
          <div className="absolute top-4 right-4 bg-desert-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
            ${tour.price}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-desert-600 smooth-transition">
          {tour.title}
        </h3>
        {tour.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {tour.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {tour.duration && (
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-desert-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {tour.duration}
            </div>
          )}
          <span className="text-desert-600 font-semibold group-hover:underline">
            Learn More →
          </span>
        </div>
      </div>
    </Link>
  )
}
