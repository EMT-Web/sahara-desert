'use client'

import { useState } from 'react'

export default function NewsletterFooterRow() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
  }

  return (
    <div className="border-b border-white/10 pb-8 mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">

        <div className="flex-shrink-0">
          <p className="text-desert-300 text-xs font-semibold tracking-widest uppercase mb-1">
            Stay Inspired
          </p>
          <h3 className="text-white font-serif font-bold text-xl leading-tight">
            Desert Stories in Your Inbox
          </h3>
          <p className="text-white/50 text-xs mt-1">
            Trip inspiration, seasonal deals, no spam, ever.
          </p>
        </div>

        <div className="flex-1 md:flex md:justify-end">
          {status === 'success' ? (
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You&apos;re on the list! Welcome to the caravan.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-desert-300 transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 bg-desert-500 hover:bg-desert-400 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-60 flex-shrink-0"
              >
                {status === 'loading' ? '…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
