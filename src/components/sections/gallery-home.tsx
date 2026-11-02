import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { GalleryImage } from '@/types'

interface GalleryHomeSectionProps {
  images: GalleryImage[]
}

const GRID_SIZES = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
]

export function GalleryHomeSection({ images }: GalleryHomeSectionProps) {
  return (
    <section className="section bg-ivory-100" aria-labelledby="gallery-home-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <div>
            <span className="section-label">Gallery</span>
            <h2 id="gallery-home-heading" className="section-title mt-1">Selected Photographs</h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/gallery">Full Gallery <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" /></Link>
          </Button>
        </div>

        {images.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[140px] sm:auto-rows-[160px]" role="list" aria-label="Gallery preview">
            {['Conference keynote', 'Award ceremony', 'Research laboratory', 'Field visit', 'Workshop session', 'Mentorship forum'].map((label, i) => (
              <div key={label} role="listitem" className={`${GRID_SIZES[i] ?? 'col-span-1 row-span-1'} bg-ivory-200 rounded-2xl border border-ivory-300 flex flex-col items-center justify-center gap-2 cursor-default hover:border-gold-300 transition-colors`} aria-label={label}>
                <Camera className="h-6 w-6 text-charcoal/20" aria-hidden="true" />
                <span className="text-[10px] text-charcoal/30 font-medium tracking-wide text-center px-2">{label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[140px] sm:auto-rows-[160px]" role="list" aria-label="Gallery preview">
            {images.slice(0, 6).map((img, i) => (
              <div key={img.id} role="listitem" className={`${GRID_SIZES[i] ?? 'col-span-1 row-span-1'} rounded-2xl overflow-hidden border border-ivory-300 relative group hover:border-gold-300 transition-colors`}>
                <Image
                  src={img.thumbnailUrl ?? img.imageUrl}
                  alt={img.altText}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 50vw, 25vw"
                />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-[10px] truncate">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <p className="text-center text-sm text-charcoal/35 mt-8 italic">
            Photographs will appear here once the gallery is populated from the admin dashboard.
          </p>
        )}
      </div>
    </section>
  )
}
