import SectionTitle from '@/components/SectionTitle'
import GuideCard from '@/components/GuideCard'
import { client } from '@/lib/sanity'
import { guidesQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Our Guides | Sahara Desert Travel',
    description: 'Meet our experienced local guides who will lead you on an unforgettable journey through the Sahara Desert with expert knowledge and hospitality.',
    url: '/guides',
    keywords: ['Sahara Guides', 'Desert Tour Guides', 'Morocco Travel Guides', 'Local Experts'],
  })
}

async function getGuides() {
  try {
    const guides = await client.fetch(guidesQuery)
    console.log('👥 Guides fetched:', guides?.length || 0)
    if (guides && guides.length > 0) {
      console.log('📸 First guide image check:', {
        name: guides[0].name,
        hasProfileImage: !!guides[0].profileImage,
        profileImageType: typeof guides[0].profileImage,
        profileImageKeys: guides[0].profileImage ? Object.keys(guides[0].profileImage) : null,
      })
    }
    return guides || []
  } catch (error) {
    console.error('Error fetching guides:', error)
    return []
  }
}

export default async function GuidesPage() {
  const guides = await getGuides()

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Meet Our Expert Guides"
          subtitle="Our experienced local guides bring the Sahara to life with their deep knowledge, passion, and warm hospitality"
        />

        {guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {guides.map((guide) => (
              <GuideCard key={guide._id} guide={guide} />
            ))}
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
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Guide Profiles Coming Soon
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team of expert local guides are passionate about sharing the wonders of the Sahara. Born and raised in desert communities, they bring authentic knowledge of the landscape, culture, and traditions. Check back soon to meet our incredible team!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
