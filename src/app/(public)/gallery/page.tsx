import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { GalleryPageClient } from './gallery-client'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photo gallery of Professor Mohammed Dauda — conferences, awards, research, fieldwork, and mentorship.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="Photo Gallery"
        title="Gallery"
        description="A visual record of conferences, awards ceremonies, research activities, mentorship sessions, and institutional engagements."
      />
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container py-16 relative">
          <GalleryPageClient />
        </div>
      </div>
    </>
  )
}
