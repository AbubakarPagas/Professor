import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getGalleryAlbumBySlug, getGalleryImages } from '@/lib/firestore'
import { formatDate } from '@/lib/utils'
import { AlbumLightbox } from './album-lightbox'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const album = await getGalleryAlbumBySlug(slug)
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
  const album = await getGalleryAlbumBySlug(slug)
  if (!album || !album.published) notFound()

  const images = await getGalleryImages(album.id)

  return (
    <div className="min-h-screen bg-ivory-100">
      <div className="bg-navy-700 pt-[59px]">
        <div className="container py-8">
          <Button asChild variant="ghost" size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 mb-4">
            <Link href="/gallery">
              <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Back to Gallery
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="gold" className="text-[11px] capitalize">{album.category}</Badge>
            {album.featured && <Badge variant="secondary" className="text-[11px]">Featured</Badge>}
          </div>
          <h1 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-tight mb-2">
            {album.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            {album.eventDate && <span>{formatDate(album.eventDate)}</span>}
            {album.venue && <span>{album.venue}</span>}
            <span>{images.length} photograph{images.length !== 1 ? 's' : ''}</span>
          </div>
          {album.description && (
            <p className="mt-3 text-white/60 max-w-2xl text-sm leading-relaxed">{album.description}</p>
          )}
        </div>
      </div>

      <div className="container py-12">
        <AlbumLightbox images={images} albumTitle={album.title} />
      </div>
    </div>
  )
}
