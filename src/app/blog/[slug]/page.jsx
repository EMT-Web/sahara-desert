import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import BlogCard from '@/components/BlogCard'
import { getBlogPost, getRelatedPosts, blogPosts } from '@/data/blogPosts'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/seo'

// Outbound authority resources keyed by post category
const resourcesByCategory = {
  'Travel Tips': [
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Plan your trip with the national tourism authority' },
    { label: 'Sahara Desert: Wikipedia', url: 'https://en.wikipedia.org/wiki/Sahara', desc: 'Geography, climate, and ecology of the world\'s largest hot desert' },
    { label: 'Erg Chebbi: Wikipedia', url: 'https://en.wikipedia.org/wiki/Erg_Chebbi', desc: 'The iconic dunes near Merzouga, Morocco' },
  ],
  'Experiences': [
    { label: 'Erg Chebbi: Wikipedia', url: 'https://en.wikipedia.org/wiki/Erg_Chebbi', desc: 'All about the Erg Chebbi dunes' },
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Discover experiences across Morocco' },
  ],
  'Planning': [
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Official travel information for Morocco' },
    { label: 'Merzouga: Wikipedia', url: 'https://en.wikipedia.org/wiki/Merzouga', desc: 'The village at the gateway to Erg Chebbi' },
    { label: 'Climate of Morocco: Wikipedia', url: 'https://en.wikipedia.org/wiki/Climate_of_Morocco', desc: 'When to go and what weather to expect' },
  ],
  'Stories': [
    { label: 'Sahara Desert: Wikipedia', url: 'https://en.wikipedia.org/wiki/Sahara', desc: 'The world\'s largest hot desert' },
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Official Morocco travel guide' },
  ],
  'Culture': [
    { label: 'Berber People: Wikipedia', url: 'https://en.wikipedia.org/wiki/Berber_people', desc: 'History and culture of the Amazigh people of North Africa' },
    { label: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org/', desc: 'UNESCO documentation of Berber cultural heritage' },
    { label: 'Gnawa Music: Wikipedia', url: 'https://en.wikipedia.org/wiki/Gnawa_music', desc: 'Sacred music traditions of the Sahara' },
  ],
  'Destinations': [
    { label: 'Merzouga: Wikipedia', url: 'https://en.wikipedia.org/wiki/Merzouga', desc: 'Gateway village to Erg Chebbi' },
    { label: 'Zagora, Morocco: Wikipedia', url: 'https://en.wikipedia.org/wiki/Zagora,_Morocco', desc: 'Desert town at the edge of the Sahara' },
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Discover destinations across Morocco' },
  ],
  'Photography': [
    { label: 'Erg Chebbi: Wikipedia', url: 'https://en.wikipedia.org/wiki/Erg_Chebbi', desc: 'Morocco\'s most photographed sand dunes' },
    { label: 'Sahara Desert: Wikipedia', url: 'https://en.wikipedia.org/wiki/Sahara', desc: 'Landscapes and geography of the Sahara' },
  ],
  'History': [
    { label: 'Trans-Saharan Trade: Wikipedia', url: 'https://en.wikipedia.org/wiki/Trans-Saharan_trade', desc: 'Ancient trade routes across the Sahara' },
    { label: 'Berber People: Wikipedia', url: 'https://en.wikipedia.org/wiki/Berber_people', desc: 'The indigenous people of North Africa' },
    { label: 'Aït Benhaddou: UNESCO World Heritage', url: 'https://whc.unesco.org/en/list/444/', desc: 'UNESCO-listed kasbah on the old caravan route' },
  ],
  'Sustainability': [
    { label: 'UNWTO: Sustainable Tourism', url: 'https://www.unwto.org/sustainable-development', desc: 'Global standards for responsible tourism' },
    { label: 'Leave No Trace Principles', url: 'https://lnt.org/learn/seven-principles-overview', desc: 'Minimising impact in wild and natural places' },
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Responsible travel in Morocco' },
  ],
  'Family Travel': [
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Family travel guide for Morocco' },
    { label: 'Sahara Desert: Wikipedia', url: 'https://en.wikipedia.org/wiki/Sahara', desc: 'Overview of the Sahara Desert' },
  ],
  'Itineraries': [
    { label: 'Draa Valley: Wikipedia', url: 'https://en.wikipedia.org/wiki/Draa_Valley', desc: 'The longest river valley in Morocco' },
    { label: 'Aït Benhaddou: UNESCO World Heritage', url: 'https://whc.unesco.org/en/list/444/', desc: 'UNESCO-listed kasbah on the Marrakech–Sahara route' },
    { label: 'Official Morocco Tourism Website', url: 'https://www.visitmorocco.com/en', desc: 'Plan your Morocco road trip' },
  ],
}

// Internal CTA links per slug: directs readers to the most relevant tour or page
const internalLinks = {
  'marrakech-to-merzouga-road-trip': [
    { label: 'Browse our Marrakech desert tours', url: '/tours/marrakech' },
    { label: 'Explore all Sahara tours', url: '/tours' },
  ],
  'camel-trekking-morocco-what-to-expect': [
    { label: 'Book a camel trek, tours from Marrakech', url: '/tours/marrakech' },
    { label: 'Browse all desert experiences', url: '/tours' },
  ],
  'night-under-stars-erg-chebbi': [
    { label: 'Tours closest to Erg Chebbi, from Errachidia', url: '/tours/errachidia' },
    { label: 'Browse all desert camps and tours', url: '/tours' },
  ],
  'berber-culture-people-of-the-sahara': [
    { label: 'Explore our Berber culture page', url: '/culture' },
    { label: 'Meet our local Berber guides', url: '/guides' },
  ],
  'sustainable-travel-sahara': [
    { label: 'Our full sustainability commitment', url: '/sustainability' },
    { label: 'Browse responsible desert tours', url: '/tours' },
  ],
  'sahara-desert-with-kids': [
    { label: 'Plan a family desert adventure', url: '/contact' },
    { label: 'Browse all desert tours', url: '/tours' },
  ],
  'merzouga-vs-zagora-sahara': [
    { label: 'Tours closest to Merzouga, from Errachidia', url: '/tours/errachidia' },
    { label: 'All departure cities compared', url: '/tours' },
  ],
  'ancient-trans-saharan-trade-routes': [
    { label: 'Trace the old caravan routes, Marrakech tours', url: '/tours/marrakech' },
    { label: 'Browse all Sahara itineraries', url: '/tours' },
  ],
  'sahara-desert-tour-cost-guide': [
    { label: 'Compare tours by price and city', url: '/tours' },
    { label: 'Get a custom quote', url: '/contact' },
  ],
  'erg-chebbi-vs-erg-chigaga': [
    { label: 'Tours closest to Erg Chebbi, from Errachidia', url: '/tours/errachidia' },
    { label: 'All departure cities compared', url: '/tours' },
  ],
  'day-trip-sahara-desert-from-marrakech': [
    { label: 'Browse multi-day tours from Marrakech', url: '/tours/marrakech' },
    { label: 'Explore all Sahara tours', url: '/tours' },
  ],
  'how-many-days-sahara-desert-tour': [
    { label: 'Compare tours by length and city', url: '/tours' },
    { label: 'Talk to us about your ideal itinerary', url: '/contact' },
  ],
  'agadir-to-sahara-desert-tour-guide': [
    { label: 'Browse our Agadir desert tours', url: '/tours/agadir' },
    { label: 'Explore all Sahara tours', url: '/tours' },
  ],
}

const defaultInternalLinks = [
  { label: 'Browse all Sahara desert tours', url: '/tours' },
  { label: 'Contact us to plan your trip', url: '/contact' },
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Sahara Desert Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visitsaharadesert.com'}/blog/${params.slug}`,
    },
  }
}

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, post.category, 3)
  const resources = resourcesByCategory[post.category] || []
  const ctaLinks = internalLinks[post.slug] || defaultInternalLinks

  const blogPostSchema = generateBlogPostSchema(post)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  const date = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <Script id="blog-post-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative h-72 md:h-[500px] flex items-end overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative container mx-auto px-4 pb-12 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/50 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{post.title}</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">
            {post.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Intro */}
          <p className="text-xl text-gray-700 leading-relaxed mb-10 font-serif">
            {post.intro}
          </p>

          {/* Sections */}
          <div className="space-y-6">
            {post.sections.map((section, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-lg">
                {section.content}
              </p>
            ))}
          </div>

          {/* Outbound Resources */}
          {resources.length > 0 && (
            <div className="mt-14 pt-10 border-t border-sand-200">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Helpful Resources</h2>
              <ul className="space-y-3">
                {resources.map((res) => (
                  <li key={res.url}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 bg-sand-50 rounded-xl border border-sand-200 hover:border-desert-300 hover:shadow-sm transition-all group"
                    >
                      <svg className="w-4 h-4 text-desert-400 flex-shrink-0 mt-0.5 group-hover:text-desert-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm group-hover:text-desert-700 transition-colors">{res.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{res.desc}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Internal CTA: plan your trip */}
          <div className="mt-12 bg-desert-700 rounded-2xl p-8 text-white">
            <h2 className="font-serif font-bold text-xl mb-2">Ready to Experience the Sahara?</h2>
            <p className="text-white/75 text-sm mb-5 leading-relaxed">
              Turn what you&apos;ve just read into a real memory. Our Berber-led tours bring every story in this blog to life.
            </p>
            <div className="flex flex-wrap gap-3">
              {ctaLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className="px-5 py-2.5 bg-white text-desert-700 font-semibold rounded-lg text-sm hover:bg-sand-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Author card */}
          <div className="mt-14 pt-8 border-t border-sand-200 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-desert-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-serif font-bold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">
                Berber desert guide and founder of Sahara Desert Travel, born and raised in the Draa Valley
              </p>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-desert-600 font-semibold hover:text-desert-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="bg-sand-50 py-16 border-t border-sand-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">More to Read</h2>
            <p className="text-gray-500 text-sm mb-8">Continue exploring the Sahara</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src="/images/image00001.jpeg" alt="Sahara Desert landscape" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-4">Ready to Go?</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 max-w-2xl leading-tight">
            Turn Words Into Memories
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl">
            Every article you read here is lived experience. Let us take you into the desert and give you your own story to tell.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="px-10 py-4 bg-desert-600 hover:bg-desert-500 text-white font-semibold rounded-lg shadow-lg smooth-transition hover:scale-105 transition-transform"
            >
              Plan My Trip
            </Link>
            <Link
              href="/tours"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 smooth-transition backdrop-blur-sm"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
