import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

export default function StoryCard({ story }) {
  const formattedDate = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/stories/${story.slug.current}`}
      className="group block bg-sand-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition"
    >
      {story.coverImage && (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={urlFor(story.coverImage).width(600).height(400).url()}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-110 smooth-transition"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-desert-600 smooth-transition">
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {story.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            {story.author?.image && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={urlFor(story.author.image).width(50).height(50).url()}
                  alt={story.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {story.author?.name && (
              <span className="font-medium">{story.author.name}</span>
            )}
          </div>
          {formattedDate && (
            <time dateTime={story.publishedAt}>{formattedDate}</time>
          )}
        </div>
      </div>
    </Link>
  )
}
