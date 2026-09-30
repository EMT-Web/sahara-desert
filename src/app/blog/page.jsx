import PageHero from '@/components/PageHero'
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
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        image="/images/image00035.jpeg"
        imageAlt="Sahara Desert blog"
        eyebrow={<>Stories & Guides</>}
        title="The Sahara Desert Blog"
        subtitle="Travel tips, desert stories, cultural insights, and everything you need to plan the journey of a lifetime"
      />

      <FilterableBlog posts={blogPosts} />

    </>
  )
}
