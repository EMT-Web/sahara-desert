'use client'

import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'

const INTERESTS = ['Sahara & camel trek', 'Luxury desert camp', 'Kasbahs & mountains', 'Imperial cities', 'Food & culture', 'Photography', 'Hiking', 'Family-friendly']
const CITIES = ['Marrakech', 'Fes', 'Casablanca', 'Agadir', 'Errachidia', 'Tangier', 'Rabat', 'Not sure yet']

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  arrivalDate: '',
  departureDate: '',
  flexibleDates: false,
  adults: '2',
  children: '0',
  startCity: '',
  endCity: '',
  travelStyle: 'Private',
  accommodation: 'Comfort',
  interests: [],
  tourInterest: '',
  message: '',
  preferredContact: 'Email',
  company: '', // honeypot
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[40px] rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? 'border-desert-600 bg-desert-600 text-white' : 'border-sand-300 bg-white text-ink-700 hover:border-desert-400'
      }`}
    >
      {children}
    </button>
  )
}

function Segmented({ name, value, options, onChange }) {
  return (
    <div role="radiogroup" aria-label={name} className="grid grid-flow-col auto-cols-fr gap-1 rounded-xl bg-sand-100 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            value === o.value ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          {o.label}
          {o.note && <span className="block text-[0.7rem] font-normal text-ink-500">{o.note}</span>}
        </button>
      ))}
    </div>
  )
}

export default function ContactForm() {
  const [data, setData] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  // Prefill the tour of interest from ?tour= (set by "Request this tour" buttons).
  useEffect(() => {
    try {
      const tour = new URLSearchParams(window.location.search).get('tour')
      if (tour) setData((d) => ({ ...d, tourInterest: tour.slice(0, 200) }))
    } catch {}
  }, [])

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e }))
  const toggleInterest = (i) => setData((d) => ({ ...d, interests: d.interests.includes(i) ? d.interests.filter((x) => x !== i) : [...d.interests, i] }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setData(EMPTY)
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { form: 'trip_planner' })
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
          <Icon name="check" className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <h3 className="mt-4 font-serif text-2xl">Thank you, your request is on its way</h3>
        <p className="mx-auto mt-2 max-w-md text-ink-600">
          A member of our team will reply personally, usually within a few hours, with ideas and a clear price. Please check your spam folder if you don&apos;t see our email.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-6">Send another request</button>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate={false}>
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={data.company} onChange={set('company')} className="hidden" aria-hidden="true" />

      <fieldset className="space-y-5">
        <legend className="mb-5 flex items-center gap-3 font-serif text-xl text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 font-sans text-sm text-white">1</span> Your trip
        </legend>

        {data.tourInterest && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-desert-200 bg-desert-50 p-4 text-sm">
            <p><span className="text-ink-600">Tour of interest: </span><span className="font-semibold text-ink-900">{data.tourInterest}</span></p>
            <button type="button" onClick={() => setData((d) => ({ ...d, tourInterest: '' }))} aria-label="Remove tour" className="text-ink-500 hover:text-ink-900"><Icon name="x" className="h-4 w-4" /></button>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="arrivalDate" className="field-label">Arrival date</label>
            <input type="date" id="arrivalDate" min={today} value={data.arrivalDate} onChange={set('arrivalDate')} className="field" />
          </div>
          <div>
            <label htmlFor="departureDate" className="field-label">Departure date</label>
            <input type="date" id="departureDate" min={data.arrivalDate || today} value={data.departureDate} onChange={set('departureDate')} className="field" />
          </div>
        </div>
        <label className="flex items-center gap-3 text-sm text-ink-700">
          <input type="checkbox" checked={data.flexibleDates} onChange={set('flexibleDates')} className="h-5 w-5 rounded border-sand-300 accent-desert-600" />
          My dates are flexible
        </label>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="adults" className="field-label">Adults</label>
            <select id="adults" value={data.adults} onChange={set('adults')} className="field">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="children" className="field-label">Children</label>
            <select id="children" value={data.children} onChange={set('children')} className="field">
              {['0', '1', '2', '3', '4', '5+'].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="startCity" className="field-label">Starting city</label>
            <select id="startCity" value={data.startCity} onChange={set('startCity')} className="field">
              <option value="">Select…</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="endCity" className="field-label">Ending city</label>
            <select id="endCity" value={data.endCity} onChange={set('endCity')} className="field">
              <option value="">Select…</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <p className="field-label">Travel style</p>
          <Segmented
            name="Travel style"
            value={data.travelStyle}
            onChange={set('travelStyle')}
            options={[{ value: 'Private', label: 'Private', note: 'Just your group' }, { value: 'Shared', label: 'Shared', note: 'Small group' }, { value: 'Not sure', label: 'Not sure' }]}
          />
        </div>

        <div>
          <p className="field-label">Accommodation</p>
          <Segmented
            name="Accommodation"
            value={data.accommodation}
            onChange={set('accommodation')}
            options={[{ value: 'Standard', label: 'Standard' }, { value: 'Comfort', label: 'Comfort' }, { value: 'Luxury', label: 'Luxury' }]}
          />
        </div>

        <div>
          <p className="field-label">Interests <span className="font-normal text-ink-500">(choose any)</span></p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => <Chip key={i} active={data.interests.includes(i)} onClick={() => toggleInterest(i)}>{i}</Chip>)}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="field-label">Anything else? <span className="font-normal text-ink-500">(optional)</span></label>
          <textarea id="message" rows={4} value={data.message} onChange={set('message')} className="field" placeholder="Special occasions, dietary needs, places you'd love to see, flight times…" />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-5 flex items-center gap-3 font-serif text-xl text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 font-sans text-sm text-white">2</span> Your details
        </legend>
        <div>
          <label htmlFor="name" className="field-label">Full name *</label>
          <input type="text" id="name" required autoComplete="name" value={data.name} onChange={set('name')} className="field" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="field-label">Email *</label>
            <input type="email" id="email" required autoComplete="email" inputMode="email" value={data.email} onChange={set('email')} className="field" />
          </div>
          <div>
            <label htmlFor="phone" className="field-label">Phone / WhatsApp <span className="font-normal text-ink-500">(optional)</span></label>
            <input type="tel" id="phone" autoComplete="tel" inputMode="tel" value={data.phone} onChange={set('phone')} className="field" placeholder="+1 555 123 4567" />
          </div>
        </div>
        <div>
          <p className="field-label">Preferred way to reply</p>
          <Segmented name="Preferred contact" value={data.preferredContact} onChange={set('preferredContact')} options={[{ value: 'Email', label: 'Email' }, { value: 'WhatsApp', label: 'WhatsApp' }]} />
        </div>
      </fieldset>

      {status === 'error' && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          Sorry, something went wrong sending your request. Please try again, or contact us directly by email or WhatsApp.
        </p>
      )}

      <div>
        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full !py-4 text-base">
          {status === 'sending' ? 'Sending…' : 'Send My Trip Request'}
          {status !== 'sending' && <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />}
        </button>
        <p className="mt-3 text-center text-xs text-ink-500">Free and no obligation. We never share your details.</p>
      </div>
    </form>
  )
}
