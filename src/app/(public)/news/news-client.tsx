'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight, Newspaper } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getNewsItems } from '@/lib/firestore'
import { formatDate } from '@/lib/utils'

export function NewsPageClient() {
  const { data: news, loading } = useFirestoreData(() => getNewsItems(true))

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 rounded-lg bg-ivory-200 animate-pulse" />
      ))}
    </div>
  )

  if (!news?.length) return (
    <div className="py-20 text-center text-charcoal/50">
      <Newspaper className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
      <p>Articles will appear here once published.</p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map(item => (
        <article key={item.id} className="card-base overflow-hidden group flex flex-col">
          {item.coverImageUrl && (
            <div className="relative h-48 flex-shrink-0 overflow-hidden">
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2 text-xs text-charcoal/45">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <time dateTime={item.publishedAt?.toISOString()}>{formatDate(item.publishedAt)}</time>
            </div>
            <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-2 group-hover:text-gold-600 transition-colors flex-1">
              <Link href={`/news/${item.slug}`}>{item.title}</Link>
            </h2>
            <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">{item.excerpt}</p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.slice(0, 3).map(t => (
                  <Badge key={t} variant="secondary" className="text-[11px]">
                    <Tag className="h-2.5 w-2.5 mr-1" aria-hidden="true" />{t}
                  </Badge>
                ))}
              </div>
            )}
            <Link
              href={`/news/${item.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-navy-700 hover:text-gold-500 transition-colors mt-auto"
            >
              Read more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
