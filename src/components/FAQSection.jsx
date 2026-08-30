'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'What is the best time of year to visit the Sahara?',
    a: 'October to April is ideal: temperatures are comfortable (15–28°C by day) and the nights are cool and clear for stargazing. July and August bring extreme heat (40°C+) and are not recommended for desert treks.',
  },
  {
    q: 'Are your tours suitable for first-time desert travellers?',
    a: 'Absolutely. Our guides are experienced with travellers of all backgrounds. We provide full briefings, quality equipment, and adjust the pace of every tour to suit the group. No prior desert experience is required.',
  },
  {
    q: 'What should I pack for a Sahara desert tour?',
    a: 'We send a full packing list after booking. Key essentials include a light scarf (for dust), sunscreen, a warm layer for cold nights, comfortable walking shoes, and a reusable water bottle. We supply sleeping bags and tents.',
  },
  {
    q: 'How do I get to the Sahara from major Moroccan cities?',
    a: 'We offer tours departing from Marrakech, Fes, Casablanca, Agadir, and Errachidia. All tours include private transport: no need to arrange your own. We pick you up from your hotel or riad.',
  },
  {
    q: 'What languages do your guides speak?',
    a: 'Our Berber guides are fluent in English, French, and Arabic, with many also speaking Spanish and German. We can accommodate most European languages with advance notice.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 2–4 weeks in advance, especially for peak season (December–February). Last-minute bookings are sometimes possible: contact us via WhatsApp for availability.',
  },
  {
    q: 'Are the tours eco-friendly?',
    a: 'Yes. We operate small groups only (max 8 people), use no single-use plastics in the desert, partner exclusively with local Berber villages, and contribute 10% of every booking to desert community programmes.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Full refund for cancellations made 14+ days before departure. 50% refund between 7–14 days. No refund within 7 days, but we offer free date changes. Contact us and we will always do our best to help.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-desert-500 mb-3 block">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Everything You Need to Know
          </h2>
        </div>

        <div className="divide-y divide-sand-100">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
              >
                <span className={`font-medium text-base transition-colors duration-200 ${
                  open === i ? 'text-desert-600' : 'text-gray-900 group-hover:text-desert-600'
                }`}>
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                  open === i ? 'bg-desert-100 text-desert-600 rotate-45' : 'bg-sand-100 text-gray-400'
                }`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                open === i ? 'max-h-64 pb-5' : 'max-h-0'
              }`}>
                <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center p-6 bg-sand-50 rounded-2xl">
          <p className="text-gray-600 text-sm mb-4">Still have questions? We&apos;re happy to help.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-desert-600 hover:bg-desert-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Ask Us Directly
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
