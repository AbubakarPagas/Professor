/**
 * firestore-server.ts
 *
 * Server-side Firestore data access using the REST API.
 * Safe to import in Next.js server components, generateStaticParams,
 * generateMetadata, and any build-time code.
 *
 * Does NOT import the Firebase client SDK — no getAuth(), no client-side
 * initialisation, no browser APIs required.
 */

import type {
  Activity,
  ActivityCategory,
  ActivityStatus,
  NewsItem,
  GalleryAlbum,
  GalleryCategory,
  GalleryImage,
} from '@/types'

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? ''
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

// ─── REST types ───────────────────────────────────────────────────────────────

type FValue =
  | { stringValue: string }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { timestampValue: string }
  | { nullValue: 'NULL_VALUE' }
  | { arrayValue: { values?: FValue[] } }
  | { mapValue: { fields: Record<string, FValue> } }

type FDoc = {
  name: string
  fields: Record<string, FValue>
  createTime?: string
  updateTime?: string
}

type ListResponse  = { documents?: FDoc[]; nextPageToken?: string }
type QueryResponse = Array<{ document?: FDoc }>

// ─── Value extractors ─────────────────────────────────────────────────────────

function str(v: FValue | undefined): string {
  if (!v) return ''
  if ('stringValue'  in v) return v.stringValue
  if ('integerValue' in v) return v.integerValue
  return ''
}

function bool(v: FValue | undefined, fallback = false): boolean {
  if (!v) return fallback
  if ('booleanValue' in v) return v.booleanValue
  return fallback
}

function num(v: FValue | undefined, fallback = 0): number {
  if (!v) return fallback
  if ('integerValue' in v) return parseInt(v.integerValue, 10)
  if ('doubleValue'  in v) return v.doubleValue
  return fallback
}

function date(v: FValue | undefined): Date {
  if (!v) return new Date()
  if ('timestampValue' in v) return new Date(v.timestampValue)
  return new Date()
}

function strArr(v: FValue | undefined): string[] {
  if (!v || !('arrayValue' in v)) return []
  return (v.arrayValue.values ?? []).map(i => str(i))
}

function docId(name: string): string {
  return name.split('/').pop() ?? name
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function runQuery(
  collectionId: string,
  filters: Array<{ field: string; op: string; value: FValue }>,
  limit = 500
): Promise<FDoc[]> {
  if (!PROJECT_ID) return []
  try {
    const where =
      filters.length === 1
        ? {
            fieldFilter: {
              field: { fieldPath: filters[0].field },
              op: filters[0].op,
              value: filters[0].value,
            },
          }
        : {
            compositeFilter: {
              op: 'AND',
              filters: filters.map(f => ({
                fieldFilter: {
                  field: { fieldPath: f.field },
                  op: f.op,
                  value: f.value,
                },
              })),
            },
          }

    const res = await fetch(
      `${FIRESTORE_BASE}:runQuery`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: { from: [{ collectionId }], where, limit },
        }),
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const rows = (await res.json()) as QueryResponse
    return rows.map(r => r.document).filter((d): d is FDoc => !!d)
  } catch {
    return []
  }
}

async function getDocById(collection: string, id: string): Promise<FDoc | null> {
  if (!PROJECT_ID) return null
  try {
    const res = await fetch(`${FIRESTORE_BASE}/${collection}/${id}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return (await res.json()) as FDoc
  } catch {
    return null
  }
}

async function listDocs(collection: string, limit = 500): Promise<FDoc[]> {
  if (!PROJECT_ID) return []
  try {
    const res = await fetch(
      `${FIRESTORE_BASE}/${collection}?pageSize=${limit}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const json = (await res.json()) as ListResponse
    return json.documents ?? []
  } catch {
    return []
  }
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function toActivity(doc: FDoc): Activity {
  const f = doc.fields
  return {
    id:                    docId(doc.name),
    title:                 str(f.title),
    slug:                  str(f.slug),
    summary:               str(f.summary),
    report:                str(f.report),
    date:                  date(f.date),
    endDate:               f.endDate ? date(f.endDate) : undefined,
    venue:                 str(f.venue) || undefined,
    organisingInstitution: str(f.organisingInstitution) || undefined,
    relatedPeople:         strArr(f.relatedPeople),
    relatedOrgs:           strArr(f.relatedOrgs),
    coverImageUrl:         str(f.coverImageUrl) || undefined,
    galleryImageUrls:      strArr(f.galleryImageUrls),
    category:              (str(f.category) || 'other') as ActivityCategory,
    externalLinks:         [], // complex map array — not needed for SSR display
    status:                (str(f.status) || 'published') as ActivityStatus,
    featured:              bool(f.featured),
    seoTitle:              str(f.seoTitle) || undefined,
    seoDescription:        str(f.seoDescription) || undefined,
    tags:                  strArr(f.tags),
    createdAt:             doc.createTime ? new Date(doc.createTime) : undefined,
    updatedAt:             doc.updateTime ? new Date(doc.updateTime) : undefined,
  }
}

function toNewsItem(doc: FDoc): NewsItem {
  const f = doc.fields
  return {
    id:            docId(doc.name),
    title:         str(f.title),
    slug:          str(f.slug),
    excerpt:       str(f.excerpt),
    body:          str(f.body),
    coverImageUrl: str(f.coverImageUrl) || undefined,
    tags:          strArr(f.tags),
    published:     bool(f.published),
    publishedAt:   date(f.publishedAt),
    author:        str(f.author) || undefined,
    createdAt:     doc.createTime ? new Date(doc.createTime) : undefined,
    updatedAt:     doc.updateTime ? new Date(doc.updateTime) : undefined,
  }
}

function toGalleryAlbum(doc: FDoc): GalleryAlbum {
  const f = doc.fields
  return {
    id:            docId(doc.name),
    title:         str(f.title),
    slug:          str(f.slug),
    description:   str(f.description) || undefined,
    coverImageUrl: str(f.coverImageUrl) || undefined,
    category:      (str(f.category) || 'other') as GalleryCategory,
    eventDate:     f.eventDate ? date(f.eventDate) : undefined,
    venue:         str(f.venue) || undefined,
    published:     bool(f.published),
    featured:      bool(f.featured),
    order:         num(f.order),
    imageCount:    num(f.imageCount),
    createdAt:     doc.createTime ? new Date(doc.createTime) : undefined,
    updatedAt:     doc.updateTime ? new Date(doc.updateTime) : undefined,
  }
}

function toGalleryImage(doc: FDoc): GalleryImage {
  const f = doc.fields
  return {
    id:           docId(doc.name),
    albumId:      str(f.albumId),
    title:        str(f.title),
    caption:      str(f.caption) || undefined,
    altText:      str(f.altText),
    credit:       str(f.credit) || undefined,
    imageUrl:     str(f.imageUrl),
    thumbnailUrl: str(f.thumbnailUrl) || undefined,
    order:        num(f.order),
    featured:     bool(f.featured),
    width:        f.width  ? num(f.width)  : undefined,
    height:       f.height ? num(f.height) : undefined,
    createdAt:    doc.createTime ? new Date(doc.createTime) : undefined,
    updatedAt:    doc.updateTime ? new Date(doc.updateTime) : undefined,
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Get a single published activity by slug. */
export async function serverGetActivityBySlug(slug: string): Promise<Activity | null> {
  const docs = await runQuery('activities', [
    { field: 'slug',   op: 'EQUAL', value: { stringValue: slug } },
    { field: 'status', op: 'EQUAL', value: { stringValue: 'published' } },
  ], 1)
  return docs.length ? toActivity(docs[0]) : null
}

/** Get slugs for all published activities (used in generateStaticParams). */
export async function serverGetActivitySlugs(): Promise<string[]> {
  const docs = await runQuery('activities', [
    { field: 'status', op: 'EQUAL', value: { stringValue: 'published' } },
  ])
  return docs.map(d => str(d.fields.slug)).filter(Boolean)
}

/** Get a single published news item by slug. */
export async function serverGetNewsItemBySlug(slug: string): Promise<NewsItem | null> {
  const docs = await runQuery('news', [
    { field: 'slug',      op: 'EQUAL', value: { stringValue: slug } },
    { field: 'published', op: 'EQUAL', value: { booleanValue: true } },
  ], 1)
  return docs.length ? toNewsItem(docs[0]) : null
}

/** Get slugs for all published news items (used in generateStaticParams). */
export async function serverGetNewsSlugs(): Promise<string[]> {
  const docs = await runQuery('news', [
    { field: 'published', op: 'EQUAL', value: { booleanValue: true } },
  ])
  return docs.map(d => str(d.fields.slug)).filter(Boolean)
}

/** Get a single published gallery album by slug. */
export async function serverGetGalleryAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
  const docs = await runQuery('galleryAlbums', [
    { field: 'slug',      op: 'EQUAL', value: { stringValue: slug } },
    { field: 'published', op: 'EQUAL', value: { booleanValue: true } },
  ], 1)
  return docs.length ? toGalleryAlbum(docs[0]) : null
}

/** Get slugs for all published gallery albums (used in generateStaticParams). */
export async function serverGetGalleryAlbumSlugs(): Promise<string[]> {
  const docs = await runQuery('galleryAlbums', [
    { field: 'published', op: 'EQUAL', value: { booleanValue: true } },
  ])
  return docs.map(d => str(d.fields.slug)).filter(Boolean)
}

/** Get all images in a gallery album (by album Firestore document ID). */
export async function serverGetGalleryImages(albumId: string): Promise<GalleryImage[]> {
  const docs = await runQuery('galleryImages', [
    { field: 'albumId', op: 'EQUAL', value: { stringValue: albumId } },
  ])
  return docs.map(toGalleryImage).sort((a, b) => a.order - b.order)
}
