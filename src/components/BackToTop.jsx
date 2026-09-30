'use client'

import { useState, useEffect } from 'react'
import Icon from '@/components/Icon'

// Desktop only: on phones the native gesture (tap status bar) does this job,
// and a second floating button would crowd the WhatsApp button.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-[5.5rem] right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-sand-200 bg-white/95 text-ink-800 shadow-soft backdrop-blur transition-all duration-500 ease-out-soft hover:text-desert-700 lg:flex ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <Icon name="arrowUp" className="h-5 w-5" strokeWidth={2} />
    </button>
  )
}
