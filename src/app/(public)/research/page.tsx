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
      <div className="container py-16">
        <ResearchClient />
      </div>
    </>
  )
}
