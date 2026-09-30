// Section heading used across the site: small eyebrow, serif title, optional intro.
export default function SectionTitle({ title, subtitle, eyebrow, centered = true, light = false, className = '' }) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`} data-reveal>
      {eyebrow && <p className={light ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</p>}
      <h2 className={`heading-lg ${eyebrow ? 'mt-3' : ''} ${light ? '!text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? 'text-white/75' : 'text-ink-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
