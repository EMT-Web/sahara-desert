import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import { client, urlFor } from '@/lib/sanity'
import { sustainabilityQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sustainability | Sahara Desert Travel',
    description: 'Learn about our commitment to sustainable and responsible tourism in the Sahara Desert. We protect the environment and support local communities.',
    url: '/sustainability',
    keywords: ['Sustainable Tourism', 'Eco-Friendly Travel', 'Responsible Tourism', 'Desert Conservation'],
  })
}

async function getSustainabilityContent() {
  try {
    const sustainability = await client.fetch(sustainabilityQuery)
    return sustainability
  } catch (error) {
    console.error('Error fetching sustainability content:', error)
    return null
  }
}

export default async function SustainabilityPage() {
  const sustainability = await getSustainabilityContent()

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={sustainability?.title || 'Our Commitment to Sustainability'}
          subtitle="Protecting the Sahara for future generations through responsible and sustainable tourism"
        />

        <div className="max-w-4xl mx-auto mt-12">
          {sustainability?.introduction && (
            <div className="prose prose-lg max-w-none mb-16 text-center">
              <p className="text-xl text-gray-700 leading-relaxed">
                {sustainability.introduction}
              </p>
            </div>
          )}

          {sustainability?.initiatives && sustainability.initiatives.length > 0 ? (
            <div className="space-y-12">
              {sustainability.initiatives.map((initiative, index) => (
                <div
                  key={index}
                  className="bg-sand-100 rounded-xl overflow-hidden shadow-lg"
                >
                  {initiative.image && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={urlFor(initiative.image).width(800).height(400).url()}
                        alt={`${initiative.title} - Sustainability Initiative`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              <div className="bg-sand-100 rounded-xl p-8 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                    <svg
                      className="w-8 h-8 text-green-600"
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
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                      Environmental Protection
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We minimize our environmental impact through leave-no-trace practices, waste reduction, and protecting fragile desert ecosystems. Our tours are designed to preserve the natural beauty of the Sahara for future generations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-sand-100 rounded-xl p-8 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-desert-100 rounded-full flex items-center justify-center mr-6">
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
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                      Supporting Local Communities
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We work directly with local communities, ensuring that tourism benefits the people of the Sahara. We employ local guides, source supplies from local vendors, and contribute to community development projects.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-sand-100 rounded-xl p-8 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                      Cultural Preservation
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We are committed to preserving and sharing the rich cultural heritage of the Sahara. Our tours respect local traditions, support traditional crafts, and promote cultural understanding between visitors and desert communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
