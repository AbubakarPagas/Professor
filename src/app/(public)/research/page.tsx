import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { ResearchClient } from './research-client'

export const metadata: Metadata = {
  title: 'Research & Scholarly Interests',
  description:
    'Research interests, publications, patents and projects of Professor Mohammed Dauda — covering natural-fibre composites, advanced manufacturing, agro-processing, renewable energy, and engineering education.',
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        label="Research"
        title="Research & Scholarly Interests"
        description="Engineering materials, manufacturing technologies and practical innovation — connecting academic scholarship with real-world impact."
      />
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container py-16 relative">
          <ResearchClient />
        </div>
      </div>
    </>
  )
}
