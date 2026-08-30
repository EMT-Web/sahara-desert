import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import StoryCard from '@/components/StoryCard'
import { client } from '@/lib/sanity'
import { storiesListQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Stories & Blog | Sahara Desert Travel',
    description: 'Read inspiring stories and experiences from travelers who have explored the Sahara Desert. Discover travel tips, cultural insights, and adventure tales.',
    url: '/stories',
    keywords: ['Sahara Stories', 'Desert Travel Blog', 'Morocco Travel Stories', 'Desert Adventures'],
  })
}

async function getStories() {
  try {
    const stories = await client.fetch(storiesListQuery)
    return stories || []
  } catch (error) {
    console.error('Error fetching stories:', error)
    return []
  }
}

export default async function StoriesPage() {
  const stories = await getStories()

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/image00035.jpeg" alt="Stories from the Sahara Desert" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">From the Dunes</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Stories from the Desert</h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Real experiences from travellers who have journeyed through the Sahara, in their own words
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {stories.length > 0 ? (
            <>
              <SectionTitle
                title={`${stories.length} ${stories.length === 1 ? 'Story' : 'Stories'} from the Sahara`}
                subtitle="Told by guides, guests, and Berber storytellers who know the desert intimately"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => (
                  <StoryCard key={story._id} story={story} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-sand-50 rounded-2xl p-14 max-w-2xl mx-auto border border-sand-200">
                <svg className="w-16 h-16 text-desert-300 mx-auto mb-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Stories Coming Soon</h3>
                <p className="text-gray-900 leading-relaxed mb-8">
                  We are collecting inspiring stories from our travellers. Subscribe below and you&apos;ll be the first to read them.
                </p>
                <a
                  href="/tours"
                  className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg smooth-transition"
                >
                  Browse Our Tours
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Traveller quote */}
      <section className="bg-desert-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-8 h-8 text-desert-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed">
              &ldquo;The Sahara doesn&apos;t just change your view: it changes the way you see everything after.&rdquo;
            </p>
            <p className="mt-5 text-sm text-desert-300 font-medium">Marco D., Verified Traveller · Italy</p>
          </div>
        </div>
      </section>

    </>
  )
}
