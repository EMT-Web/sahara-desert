import SectionTitle from '@/components/SectionTitle'
import TourCard from '@/components/TourCard'
import { client } from '@/lib/sanity'
import { toursByCityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Visit Sahara Desert from Agadir | Sahara Desert Travel',
    description: 'Explore stunning Sahara Desert tours departing from Agadir. Experience the golden dunes, camel trekking, and authentic Berber culture on your Moroccan desert journey.',
    url: '/tours/agadir',
    keywords: ['Sahara Tours from Agadir', 'Agadir Desert Tours', 'Agadir to Sahara', 'Desert Tours Agadir', 'Sahara Adventure Agadir'],
  })
}

async function getTours() {
  try {
    const tours = await client.fetch(toursByCityQuery, { city: 'agadir' })
    return tours || []
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

export default async function AgadirToursPage() {
  const tours = await getTours()

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Visit Sahara Desert from Agadir"
          subtitle="Discover the magic of the Sahara Desert on unforgettable adventures departing from Agadir. Experience camel trekking, luxury desert camps, and authentic Berber culture."
        />

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-sand-100 rounded-xl p-12 max-w-2xl mx-auto">
              <svg
                className="w-20 h-20 text-desert-400 mx-auto mb-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Tours Coming Soon
              </h3>
              <p className="text-gray-600 mb-8">
                We are currently preparing our exclusive desert tours from Agadir. Please check back soon or contact us directly to plan your custom adventure.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

