import SectionTitle from '@/components/SectionTitle'
import MusicCard from '@/components/MusicCard'
import { client } from '@/lib/sanity'
import { musicQuery } from '@/lib/queries'

export const metadata = {
  title: 'Traditional Music | Sahara Desert Travel',
  description: 'Experience the sounds of the Sahara. Listen to traditional music and rhythms that have echoed through the desert for generations.',
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
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Sounds of the Sahara"
          subtitle="Immerse yourself in the traditional music and rhythms that have echoed through the desert for generations"
        />

        {musicEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {musicEntries.map((music) => (
              <MusicCard key={music._id} music={music} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-sand-50 rounded-xl p-12 max-w-2xl mx-auto">
              <svg
                className="w-20 h-20 text-desert-400 mx-auto mb-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
              </svg>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Music Collection Coming Soon
              </h3>
              <p className="text-gray-600">
                We are curating a collection of traditional Saharan music. Check back soon to experience the sounds of the desert!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
