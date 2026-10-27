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
      <div className="container py-16">
        <AwardsClient />
      </div>
    </>
  )
}
