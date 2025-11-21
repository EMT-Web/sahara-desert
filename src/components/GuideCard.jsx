import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export default function GuideCard({ guide }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition group">
      {guide.profileImage && (
        <div className="relative h-80 overflow-hidden">
          <Image
            src={urlFor(guide.profileImage).width(500).height(600).url()}
            alt={guide.name}
            fill
            className="object-cover group-hover:scale-110 smooth-transition"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          {guide.name}
        </h3>
        {guide.role && (
          <p className="text-desert-600 font-semibold mb-3">
            {guide.role}
          </p>
        )}
        {guide.bio && (
          <p className="text-gray-600 mb-4">
            {guide.bio}
          </p>
        )}

        <div className="space-y-2 text-sm">
          {guide.languages && guide.languages.length > 0 && (
            <div className="flex items-start">
              <span className="font-semibold text-gray-700 mr-2">Languages:</span>
              <span className="text-gray-600">{guide.languages.join(', ')}</span>
            </div>
          )}
          {guide.experience && (
            <div className="flex items-start">
              <span className="font-semibold text-gray-700 mr-2">Experience:</span>
              <span className="text-gray-600">{guide.experience}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
