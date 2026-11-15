'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Images, Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getGalleryAlbums } from '@/lib/firestore'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'
import type { GalleryCategory } from '@/types'

const CAT_LABEL: Record<GalleryCategory, string> = {
  conference:    'Conference',
  workshop:      'Workshop',
  research:      'Research',
  award:         'Award',
  mentorship:    'Mentorship',
  institutional: 'Institutional',
  community:     'Community',
  portrait:      'Portrait',
  other:         'Other',
}

const FILTER_CATS: Array<GalleryCategory | 'all'> = [
  'all', 'conference', 'workshop', 'research', 'award', 'mentorship', 'institutional',
]

export function GalleryPageClient() {
  const { data: albums, loading } = useFirestoreData(() => getGalleryAlbums(true))
  const [catFilter, setCatFilter] = useState<GalleryCategory | 'all'>('all')

  const filtered = (albums ?? []).filter(a => catFilter === 'all' || a.category === catFilter)

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-60 rounded-2xl bg-ivory-200 animate-pulse" />
      ))}
    </div>
  )

  if (!albums?.length) return (
    <div className="py-20 text-center text-charcoal/50">
      <Images className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
      <p>Albums will appear here once created and published via the admin dashboard.</p>
    </div>
  )

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter gallery by category">
        {FILTER_CATS.map(f => (
          <Button
            key={f}
            size="sm"
            variant={catFilter === f ? 'default' : 'outline'}
            onClick={() => setCatFilter(f)}
            aria-pressed={catFilter === f}
            className="capitalize rounded-full"
          >
            {f === 'all' ? 'All Albums' : CAT_LABEL[f as GalleryCategory]}
          </Button>
        ))}
      </div>

      {!filtered.length ? (
        <p className="py-10 text-center text-charcoal/50 text-sm">No albums in this category.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={catFilter}
        >
          {filtered.map(album => (
            <motion.article
              key={album.id}
              variants={staggerItem}
              className="card-base overflow-hidden group flex flex-col hover:border-gold-200 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
            >
              <Link href={`/gallery/${album.slug}`} className="block flex-1 flex flex-col">
                {/* Cover */}
                <div className="relative h-56 bg-navy-50 flex-shrink-0 overflow-hidden">
                  {album.coverImageUrl ? (
                    <>
                      <Image
                        src={album.coverImageUrl}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy-100 to-navy-50">
                      <Images className="h-10 w-10 text-navy-300" aria-hidden="true" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {album.featured && (
                      <Badge variant="gold" className="text-[10px] shadow-sm">Featured</Badge>
                    )}
                  </div>
                  {album.imageCount > 0 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Images className="h-3 w-3" aria-hidden="true" />
                      {album.imageCount} photo{album.imageCount !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {CAT_LABEL[album.category]}
                    </Badge>
                    {album.eventDate && (
                      <span className="text-xs text-charcoal/40 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gold-400" aria-hidden="true" />
                        {formatDate(album.eventDate)}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-1.5 group-hover:text-gold-700 transition-colors">
                    {album.title}
                  </h2>
                  {album.venue && (
                    <p className="text-xs text-charcoal/40 flex items-center gap-1 mb-2.5">
                      <MapPin className="h-3 w-3 text-gold-400" aria-hidden="true" /> {album.venue}
                    </p>
                  )}
                  {album.description && (
                    <p className="text-sm text-charcoal/55 leading-relaxed line-clamp-2 mb-3">
                      {album.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 group-hover:text-gold-600 transition-colors mt-auto">
                    View album <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  )
}
