import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'
import Icon, { WhatsAppIcon } from '@/components/Icon'
import { client } from '@/lib/sanity'
import { contactQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { whatsappHref, DEFAULT_WHATSAPP_MESSAGE, FALLBACK_WHATSAPP } from '@/lib/site'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Contact Us: Plan Your Morocco Desert Tour',
    description: 'Get in touch with us to plan your Sahara Desert adventure. We are here to answer your questions and help create your perfect desert experience.',
    url: '/contact',
    keywords: ['Contact Sahara Travel', 'Book Desert Tour', 'Morocco Travel Booking'],
  })
}

async function getContactInfo() {
  try {
    return await client.fetch(contactQuery)
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

  // Previously fell back to href="#" when the CMS had no number.
  const whatsapp = contact?.whatsapp || `+${FALLBACK_WHATSAPP}`
  const email = contact?.email || 'info@visitsaharadesert.com'

  return (
    <>
      <script id="local-business-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        image="/images/desert9.jpeg"
        imageAlt="Desert camp lounge set on the dunes at sunset"
        eyebrow="Plan your trip"
        title="Tell us about your Morocco journey"
        subtitle="Share a few details and we will design a private itinerary around you, with a clear price. It is free and there is no obligation."
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Contact' }]}
        size="sm"
      />

      <section className="section !pt-12 md:!pt-16">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
          <div className="card p-6 sm:p-8 md:p-10">
            <h2 className="heading-md">Your trip request</h2>
            <p className="mt-2 text-ink-600">Only your name and email are required. The more you tell us, the better your first proposal will be.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-night-900 p-7 text-white">
              <h2 className="font-serif text-2xl !text-white">Prefer to chat?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                WhatsApp is the fastest way to reach us. We can share availability, prices and photos directly in chat.
              </p>
              <a href={whatsappHref(whatsapp, DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6 w-full">
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-white/60">{whatsapp}</p>
            </div>

            <div className="card p-7">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Contact details</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href={`mailto:${email}`} className="flex items-center gap-3 text-ink-800 hover:text-desert-700">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-desert-700"><Icon name="mail" className="h-5 w-5" /></span>
                    {email}
                  </a>
                </li>
                {contact?.phone && (
                  <li>
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-ink-800 hover:text-desert-700">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-desert-700"><Icon name="phone" className="h-5 w-5" /></span>
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact?.address && (
                  <li className="flex items-start gap-3 text-ink-700">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-100 text-desert-700"><Icon name="pin" className="h-5 w-5" /></span>
                    <span className="pt-2.5">{contact.address}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="card p-7">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">What happens next</h2>
              <ol className="mt-5 space-y-4 text-sm text-ink-700">
                {[
                  'We reply personally, usually within a few hours.',
                  'You receive a day-by-day itinerary and a clear price.',
                  'We adjust it together until it feels right.',
                  'We confirm your booking in writing.',
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-desert-100 text-xs font-semibold text-desert-800">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>

            {contact?.address && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
              <div className="card overflow-hidden">
                <iframe
                  title="Map showing our location"
                  className="aspect-video w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(contact.address)}`}
                  allowFullScreen
                />
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}
