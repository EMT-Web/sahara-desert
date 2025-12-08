'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useState, useEffect, useRef } from 'react'

export default function Hero({ heroTitle, heroSubtitle, heroImage, heroVideo, ambientSound }) {
  const [isSoundPlaying, setIsSoundPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current && ambientSound) {
      audioRef.current.volume = 0.3 // Set volume to 30% for ambient background
    }
  }, [ambientSound])

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

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : heroImage ? (
        <Image
          src={urlFor(heroImage).width(1920).url()}
          alt={heroTitle || 'Sahara Desert'}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-desert-500 to-sand-700" />
      )}

      <div className="absolute inset-0 bg-black/40" />

      {/* Ambient Sound Toggle */}
      {ambientSound && (
        <button
          onClick={toggleSound}
          className="absolute top-24 right-4 md:right-8 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white smooth-transition border border-white/40"
          aria-label={isSoundPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
        >
          {isSoundPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}

      {ambientSound && (
        <audio
          ref={audioRef}
          src={ambientSound}
          loop
          className="hidden"
        />
      )}

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-shadow animate-fade-in">
            {heroTitle || 'Where the dunes sing at sunset'}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 text-shadow">
            {heroSubtitle || 'Discover authentic Saharan culture, music, and unforgettable desert experiences'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tours"
              className="px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition transform hover:scale-105"
            >
              Explore Tours
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-lg shadow-lg smooth-transition border border-white/40"
            >
              Book Your Adventure
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}
