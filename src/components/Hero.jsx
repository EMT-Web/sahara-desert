'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Hero({
  heroTitle,
  heroSubtitle,
  heroImage,
  heroVideo,
  ambientSound,
  carouselSlides = [],
}) {
  const [isSoundPlaying, setIsSoundPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0]))
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  // Build slides array
  const slides = carouselSlides.length > 0
    ? carouselSlides
    : heroImage
    ? [{ image: heroImage }]
    : []

  // Only fetch a slide's image once it's actually about to be shown, so the
  // browser isn't downloading all 3 hero-sized images on initial page load.
  useEffect(() => {
    setLoadedSlides(prev => (prev.has(current) ? prev : new Set(prev).add(current)))
  }, [current])

  useEffect(() => {
    if (audioRef.current && ambientSound) {
      audioRef.current.volume = 0.3
    }
  }, [ambientSound])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    if (slides.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 6000)
  }, [slides.length])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const goTo = (index) => {
    if (animating || index === current) return
    setAnimating(true)
    setCurrent(index)
    startTimer()
    setTimeout(() => setAnimating(false), 700)
  }

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  const toggleSound = () => {
    if (audioRef.current && ambientSound) {
      if (isSoundPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsSoundPlaying(!isSoundPlaying)
    }
  }

  const padded = (n) => String(n).padStart(2, '0')

  const displayTitle = heroTitle || 'Discover the Real Sahara'

  return (
    <div className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">

      {/* Slides */}
      {slides.length > 0 ? (
        slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          >
            {loadedSlides.has(i) && (
              <Image
                src={urlFor(slide.image).width(1440).height(810).quality(80).url()}
                alt={slide.title || heroTitle || 'Sahara Desert'}
                fill
                sizes="100vw"
                className="object-cover scale-105"
                priority={i === 0}
              />
            )}
          </div>
        ))
      ) : heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-desert-700 via-desert-600 to-sand-700" />
      )}

      {/* Gradient overlay: heavier at bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Ambient Sound Toggle */}
      {ambientSound && (
        <button
          onClick={toggleSound}
          className="absolute top-24 right-4 md:right-8 z-10 w-11 h-11 bg-white/15 backdrop-blur-sm hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/30"
          aria-label={isSoundPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
        >
          {isSoundPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}

      {ambientSound && (
        <audio ref={audioRef} src={ambientSound} loop className="hidden" />
      )}

      {/* Main content: left-aligned */}
      <div className="relative h-full flex items-center pt-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl">

          {/* Location badge */}
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-desert-300">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {slides[current]?.city
                ? `${slides[current].city}, Morocco`
                : 'Sahara Desert, Morocco'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-snug mb-4">
            {displayTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/75 mb-8 max-w-md leading-relaxed line-clamp-2">
            {heroSubtitle || 'Authentic Berber-guided expeditions through Morocco\'s golden Sahara, camel treks, starlit camps, and desert culture.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/tours"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-desert-600 hover:bg-desert-500 text-white text-sm font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              Explore Tours
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/30 transition-all duration-300"
            >
              Plan Your Trip
            </a>
          </div>
        </div>
      </div>

      {/* Slide counter + dots: bottom right */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 right-6 md:right-16 z-10 flex items-center gap-4">
          {/* Numbered counter */}
          <span className="text-white/60 text-xs font-mono tracking-widest">
            {padded(current + 1)} / {padded(slides.length)}
          </span>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-desert-400'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  )
}
