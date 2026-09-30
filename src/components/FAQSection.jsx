import Link from 'next/link'
import Icon from '@/components/Icon'

// Generic FAQ accordion built on <details>: works without JS, keyboard
// accessible, and every answer is in the HTML for search engines.
// Pass the same `faqs` array to generateFAQSchema() so the markup matches.
export const DEFAULT_FAQS = [
  { question: 'What is the best time of year to visit the Sahara?', answer: 'October to April is ideal: temperatures are comfortable (15–28°C by day) and the nights are cool and clear for stargazing. July and August bring extreme heat (40°C+) and are not recommended for desert treks.' },
  { question: 'Are your tours suitable for first-time desert travellers?', answer: 'Absolutely. Our guides are experienced with travellers of all backgrounds. We provide full briefings, quality equipment, and adjust the pace of every tour to suit the group. No prior desert experience is required.' },
  { question: 'What should I pack for a Sahara desert tour?', answer: 'We send a full packing list after booking. Key essentials include a light scarf (for dust), sunscreen, a warm layer for cold nights, comfortable walking shoes, and a reusable water bottle. We supply sleeping bags and tents.' },
  { question: 'How do I get to the Sahara from major Moroccan cities?', answer: 'We offer tours departing from Marrakech, Fes, Casablanca, Agadir, and Errachidia. All tours include private transport: no need to arrange your own. We pick you up from your hotel or riad.' },
  { question: 'What languages do your guides speak?', answer: 'We operate tours in 5 languages: English, French, Arabic, Spanish, and German. Our Berber guides are fluent in English, French, and Arabic, with many also speaking Spanish and German, and we can accommodate most other European languages with advance notice.' },
  { question: 'How far in advance should I book?', answer: 'We recommend booking at least 2–4 weeks in advance, especially for peak season (December–February). Last-minute bookings are sometimes possible: contact us via WhatsApp for availability.' },
  { question: 'Are the tours eco-friendly?', answer: 'Yes. We accommodate both private tours (any group size) and shared group tours of up to 17 people, use no single-use plastics in the desert, partner exclusively with local Berber villages, and contribute 10% of every booking to desert community programmes.' },
  { question: 'What is your cancellation policy?', answer: 'Full refund for cancellations made 14+ days before departure. 50% refund between 7–14 days. No refund within 7 days, but we offer free date changes. Contact us and we will always do our best to help.' },
]

export function FAQList({ faqs = DEFAULT_FAQS }) {
  return (
    <div className="divide-y divide-sand-200 border-y border-sand-200">
      {faqs.map((faq, i) => (
        <details key={i} className="group" name="faq">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left md:py-6">
            <span className="font-serif text-lg leading-snug text-ink-900 transition-colors group-hover:text-desert-700 md:text-xl">
              {faq.question}
            </span>
            <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sand-300 text-ink-700 transition-transform duration-300 group-open:rotate-45 group-open:border-desert-600 group-open:bg-desert-600 group-open:text-white">
              <Icon name="plus" className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-10 text-[0.97rem] leading-relaxed text-ink-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default function FAQSection({ faqs = DEFAULT_FAQS, title = 'Before you travel', eyebrow = 'Questions & answers' }) {
  return (
    <section className="section bg-white">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="heading-lg mt-3">{title}</h2>
          <p className="mt-4 text-ink-600">
            Can&apos;t find your answer? Ask us directly, a member of our team replies personally.
          </p>
          <Link href="/contact" className="link-arrow mt-6">
            Ask a question <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div data-reveal>
          <FAQList faqs={faqs} />
        </div>
      </div>
    </section>
  )
}
