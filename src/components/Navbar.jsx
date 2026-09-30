'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Icon, { WhatsAppIcon } from '@/components/Icon'
import { NAV_GROUPS, whatsappHref, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/site'

// Routes whose first screen is light (no dark hero image), so the header
// starts solid instead of transparent.
function startsSolid(pathname = '') {
  return /^\/stories\/[^/]+/.test(pathname) || pathname.startsWith('/studio')
}

// Merge any CMS-managed nav links (siteSettings.navigation) that the fixed
// menu structure doesn't already cover into the About group, so links added
// in Sanity Studio still appear.
function buildGroups(cmsNav) {
  const known = new Set(['/'])
  NAV_GROUPS.forEach((g) => g.columns.forEach((c) => c.links.forEach((l) => known.add(l.url))))
  const extra = (cmsNav || []).filter((item) => item?.url && !known.has(item.url))
  if (!extra.length) return NAV_GROUPS
  return NAV_GROUPS.map((g) =>
    g.title === 'About'
      ? { ...g, columns: [{ ...g.columns[0], links: [...g.columns[0].links, ...extra.map((e) => ({ title: e.title, url: e.url }))] }] }
      : g
  )
}

export default function Navbar({ navigation, whatsapp }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroup, setMobileGroup] = useState(null)
  const navRef = useRef(null)
  const groups = buildGroups(navigation)
  const solid = scrolled || startsSolid(pathname) || mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation.
  useEffect(() => {
    setOpenGroup(null)
    setMobileOpen(false)
  }, [pathname])

  // Close desktop dropdowns on outside click / Escape.
  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenGroup(null)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenGroup(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (g) =>
    g.columns.some((c) => c.links.some((l) => l.url !== '/contact' && (pathname === l.url || pathname.startsWith(l.url + '/'))))

  const waHref = whatsappHref(whatsapp, DEFAULT_WHATSAPP_MESSAGE)

  return (
    <>
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid
          ? 'bg-white/95 shadow-[0_1px_0_rgba(28,23,20,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-white/85'
          : 'bg-gradient-to-b from-black/55 via-black/20 to-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-900">
        Skip to content
      </a>
      <nav aria-label="Main" className="container-site">
        <div className={`flex items-center justify-between gap-4 transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-[72px] lg:h-20'}`}>
          <Link href="/" className="flex shrink-0 items-center" aria-label="Visit Sahara Desert, home">
            <Image
              src="/logo.png"
              alt="Visit Sahara Desert"
              width={96}
              height={95}
              priority
              className={`w-auto rounded-md transition-[height] duration-500 ${scrolled ? 'h-10' : 'h-11 lg:h-12'}`}
            />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-1 lg:flex">
            {groups.map((g) => {
              const open = openGroup === g.title
              const mega = g.columns.length > 1
              return (
                <li key={g.title} className="group relative">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenGroup(open ? null : g.title)}
                    className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
                      solid ? 'text-ink-800 hover:text-desert-700' : 'text-white text-shadow hover:text-desert-100'
                    }`}
                  >
                    {g.title}
                    <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : 'group-hover:rotate-180'}`} strokeWidth={2} />
                    {isActive(g) && (
                      <span className={`absolute inset-x-3.5 -bottom-0.5 h-px ${solid ? 'bg-desert-600' : 'bg-white/80'}`} aria-hidden="true" />
                    )}
                  </button>

                  <div
                    className={`absolute top-full pt-3 transition-all duration-300 ease-out-soft ${
                      mega ? 'left-1/2 -translate-x-1/2' : 'left-0'
                    } ${
                      open
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible translate-y-1 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'
                    }`}
                  >
                    <div className={`overflow-hidden rounded-2xl border border-sand-200/80 bg-white shadow-lift ${mega ? 'flex w-[46rem]' : 'w-64'}`}>
                      <div className={`${mega ? 'grid flex-1 grid-cols-2 gap-6 p-7' : 'p-3'}`}>
                        {g.columns.map((col) => (
                          <div key={col.heading}>
                            {mega && <p className="eyebrow mb-3">{col.heading}</p>}
                            <ul className={mega ? 'space-y-0.5' : ''}>
                              {col.links.map((l) => (
                                <li key={l.url + l.title}>
                                  <Link
                                    href={l.url}
                                    className={`block rounded-lg text-[0.92rem] text-ink-700 transition-colors hover:bg-sand-50 hover:text-desert-700 ${mega ? 'px-2 py-1.5 -mx-2' : 'px-3 py-2.5'}`}
                                  >
                                    {l.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {g.feature && (
                        <Link href={g.feature.url} className="group/feature relative block w-56 shrink-0 overflow-hidden">
                          <Image src={g.feature.image} alt="" fill sizes="224px" className="object-cover transition-transform duration-700 group-hover/feature:scale-105" />
                          <span className="scrim-b absolute inset-0" />
                          <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                            <span className="block font-serif text-lg leading-tight">{g.feature.title}</span>
                            <span className="mt-1 block text-xs text-white/80">{g.feature.text}</span>
                            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold">
                              Start planning <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2} />
                            </span>
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className={`hidden h-10 w-10 items-center justify-center rounded-full transition-colors sm:flex ${
                solid ? 'text-[#1faa59] hover:bg-sand-100' : 'text-white hover:bg-white/15'
              }`}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Link
              href="/contact"
              className={`hidden sm:inline-flex ${solid ? 'btn-primary' : 'btn-light'} !min-h-[40px] !px-5 !py-2`}
            >
              Plan Your Trip
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                solid ? 'text-ink-900 hover:bg-sand-100' : 'text-white hover:bg-white/15'
              }`}
            >
              <Icon name={mobileOpen ? 'x' : 'menu'} className="h-6 w-6" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </nav>

    </header>

      {/* Mobile menu. Always in the DOM so crawlers see every link. Rendered
          outside <header>: the header's backdrop-filter would otherwise become
          the containing block for this fixed panel and collapse it. */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 z-[49] ${scrolled ? 'top-16' : 'top-[72px]'} overflow-y-auto bg-white transition-[opacity,transform,visibility] duration-300 ease-out-soft lg:hidden ${
          mobileOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="container-site flex min-h-full flex-col pb-safe pt-2">
          <ul className="divide-y divide-sand-200">
            {groups.map((g) => {
              const open = mobileGroup === g.title
              return (
                <li key={g.title}>
                  <button
                    type="button"
                    onClick={() => setMobileGroup(open ? null : g.title)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between py-4 text-left font-serif text-xl text-ink-900"
                  >
                    {g.title}
                    <Icon name="chevronDown" className={`h-5 w-5 text-ink-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out-soft ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      {g.columns.map((col) => (
                        <div key={col.heading} className="pb-3">
                          {g.columns.length > 1 && <p className="eyebrow mb-1 mt-1">{col.heading}</p>}
                          <ul>
                            {col.links.map((l) => (
                              <li key={l.url + l.title}>
                                <Link href={l.url} tabIndex={open ? 0 : -1} className="block py-2.5 text-[0.98rem] text-ink-700 active:text-desert-700">
                                  {l.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mt-auto grid gap-3 border-t border-sand-200 pb-4 pt-6">
            <Link href="/contact" className="btn-primary w-full">Plan Your Trip</Link>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <p className="pt-1 text-center text-xs text-ink-500">We usually reply within a few hours.</p>
          </div>
        </div>
      </div>
    </>
  )
}
