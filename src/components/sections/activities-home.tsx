'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'
import type { Activity, ActivityCategory } from '@/types'

interface ActivitiesHomeSectionProps {
  activities: Activity[]
}

const CAT_VARIANT: Partial<Record<ActivityCategory, 'default' | 'gold' | 'success'>> = {
  conference:       'default',
  workshop:         'default',
  lecture:          'default',
  award_ceremony:   'gold',
  entrepreneurship: 'gold',
  mentorship:       'success',
  community:        'success',
}

const CAT_BAR: Partial<Record<ActivityCategory, string>> = {
  conference:       'bg-sky-500',
  workshop:         'bg-violet-500',
  lecture:          'bg-navy-500',
  award_ceremony:   'bg-gold-400',
  entrepreneurship: 'bg-amber-500',
  mentorship:       'bg-emerald-500',
  community:        'bg-teal-500',
}

export function ActivitiesHomeSection({ activities }: ActivitiesHomeSectionProps) {
  return (
    <section className="relative section overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfcf9 0%, #f8f5ef 50%, #f2ede4 100%)' }} aria-labelledby="activities-home-heading">
      {/* Background texture */}
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
      <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(197,161,90,0.06), transparent 70%)' }}
        aria-hidden="true" />

      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Activities &amp; Events</span>
            <h2 id="activities-home-heading" className="section-title mt-1">Recent Activities</h2>
            <div className="gold-rule mt-4" aria-hidden="true" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
          >
            <Button asChild variant="outline" size="sm" className="group">
              <Link href="/activities">
                All Activities
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {activities.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm py-12">No activities yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {activities.slice(0, 3).map(activity => {
              const variant = CAT_VARIANT[activity.category] ?? 'default'
              const barColor = CAT_BAR[activity.category] ?? 'bg-navy-500'
              return (
                <motion.article
                  key={activity.id}
                  variants={staggerItem}
                  className="group card-base flex flex-col overflow-hidden hover:border-gold-200 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Category colour bar */}
                  <div className={`h-[3px] w-full ${barColor} flex-shrink-0`} aria-hidden="true" />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={variant} className="text-[10px] capitalize">{activity.category.replace(/_/g, ' ')}</Badge>
                      <div className="flex items-center gap-1 text-[11px] text-charcoal/40 font-medium">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {formatDate(activity.date)}
                      </div>
                    </div>

                    <h3 className="font-serif font-semibold text-navy-800 text-[15px] leading-snug mb-3 flex-1 group-hover:text-navy-700 transition-colors">{activity.title}</h3>

                    {activity.venue && (
                      <div className="flex items-center gap-1.5 text-xs text-charcoal/45 mb-3">
                        <MapPin className="h-3 w-3 flex-shrink-0 text-gold-400" aria-hidden="true" />
                        {activity.venue}
                      </div>
                    )}

                    <p className="text-sm text-charcoal/60 leading-relaxed mb-5 line-clamp-3">{activity.summary}</p>

                    <Link
                      href={`/activities/${activity.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-gold-600 transition-colors mt-auto group/link"
                    >
                      Read report
                      <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
