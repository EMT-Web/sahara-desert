import Image from 'next/image'
import Script from 'next/script'
import SectionTitle from '@/components/SectionTitle'
import ContactForm from '@/components/ContactForm'
import { client } from '@/lib/sanity'
import { contactQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Contact Us | Sahara Desert Travel',
    description: 'Get in touch with us to plan your Sahara Desert adventure. We are here to answer your questions and help create your perfect desert experience.',
    url: '/contact',
    keywords: ['Contact Sahara Travel', 'Book Desert Tour', 'Morocco Travel Booking'],
  })
}

async function getContactInfo() {
  try {
    const contact = await client.fetch(contactQuery)
    return contact
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}

export default async function ContactPage() {
  const contact = await getContactInfo()

  const localBusinessSchema = generateLocalBusinessSchema(contact)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ])

  const whatsappNumber = contact?.whatsapp || ''
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}` : '#'

  return (
    <>
      <Script id="local-business-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page Hero */}
      <section className="relative h-72 md:h-[380px] flex items-end overflow-hidden">
        <Image src="/images/camel_caravan_sunset.jpeg" alt="Camel caravan crossing the Sahara Desert dunes at sunset" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-desert-300 mb-3">We&apos;d Love to Hear From You</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Get in Touch</h1>
          <p className="text-white/75 mt-3 text-lg max-w-2xl">
            Ready to start your Sahara adventure? We&apos;ll help you plan the perfect desert experience
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Contact Form */}
              <div className="bg-sand-50 rounded-2xl p-8 md:p-10 border border-sand-200">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Booking & Inquiry Form</h2>
                <p className="text-gray-500 text-sm mb-8">We typically respond within a few hours.</p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-sand-50 rounded-2xl p-8 md:p-10 border border-sand-200">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Contact Information</h2>

                  <div className="space-y-5">
                    {contact?.email && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-11 h-11 bg-desert-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-desert-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Email</p>
                          <a href={`mailto:${contact.email}`} className="text-desert-600 hover:text-desert-700 font-medium smooth-transition">
                            {contact.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {contact?.phone && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-11 h-11 bg-desert-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-desert-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Phone</p>
                          <a href={`tel:${contact.phone}`} className="text-desert-600 hover:text-desert-700 font-medium smooth-transition">
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {contact?.whatsapp && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">WhatsApp</p>
                          <p className="text-gray-700 font-medium mb-2">{contact.whatsapp}</p>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg smooth-transition"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat on WhatsApp
                          </a>
                        </div>
                      </div>
                    )}

                    {contact?.address && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-11 h-11 bg-desert-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-desert-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Address</p>
                          <p className="text-gray-700">{contact.address}</p>
                        </div>
                      </div>
                    )}

                    {!contact && (
                      <p className="text-gray-500 text-sm">
                        Contact information will be available soon. Please use the form to reach us.
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick connect */}
                <div className="bg-gradient-to-br from-desert-700 to-desert-800 rounded-2xl p-8 md:p-10 text-white">
                  <h3 className="text-xl font-serif font-bold mb-3">Fastest Way to Reach Us</h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-6">
                    WhatsApp is the quickest way to connect. We respond in minutes during daylight hours, and can share tour availability, pricing, and photos directly in chat.
                  </p>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-6 py-3.5 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl smooth-transition mb-6"
                  >
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Start WhatsApp Conversation
                  </a>

                  <ul className="space-y-2.5">
                    {['Quick response times', 'Personalised tour recommendations', 'Pricing & availability', 'Help with logistics'].map((item) => (
                      <li key={item} className="flex items-center text-sm text-white/80">
                        <svg className="w-4 h-4 mr-2.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Google Maps */}
                {contact?.address && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                  <div className="bg-sand-50 rounded-2xl p-8 border border-sand-200">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-5">Find Us</h3>
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(contact.address)}`}
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
