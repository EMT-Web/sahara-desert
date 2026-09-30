'use client'

import { useState } from 'react'
import Icon from '@/components/Icon'

// Posts to /api/newsletter, which emails the signup to the team via Resend.
// Previously this faked success with a timeout and discarded the address.
export default function NewsletterFooterRow() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
      <div>
        <h3 className="font-serif text-xl !text-white">Desert notes, a few times a year</h3>
        <p className="mt-1 text-sm text-sand-400">Seasonal travel tips and new journeys. No spam, unsubscribe any time.</p>
      </div>
      {status === 'success' ? (
        <p className="flex items-center gap-2 text-sm text-sand-200" role="status">
          <Icon name="check" className="h-4 w-4 text-green-400" strokeWidth={2.5} /> Thank you, you&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row md:max-w-md">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            autoComplete="email"
            required
            className="min-h-[48px] min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-5 text-base text-white placeholder:text-sand-400 transition-colors focus:border-desert-300 focus:outline-none"
          />
          <input type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" aria-hidden="true" />
          <button type="submit" disabled={status === 'loading'} className="btn-light shrink-0">
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-300 sm:sr-only" role="alert">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  )
}
