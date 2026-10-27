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
      <div className="container py-16">
        <GalleryPageClient />
      </div>
    </>
  )
}
