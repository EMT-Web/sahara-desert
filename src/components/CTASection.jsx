import Image from 'next/image'
import Link from 'next/link'
import Icon, { WhatsAppIcon } from '@/components/Icon'
import { whatsappHref, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/site'

// Closing call to action used at the bottom of most pages.
export default function CTASection({
  image = '/images/image00021.jpeg',
  imageAlt = 'Soft evening light over the Sahara dunes',
  eyebrow = 'Tailor-made, private, personal',
  title = 'Tell us about the journey you imagine',
  text = 'Share your dates, your pace and what moves you. We will design a private itinerary around you and reply with a clear price, usually within a few hours.',
  primary = { label: 'Plan Your Trip', href: '/contact' },
  secondary = { label: 'Browse Tours', href: '/tours' },
  whatsapp,
  showWhatsApp = true,
}) {
  return (
    <section className="relative overflow-hidden bg-night-900">
      <Image src={image} alt={imageAlt} fill sizes="100vw" quality={65} className="object-cover" />
      <div className="absolute inset-0 bg-night-900/55" />
      <div className="scrim-l absolute inset-0" />
      <div className="container-site relative py-24 md:py-32">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow-light">{eyebrow}</p>
          <h2 className="heading-lg mt-3 !text-white">{title}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">{text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {primary && (
              <Link href={primary.href} className="btn-primary">
                {primary.label} <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
            )}
            {showWhatsApp && (
              <a href={whatsappHref(whatsapp, DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            )}
            {secondary && (
              <Link href={secondary.href} className="btn-ghost-light">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
