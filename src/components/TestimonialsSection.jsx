'use client'

import { useState } from 'react'
import { TRIPADVISOR_URL, testimonials } from '@/data/testimonials'

function Stars({ count = 5, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-gradient-to-b from-sand-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-500 mb-3 block">
            Real Travellers · Real Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            What Our Guests Say
          </h2>
        </div>

        {/* Featured quote */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <svg className="w-10 h-10 text-desert-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-6 transition-all duration-300">
            &ldquo;{testimonials[active].quote}&rdquo;
          </p>
          <Stars count={testimonials[active].rating} className="justify-center" />
          <div className="mt-4">
            <p className="font-semibold text-gray-900">
              {testimonials[active].flag} {testimonials[active].name}
            </p>
            <p className="text-sm text-gray-500">
              {testimonials[active].tour} · {testimonials[active].date}
            </p>
          </div>
        </div>

        {/* Selector dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-200 rounded-full font-medium text-sm px-4 py-1.5 ${
                i === active
                  ? 'bg-desert-600 text-white'
                  : 'bg-sand-100 text-gray-500 hover:bg-sand-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`cursor-pointer bg-white rounded-2xl p-6 border transition-all duration-200 ${
                active === i
                  ? 'border-desert-300 shadow-lg shadow-desert-100'
                  : 'border-sand-100 shadow-sm hover:shadow-md'
              }`}
            >
              <Stars count={t.rating} />
              <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-desert-100 flex items-center justify-center text-sm">
                    {t.flag}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.country}</p>
                  </div>
                </div>
                {t.source === 'tripadvisor' && (
                  <span className="text-xs font-semibold text-[#00AA6C] bg-green-50 px-2 py-0.5 rounded-full border border-green-100">TripAdvisor</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* TripAdvisor CTA */}
        <div className="mt-10 text-center">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#00AA6C] hover:bg-[#008f5a] text-white text-sm font-semibold rounded-xl transition-colors shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-4.5 6a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm9 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM12 10c-1.38 0-2.63.56-3.54 1.46l-.93-.93A6.96 6.96 0 0112 8.5c1.93 0 3.68.78 4.95 2.04l-.95.95A5.47 5.47 0 0012 10zm0 2.5c-.69 0-1.32.28-1.77.73l-.71-.71A3.47 3.47 0 0112 11.5c.96 0 1.83.39 2.46 1.02l-.71.71A2.48 2.48 0 0012 12.5zm0 1.5a1 1 0 100 2 1 1 0 000-2z"/>
            </svg>
            Read our reviews on TripAdvisor
          </a>
          <p className="text-xs text-gray-400 mt-2">5.0 ★, Rated Excellent by our guests</p>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: '500+', label: 'Happy Travellers' },
            { value: '5.0 / 5', label: 'TripAdvisor Rating' },
            { value: '40+', label: 'Countries Represented' },
          ].map((b) => (
            <div key={b.label}>
              <p className="text-2xl font-serif font-bold text-desert-600">{b.value}</p>
              <p className="text-xs text-gray-500 tracking-wide uppercase mt-1">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
