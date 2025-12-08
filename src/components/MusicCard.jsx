import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import AudioPlayer from './AudioPlayer'

export default function MusicCard({ music }) {
  return (
    <div className="bg-sand-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition">
      {music.portraitImage && (
        <div className="relative h-72 overflow-hidden">
          <Image
            src={urlFor(music.portraitImage).width(500).height(600).url()}
            alt={music.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-serif font-bold text-white text-shadow">
              {music.title}
            </h3>
          </div>
        </div>
      )}

      <div className="p-6">
        {music.description && (
          <p className="text-gray-600 mb-4">
            {music.description}
          </p>
        )}

        {music.audioClip && (
          <AudioPlayer audioUrl={music.audioClip} title={music.title} />
        )}

        {music.videoLink && (
          <a
            href={music.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center px-6 py-3 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg smooth-transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            Watch Video
          </a>
        )}
      </div>
    </div>
  )
}
