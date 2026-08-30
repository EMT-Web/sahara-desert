'use client'

import { useState, useMemo } from 'react'
import TourCard from '@/components/TourCard'

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function FilterableTours({ tours }) {
  const [activeCity, setActiveCity] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const cities = useMemo(() => {
    const found = [...new Set(tours.map(t => t.departureCity).filter(Boolean))]
    return found.sort()
  }, [tours])

  const filtered = useMemo(() => {
    let result = activeCity === 'all'
      ? tours
      : tours.filter(t => t.departureCity === activeCity)

    if (sortBy === 'price-asc')  result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0))
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0))

    return result
  }, [tours, activeCity, sortBy])

  if (!tours.length) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Tours coming soon, check back shortly!</p>
      </div>
    )
  }

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10 pb-6 border-b border-sand-100">
        {/* City pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCity('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCity === 'all'
                ? 'bg-desert-600 text-white'
                : 'bg-sand-100 text-gray-600 hover:bg-sand-200'
            }`}
          >
            All Tours
            <span className="ml-1.5 text-xs opacity-70">({tours.length})</span>
          </button>
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCity === city
                  ? 'bg-desert-600 text-white'
                  : 'bg-sand-100 text-gray-600 hover:bg-sand-200'
              }`}
            >
              {capitalize(city)}
              <span className="ml-1.5 text-xs opacity-70">
                ({tours.filter(t => t.departureCity === city).length})
              </span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="text-sm border border-sand-200 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:border-desert-400 flex-shrink-0"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No tours found for <strong>{capitalize(activeCity)}</strong>.</p>
          <button
            onClick={() => setActiveCity('all')}
            className="text-desert-600 hover:text-desert-700 underline text-sm"
          >
            Show all tours
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            Showing {filtered.length} of {tours.length} tours
          </p>
        </>
      )}
    </>
  )
}
