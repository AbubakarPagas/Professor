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
      <div className="container py-16">
        <PublicationsClient />
      </div>
    </>
  )
}
