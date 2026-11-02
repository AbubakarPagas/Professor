import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { NewsItem } from '@/types'

interface NewsHomeSectionProps {
  newsItems: NewsItem[]
}

export function NewsHomeSection({ newsItems }: NewsHomeSectionProps) {
  return (
    <section className="relative section bg-white overflow-hidden" aria-labelledby="news-home-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <div>
            <span className="section-label">Latest</span>
            <h2 id="news-home-heading" className="section-title mt-1">News &amp; Publications</h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link href="/news">All News</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/publications">Publications</Link></Button>
          </div>
        </div>

        {newsItems.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm py-12">No news yet. Publish articles from the admin dashboard.</p>
        ) : (
          <div className="space-y-0 divide-y divide-ivory-200">
            {newsItems.slice(0, 3).map(item => (
              <article key={item.id} className="group py-8 flex flex-col sm:flex-row gap-6">
                <div className="sm:w-36 flex-shrink-0 flex sm:flex-col gap-3 sm:gap-2 items-start sm:pt-0.5">
                  <Badge variant="default" className="text-[10px]">News</Badge>
                  <div className="flex items-center gap-1.5 text-[11px] text-charcoal/40">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {formatDate(item.publishedAt)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-semibold text-navy-800 text-[16px] leading-snug mb-2.5 group-hover:text-gold-600 transition-colors duration-200">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-4 max-w-2xl">{item.excerpt}</p>
                  <Link href={`/news/${item.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-gold-600 transition-colors">
                    Read more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
