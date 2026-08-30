'use client'

import { useState } from 'react'

export default function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // Simulate a brief delay then show success
    // Wire up to a real email service when ready
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="bg-desert-700 py-14">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <span className="text-desert-300 text-xs font-semibold tracking-widest uppercase mb-3 block">
          Stay Inspired
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
          Desert Stories in Your Inbox
        </h2>
        <p className="text-white/70 text-sm mb-8">
          Trip inspiration, seasonal deals, and tales from the dunes. No spam, ever.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-white bg-white/10 rounded-xl px-6 py-4">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">You&apos;re on the list! Welcome to the caravan.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-desert-300 focus:bg-white/15 transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-7 py-3 bg-white text-desert-700 font-semibold text-sm rounded-lg hover:bg-sand-100 transition-colors disabled:opacity-60 flex-shrink-0"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
