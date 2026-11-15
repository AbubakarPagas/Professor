'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight, Newspaper } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getNewsItems } from '@/lib/firestore'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'

export function NewsPageClient() {
  const { data: news, loading } = useFirestoreData(() => getNewsItems(true))

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-72 rounded-2xl bg-ivory-200 animate-pulse" />
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
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {news.map(item => (
        <motion.article
          key={item.id}
          variants={staggerItem}
          className="card-base overflow-hidden group flex flex-col hover:border-gold-200 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
        >
          {item.coverImageUrl ? (
            <div className="relative h-52 flex-shrink-0 overflow-hidden">
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </div>
          ) : (
            <div className="h-52 flex-shrink-0 bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center">
              <Newspaper className="h-10 w-10 text-navy-300" aria-hidden="true" />
            </div>
          )}

          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3 text-xs text-charcoal/40">
              <Calendar className="h-3 w-3 text-gold-400" aria-hidden="true" />
              <time dateTime={item.publishedAt?.toISOString()}>{formatDate(item.publishedAt)}</time>
            </div>

            <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-2.5 group-hover:text-gold-700 transition-colors flex-1">
              <Link href={`/news/${item.slug}`}>{item.title}</Link>
            </h2>

            <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">{item.excerpt}</p>

            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] text-charcoal/45 bg-ivory-100 border border-ivory-200 rounded-full px-2.5 py-0.5 inline-flex items-center gap-1">
                    <Tag className="h-2.5 w-2.5" aria-hidden="true" />{t}
                  </span>
                ))}
              </div>
            )}

            <Link
              href={`/news/${item.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-gold-600 transition-colors mt-auto group/link"
            >
              Read more
              <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}
