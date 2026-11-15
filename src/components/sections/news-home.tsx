'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'
import type { NewsItem } from '@/types'

interface NewsHomeSectionProps {
  newsItems: NewsItem[]
}

export function NewsHomeSection({ newsItems }: NewsHomeSectionProps) {
  return (
    <section className="relative section overflow-hidden" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fdfcf8 60%, #f9f7f2 100%)' }} aria-labelledby="news-home-heading">
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
      {/* Right decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle at right, rgba(197,161,90,0.05), transparent 70%)' }}
        aria-hidden="true" />

      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Latest</span>
            <h2 id="news-home-heading" className="section-title mt-1">News &amp; Updates</h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </motion.div>
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
          >
            <Button asChild variant="outline" size="sm"><Link href="/news">All News</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/publications">Publications</Link></Button>
          </motion.div>
        </div>

        {newsItems.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm py-12">No news yet.</p>
        ) : (
          <motion.div
            className="space-y-0 divide-y divide-ivory-200"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {newsItems.slice(0, 3).map((item, i) => (
              <motion.article
                key={item.id}
                variants={staggerItem}
                className="group py-8 flex flex-col sm:flex-row gap-6 hover:bg-ivory-50/40 -mx-4 px-4 transition-colors duration-200 rounded-xl"
              >
                {/* Left meta */}
                <div className="sm:w-40 flex-shrink-0 flex sm:flex-col gap-3 sm:gap-2.5 items-start sm:pt-0.5">
                  <Badge variant="default" className="text-[10px] font-semibold">News</Badge>
                  <div className="flex items-center gap-1.5 text-[11px] text-charcoal/40">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {formatDate(item.publishedAt)}
                  </div>
                  <div className="hidden sm:block mt-auto">
                    <span className="font-serif font-bold text-gold-100/60 text-5xl select-none leading-none">
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-semibold text-navy-800 text-[17px] leading-snug mb-3 group-hover:text-gold-700 transition-colors duration-200">
                    <Link href={`/news/${item.slug}`} className="hover:underline decoration-gold-200">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-4 max-w-2xl line-clamp-2">{item.excerpt}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-charcoal/45 bg-ivory-100 border border-ivory-200 rounded-full px-2.5 py-0.5">{tag}</span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-gold-600 transition-colors group/link"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                  </Link>
                </div>

                {/* Right arrow (desktop) */}
                <div className="hidden sm:flex flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="h-10 w-10 rounded-full border border-gold-200 bg-gold-50 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
