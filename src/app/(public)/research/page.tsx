import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { ResearchClient } from './research-client'

export const metadata: Metadata = {
  title: 'Research & Expertise',
  description:
    'Research projects, expertise areas, and scholarly contributions of Professor Mohammed Dauda in mechanical engineering, manufacturing, and entrepreneurship.',
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        label="Research"
        title="Research & Expertise"
        description="Funded research programmes, innovation projects, and interdisciplinary scholarship spanning three decades of engineering science."
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
