import Link from 'next/link'
import Image from 'next/image'

export default function BlogCard({ post, headingLevel = 'h3' }) {
  const Heading = headingLevel
  const date = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-sand-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col pt-5">
          <p className="flex items-center gap-2 text-xs text-ink-500">
            <span className="font-semibold uppercase tracking-[0.14em] text-desert-700">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </p>
          <Heading className="mt-2 font-serif text-xl font-medium leading-snug text-ink-900 transition-colors group-hover:text-desert-700">
            {post.title}
          </Heading>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
          <p className="mt-4 text-xs text-ink-500">{date}</p>
        </div>
      </article>
    </Link>
  )
}
