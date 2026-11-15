import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { AwardsClient } from './awards-client'

export const metadata: Metadata = {
  title: 'Awards & Recognition',
  description:
    'National and international awards, fellowships, and honours received by Professor Mohammed Dauda.',
}

export default function AwardsPage() {
  return (
    <>
      <PageHero
        label="Honours"
        title="Awards & Recognition"
        description="Decades of engineering excellence recognised by professional bodies, governments, and academic institutions at home and abroad."
      />
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container py-16 relative">
          <AwardsClient />
        </div>
      </div>
    </>
  )
}
