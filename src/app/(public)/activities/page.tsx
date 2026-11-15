import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { ActivitiesClient } from './activities-client'

export const metadata: Metadata = {
  title: 'Activities & Events',
  description:
    'Reports and updates on conferences, workshops, lectures, mentorship sessions, and field visits attended or organised by Professor Mohammed Dauda.',
}

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        label="Activities & Events"
        title="Activities & Events"
        description="Conferences, workshops, lectures, awards ceremonies, and community engagements — a record of active participation in the engineering community."
      />
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container py-16 relative">
          <ActivitiesClient />
        </div>
      </div>
    </>
  )
}
