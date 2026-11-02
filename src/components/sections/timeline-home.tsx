import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TimelineEntry, TimelineType } from '@/types'

interface TimelineHomeSectionProps {
  entries: TimelineEntry[]
}

const TYPE_CONFIG: Record<TimelineType | string, { dot: string; pill: string; label: string }> = {
  education:   { dot: 'bg-blue-400',    pill: 'bg-blue-50 text-blue-700 border-blue-200',         label: 'Education' },
  milestone:   { dot: 'bg-gold-400',    pill: 'bg-gold-50 text-gold-700 border-gold-200',         label: 'Milestone' },
  leadership:  { dot: 'bg-navy-500',    pill: 'bg-navy-50 text-navy-700 border-navy-200',         label: 'Leadership' },
  appointment: { dot: 'bg-emerald-400', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Appointment' },
}

export function TimelineHomeSection({ entries }: TimelineHomeSectionProps) {
  const preview = entries.slice(0, 6)

  return (
    <section className="section bg-ivory-100" aria-labelledby="timeline-home-heading">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section-label justify-center">Career Journey</span>
          <h2 id="timeline-home-heading" className="section-title mt-1 mb-3">Academic &amp; Professional Timeline</h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/55 max-w-xl mx-auto text-sm leading-relaxed">
            Decades of dedication to engineering education, research leadership, and national development
          </p>
        </div>

        {preview.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm py-12">No timeline entries yet. Add them from the admin dashboard.</p>
        ) : (
          <ol className="relative max-w-3xl mx-auto" aria-label="Career timeline highlights">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300 via-ivory-300 to-ivory-300 lg:left-1/2 lg:-translate-x-px" aria-hidden="true" />

            {preview.map((item, i) => {
              const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.milestone
              const period = item.endYear ? `${item.year}–${item.endYear}` : `${item.year}–`
              return (
                <li key={item.id} className={`relative flex gap-6 mb-8 last:mb-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`absolute left-[14px] w-[22px] h-[22px] rounded-full ${cfg.dot} border-[3px] border-white shadow-md z-10 lg:left-1/2 lg:-translate-x-[11px] mt-1`} aria-hidden="true" />
                  <div className={`ml-14 flex-1 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'lg:mr-[calc(50%+2.5rem)]' : 'lg:ml-[calc(50%+2.5rem)]'}`}>
                    <div className="card-base p-5 hover:shadow-card-hover hover:border-gold-200 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`pill border text-[10px] font-semibold ${cfg.pill}`}>{cfg.label}</span>
                        <span className="text-[11px] font-bold text-charcoal/40 tracking-wide">{period}</span>
                      </div>
                      <h3 className="font-serif font-semibold text-navy-800 text-[15px] leading-snug mb-2">{item.title}</h3>
                      {item.organisation && <p className="text-xs text-charcoal/45 mb-1">{item.organisation}</p>}
                      {item.description && <p className="text-sm text-charcoal/60 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        )}

        <div className="text-center mt-14">
          <Button asChild variant="outline" size="lg">
            <Link href="/biography">View Full Timeline <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
