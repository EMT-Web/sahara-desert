import SectionTitle from '@/components/SectionTitle'
import GalleryGrid from '@/components/GalleryGrid'
import { client } from '@/lib/sanity'
import { galleryQuery } from '@/lib/queries'

export const metadata = {
  title: 'Gallery | Sahara Desert Travel',
  description: 'Explore stunning images and videos from the Sahara Desert. See the golden dunes, starry nights, and cultural experiences that await you.',
}

async function getGalleryItems() {
  try {
    const items = await client.fetch(galleryQuery)
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

        <div className="mt-12">
          <GalleryGrid items={items} />
        </div>
      </div>
    </div>
  )
}
