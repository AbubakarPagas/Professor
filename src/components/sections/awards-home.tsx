'use client'

import Link from 'next/link'
import { ArrowRight, Trophy, Globe, Star, Medal, GraduationCap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem, slideLeft, slideRight } from '@/lib/motion'
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

const CATEGORY_STYLE: Record<AwardCategory, { color: string; bg: string; border: string; glow: string }> = {
  national:      { color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200',  glow: '0 4px 20px rgba(245,158,11,0.15)' },
  international: { color: 'text-sky-600',    bg: 'bg-sky-50',    border: 'border-sky-200',    glow: '0 4px 20px rgba(14,165,233,0.15)' },
  fellowship:    { color: 'text-gold-600',   bg: 'bg-gold-50',   border: 'border-gold-200',   glow: '0 4px 20px rgba(197,161,90,0.2)' },
  recognition:   { color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', glow: '0 4px 20px rgba(139,92,246,0.15)' },
  academic:      { color: 'text-teal-600',   bg: 'bg-teal-50',   border: 'border-teal-200',   glow: '0 4px 20px rgba(20,184,166,0.15)' },
}

export function AwardsHomeSection({ awards, totalCount }: AwardsHomeSectionProps) {
  const fellowshipCount = awards.filter(a => a.category === 'fellowship' || a.category === 'international').length

  return (
    <section className="section relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fdfcf8 50%, #f9f7f2 100%)' }} aria-labelledby="awards-home-heading">
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle at top right, rgba(197,161,90,0.07), transparent 70%)' }}
        aria-hidden="true" />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky heading */}
          <motion.div
            className="lg:sticky lg:top-28"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <Sparkles className="h-4 w-4 text-gold-500" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-500">Honours &amp; Recognition</span>
            </div>
            <h2 id="awards-home-heading" className="section-title mb-3">Awards, Fellowships &amp; International Recognition</h2>
            <div className="gold-rule mb-7" aria-hidden="true" />
            <p className="text-charcoal/65 leading-[1.85] text-[15px] mb-10 max-w-md">
              Decades of engineering excellence recognised by national and international professional bodies, governments, and academic institutions across four continents.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-6 rounded-2xl border border-ivory-300 bg-white text-center shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                <p className="font-serif font-bold text-navy-800 text-4xl mb-1 stat-number">{totalCount > 0 ? `${totalCount}+` : '30+'}</p>
                <div className="h-px w-8 mx-auto bg-gold-200 my-2" aria-hidden="true" />
                <p className="text-xs text-charcoal/50 uppercase tracking-widest">Awards &amp; Honours</p>
              </div>
              <div className="p-6 rounded-2xl border border-ivory-300 bg-white text-center shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                <p className="font-serif font-bold text-navy-800 text-4xl mb-1 stat-number">{fellowshipCount > 0 ? `${fellowshipCount}` : '5+'}</p>
                <div className="h-px w-8 mx-auto bg-gold-200 my-2" aria-hidden="true" />
                <p className="text-xs text-charcoal/50 uppercase tracking-widest">Fellowships &amp; Int&apos;l</p>
              </div>
            </div>

            <Button asChild size="lg" className="group">
              <Link href="/awards">
                View All Awards
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          {/* Right — highlights */}
          {awards.length === 0 ? (
            <p className="text-charcoal/40 text-sm py-12 text-center">No awards yet.</p>
          ) : (
            <motion.ul
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              role="list"
              aria-label="Award highlights"
            >
              {awards.slice(0, 4).map((award, i) => {
                const Icon  = CATEGORY_ICON[award.category]  ?? Trophy
                const style = CATEGORY_STYLE[award.category] ?? CATEGORY_STYLE.recognition
                return (
                  <motion.li
                    key={award.id}
                    variants={staggerItem}
                    className="group flex items-start gap-5 p-6 card-base hover:border-gold-200 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
                  >
                    <div
                      className={`flex h-13 w-13 min-w-[52px] min-h-[52px] items-center justify-center rounded-2xl ${style.bg} border ${style.border} group-hover:scale-110 transition-transform duration-300`}
                      style={{ boxShadow: style.glow }}
                      aria-hidden="true"
                    >
                      <Icon className={`h-6 w-6 ${style.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-charcoal/35 block mb-1 capitalize">{award.category}</span>
                      <p className="font-serif font-semibold text-navy-800 text-[15px] leading-snug mb-0.5">{award.title}</p>
                      <p className="text-sm text-charcoal/55 truncate">{award.organisation} · {award.year}</p>
                      {award.description && (
                        <p className="text-xs text-charcoal/45 mt-1.5 line-clamp-2">{award.description}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-xs font-bold text-charcoal/20 font-serif self-start pt-1">{award.year}</div>
                  </motion.li>
                )
              })}
            </motion.ul>
          )}

        </div>
      </div>
    </section>
  )
}
