'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import TourCard from '@/components/TourCard'

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Number of days from a free-text duration like "3 Days / 2 Nights".
function days(duration = '') {
  const m = String(duration).match(/(\d+)\s*day/i)
  return m ? parseInt(m[1], 10) : null
}

const LENGTHS = [
  { id: 'all', label: 'Any length' },
  { id: 'short', label: '2–3 days', test: (d) => d && d <= 3 },
  { id: 'mid', label: '4–7 days', test: (d) => d && d >= 4 && d <= 7 },
  { id: 'long', label: '8+ days', test: (d) => d && d >= 8 },
]

const price = (t) => t.priceDouble || t.price || 0

export default function FilterableTours({ tours }) {
  const [activeCity, setActiveCity] = useState('all')
  const [length, setLength] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const cities = useMemo(() => [...new Set(tours.map((t) => t.departureCity).filter(Boolean))].sort(), [tours])

  const filtered = useMemo(() => {
    let result = activeCity === 'all' ? tours : tours.filter((t) => t.departureCity === activeCity)
    const len = LENGTHS.find((l) => l.id === length)
    if (len?.test) result = result.filter((t) => len.test(days(t.duration)))
    // Tours without a price sort last either way.
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => (price(a) || Infinity) - (price(b) || Infinity))
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => price(b) - price(a))
    if (sortBy === 'length') result = [...result].sort((a, b) => (days(a.duration) || 99) - (days(b.duration) || 99))
    return result
  }, [tours, activeCity, length, sortBy])

  if (!tours.length) {
    return (
      <div className="card mx-auto max-w-2xl p-10 text-center">
        <h2 className="heading-md">Our tours are being updated</h2>
        <p className="mt-3 text-ink-600">Tell us your dates and wishes and we will send you a tailor-made itinerary.</p>
        <Link href="/contact" className="btn-primary mt-6">Plan my trip</Link>
      </div>
    )
  }

  const pill = (active) =>
    `min-h-[40px] whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'border-ink-900 bg-ink-900 text-white' : 'border-sand-300 bg-white text-ink-700 hover:border-ink-900/40'
    }`

  return (
    <>
      <div className="sticky top-16 z-20 -mx-4 mb-10 border-b border-sand-200 bg-sand-50/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-2xl lg:border lg:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Departure city">
            <button type="button" onClick={() => setActiveCity('all')} className={pill(activeCity === 'all')} aria-pressed={activeCity === 'all'}>
              All cities <span className="opacity-60">{tours.length}</span>
            </button>
            {cities.map((city) => (
              <button key={city} type="button" onClick={() => setActiveCity(city)} className={pill(activeCity === city)} aria-pressed={activeCity === city}>
                {capitalize(city)} <span className="opacity-60">{tours.filter((t) => t.departureCity === city).length}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <label className="sr-only" htmlFor="tour-length">Tour length</label>
            <select id="tour-length" value={length} onChange={(e) => setLength(e.target.value)} className="field !min-h-[40px] !rounded-full !py-2 text-sm">
              {LENGTHS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
            <label className="sr-only" htmlFor="tour-sort">Sort tours</label>
            <select id="tour-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="field !min-h-[40px] !rounded-full !py-2 text-sm">
              <option value="default">Featured</option>
              <option value="length">Shortest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-ink-600">No tours match these filters.</p>
          <button type="button" onClick={() => { setActiveCity('all'); setLength('all') }} className="link-arrow mt-3">Show all tours</button>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm text-ink-500" aria-live="polite">Showing {filtered.length} of {tours.length} tours</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tour, i) => <TourCard key={tour._id} tour={tour} priority={i < 3} />)}
          </div>
        </>
      )}
    </>
  )
}
