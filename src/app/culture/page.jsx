import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import { client, urlFor } from '@/lib/sanity'
import { cultureQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Saharan Culture | Sahara Desert Travel',
    description: 'Discover the rich cultural heritage of the Sahara Desert. Learn about Berber traditions, customs, storytelling, and the way of life in the desert.',
    url: '/culture',
    keywords: ['Sahara Culture', 'Berber Traditions', 'Desert Heritage', 'Morocco Culture', 'Nomadic Culture'],
  })
}

async function getCultureContent() {
  try {
    // First, let's check if any culture documents exist
    const allCulture = await client.fetch(`*[_type == "culture"]{_id, title, _createdAt}`)
    console.log('All culture documents:', allCulture)
    
    const culture = await client.fetch(cultureQuery)
    console.log('Culture data:', { 
      culture: !!culture, 
      hasIntroduction: !!culture?.introduction,
      hasBerberTraditions: !!culture?.berberTraditions,
      hasCampfireStorytelling: !!culture?.campfireStorytelling,
      hasSections: !!culture?.sections?.length 
    })
    if (culture) {
      console.log('Culture title:', culture.title)
      console.log('Full culture object:', JSON.stringify(culture, null, 2))
    } else {
      console.log('⚠️ No culture document found. Make sure it is published in Sanity Studio.')
    }
    return culture
  } catch (error) {
    console.error('Error fetching culture content:', error)
    return null
  }
}

export default async function CulturePage() {
  const culture = await getCultureContent()

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={culture?.title || 'Saharan Culture & Traditions'}
          subtitle="Discover the rich heritage, customs, and way of life of the Saharan people"
        />

        <div className="max-w-4xl mx-auto mt-12">
          {culture?.introduction && (
            <div className="prose prose-lg max-w-none mb-16 text-center">
              <p className="text-xl text-gray-700 leading-relaxed">
                {culture.introduction}
              </p>
            </div>
          )}

          {/* Berber Traditions Section */}
          {culture?.berberTraditions && (
            <section className="bg-sand-100 rounded-xl p-8 shadow-lg mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Berber Traditions
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {culture.berberTraditions}
                </p>
              </div>
            </section>
          )}

          {/* Campfire Storytelling Section */}
          {culture?.campfireStorytelling && (
            <section className="bg-gradient-to-br from-desert-50 to-sand-50 rounded-xl p-8 shadow-lg mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Campfire Storytelling
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {culture.campfireStorytelling}
                </p>
              </div>
              <div className="mt-6 p-6 bg-sand-100/80 rounded-lg border-l-4 border-desert-600">
                <p className="text-gray-700 italic">
                  "Under the starlit Saharan sky, around the warm glow of a campfire, stories have been passed down for generations. These tales of desert wisdom, ancient legends, and cultural heritage come alive in the voices of our local guides."
                </p>
              </div>
            </section>
          )}

          {/* Additional Sections */}
          {culture?.sections && culture.sections.length > 0 && (
            <div className="space-y-16 mt-16">
              {culture.sections.map((section, index) => (
                <section key={index} className="bg-sand-100 rounded-xl p-8 shadow-lg">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                    {section.heading}
                  </h2>
                  
                  {section.content && (
                    <div className="prose prose-lg max-w-none mb-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  )}

                  {section.images && section.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {section.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative aspect-video overflow-hidden rounded-lg"
                        >
                          <Image
                            src={urlFor(image).width(600).height(400).url()}
                            alt={`${section.heading} - Saharan Culture`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {/* Show "Coming Soon" only if NO content at all */}
          {!culture?.introduction && !culture?.berberTraditions && !culture?.campfireStorytelling && (!culture?.sections || culture.sections.length === 0) && (
            <div className="bg-sand-100 rounded-xl p-12 text-center">
              <svg
                className="w-20 h-20 text-desert-400 mx-auto mb-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Cultural Content Coming Soon
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The Sahara is home to diverse cultures and ancient traditions. We are compiling comprehensive information about the people, customs, and heritage of the desert. From the nomadic Tuareg to traditional music and crafts, discover the living culture of the Sahara.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
