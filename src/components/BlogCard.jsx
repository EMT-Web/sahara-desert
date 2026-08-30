import Link from 'next/link'
import Image from 'next/image'

const categoryColors = {
  'Travel Tips': 'bg-blue-100 text-blue-700',
  'Experiences': 'bg-amber-100 text-amber-700',
  'Planning': 'bg-green-100 text-green-700',
  'Stories': 'bg-purple-100 text-purple-700',
  'Culture': 'bg-rose-100 text-rose-700',
  'Destinations': 'bg-desert-100 text-desert-700',
  'Photography': 'bg-indigo-100 text-indigo-700',
  'History': 'bg-stone-100 text-stone-700',
  'Sustainability': 'bg-emerald-100 text-emerald-700',
  'Family Travel': 'bg-orange-100 text-orange-700',
  'Itineraries': 'bg-teal-100 text-teal-700',
}

export default function BlogCard({ post }) {
  const badgeClass = categoryColors[post.category] || 'bg-sand-100 text-desert-700'
  const date = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden border border-sand-200 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h2 className="font-serif font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-desert-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-900 text-sm leading-relaxed mb-4 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-sand-100">
            <span>{date}</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
