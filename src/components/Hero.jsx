import Image from 'next/image'
import Link from 'next/link'
import Icon, { WhatsAppIcon, Stars } from '@/components/Icon'
import { whatsappHref, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/site'

// Homepage hero. Server component, one priority image (no carousel) for the
// fastest possible LCP. Copy animates in with CSS only.
export default function Hero({ title, subtitle, whatsapp }) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-night-900 md:min-h-[640px] lg:min-h-[100svh]">
      <Image
        src="/images/image00015.jpeg"
        alt="Berber guide with camels resting on the golden dunes of Erg Chebbi, Merzouga"
        fill
        priority
        sizes="100vw"
        quality={72}
        className="hero-zoom object-cover object-[62%_center] md:object-center"
      />
      <div className="scrim-b absolute inset-0" />
      <div className="scrim-l absolute inset-0 hidden md:block" />

      <div className="container-site relative pb-10 pt-32 md:pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow-light fade-up flex items-center gap-2">
            <Icon name="pin" className="h-3.5 w-3.5" strokeWidth={2} /> Sahara Desert · Morocco
          </p>
          <h1 className="heading-xl fade-up mt-4 !text-white text-shadow" style={{ animationDelay: '80ms' }}>
            {title}
          </h1>
          <p className="fade-up mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg" style={{ animationDelay: '160ms' }}>
            {subtitle}
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
            <Link href="/tours" className="btn-primary">
              Explore Morocco Tours <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/contact" className="btn-ghost-light">Plan Your Trip</Link>
          </div>
          <a
            href={whatsappHref(whatsapp, DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="fade-up mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
            style={{ animationDelay: '300ms' }}
          >
            <WhatsAppIcon className="h-4 w-4 text-[#4fd98a]" /> Or message us on WhatsApp
          </a>
        </div>

        {/* Trust strip */}
        <ul className="fade-up mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/20 pt-6 text-xs text-white/85 sm:text-sm md:mt-14 md:flex md:flex-wrap md:gap-x-10" style={{ animationDelay: '380ms' }}>
          <li className="flex items-center gap-2"><Stars count={5} className="h-3.5 w-3.5" /> 5.0 on Tripadvisor</li>
          <li className="flex items-center gap-2"><Icon name="users" className="h-4 w-4" /> Private &amp; small-group</li>
          <li className="flex items-center gap-2"><Icon name="compass" className="h-4 w-4" /> Local Berber guides</li>
          <li className="flex items-center gap-2"><Icon name="shield" className="h-4 w-4" /> Free cancellation 14 days</li>
        </ul>
      </div>
    </section>
  )
}
