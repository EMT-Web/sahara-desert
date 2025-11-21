import SectionTitle from '@/components/SectionTitle'
import StoryCard from '@/components/StoryCard'
import { client } from '@/lib/sanity'
import { storiesListQuery } from '@/lib/queries'

export const metadata = {
  title: 'Stories & Blog | Sahara Desert Travel',
  description: 'Read inspiring stories and experiences from travelers who have explored the Sahara Desert. Discover travel tips, cultural insights, and adventure tales.',
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
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Stories from the Desert"
          subtitle="Read real experiences and adventures from travelers who have journeyed through the Sahara"
        />

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
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
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Stories Coming Soon
              </h3>
              <p className="text-gray-600">
                We are collecting inspiring stories from our travelers. Check back soon to read about their adventures!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
