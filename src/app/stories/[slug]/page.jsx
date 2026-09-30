import { notFound } from 'next/navigation'
import { cache } from 'react'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { storyDetailQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateStaticParams() {
  // Don't fail the whole build if Sanity is briefly unreachable; pages then
  // render on demand instead of at build time.
  const stories = await client.fetch(
    `*[_type == "story" && !(_id in path("drafts.**"))]{ "slug": slug.current }`
  ).catch(() => [])
  return (stories || []).filter(s => s.slug).map(s => ({ slug: s.slug }))
}

const fetchStory = cache(async (slug) => {
  try {
    return await client.fetch(storyDetailQuery, { slug })
  } catch {
    return null
  }
})

export async function generateMetadata({ params }) {
  const { slug } = params
  const story = await fetchStory(slug)
  return generateSEOMetadata({
    title: story?.title || 'Desert Travel Story',
    description: story?.excerpt || 'Read an inspiring story from the Sahara Desert',
    image: story?.coverImage,
    url: `/stories/${slug}`,
    type: 'article',
    publishedTime: story?.publishedAt,
    author: story?.author?.name,
    keywords: ['Sahara Story', story?.title, 'Desert Travel', 'Morocco Travel'],
  })
}

export default async function StoryDetailPage({ params }) {
  const { slug } = params
  const story = await fetchStory(slug)

  const articleSchema = story ? generateArticleSchema(story) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Stories', url: '/stories' },
    { name: story?.title || 'Story', url: `/stories/${slug}` },
  ])

  if (!story) {
    // Real 404 instead of a 200 "not found" page (avoids soft-404 indexing).
    notFound()
  }

  const formattedDate = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      {articleSchema && (
        <script
          id="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-20">
      {story.coverImage && (
        <div className="relative h-[60vh] w-full">
          <Image
            src={urlFor(story.coverImage).width(1920).height(1080).url()}
            alt={`${story.title} - Sahara Desert Story`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <article className="container-site py-16 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-ink-900 mb-6">
            {story.title}
          </h1>
          
          {story.excerpt && (
            <p className="text-xl text-ink-600 mb-8">
              {story.excerpt}
            </p>
          )}

          <div className="flex items-center justify-center space-x-4">
            {story.author?.image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={urlFor(story.author.image).width(80).height(80).url()}
                  alt={`${story.author.name} - Story Author`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-left">
              {story.author?.name && (
                <p className="font-semibold text-ink-900">
                  {story.author.name}
                </p>
              )}
              {formattedDate && (
                <time className="text-ink-600" dateTime={story.publishedAt}>
                  {formattedDate}
                </time>
              )}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="text-ink-700 leading-relaxed whitespace-pre-line">
            {story.body}
          </div>
        </div>

        {story.author?.bio && (
          <div className="mt-16 p-8 bg-sand-100 rounded-xl">
            <h3 className="text-2xl font-serif font-medium text-ink-900 mb-4">
              About the Author
            </h3>
            <div className="flex items-start space-x-4">
              {story.author.image && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(story.author.image).width(100).height(100).url()}
                    alt={`${story.author.name} - Story Author`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-ink-900 text-lg mb-2">
                  {story.author.name}
                </p>
                <p className="text-ink-600 leading-relaxed">
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
    </>
  )
}
