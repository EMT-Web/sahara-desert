import SectionTitle from '@/components/SectionTitle'
import GalleryGrid from '@/components/GalleryGrid'
import { client } from '@/lib/sanity'
import { galleryQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Gallery | Sahara Desert Travel',
    description: 'Explore stunning images and videos from the Sahara Desert. See the golden dunes, starry nights, and cultural experiences that await you.',
    url: '/gallery',
    keywords: ['Sahara Photos', 'Desert Images', 'Morocco Gallery', 'Sahara Videos'],
  })
}

async function getGalleryItems() {
  try {
    const items = await client.fetch(galleryQuery)
    console.log('Gallery items fetched:', items?.length || 0)
    return items || []
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Sahara Desert Gallery"
          subtitle="Immerse yourself in the breathtaking beauty of the Sahara through our collection of images and videos"
        />

        {items.length > 0 ? (
          <div className="mt-12">
            <GalleryGrid items={items} />
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-sand-100 rounded-xl p-12 max-w-2xl mx-auto">
              <svg
                className="w-20 h-20 text-desert-400 mx-auto mb-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Gallery Coming Soon
              </h3>
              <p className="text-gray-600">
                We are curating a collection of stunning images and videos from the Sahara Desert. Check back soon to explore the beauty of the desert!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
