import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

export default function TourCard({ tour }) {
  return (
    <Link
      href={`/tours/${tour.slug.current}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition transform hover:-translate-y-2"
    >
      <div className="relative h-64 overflow-hidden">
        {tour.mainImage && (
          <Image
            src={urlFor(tour.mainImage).width(600).height(400).url()}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-110 smooth-transition"
          />
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
