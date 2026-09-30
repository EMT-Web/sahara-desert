'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let consent = null
    try { consent = localStorage.getItem('cookie-consent') } catch {}
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  const choose = (value) => {
    try { localStorage.setItem('cookie-consent', value) } catch {}
    setVisible(false)
  }

  if (!visible) return null

  // Compact card, bottom-left, so it never covers the WhatsApp button or the
  // mobile tour booking bar's buttons for long.
  return (
    <div role="dialog" aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-[45] animate-slide-up sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-sm">
      <div className="rounded-2xl border border-sand-200 bg-white p-5 shadow-lift">
        <p className="text-sm leading-relaxed text-ink-700">
          We use cookies to understand how our site is used and to improve it.{' '}
          <a href="/privacy" className="font-medium text-desert-700 underline underline-offset-2">Privacy policy</a>
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => choose('declined')} className="btn-outline flex-1 !min-h-[40px] !py-2">Decline</button>
          <button type="button" onClick={() => choose('accepted')} className="btn-dark flex-1 !min-h-[40px] !py-2">Accept</button>
        </div>
      </div>
    </div>
  )
}
