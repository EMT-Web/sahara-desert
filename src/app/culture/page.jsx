import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import { client, urlFor } from '@/lib/sanity'
import { cultureQuery } from '@/lib/queries'

export const metadata = {
  title: 'Saharan Culture | Sahara Desert Travel',
  description: 'Discover the rich cultural heritage of the Sahara Desert. Learn about traditions, customs, and the way of life in the desert.',
}

async function getCultureContent() {
  try {
    const culture = await client.fetch(cultureQuery)
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
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-xl text-gray-700 leading-relaxed">
                {culture.introduction}
              </p>
            </div>
          )}

          {culture?.sections && culture.sections.length > 0 ? (
            <div className="space-y-16">
              {culture.sections.map((section, index) => (
                <section key={index} className="bg-white rounded-xl p-8 shadow-lg">
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
                            alt={section.heading}
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
          ) : (
            <div className="bg-sand-50 rounded-xl p-12 text-center">
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
