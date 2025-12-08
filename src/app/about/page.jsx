import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import GuideCard from '@/components/GuideCard'
import { client, urlFor } from '@/lib/sanity'
import { aboutQuery, guidesQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'About Us | Sahara Desert Travel',
    description: 'Learn about our founders, expert guides, and commitment to sustainable tourism in the Sahara Desert. Discover the story behind authentic desert experiences.',
    url: '/about',
    keywords: ['About Sahara Travel', 'Desert Guides', 'Sustainable Tourism', 'Morocco Travel Company'],
  })
}

async function getAboutData() {
  try {
    const [about, guides] = await Promise.all([
      client.fetch(aboutQuery),
      client.fetch(guidesQuery),
    ])
    console.log('📖 About data:', {
      hasAbout: !!about,
      foundersImagesCount: about?.foundersImages?.length || 0,
      foundersImages: about?.foundersImages ? about.foundersImages.map((img, i) => ({
        index: i,
        hasImage: !!img,
        keys: img ? Object.keys(img) : null,
      })) : null,
      guidesCount: guides?.length || 0,
    })
    return { about, guides: guides || [] }
  } catch (error) {
    console.error('Error fetching about data:', error)
    return { about: null, guides: [] }
  }
}

export default async function AboutPage() {
  const { about, guides } = await getAboutData()

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={about?.title || 'Our Story'}
          subtitle={about?.subtitle || 'Born from a passion for the Sahara and a commitment to authentic experiences'}
        />

        {/* Founders Story */}
        {about?.foundersStory && (
          <div className="max-w-4xl mx-auto mt-12 mb-20">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {about.foundersStory}
              </div>
            </div>
          </div>
        )}

        {/* Founders/Team Images */}
        {about?.foundersImages && about.foundersImages.length > 0 && (
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {about.foundersImages.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={urlFor(image).width(800).height(600).url()}
                    alt={`Sahara Desert Travel founder ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Expertise Section */}
        <section className="bg-gradient-to-b from-sand-50 to-white py-20 mb-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Local Expertise & Deep Knowledge"
              subtitle="Our team brings generations of Saharan wisdom to every journey"
            />
            
            <div className="max-w-4xl mx-auto">
              {about?.localExpertise && (
                <div className="prose prose-lg max-w-none mb-12">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {about.localExpertise}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-6 bg-sand-100 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-desert-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Born in the Desert</h3>
                  <p className="text-gray-600">Our guides grew up in Saharan communities, learning traditions passed down through generations</p>
                </div>

                <div className="text-center p-6 bg-sand-100 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-desert-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Cultural Guardians</h3>
                  <p className="text-gray-600">We preserve and share Berber traditions, music, and storytelling with every visitor</p>
                </div>

                <div className="text-center p-6 bg-sand-100 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-desert-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Sustainable Practices</h3>
                  <p className="text-gray-600">We protect the desert environment and support local communities through responsible tourism</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Guides */}
        {guides.length > 0 && (
          <section className="mb-20">
            <SectionTitle
              title="Meet Our Expert Guides"
              subtitle="Local experts who bring the Sahara to life"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {guides.slice(0, 6).map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* Sustainability Commitment */}
        <section className="bg-gradient-to-r from-desert-600 to-sand-600 rounded-2xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-serif font-bold mb-6 text-center">
            Our Commitment to Sustainability
          </h2>
          {about?.sustainabilityCommitment ? (
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-white/90 leading-relaxed whitespace-pre-line">
                {about.sustainabilityCommitment}
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-white/90 leading-relaxed">
                We are committed to protecting the Sahara Desert for future generations. Our tours follow leave-no-trace principles, support local communities, and preserve the cultural heritage of the region. Every journey with us contributes to sustainable tourism practices that benefit both travelers and the desert communities we call home.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

