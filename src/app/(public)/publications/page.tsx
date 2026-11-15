import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { PublicationsClient } from './publications-client'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Peer-reviewed journals, conference papers, books, and technical reports by Professor Mohammed Dauda.',
}

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        label="Scholarly Work"
        title="Publications"
        description="A comprehensive record of peer-reviewed research spanning journals, conferences, books, and technical reports."
      />
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container py-16 relative">
          <PublicationsClient />
        </div>
      </div>
    </>
  )
}
