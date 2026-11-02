'use client'

import { useFirestoreData } from '@/hooks/use-firestore'
import { getSiteProfile } from '@/lib/firestore'
import { Footer } from './footer'

/**
 * Thin client wrapper that fetches the site profile for the Footer.
 * Keeps layout.tsx a server component with no Firestore calls.
 */
export function FooterWrapper() {
  const { data: profile } = useFirestoreData(getSiteProfile)
  return <Footer profile={profile ?? null} />
}
