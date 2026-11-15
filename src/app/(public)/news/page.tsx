import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { NewsPageClient } from './news-client'

export const metadata: Metadata = {
  title: 'News & Articles',
  description: 'Latest news, press coverage, and articles about Professor Mohammed Dauda.',
}

export default function NewsPage() {
  return (
    <>
      <PageHero
        label="News"
        title="News & Articles"
        description="Latest announcements, press coverage, event reports, and editorial pieces."
      />
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container py-16 relative">
          <NewsPageClient />
        </div>
      </div>
    </>
  )
}
