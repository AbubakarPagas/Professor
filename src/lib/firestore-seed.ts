/**
 * firestore-seed.ts
 *
 * One-shot function that writes all seed data to Firestore.
 * Called from the admin /admin/seed page.
 * Safe to run multiple times — uses setDoc (merge) for singletons
 * and addDoc for collections (duplicates are avoided by checking
 * existing count first).
 */

import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  writeBatch,
  query,
  limit,
} from 'firebase/firestore'
import { getFirebaseDb } from './firebase'
import {
  SEED_PROFILE,
  SEED_SETTINGS,
  SEED_EXPERTISE,
  SEED_TIMELINE,
  SEED_RESEARCH,
  SEED_AWARDS,
  SEED_PUBLICATIONS,
  SEED_PATENTS,
  SEED_MENTORSHIP,
  SEED_ACTIVITIES,
  SEED_NEWS,
} from './seed-data'

const C = {
  profile:      'siteProfile',
  siteSettings: 'siteSettings',
  expertise:    'expertise',
  timeline:     'timeline',
  research:     'research',
  awards:       'awards',
  publications: 'publications',
  patents:      'patents',
  mentorship:   'mentorshipPrograms',
  activities:   'activities',
  news:         'news',
} as const

export interface SeedResult {
  success: boolean
  written: Record<string, number>
  errors: string[]
}

/** Check if a collection already has documents */
async function collectionHasDocs(collName: string): Promise<boolean> {
  const db = getFirebaseDb()
  const snap = await getDocs(query(collection(db, collName), limit(1)))
  return !snap.empty
}

/** Write an array of items to a collection using a batch */
async function batchWrite(
  collName: string,
  items: object[],
  overwrite = false
): Promise<number> {
  const db  = getFirebaseDb()
  const col = collection(db, collName)

  if (!overwrite) {
    const exists = await collectionHasDocs(collName)
    if (exists) return 0   // skip — already seeded
  }

  // Firestore batch limit is 500 writes
  let written = 0
  for (let i = 0; i < items.length; i += 400) {
    const chunk = items.slice(i, i + 400)
    const batch = writeBatch(db)
    for (const item of chunk) {
      const ref = doc(col)
      batch.set(ref, { ...item, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      written++
    }
    await batch.commit()
  }
  return written
}

export async function runSeed(overwrite = false): Promise<SeedResult> {
  const db      = getFirebaseDb()
  const written: Record<string, number> = {}
  const errors:  string[] = []

  // ── Singletons (always upsert with merge) ─────────────────────────────

  try {
    await setDoc(
      doc(db, C.profile, 'main'),
      { ...SEED_PROFILE, fullBio: SEED_PROFILE.bio, updatedAt: serverTimestamp() },
      { merge: true }
    )
    written.profile = 1
  } catch (e) {
    errors.push(`profile: ${e}`)
  }

  try {
    await setDoc(
      doc(db, C.siteSettings, 'main'),
      { ...SEED_SETTINGS, updatedAt: serverTimestamp() },
      { merge: true }
    )
    written.siteSettings = 1
  } catch (e) {
    errors.push(`siteSettings: ${e}`)
  }

  // ── Collections ───────────────────────────────────────────────────────

  const collections: Array<{ key: string; name: string; data: object[] }> = [
    { key: 'expertise',    name: C.expertise,    data: SEED_EXPERTISE },
    { key: 'timeline',     name: C.timeline,     data: SEED_TIMELINE },
    { key: 'research',     name: C.research,     data: SEED_RESEARCH },
    { key: 'awards',       name: C.awards,       data: SEED_AWARDS },
    { key: 'publications', name: C.publications, data: SEED_PUBLICATIONS },
    { key: 'patents',      name: C.patents,      data: SEED_PATENTS },
    { key: 'mentorship',   name: C.mentorship,   data: SEED_MENTORSHIP },
    { key: 'activities',   name: C.activities,   data: SEED_ACTIVITIES },
    { key: 'news',         name: C.news,         data: SEED_NEWS },
  ]

  for (const { key, name, data } of collections) {
    try {
      const count = await batchWrite(name, data, overwrite)
      written[key] = count
    } catch (e) {
      errors.push(`${key}: ${e}`)
      written[key] = 0
    }
  }

  return {
    success: errors.length === 0,
    written,
    errors,
  }
}
