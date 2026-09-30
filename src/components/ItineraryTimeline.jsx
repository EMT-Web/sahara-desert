'use client'

import { useRef, useState } from 'react'
import Icon from '@/components/Icon'

// Day-by-day itinerary as an accordion timeline. Built on <details> so every
// day's text is in the HTML (SEO, no-JS); the client part only adds
// "Expand all / Collapse all".
export default function ItineraryTimeline({ days = [] }) {
  const ref = useRef(null)
  const [allOpen, setAllOpen] = useState(false)

  const toggleAll = () => {
    const next = !allOpen
    ref.current?.querySelectorAll('details').forEach((d) => { d.open = next })
    setAllOpen(next)
  }

  return (
    <div>
      {days.length > 2 && (
        <div className="mb-4 flex justify-end">
          <button type="button" onClick={toggleAll} className="text-sm font-semibold text-desert-700 underline-offset-4 hover:underline">
            {allOpen ? 'Collapse all days' : 'Expand all days'}
          </button>
        </div>
      )}
      <ol ref={ref} className="relative">
        {days.map((item, i) => {
          const label = item.day && item.day.toLowerCase().includes('day') ? item.day : `Day ${i + 1}`
          const last = i === days.length - 1
          return (
            <li key={i} className="relative pl-12 md:pl-14">
              {!last && <span className="absolute bottom-0 left-[1.1rem] top-10 w-px bg-sand-300 md:left-[1.35rem]" aria-hidden="true" />}
              <span className="absolute left-0 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-desert-200 bg-desert-50 font-serif text-sm text-desert-800 md:h-11 md:w-11 md:text-base">
                {i + 1}
              </span>
              <details className="group pb-4" open={i === 0}>
                <summary className="flex cursor-pointer items-start justify-between gap-4 rounded-xl py-3.5 pr-1">
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-desert-700">{label}</span>
                    <span className="mt-1 block font-serif text-lg leading-snug text-ink-900 md:text-xl">{item.title || 'Journey day'}</span>
                  </span>
                  <Icon name="chevronDown" className="mt-5 h-5 w-5 shrink-0 text-ink-500 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="pb-2 pr-2">
                  <p className="whitespace-pre-line text-[0.97rem] leading-relaxed text-ink-700">{item.description || item.content}</p>
                  {item.overnight && (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-sand-100 px-3 py-1.5 text-xs font-medium text-ink-700">
                      <Icon name="moon" className="h-3.5 w-3.5 text-desert-700" /> Overnight: {item.overnight}
                    </p>
                  )}
                </div>
              </details>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
