import Link from 'next/link'
import { ArrowRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CELLS = [
  { label: 'Conference keynote',  size: 'col-span-2 row-span-2', bg: 'bg-navy-700' },
  { label: 'Award ceremony',      size: 'col-span-1 row-span-1', bg: 'bg-gold-100' },
  { label: 'Research laboratory', size: 'col-span-1 row-span-1', bg: 'bg-ivory-300' },
  { label: 'Field visit',         size: 'col-span-1 row-span-2', bg: 'bg-navy-100' },
  { label: 'Workshop session',    size: 'col-span-1 row-span-1', bg: 'bg-gold-50' },
  { label: 'Mentorship forum',    size: 'col-span-1 row-span-1', bg: 'bg-ivory-200' },
]

export function GalleryHomeSection() {
  return (
    <section className="section bg-ivory-100" aria-labelledby="gallery-home-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <div>
            <span className="section-label">Gallery</span>
            <h2 id="gallery-home-heading" className="section-title mt-1">
              Selected Photographs
            </h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/gallery">
              Full Gallery
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Bento-style grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[140px] sm:auto-rows-[160px]"
          role="list"
          aria-label="Gallery preview"
        >
          {CELLS.map(({ label, size, bg }) => (
            <div
              key={label}
              role="listitem"
              className={`${size} ${bg} rounded-2xl border border-ivory-300 flex flex-col items-center justify-center gap-2 group cursor-default hover:border-gold-300 transition-colors duration-300`}
              aria-label={label}
            >
              <Camera className="h-6 w-6 text-charcoal/20 group-hover:text-gold-400 transition-colors" aria-hidden="true" />
              <span className="text-[10px] text-charcoal/30 group-hover:text-charcoal/50 transition-colors font-medium tracking-wide text-center px-2">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-charcoal/35 mt-8 italic">
          Photographs will appear here once the gallery is populated from the admin dashboard.
        </p>
      </div>
    </section>
  )
}
