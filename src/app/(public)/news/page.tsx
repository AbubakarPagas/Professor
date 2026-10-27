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
      <div className="container py-16">
        <NewsPageClient />
      </div>
    </>
  )
}
