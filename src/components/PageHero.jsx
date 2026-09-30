import Image from 'next/image'
import Link from 'next/link'

// Shared top-of-page hero for inner pages: full-bleed photo, bottom scrim,
// optional breadcrumb, eyebrow, H1 and intro. Sits under the transparent header.
export default function PageHero({
  image,
  imageAlt = '',
  imagePosition = 'center',
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  size = 'md',
  children,
}) {
  const height = size === 'lg' ? 'min-h-[68svh] md:min-h-[560px]' : size === 'sm' ? 'min-h-[300px] md:min-h-[360px]' : 'min-h-[420px] md:min-h-[480px]'

  return (
    <section className={`relative flex items-end overflow-hidden bg-night-900 ${height}`}>
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          quality={70}
          className="hero-zoom object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}
      <div className="scrim-b absolute inset-0" />
      <div className="container-site relative pb-12 pt-32 md:pb-16">
        {breadcrumbs?.length > 0 && (
          <nav aria-label="Breadcrumb" className="fade-up mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/70">
              {breadcrumbs.map((b, i) => (
                <li key={b.url || b.name} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {b.url && i < breadcrumbs.length - 1 ? (
                    <Link href={b.url} className="transition-colors hover:text-white">{b.name}</Link>
                  ) : (
                    <span className="text-white/90" aria-current="page">{b.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow-light fade-up">{eyebrow}</p>}
        <h1 className="heading-xl fade-up mt-3 max-w-4xl !text-white text-shadow" style={{ animationDelay: '80ms' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="fade-up mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg" style={{ animationDelay: '160ms' }}>
            {subtitle}
          </p>
        )}
        {children && <div className="fade-up mt-8" style={{ animationDelay: '240ms' }}>{children}</div>}
      </div>
    </section>
  )
}
