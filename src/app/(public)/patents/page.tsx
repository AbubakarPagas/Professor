import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { PatentsClient } from './patents-client'

export const metadata: Metadata = {
  title: 'Patents & Innovation',
  description:
    'Patents and intellectual property by Professor Mohammed Dauda, including inventions registered in Nigeria and Japan.',
}

export default function PatentsPage() {
  return (
    <>
      <PageHero
        label="Intellectual Property"
        title="Patents & Innovation"
        description="Inventions and patents registered in Nigeria, Japan, and internationally — translating research into protected intellectual property."
      />
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container py-16 relative">
          <PatentsClient />
        </div>
      </div>
    </>
  )
}
