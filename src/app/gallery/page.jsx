import Image from 'next/image'
import Script from 'next/script'
import GalleryGrid from '@/components/GalleryGrid'
import { client } from '@/lib/sanity'
import { galleryQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Sahara Desert Photo Gallery | Desert Photography Morocco',
    description: 'Explore our Sahara Desert photo gallery: stunning images of Erg Chebbi dunes, Berber camps, camel treks, starlit nights, and Morocco desert landscapes.',
    url: '/gallery',
    keywords: [
      'Sahara Desert photos', 'Morocco desert gallery', 'Erg Chebbi photography',
      'desert landscape photos', 'Berber camp images', 'camel trek photos', 'Merzouga gallery',
    ],
  })
}

const staticPhotos = [
  { src: '/images/desert1.jpeg', alt: 'Golden Sahara dunes at sunrise' },
  { src: '/images/camels_farview.jpeg', alt: 'Camel caravan crossing the dunes' },
  { src: '/images/evening.jpeg', alt: 'Desert camp at evening' },
  { src: '/images/desert2.jpeg', alt: 'Rippled sand dunes, Erg Chebbi' },
  { src: '/images/morningsunset.jpeg', alt: 'Morning light over the Sahara' },
  { src: '/images/camels.jpeg', alt: 'Camels resting in the desert' },
  { src: '/images/desert3.jpeg', alt: 'Vast desert landscape' },
  { src: '/images/camp_in_desert.jpeg', alt: 'Traditional Berber camp in the dunes' },
  { src: '/images/desert4.jpeg', alt: 'Desert dunes at golden hour' },
  { src: '/images/camels2.jpeg', alt: 'Camel trek at dusk' },
  { src: '/images/image00002.jpeg', alt: 'Desert landscape' },
  { src: '/images/desert5.jpg', alt: 'Sweeping Saharan dunes' },
  { src: '/images/car_in_desert.jpeg', alt: 'Off-road vehicle in the desert' },
  { src: '/images/image00005.jpeg', alt: 'Desert scenery' },
  { src: '/images/desert6.jpg', alt: 'Desert at midday' },
  { src: '/images/image00007.jpeg', alt: 'Desert landscape' },
  { src: '/images/desert7.jpeg', alt: 'Sand patterns in the Sahara' },
  { src: '/images/image00008.jpeg', alt: 'Desert scenery' },
  { src: '/images/desert8.jpeg', alt: 'Dunes at sunset' },
  { src: '/images/image00011.jpeg', alt: 'Desert landscape' },
  { src: '/images/desert9.jpeg', alt: 'Desert horizon' },
  { src: '/images/image00016.jpeg', alt: 'Desert scenery' },
  { src: '/images/desert_midday.jpeg', alt: 'Sahara desert under midday sun' },
  { src: '/images/image00017.jpeg', alt: 'Desert landscape' },
  { src: '/images/image00019.jpeg', alt: 'Desert scenery' },
  { src: '/images/image00021.jpeg', alt: 'Desert landscape' },
  { src: '/images/image00023.jpeg', alt: 'Desert scenery' },
  { src: '/images/image00025.jpeg', alt: 'Desert landscape' },
  { src: '/images/image00027.jpeg', alt: 'Desert scenery' },
  { src: '/images/image00030.jpeg', alt: 'Desert landscape' },
]

function StaticGallery() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {staticPhotos.map((photo) => (
        <div key={photo.src} className="group relative aspect-square overflow-hidden rounded-lg shadow-md">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <p className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {photo.alt}
          </p>
        </div>
      ))}
    </div>
  )
}

async function getGalleryItems() {
  try {
    const items = await client.fetch(galleryQuery)
    return items || []
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return []
  }
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/desert_midday.jpeg" alt="Sahara Desert gallery" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">
            Through the Lens
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Desert Gallery
          </h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Golden dunes, starlit camps, and the faces of the Sahara, captured on tour
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-desert-500 mb-2">
              Our Photography
            </p>
            <p className="text-gray-900 text-sm max-w-xl mx-auto">
              Every image taken by guides and guests on real tours, no stock photography
            </p>
          </div>
          {items.length > 0 ? <GalleryGrid items={items} /> : <StaticGallery />}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src="/images/camels_farview.jpeg" alt="Camels in the Sahara Desert" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center text-white">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-4">
            Your Story Starts Here
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 max-w-2xl leading-tight">
            Be in the Next Photo
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10 max-w-xl">
            Join a tour and your own desert moments become part of our story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/tours" className="px-10 py-4 bg-desert-600 hover:bg-desert-500 text-white font-semibold rounded-lg shadow-lg smooth-transition hover:scale-105 transition-transform">
              View Tours
            </a>
            <a href="/contact" className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 smooth-transition backdrop-blur-sm">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
