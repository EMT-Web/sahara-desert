import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { storyDetailQuery } from '@/lib/queries'

export async function generateMetadata({ params }) {
  const { slug } = params
  const story = await client.fetch(storyDetailQuery, { slug })
  
  return {
    title: story?.title ? `${story.title} | Sahara Desert Travel` : 'Story | Sahara Desert Travel',
    description: story?.excerpt || 'Read an inspiring story from the Sahara Desert',
  }
}

async function getStory(slug) {
  try {
    const story = await client.fetch(storyDetailQuery, { slug })
    return story
  } catch (error) {
    console.error('Error fetching story:', error)
    return null
  }
}

export default async function StoryDetailPage({ params }) {
  const { slug } = params
  const story = await getStory(slug)

  if (!story) {
    return (
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Story Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The story you are looking for could not be found.
          </p>
          <a
            href="/stories"
            className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition"
          >
            Browse All Stories
          </a>
        </div>
      </div>
    )
  }

  const formattedDate = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="pt-20">
      {story.coverImage && (
        <div className="relative h-[60vh] w-full">
          <Image
            src={urlFor(story.coverImage).width(1920).height(1080).url()}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            {story.title}
          </h1>
          
          {story.excerpt && (
            <p className="text-xl text-gray-600 mb-8">
              {story.excerpt}
            </p>
          )}

          <div className="flex items-center justify-center space-x-4">
            {story.author?.image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={urlFor(story.author.image).width(80).height(80).url()}
                  alt={story.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-left">
              {story.author?.name && (
                <p className="font-semibold text-gray-900">
                  {story.author.name}
                </p>
              )}
              {formattedDate && (
                <time className="text-gray-600" dateTime={story.publishedAt}>
                  {formattedDate}
                </time>
              )}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {story.body}
          </div>
        </div>

        {story.author?.bio && (
          <div className="mt-16 p-8 bg-sand-50 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              About the Author
            </h3>
            <div className="flex items-start space-x-4">
              {story.author.image && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(story.author.image).width(100).height(100).url()}
                    alt={story.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900 text-lg mb-2">
                  {story.author.name}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {story.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/stories"
            className="inline-block px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition"
          >
            ← Back to Stories
          </a>
        </div>
      </article>
    </div>
  )
}
