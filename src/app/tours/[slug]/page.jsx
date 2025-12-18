import Image from 'next/image'
import Script from 'next/script'
import { client, urlFor } from '@/lib/sanity'
import { tourDetailQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateTourSchema, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const { slug } = params
  const tour = await client.fetch(tourDetailQuery, { slug })
  
  return generateSEOMetadata({
    title: tour?.title || 'Tour | Sahara Desert Travel',
    description: tour?.excerpt || tour?.description || 'Explore an unforgettable desert experience in the Sahara',
    image: tour?.mainImage,
    url: `/tours/${slug}`,
    type: 'article',
    publishedTime: tour?.publishedAt,
    keywords: ['Sahara Tour', tour?.title, tour?.departureCity, 'Desert Adventure', 'Morocco Travel'],
  })
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
  const { slug } = params
  const tour = await getTour(slug)

  const tourSchema = tour ? generateTourSchema(tour) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour?.title || 'Tour', url: `/tours/${slug}` },
  ])

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
    <>
      {tourSchema && (
        <Script
          id="tour-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
        />
      )}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-20">
        {/* Hero Image Section - Image only, no text overlay */}
        {tour.mainImage && (
          <div className="relative h-[50vh] w-full mb-12">
            <Image
              src={urlFor(tour.mainImage).width(1920).height(1080).url()}
              alt={`${tour.title} - Sahara Desert Tour`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

      {/* Title and Excerpt - Below the image */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
          {tour.title}
        </h1>
        {tour.excerpt && (
          <p className="text-xl text-gray-600 max-w-3xl">
            {tour.excerpt}
          </p>
        )}
      </div>

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
                    <div key={index} className="bg-sand-100 rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-semibold text-desert-600 mb-2">
                        {item.day && item.day.toLowerCase().includes('day') 
                          ? item.day 
                          : `Day ${index + 1}`}
                        {item.title ? `: ${item.title}` : ''}
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
                        alt={`${tour.title} - Gallery Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 smooth-transition"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-sand-100 rounded-xl p-6 shadow-xl sticky top-24">
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
    </>
  )
}
