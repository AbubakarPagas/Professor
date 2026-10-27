import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const LATEST = [
  {
    tag: 'News',
    variant: 'default' as const,
    title: 'Prof. Dauda Delivers Keynote at the Annual Engineering Conference',
    date: 'October 2024',
    excerpt: 'Professor Dauda addressed delegates on the future of indigenous manufacturing and the critical role of engineering entrepreneurship in national development.',
    href: '/news',
  },
  {
    tag: 'Publication',
    variant: 'gold' as const,
    title: 'New Journal Article on Green Composite Materials Published',
    date: 'September 2024',
    excerpt: 'A peer-reviewed study on sustainable green composite materials for structural applications in sub-Saharan Africa.',
    href: '/publications',
  },
  {
    tag: 'Initiative',
    variant: 'success' as const,
    title: 'ASR-ICiE Launches New Innovation Cohort',
    date: 'August 2024',
    excerpt: 'The Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship welcomes its third cohort of emerging engineers.',
    href: '/projects',
  },
]

export function NewsHomeSection() {
  return (
    <section className="relative section bg-white overflow-hidden" aria-labelledby="news-home-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <div>
            <span className="section-label">Latest</span>
            <h2 id="news-home-heading" className="section-title mt-1">
              News &amp; Publications
            </h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/news">All News</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/publications">Publications</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-0 divide-y divide-ivory-200">
          {LATEST.map(({ tag, variant, title, date, excerpt, href }) => (
            <article key={title} className="group py-8 flex flex-col sm:flex-row gap-6">
              {/* Meta column */}
              <div className="sm:w-36 flex-shrink-0 flex sm:flex-col gap-3 sm:gap-2 items-start sm:pt-0.5">
                <Badge variant={variant} className="text-[10px]">{tag}</Badge>
                <div className="flex items-center gap-1.5 text-[11px] text-charcoal/40">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {date}
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-semibold text-navy-800 text-[16px] leading-snug mb-2.5 group-hover:text-gold-600 transition-colors duration-200">
                  <Link href={href}>{title}</Link>
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-4 max-w-2xl">{excerpt}</p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-gold-600 transition-colors"
                >
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
