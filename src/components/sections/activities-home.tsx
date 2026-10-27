import Link from 'next/link'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const ACTIVITIES = [
  {
    category: 'Conference',
    variant: 'default' as const,
    title: 'International Conference on Manufacturing Technology',
    date: 'October 2024',
    venue: 'Abuja, Nigeria',
    excerpt: 'Keynote address on indigenous manufacturing solutions and the role of AMTDI in Nigeria\'s industrial transformation.',
    href: '/activities',
  },
  {
    category: 'Entrepreneurship',
    variant: 'gold' as const,
    title: 'Young Africa Innovates — Cohort Launch',
    date: 'August 2024',
    venue: 'Lagos, Nigeria',
    excerpt: 'Launch of the latest cohort of the Young Africa Innovates programme, bringing together 80 emerging engineering entrepreneurs.',
    href: '/activities',
  },
  {
    category: 'Mentorship',
    variant: 'success' as const,
    title: 'Engineering Mentorship Forum',
    date: 'June 2023',
    venue: 'Kano, Nigeria',
    excerpt: 'Annual gathering of mentees and mentors across Prof. Dauda\'s extended professional network for structured knowledge exchange.',
    href: '/activities',
  },
]

export function ActivitiesHomeSection() {
  return (
    <section className="relative section bg-white overflow-hidden" aria-labelledby="activities-home-heading">

      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <div>
            <span className="section-label">Activities &amp; Events</span>
            <h2 id="activities-home-heading" className="section-title mt-1">
              Recent Activities
            </h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/activities">
              All Activities
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTIVITIES.map(({ category, variant, title, date, venue, excerpt, href }) => (
            <article
              key={title}
              className="group card-base p-7 flex flex-col hover:border-gold-200 hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Top colour strip */}
              <div
                className={`h-[3px] -mx-7 -mt-7 mb-6 rounded-t-xl ${
                  variant === 'gold' ? 'bg-gold-400' :
                  variant === 'success' ? 'bg-emerald-400' : 'bg-navy-500'
                }`}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between mb-4">
                <Badge variant={variant} className="text-[10px]">{category}</Badge>
                <div className="flex items-center gap-1 text-[11px] text-charcoal/40 font-medium">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {date}
                </div>
              </div>
              <h3 className="font-serif font-semibold text-navy-800 text-[15px] leading-snug mb-3 flex-1">
                {title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-charcoal/45 mb-3">
                <MapPin className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                {venue}
              </div>
              <p className="text-sm text-charcoal/60 leading-relaxed mb-5">{excerpt}</p>
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-gold-600 transition-colors mt-auto"
              >
                Read report
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
