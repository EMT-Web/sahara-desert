import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import TourCard from '@/components/TourCard'
import { client } from '@/lib/sanity'
import { homepageQuery, toursListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const homepage = await client.fetch(homepageQuery)
  return generateSEOMetadata({
    title: 'Authentic Sahara Desert Experiences',
    description:
      homepage?.heroSubtitle ||
      'Visit Sahara Desert offers authentic Morocco desert tours with expert Berber guides, sustainable travel, camel trekking, and unforgettable journeys through golden dunes and desert oases.',
    image: homepage?.heroImage,
    url: '/',
  })
}

async function getHomepageData() {
  try {
    const [homepage, tours] = await Promise.all([
      client.fetch(homepageQuery),
      client.fetch(toursListQuery),
    ])
    console.log('🏠 Homepage data:', {
      hasHomepage: !!homepage,
      heroImage: !!homepage?.heroImage,
      heroImageType: typeof homepage?.heroImage,
      heroImageKeys: homepage?.heroImage ? Object.keys(homepage.heroImage) : null,
      toursCount: tours?.length || 0,
      firstTourImage: tours?.[0]?.mainImage ? 'has image' : 'no image',
    })
    return { homepage, tours: tours?.slice(0, 3) || [] }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return { homepage: null, tours: [] }
  }
}

export default async function HomePage() {
  const { homepage, tours } = await getHomepageData()

  return (
    <>
      <Hero
        heroTitle={homepage?.heroTitle || "Where the dunes sing at sunset"}
        heroSubtitle={homepage?.heroSubtitle || "Discover authentic Saharan culture, music, and unforgettable desert experiences"}
        heroImage={homepage?.heroImage}
        heroVideo={homepage?.heroVideo}
        ambientSound={homepage?.ambientSound}
      />

      <section className="container mx-auto px-4 py-20">
        <SectionTitle
          title="Featured Desert Tours"
          subtitle="Embark on an unforgettable journey through the golden sands of the Sahara"
        />
        
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Our tours are being prepared. Please check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="/tours"
            className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition"
          >
            View All Tours
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sand-50 to-white py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Why Choose Sahara Desert Travel?"
            subtitle="Experience the desert with authentic local knowledge and sustainable practices"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-8 bg-sand-100 rounded-xl shadow-lg hover:shadow-2xl smooth-transition">
              <div className="w-16 h-16 bg-desert-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-desert-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">
                Expert Local Guides
              </h3>
              <p className="text-gray-600">
                Our experienced guides share deep knowledge of Saharan culture, history, and traditions
              </p>
            </div>

            <div className="text-center p-8 bg-sand-100 rounded-xl shadow-lg hover:shadow-2xl smooth-transition">
              <div className="w-16 h-16 bg-desert-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-desert-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">
                Sustainable Tourism
              </h3>
              <p className="text-gray-600">
                We practice responsible tourism that respects local communities and the environment
              </p>
            </div>

            <div className="text-center p-8 bg-sand-100 rounded-xl shadow-lg hover:shadow-2xl smooth-transition">
              <div className="w-16 h-16 bg-desert-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-desert-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">
                Authentic Experiences
              </h3>
              <p className="text-gray-600">
                Immerse yourself in genuine Saharan culture with traditional music, cuisine, and hospitality
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-desert-600 to-sand-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Ready for Your Desert Adventure?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us today to plan your unforgettable Sahara experience
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-desert-600 hover:bg-sand-100 font-semibold rounded-lg shadow-lg smooth-transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  )
}
