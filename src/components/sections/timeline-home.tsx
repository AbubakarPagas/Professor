'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT } from '@/lib/motion'
import type { TimelineEntry, TimelineType } from '@/types'

interface TimelineHomeSectionProps {
  entries: TimelineEntry[]
}

const TYPE_CONFIG: Record<TimelineType | string, { dot: string; pill: string; label: string; line: string }> = {
  education:   { dot: 'bg-sky-400',     pill: 'bg-sky-50 text-sky-700 border-sky-200',           label: 'Education',   line: 'bg-sky-400' },
  milestone:   { dot: 'bg-gold-400',    pill: 'bg-gold-50 text-gold-700 border-gold-200',         label: 'Milestone',   line: 'bg-gold-400' },
  leadership:  { dot: 'bg-navy-500',    pill: 'bg-navy-50 text-navy-700 border-navy-200',         label: 'Leadership',  line: 'bg-navy-500' },
  appointment: { dot: 'bg-emerald-400', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Appointment', line: 'bg-emerald-400' },
}

export function TimelineHomeSection({ entries }: TimelineHomeSectionProps) {
  const preview = entries.slice(0, 6)

  return (
    <section className="section relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }} aria-labelledby="timeline-home-heading">
      {/* Background texture */}
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />

      <div className="container relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label justify-center">Career Journey</span>
          <h2 id="timeline-home-heading" className="section-title mt-1 mb-3">Academic &amp; Professional Timeline</h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/50 max-w-xl mx-auto text-sm leading-relaxed">
            Decades of dedication to engineering education, research leadership, and national development
          </p>
        </motion.div>

        {preview.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm py-12">No timeline entries yet.</p>
        ) : (
          <ol className="relative max-w-4xl mx-auto" aria-label="Career timeline highlights">
            {/* Centre line (desktop) */}
            <motion.div
              className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300 via-gold-200 to-transparent lg:left-1/2 lg:-translate-x-px"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />

            {preview.map((item, i) => {
              const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.milestone
              const period = item.endYear ? `${item.year}–${item.endYear}` : `${item.year}–`
              const isLeft = i % 2 === 0

              return (
                <motion.li
                  key={item.id}
                  className={`relative flex gap-6 mb-10 last:mb-0 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-[14px] mt-1 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full ${cfg.dot} border-[3px] border-white shadow-lg lg:left-1/2 lg:-translate-x-[11px]`}
                    aria-hidden="true"
                  >
                    <div className={`h-1.5 w-1.5 rounded-full bg-white/70`} />
                  </div>

                  {/* Card */}
                  <div className={`ml-14 flex-1 lg:ml-0 lg:w-[calc(50%-3rem)] ${isLeft ? 'lg:mr-[calc(50%+3rem)]' : 'lg:ml-[calc(50%+3rem)]'}`}>
                    <div className="group card-base p-5 hover:shadow-card-hover hover:border-gold-200 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                      {/* Top colour bar */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] ${cfg.line} opacity-70`} aria-hidden="true" />
                      <div className="flex items-center gap-2 mb-3 mt-1">
                        <span className={`pill border text-[10px] font-semibold ${cfg.pill}`}>{cfg.label}</span>
                        <span className="text-[11px] font-bold text-charcoal/40 tracking-wide">{period}</span>
                      </div>
                      <h3 className="font-serif font-semibold text-navy-800 text-[15px] leading-snug mb-1.5">{item.title}</h3>
                      {item.organisation && <p className="text-xs text-gold-600 font-medium mb-1">{item.organisation}</p>}
                      {item.description && <p className="text-sm text-charcoal/60 leading-relaxed line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        )}

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/biography">
              View Full Timeline
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
