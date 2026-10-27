'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { GalleryImage } from '@/types'

interface Props {
  images: GalleryImage[]
  albumTitle: string
}

export function AlbumLightbox({ images, albumTitle }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const openAt = (i: number) => setLightboxIdx(i)
  const close = () => setLightboxIdx(null)
  const prev = useCallback(() => {
    setLightboxIdx(i => i === null ? null : (i - 1 + images.length) % images.length)
  }, [images.length])
  const next = useCallback(() => {
    setLightboxIdx(i => i === null ? null : (i + 1) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIdx, prev, next])

  if (!images.length) {
    return (
      <div className="py-20 text-center text-charcoal/50">
        <Images className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
        <p>No photographs in this album yet.</p>
      </div>
    )
  }

  const current = lightboxIdx !== null ? images[lightboxIdx] : null

  return (
    <>
      {/* Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        role="list"
        aria-label={`${albumTitle} — photo grid`}
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            role="listitem"
            className="group relative aspect-square rounded-md overflow-hidden bg-ivory-200 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2"
            onClick={() => openAt(i)}
            aria-label={img.altText || img.title}
          >
            <Image
              src={img.thumbnailUrl ?? img.imageUrl}
              alt={img.altText || img.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </div>
            {img.featured && (
              <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold-400" aria-label="Featured" />
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={current.altText || current.title}
          onClick={close}
        >
          {/* Close */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={close}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Prev */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full mx-16 flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh]">
              <Image
                src={current.imageUrl}
                alt={current.altText || current.title}
                width={1200}
                height={900}
                className="object-contain max-h-[75vh] w-full rounded-md"
              />
            </div>
            {(current.title || current.caption) && (
              <div className="mt-3 text-center">
                {current.title && <p className="text-white font-medium text-sm">{current.title}</p>}
                {current.caption && <p className="text-white/60 text-xs mt-0.5">{current.caption}</p>}
                {current.credit && <p className="text-white/40 text-xs mt-0.5">© {current.credit}</p>}
              </div>
            )}
            <p className="mt-2 text-white/30 text-xs">
              {lightboxIdx + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>
      )}
    </>
  )
}
