'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { WhatsAppIcon } from '@/components/Icon'
import { whatsappHref, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/site'

const CITY_HUBS = new Set(['marrakech', 'fes', 'casablanca', 'agadir', 'errachidia'])

// Compact floating WhatsApp link. On tour detail pages the mobile booking bar
// already carries WhatsApp, so the floating button is hidden below lg there.
export default function WhatsAppButton({ number }) {
  const pathname = usePathname() || ''
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname.startsWith('/studio')) return null
  const m = pathname.match(/^\/tours\/([^/]+)$/)
  const onTourDetail = m && !CITY_HUBS.has(m[1])

  return (
    <a
      href={whatsappHref(number, DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed bottom-5 right-4 z-40 items-center gap-2 rounded-full bg-[#1faa59] py-3 pl-3 pr-3 text-white shadow-lift transition-all duration-500 ease-out-soft hover:bg-[#178a48] sm:bottom-6 sm:right-6 sm:pr-4 ${
        onTourDetail ? 'hidden lg:flex' : 'flex'
      } ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  )
}
