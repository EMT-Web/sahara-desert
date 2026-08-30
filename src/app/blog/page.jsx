import Image from 'next/image'
import Script from 'next/script'
import FilterableBlog from '@/components/FilterableBlog'
import { blogPosts } from '@/data/blogPosts'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Blog | Travel Tips, Stories & Desert Guides',
    description: 'Explore our Sahara Desert blog: camel trekking guides, packing lists, cultural insights, Berber traditions, photography tips, and first-hand desert stories from Morocco.',
    url: '/blog',
    keywords: ['Sahara Desert blog', 'Morocco travel tips', 'desert travel guide', 'Berber culture', 'Erg Chebbi guide', 'camel trekking Morocco'],
  })
}

export default function BlogPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/image00035.jpeg" alt="Sahara Desert blog" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">
            Stories & Guides
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            The Sahara Desert Blog
          </h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Travel tips, desert stories, cultural insights, and everything you need to plan the journey of a lifetime
          </p>
        </div>
      </section>

      <FilterableBlog posts={blogPosts} />

    </>
  )
}
