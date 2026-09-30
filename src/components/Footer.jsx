import Link from 'next/link'
import Image from 'next/image'
import NewsletterFooterRow from '@/components/NewsletterFooterRow'
import Icon, { WhatsAppIcon } from '@/components/Icon'
import { TRIPADVISOR_URL } from '@/data/testimonials'
import { DEPARTURE_CITIES, whatsappHref, FALLBACK_WHATSAPP } from '@/lib/site'

const COLUMNS = [
  {
    heading: 'Tours',
    links: [
      { title: 'All Tours', url: '/tours' },
      ...DEPARTURE_CITIES.map((c) => ({ title: `Tours from ${c.name}`, url: `/tours/${c.slug}` })),
    ],
  },
  {
    heading: 'Sahara & Culture',
    links: [
      { title: 'Merzouga & Erg Chebbi', url: '/merzouga-erg-chebbi' },
      { title: 'Luxury Desert Camps', url: '/luxury-desert-camps' },
      { title: 'Honeymoon Tours', url: '/honeymoon-morocco-tours' },
      { title: 'Family Tours', url: '/family-morocco-tours' },
      { title: 'Berber Culture', url: '/culture' },
      { title: 'Music of the Sahara', url: '/music' },
      { title: 'Gallery', url: '/gallery' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { title: 'About Us', url: '/about' },
      { title: 'Our Guides', url: '/guides' },
      { title: 'Responsible Travel', url: '/sustainability' },
      { title: 'Travel Blog', url: '/blog' },
      { title: 'Stories', url: '/stories' },
      { title: 'Contact', url: '/contact' },
    ],
  },
]

export default function Footer({ contactInfo }) {
  const year = new Date().getFullYear()
  const email = contactInfo?.email || 'info@visitsaharadesert.com'
  const whatsapp = contactInfo?.whatsapp || `+${FALLBACK_WHATSAPP}`

  return (
    <footer className="relative bg-night-900 text-sand-200">
      <div className="container-site pb-12 pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Image src="/logo.png" alt="Visit Sahara Desert" width={96} height={95} className="h-14 w-auto rounded-md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-300">
              Locally owned tour company running private and small-group Sahara Desert and Morocco tours, guided by Berber people who grew up among the dunes.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-sand-200 transition-colors hover:text-white">
                  <Icon name="mail" className="h-4 w-4 text-desert-300" /> {email}
                </a>
              </li>
              <li>
                <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sand-200 transition-colors hover:text-white">
                  <WhatsAppIcon className="h-4 w-4 text-desert-300" /> {whatsapp}
                </a>
              </li>
              {contactInfo?.phone && (
                <li>
                  <a href={`tel:${contactInfo.phone}`} className="inline-flex items-center gap-3 text-sand-200 transition-colors hover:text-white">
                    <Icon name="phone" className="h-4 w-4 text-desert-300" /> {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo?.address && (
                <li className="flex items-start gap-3 text-sand-300">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-desert-300" /> {contactInfo.address}
                </li>
              )}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] !text-white">{col.heading}</h3>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.url}>
                    <Link href={l.url} className="text-sm text-sand-300 transition-colors hover:text-white">
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <NewsletterFooterRow />
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 text-xs text-sand-400 md:flex-row md:items-center">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>&copy; {year} Visit Sahara Desert. All rights reserved.</span>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
          </p>
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sand-200 transition-colors hover:border-white/40 hover:text-white"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#00AA6C]" />
              ))}
            </span>
            <span className="font-semibold">Tripadvisor</span>
            <span className="text-sand-400">Rated Excellent</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
