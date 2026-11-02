import Link from 'next/link'
import { ArrowRight, Trophy, Globe, Star, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Award, AwardCategory } from '@/types'

interface AwardsHomeSectionProps {
  awards: Award[]
  totalCount: number
}

const CATEGORY_ICON: Record<AwardCategory, typeof Trophy> = {
  national:      Trophy,
  international: Globe,
  fellowship:    Star,
  recognition:   Medal,
  academic:      GraduationCap,
}

const CATEGORY_STYLE: Record<AwardCategory, { color: string; bg: string; border: string }> = {
  national:      { color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  international: { color: 'text-sky-600',    bg: 'bg-sky-50',    border: 'border-sky-200' },
  fellowship:    { color: 'text-gold-600',   bg: 'bg-gold-50',   border: 'border-gold-200' },
  recognition:   { color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  academic:      { color: 'text-teal-600',   bg: 'bg-teal-50',   border: 'border-teal-200' },
}

import { GraduationCap } from 'lucide-react'

export function AwardsHomeSection({ awards, totalCount }: AwardsHomeSectionProps) {
  const fellowshipCount = awards.filter(a => a.category === 'fellowship' || a.category === 'international').length

  return (
    <section className="section bg-ivory-100" aria-labelledby="awards-home-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading */}
          <div className="lg:sticky lg:top-28">
            <span className="section-label">Honours &amp; Recognition</span>
            <h2 id="awards-home-heading" className="section-title mt-1 mb-3">Awards, Fellowships &amp; International Recognition</h2>
            <div className="gold-rule mb-7" aria-hidden="true" />
            <p className="text-charcoal/65 leading-[1.85] text-[15px] mb-10 max-w-md">
              Decades of engineering excellence recognised by national and international professional bodies, governments, and academic institutions.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-xl border border-ivory-300 bg-white text-center shadow-card">
                <p className="font-serif font-bold text-navy-800 text-3xl mb-1">{totalCount > 0 ? `${totalCount}+` : '—'}</p>
                <p className="text-xs text-charcoal/50 uppercase tracking-widest">Awards &amp; Honours</p>
              </div>
              <div className="p-5 rounded-xl border border-ivory-300 bg-white text-center shadow-card">
                <p className="font-serif font-bold text-navy-800 text-3xl mb-1">{fellowshipCount > 0 ? fellowshipCount : '—'}</p>
                <p className="text-xs text-charcoal/50 uppercase tracking-widest">Fellowships &amp; Int&apos;l</p>
              </div>
            </div>

            <Button asChild size="lg">
              <Link href="/awards">View All Awards <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
            </Button>
          </div>

          {/* Right — highlights */}
          {awards.length === 0 ? (
            <p className="text-charcoal/40 text-sm py-12 text-center">No awards yet. Add them from the admin dashboard.</p>
          ) : (
            <ul className="space-y-4" role="list" aria-label="Award highlights">
              {awards.slice(0, 4).map(award => {
                const Icon  = CATEGORY_ICON[award.category]  ?? Trophy
                const style = CATEGORY_STYLE[award.category] ?? CATEGORY_STYLE.recognition
                return (
                  <li key={award.id} className="group flex items-start gap-5 p-6 card-base hover:border-gold-200 hover:-translate-y-0.5 transition-all duration-300">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${style.bg} border ${style.border} group-hover:scale-105 transition-transform duration-300`} aria-hidden="true">
                      <Icon className={`h-5 w-5 ${style.color}`} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-charcoal/35 block mb-1 capitalize">{award.category}</span>
                      <p className="font-serif font-semibold text-navy-800 text-[15px] leading-snug mb-0.5">{award.title}</p>
                      <p className="text-sm text-charcoal/55">{award.organisation} · {award.year}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

        </div>
      </div>
    </section>
  )
}
