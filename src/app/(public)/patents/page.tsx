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
      <div className="container py-16">
        <PatentsClient />
      </div>
    </>
  )
}
