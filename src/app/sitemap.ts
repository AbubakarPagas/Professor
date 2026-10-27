import type { MetadataRoute } from 'next'
import { getNewsItems, getActivities, getGalleryAlbums } from '@/lib/firestore'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profdauda.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const static_: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/about`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/biography`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/research`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/publications`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/patents`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/projects`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/activities`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/gallery`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/news`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/awards`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/mentorship`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/privacy-policy`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  try {
    const [news, activities, albums] = await Promise.all([
      getNewsItems(true),
      getActivities(true),
      getGalleryAlbums(true),
    ])

    const dynamic: MetadataRoute.Sitemap = [
      ...news.map(n => ({
        url: `${BASE}/news/${n.slug}`,
        lastModified: n.updatedAt ?? n.publishedAt ?? new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      ...activities.map(a => ({
        url: `${BASE}/activities/${a.slug}`,
        lastModified: a.updatedAt ?? a.date ?? new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      ...albums.map(a => ({
        url: `${BASE}/gallery/${a.slug}`,
        lastModified: a.updatedAt ?? new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
    ]

    return [...static_, ...dynamic]
  } catch {
    return static_
  }
}
