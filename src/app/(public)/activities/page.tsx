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
      <div className="container py-16">
        <ActivitiesClient />
      </div>
    </>
  )
}
