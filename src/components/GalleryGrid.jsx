'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useState } from 'react'

export default function GalleryGrid({ items }) {
  const [selectedItem, setSelectedItem] = useState(null)

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No gallery items available yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={item._id || index}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-2xl smooth-transition"
            onClick={() => setSelectedItem(item)}
          >
            {item.type === 'video' && item.video ? (
              <video
                src={item.video}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 smooth-transition"
                muted
                loop
                playsInline
              />
            ) : item.image ? (
              <Image
                src={urlFor(item.image).width(600).height(600).url()}
                alt={item.title || item.caption || 'Gallery image'}
                fill
                className="object-cover group-hover:scale-110 smooth-transition"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 smooth-transition">
                <h3 className="font-semibold text-lg text-shadow">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-sm text-white/80 text-shadow">
                    {item.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-desert-300 smooth-transition"
            onClick={() => setSelectedItem(null)}
          >
            ×
          </button>
          <div className="max-w-5xl w-full">
            {selectedItem.type === 'video' && selectedItem.video ? (
              <video
                src={selectedItem.video}
                controls
                className="w-full rounded-lg"
              />
            ) : selectedItem.image ? (
              <div className="relative w-full h-[80vh]">
                <Image
                  src={urlFor(selectedItem.image).width(1200).url()}
                  alt={selectedItem.title || selectedItem.caption || 'Gallery image'}
                  fill
                  className="object-contain"
                />
              </div>
            ) : null}
            {(selectedItem.title || selectedItem.caption) && (
              <div className="mt-4 text-white text-center">
                {selectedItem.title && (
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    {selectedItem.title}
                  </h3>
                )}
                {selectedItem.caption && (
                  <p className="text-lg text-white/80">
                    {selectedItem.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
