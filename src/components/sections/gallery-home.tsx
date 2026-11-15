'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT } from '@/lib/motion'
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
    <section className="relative section overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }} aria-labelledby="gallery-home-heading">
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />

      <div className="container relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Gallery</span>
            <h2 id="gallery-home-heading" className="section-title mt-1">Selected Photographs</h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
          >
            <Button asChild variant="outline" size="sm" className="group">
              <Link href="/gallery">
                Full Gallery
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {images.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[140px] sm:auto-rows-[160px]" role="list" aria-label="Gallery placeholder">
            {['Conference keynote', 'Award ceremony', 'Research laboratory', 'Field visit', 'Workshop session', 'Mentorship forum'].map((label, i) => (
              <motion.div
                key={label}
                role="listitem"
                className={`${GRID_SIZES[i] ?? 'col-span-1 row-span-1'} bg-ivory-200 rounded-2xl border border-ivory-300 flex flex-col items-center justify-center gap-2 cursor-default hover:border-gold-300 hover:bg-gold-50/40 transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                aria-label={label}
              >
                <Camera className="h-6 w-6 text-charcoal/20" aria-hidden="true" />
                <span className="text-[10px] text-charcoal/30 font-medium tracking-wide text-center px-2">{label}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[140px] sm:auto-rows-[160px]" role="list" aria-label="Gallery preview">
            {images.slice(0, 6).map((img, i) => (
              <motion.div
                key={img.id}
                role="listitem"
                className={`${GRID_SIZES[i] ?? 'col-span-1 row-span-1'} rounded-2xl overflow-hidden border border-ivory-300 relative group hover:border-gold-300 transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <Image
                  src={img.thumbnailUrl ?? img.imageUrl}
                  alt={img.altText}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  sizes="(max-width:640px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-[10px] truncate font-medium">{img.caption}</p>
                  </div>
                )}
                {img.featured && (
                  <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold-400 shadow-gold animate-pulse-glow" aria-label="Featured" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
