/**
 * sitemap.ts — generates /sitemap.xml at build time (and on-demand via ISR).
 *
 * This file runs entirely on the server / at build time.  It must NOT import
 * the Firebase client SDK (firebase/app, firebase/firestore, @/lib/firebase,
 * @/lib/firestore) because those modules call getAuth() at import time, which
 * requires a browser environment and a valid API key.
 *
 * Instead we use Firestore's public REST API — no SDK, no auth token needed
 * for documents that are readable without authentication (matching your
 * Firestore security rules for the public-facing collections).
 */

import type { MetadataRoute } from 'next'

const BASE       = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profdauda.com').replace(/\/$/, '')
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? ''

// ─── Firestore REST helper ────────────────────────────────────────────────────

type FirestoreDocument = {
  name: string
  fields: Record<string, { stringValue?: string; booleanValue?: boolean; timestampValue?: string }>
}

type FirestoreListResponse = {
  documents?: FirestoreDocument[]
  nextPageToken?: string
}

/**
 * Fetch all documents in a Firestore collection via the REST API.
 * Only returns documents where `filterField` equals `filterValue` (optional).
 * Falls back to an empty array on any network or parse error.
 */
async function fetchCollection(
  collection: string,
  opts?: { filterField?: string; filterValue?: string | boolean }
): Promise<FirestoreDocument[]> {
  if (!PROJECT_ID) return []

  try {
    let url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?pageSize=500`

    // Use the structuredQuery endpoint for filtered queries
    if (opts?.filterField !== undefined) {
      const body = {
        structuredQuery: {
          from: [{ collectionId: collection }],
          where: {
            fieldFilter: {
              field: { fieldPath: opts.filterField },
              op: 'EQUAL',
              value: typeof opts.filterValue === 'boolean'
                ? { booleanValue: opts.filterValue }
                : { stringValue: opts.filterValue },
            },
          },
          limit: 500,
        },
      }

      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          next: { revalidate: 3600 }, // cache for 1 hour
        }
      )

      if (!res.ok) return []

      const rows = (await res.json()) as Array<{ document?: FirestoreDocument }>
      return rows.map(r => r.document).filter(Boolean) as FirestoreDocument[]
    }

    // Plain list (no filter)
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []

    const json = (await res.json()) as FirestoreListResponse
    return json.documents ?? []
  } catch {
    return []
  }
}

function getString(doc: FirestoreDocument, field: string): string {
  return doc.fields?.[field]?.stringValue ?? ''
}

function getTimestamp(doc: FirestoreDocument, field: string): Date {
  const ts = doc.fields?.[field]?.timestampValue
  return ts ? new Date(ts) : new Date()
}

// ─── Static routes ────────────────────────────────────────────────────────────

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                     lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
  { url: `${BASE}/about`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/biography`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/research`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/publications`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/patents`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/projects`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/activities`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE}/gallery`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/news`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE}/awards`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/mentorship`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/contact`,        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
  { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
]

// ─── Sitemap export ───────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If no project ID is configured just return static routes (e.g. CI build)
  if (!PROJECT_ID) return STATIC_ROUTES

  try {
    const [news, activities, albums] = await Promise.all([
      fetchCollection('news',         { filterField: 'published',    filterValue: true }),
      fetchCollection('activities',   { filterField: 'status',       filterValue: 'published' }),
      fetchCollection('galleryAlbums', { filterField: 'published',   filterValue: true }),
    ])

    const dynamic: MetadataRoute.Sitemap = [
      ...news
        .filter(doc => getString(doc, 'slug'))
        .map(doc => ({
          url:             `${BASE}/news/${getString(doc, 'slug')}`,
          lastModified:    getTimestamp(doc, 'updatedAt'),
          changeFrequency: 'monthly' as const,
          priority:        0.6,
        })),
      ...activities
        .filter(doc => getString(doc, 'slug'))
        .map(doc => ({
          url:             `${BASE}/activities/${getString(doc, 'slug')}`,
          lastModified:    getTimestamp(doc, 'updatedAt'),
          changeFrequency: 'monthly' as const,
          priority:        0.6,
        })),
      ...albums
        .filter(doc => getString(doc, 'slug'))
        .map(doc => ({
          url:             `${BASE}/gallery/${getString(doc, 'slug')}`,
          lastModified:    getTimestamp(doc, 'updatedAt'),
          changeFrequency: 'monthly' as const,
          priority:        0.5,
        })),
    ]

    return [...STATIC_ROUTES, ...dynamic]
  } catch {
    // Always return at least the static routes — never break the build
    return STATIC_ROUTES
  }
}
