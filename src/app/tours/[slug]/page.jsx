import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { tourDetailQuery } from '@/lib/queries'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tour = await client.fetch(tourDetailQuery, { slug })
  
  return {
    title: tour?.title ? `${tour.title} | Sahara Desert Travel` : 'Tour | Sahara Desert Travel',
    description: tour?.excerpt || 'Explore an unforgettable desert experience in the Sahara',
  }
}

async function getTour(slug) {
  try {
    const tour = await client.fetch(tourDetailQuery, { slug })
    return tour
  } catch (error) {
    console.error('Error fetching tour:', error)
    return null
  }
}

export default async function TourDetailPage({ params }) {
  const { slug } = await params
  const tour = await getTour(slug)

  if (!tour) {
    return (
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Tour Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The tour you are looking for could not be found.
          </p>
          <a
            href="/tours"
            className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition"
          >
            Browse All Tours
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {tour.mainImage && (
        <div className="relative h-[60vh] w-full">
          <Image
            src={urlFor(tour.mainImage).width(1920).height(1080).url()}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-shadow">
                {tour.title}
              </h1>
              {tour.excerpt && (
                <p className="text-xl md:text-2xl text-white/90 text-shadow max-w-3xl mx-auto">
                  {tour.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {tour.body && (
              <div className="prose prose-lg max-w-none mb-12">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {tour.body}
                </div>
              </div>
            )}

            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Itinerary
                </h2>
                <div className="space-y-6">
                  {tour.itinerary.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-semibold text-desert-600 mb-2">
                        Day {index + 1}: {item.day || item.title}
                      </h3>
                      <p className="text-gray-700">
                        {item.description || item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tour.gallery && tour.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={urlFor(image).width(400).height(400).url()}
                        alt={`${tour.title} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 smooth-transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-xl sticky top-24">
              {tour.price && (
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Price per person</p>
                  <p className="text-4xl font-bold text-desert-600">
                    ${tour.price}
                  </p>
                </div>
              )}

              {tour.duration && (
                <div className="mb-6 flex items-center text-gray-700">
                  <svg
                    className="w-6 h-6 mr-3 text-desert-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium">{tour.duration}</span>
                </div>
              )}

              {tour.included && tour.included.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.notIncluded && tour.notIncluded.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <svg
                          className="w-5 h-5 mr-2 text-red-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href="/contact"
                className="block w-full px-6 py-4 bg-desert-600 hover:bg-desert-700 text-white text-center font-semibold rounded-lg shadow-lg smooth-transition"
              >
                Book This Tour
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
