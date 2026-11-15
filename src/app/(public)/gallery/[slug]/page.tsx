import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  serverGetGalleryAlbumBySlug,
  serverGetGalleryAlbumSlugs,
  serverGetGalleryImages,
} from '@/lib/firestore-server'
import { formatDate } from '@/lib/utils'
import { AlbumLightbox } from './album-lightbox'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await serverGetGalleryAlbumSlugs()
  return slugs.map(slug => ({ slug }))
}

export const dynamicParams = true  // allow slugs not pre-rendered to render on demand

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const album = await serverGetGalleryAlbumBySlug(slug)
  if (!album) return { title: 'Album Not Found' }
  return {
    title: album.title,
    description: album.description ?? `Photo album: ${album.title}`,
    openGraph: {
      title: album.title,
      description: album.description ?? `Photo album: ${album.title}`,
      images: album.coverImageUrl ? [album.coverImageUrl] : [],
    },
  }
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params
  const album = await serverGetGalleryAlbumBySlug(slug)
  if (!album || !album.published) notFound()

  const images = await serverGetGalleryImages(album.id)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
      <div className="relative bg-navy-900 pt-[62px] overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark" aria-hidden="true" />
        <div className="absolute inset-0 pattern-circuit opacity-50" aria-hidden="true" />
        <div className="container relative py-10">
          <Button asChild variant="ghost" size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 mb-5 -ml-2">
            <Link href="/gallery">
              <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Back to Gallery
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="gold" className="text-[11px] capitalize">{album.category}</Badge>
            {album.featured && <Badge variant="secondary" className="text-[11px]">Featured</Badge>}
          </div>
          <h1 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-tight mb-3">
            {album.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            {album.eventDate && (
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
                {formatDate(album.eventDate)}
              </span>
            )}
            {album.venue && (
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
                {album.venue}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
              {images.length} photograph{images.length !== 1 ? 's' : ''}
            </span>
          </div>
          {album.description && (
            <p className="mt-3 text-white/55 max-w-2xl text-sm leading-relaxed">{album.description}</p>
          )}
          <div className="mt-7 h-[2px] w-14 bg-gradient-to-r from-gold-400 to-transparent rounded-full" aria-hidden="true" />
        </div>
      </div>

      <div className="container py-14">
        <AlbumLightbox images={images} albumTitle={album.title} />
      </div>
    </div>
  )
}
