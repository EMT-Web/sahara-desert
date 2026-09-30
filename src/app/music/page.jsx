import PageHero from '@/components/PageHero'
import SectionTitle from '@/components/SectionTitle'
import MusicCard from '@/components/MusicCard'
import { client } from '@/lib/sanity'
import { musicQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Traditional Berber & Gnawa Music of the Sahara',
    description: 'Experience the sounds of the Sahara. Listen to traditional music and rhythms that have echoed through the desert for generations.',
    url: '/music',
    keywords: ['Sahara Music', 'Berber Music', 'Desert Music', 'Traditional Moroccan Music'],
  })
}

async function getMusicEntries() {
  try {
    const music = await client.fetch(musicQuery)
    return music || []
  } catch (error) {
    console.error('Error fetching music:', error)
    return []
  }
}

export default async function MusicPage() {
  const musicEntries = await getMusicEntries()

  return (
    <>
      <PageHero
        image="/images/image00050.jpeg"
        imageAlt="Traditional Saharan music"
        eyebrow="Rhythm of the Sahara"
        title="Sounds of the Sahara"
        subtitle="Traditional music and rhythms that have echoed through the desert for generations"
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-ink-600 leading-relaxed">
              Music is the heartbeat of the Sahara. From the deep pulse of the guembri to the call-and-response of
              Gnawa ceremonies, Berber sound is ancient, alive, and inseparable from the desert landscape.
              Listen to these recordings and let the Sahara come to you.
            </p>
          </div>
        </div>
      </section>

      {/* Music grid */}
      <section className="pb-20 bg-white">
        <div className="container-site">
          {musicEntries.length > 0 ? (
            <>
              <SectionTitle
                title="Our Music Collection"
                subtitle="Recordings gathered from communities across the Sahara"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {musicEntries.map((music) => (
                  <MusicCard key={music._id} music={music} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-sand-50 rounded-2xl p-14 max-w-2xl mx-auto border border-sand-200">
                <svg className="w-16 h-16 text-desert-300 mx-auto mb-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <h3 className="text-2xl font-serif font-medium text-ink-900 mb-3">Music Collection Coming Soon</h3>
                <p className="text-ink-900 leading-relaxed">
                  We are curating a collection of traditional Saharan music from desert communities. Check back soon to experience the sounds of the desert.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Music context section */}
      <section className="bg-sand-50 py-20 border-t border-sand-200">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Music as a Way of Life"
              subtitle="Understanding the role of sound in Saharan culture"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Gnawa Rituals',
                  body: 'Gnawa music combines Berber, sub-Saharan African, and Islamic traditions into trance-inducing ceremonies used for healing and spiritual connection.',
                },
                {
                  title: 'The Guembri',
                  body: 'This three-stringed bass lute is the foundation of Gnawa sound. Its deep resonance is said to carry prayers directly to the ancestors.',
                },
                {
                  title: 'Campfire Songs',
                  body: 'Around every desert camp fire, there are songs. Call-and-response vocals passed between guides and guests, often improvised, always unforgettable.',
                },
              ].map((item) => (
                <div key={item.title} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-sand-100">
                  <div className="w-12 h-12 bg-desert-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-desert-100 transition-colors">
                    <svg className="w-6 h-6 text-desert-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-medium mb-3 text-ink-900">{item.title}</h3>
                  <p className="text-sm text-ink-900 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
