import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import SectionTitle from '@/components/SectionTitle'
import GuideCard from '@/components/GuideCard'
import { client, urlFor } from '@/lib/sanity'
import { aboutQuery, guidesQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'About Us: Berber Desert Guides Since 2014 | Sahara Desert Travel',
    description: 'Meet the people behind Sahara Desert Travel: native Berber guides born in the Sahara with over a decade of experience. Learn about our story, values, and commitment to authentic, sustainable desert tourism.',
    url: '/about',
    keywords: ['About Sahara Desert Travel', 'Berber desert guides', 'Morocco travel company', 'sustainable desert tourism', 'authentic Morocco experience', 'local guides Sahara', 'Mustapha Oufota'],
  })
}

async function getAboutData() {
  try {
    const [about, guides] = await Promise.all([
      client.fetch(aboutQuery),
      client.fetch(guidesQuery),
    ])
    return { about, guides: guides || [] }
  } catch (error) {
    console.error('Error fetching about data:', error)
    return { about: null, guides: [] }
  }
}

export default async function AboutPage() {
  const { about, guides } = await getAboutData()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page Hero */}
      <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
        <Image src="/images/gathering_team.JPG" alt="Sahara Desert team gathering" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">Our Company</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            {about?.title || 'Our Story'}
          </h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            {about?.subtitle || 'Born from a passion for the Sahara and a commitment to authentic experiences'}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-desert-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '10+', label: 'Years in the Desert' },
              { value: '50+', label: 'Expert Guides' },
              { value: '40+', label: 'Countries Welcomed' },
              { value: '100%', label: 'Berber-Led' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-2xl md:text-3xl font-serif font-bold text-desert-200">{stat.value}</span>
                <span className="text-xs md:text-sm text-white/70 mt-1 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="How It Began"
              subtitle="A journey that started with love for the land and a desire to share it with the world"
            />

            {about?.foundersStory && (
              <div className="mt-10 text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {about.foundersStory}
              </div>
            )}

            {about?.foundersImages && about.foundersImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
                {about.foundersImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={urlFor(image).width(800).height(600).url()}
                      alt="Sahara Desert Travel team"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
                {[
                  { src: '/images/gathering_team.JPG', alt: 'The Sahara Desert Travel team in the field' },
                  { src: '/images/people.JPEG', alt: 'Our guides and guests in the desert' },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="bg-sand-50 py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Why We're Different"
            subtitle="Our team brings generations of Saharan wisdom to every journey"
          />

          {about?.localExpertise && (
            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto -mt-4 mb-14 leading-relaxed">
              {about.localExpertise}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
                title: 'Born in the Desert',
                body: 'Our guides grew up in Saharan communities, learning traditions passed down through generations. No scripts, just real stories.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                ),
                title: 'Cultural Guardians',
                body: 'We preserve and share Berber traditions, music, and storytelling, living culture, not a performance for tourists.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Low-Impact Travel',
                body: 'Small groups only. We put 10% of profits back into desert communities and follow leave-no-trace principles on every journey.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-sand-100"
              >
                <div className="w-12 h-12 bg-desert-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-desert-100 transition-colors">
                  <svg className="w-6 h-6 text-desert-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-900 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Guides */}
      {guides.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Meet Our Expert Guides"
              subtitle="Local experts who bring the Sahara to life"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {guides.slice(0, 6).map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href="/guides"
                className="inline-block px-8 py-4 border-2 border-desert-600 text-desert-600 hover:bg-desert-600 hover:text-white font-semibold rounded-lg smooth-transition"
              >
                Meet All Our Guides
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Sustainability Commitment */}
      <section className="bg-gradient-to-r from-desert-700 to-desert-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-desert-300 text-xs font-semibold tracking-widest uppercase mb-4 block">Our Promise</span>
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Protecting the Sahara for Future Generations
            </h2>
            <p className="text-xl text-white/85 leading-relaxed mb-10">
              {about?.sustainabilityCommitment ||
                'We follow leave-no-trace principles, support local communities, and preserve the cultural heritage of the region. Every journey with us contributes to sustainable tourism that benefits both travellers and the desert communities we call home.'}
            </p>
            <a
              href="/sustainability"
              className="inline-block px-8 py-4 bg-white text-desert-700 font-semibold rounded-lg shadow-lg hover:bg-sand-100 smooth-transition"
            >
              Learn About Our Initiatives
            </a>
          </div>
        </div>
      </section>

      {/* From Our Blog */}
      <section className="bg-white py-16 border-t border-sand-200">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">From Our Blog</h2>
            <p className="text-gray-500 text-sm">Stories and insights from a decade in the desert</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { slug: 'berber-culture-people-of-the-sahara', category: 'Culture', title: 'Berber Culture: The People of the Sahara', excerpt: 'The Amazigh people have called the Sahara home for millennia. Meet the communities who share the desert with our travellers.' },
              { slug: 'sustainable-travel-sahara', category: 'Sustainability', title: 'How to Travel the Sahara Sustainably', excerpt: 'Responsible travel in the desert means protecting fragile ecosystems and investing in the communities that call it home.' },
              { slug: '10-things-to-know-sahara-desert', category: 'Travel Tips', title: '10 Things to Know Before Your First Sahara Trip', excerpt: 'The Sahara is unlike any destination on earth. Here is what every first-time visitor needs to know before stepping onto the sand.' },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-sand-50 rounded-xl p-6 border border-sand-200 hover:shadow-md transition-shadow">
                <span className="text-xs font-semibold text-desert-600 uppercase tracking-wide">{post.category}</span>
                <h3 className="font-serif font-bold text-gray-900 mt-2 mb-2 text-base leading-snug group-hover:text-desert-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-900 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <span className="text-desert-600 text-sm font-medium mt-3 inline-block group-hover:underline">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
