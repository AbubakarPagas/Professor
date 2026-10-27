'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, ArrowRight, CalendarDays } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getActivities } from '@/lib/firestore'
import { formatDate } from '@/lib/utils'
import type { ActivityCategory } from '@/types'

const CAT_LABEL: Record<ActivityCategory, string> = {
  conference:      'Conference',
  workshop:        'Workshop',
  lecture:         'Lecture',
  award_ceremony:  'Award Ceremony',
  field_visit:     'Field Visit',
  collaboration:   'Collaboration',
  entrepreneurship: 'Entrepreneurship',
  mentorship:      'Mentorship',
  community:       'Community',
  other:           'Other',
}

const CAT_VARIANT: Record<ActivityCategory, 'default' | 'gold' | 'success' | 'secondary' | 'warning'> = {
  conference:      'default',
  workshop:        'secondary',
  lecture:         'secondary',
  award_ceremony:  'gold',
  field_visit:     'success',
  collaboration:   'secondary',
  entrepreneurship: 'gold',
  mentorship:      'success',
  community:       'secondary',
  other:           'secondary',
}

const FILTER_OPTIONS: Array<ActivityCategory | 'all'> = [
  'all', 'conference', 'workshop', 'lecture', 'entrepreneurship', 'mentorship',
]

export function ActivitiesClient() {
  const { data: activities, loading } = useFirestoreData(() => getActivities(true))
  const [catFilter, setCatFilter] = useState<ActivityCategory | 'all'>('all')

  const filtered = (activities ?? []).filter(
    a => catFilter === 'all' || a.category === catFilter
  )

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 rounded-lg bg-ivory-200 animate-pulse" />
      ))}
    </div>
  )

  if (!activities?.length) return (
    <div className="py-20 text-center text-charcoal/50">
      <CalendarDays className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
      <p>Activity reports will appear here once published.</p>
    </div>
  )

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {FILTER_OPTIONS.map(f => (
          <Button
            key={f}
            size="sm"
            variant={catFilter === f ? 'default' : 'outline'}
            onClick={() => setCatFilter(f)}
            aria-pressed={catFilter === f}
            className="capitalize"
          >
            {f === 'all' ? 'All' : CAT_LABEL[f as ActivityCategory]}
          </Button>
        ))}
      </div>

      {!filtered.length ? (
        <p className="py-10 text-center text-charcoal/50 text-sm">No activities match this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(activity => (
            <article key={activity.id} className="card-base overflow-hidden flex flex-col group">
              {/* Cover image */}
              <div className="relative h-44 bg-navy-50 flex-shrink-0">
                {activity.coverImageUrl ? (
                  <Image
                    src={activity.coverImageUrl}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <CalendarDays className="h-10 w-10 text-navy-200" aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={CAT_VARIANT[activity.category]} className="text-[11px]">
                    {CAT_LABEL[activity.category]}
                  </Badge>
                  {activity.featured && (
                    <Badge variant="gold" className="text-[11px]">Featured</Badge>
                  )}
                </div>

                <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-2 flex-1">
                  {activity.title}
                </h2>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-4">{activity.summary}</p>

                <div className="space-y-1 text-xs text-charcoal/45 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {formatDate(activity.date)}
                  </div>
                  {activity.venue && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {activity.venue}
                    </div>
                  )}
                </div>

                <Link
                  href={`/activities/${activity.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-navy-700 hover:text-gold-500 transition-colors mt-auto"
                >
                  Read full report
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
