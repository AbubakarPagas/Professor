'use client'

import Link from 'next/link'
import { ArrowRight, Atom, Flame, Leaf, Wrench, Zap, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'
import type { ResearchProject } from '@/types'

interface ResearchHomeSectionProps {
  projects: ResearchProject[]
}

const ACCENT_ICONS = [FlaskConical, Atom, Flame, Leaf, Wrench, Zap]

const ACCENT_CYCLE = [
  { text: 'text-sky-500',     bg: 'bg-sky-50',     border: 'border-sky-200',     glow: 'rgba(14,165,233,0.15)' },
  { text: 'text-violet-500',  bg: 'bg-violet-50',  border: 'border-violet-200',  glow: 'rgba(139,92,246,0.15)' },
  { text: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', glow: 'rgba(16,185,129,0.15)' },
  { text: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-200',   glow: 'rgba(245,158,11,0.15)' },
  { text: 'text-teal-500',    bg: 'bg-teal-50',    border: 'border-teal-200',    glow: 'rgba(20,184,166,0.15)' },
  { text: 'text-rose-500',    bg: 'bg-rose-50',    border: 'border-rose-200',    glow: 'rgba(244,63,94,0.15)' },
]

export function ResearchHomeSection({ projects }: ResearchHomeSectionProps) {
  return (
    <section className="relative section overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }} aria-labelledby="research-home-heading">
      {/* Background decor */}
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-ivory-200 pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-16 -top-16 h-[320px] w-[320px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(197,161,90,0.07), transparent 70%)' }} aria-hidden="true" />

      <div className="container relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label justify-center">Research &amp; Expertise</span>
          <h2 id="research-home-heading" className="section-title mt-1 mb-3">Featured Research Areas</h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/50 max-w-xl mx-auto text-sm leading-relaxed">
            Interdisciplinary research advancing engineering science, manufacturing technology, and national development
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm py-12">No featured research yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {projects.slice(0, 6).map((project, idx) => {
              const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length]
              const Icon   = ACCENT_ICONS[idx % ACCENT_ICONS.length]
              return (
                <motion.article
                  key={project.id}
                  variants={staggerItem}
                  className="group card-base p-6 flex flex-col hover:border-gold-200 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                >
                  {/* Hover shimmer line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-gold-400 transition-all duration-500" aria-hidden="true" />

                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg} border ${accent.border} group-hover:scale-110 transition-transform duration-300`} aria-hidden="true"
                    style={{ boxShadow: `0 4px 20px ${accent.glow}` }}>
                    <Icon className={`h-5 w-5 ${accent.text}`} />
                  </div>

                  <div className="flex items-center gap-2 mb-2.5">
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${accent.text} opacity-70`}>{project.status}</span>
                    {project.startYear && (
                      <span className="text-[10px] text-charcoal/30">{project.startYear}{project.endYear ? `–${project.endYear}` : '–'}</span>
                    )}
                  </div>

                  <h3 className="font-serif font-semibold text-navy-800 mb-2.5 text-[15px] leading-snug">{project.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed flex-1">{project.description}</p>

                  {project.fundingBody && (
                    <div className="mt-4 pt-4 border-t border-ivory-100">
                      <p className="text-[11px] text-charcoal/40 truncate">
                        <span className="font-semibold text-charcoal/50">Funded by:</span> {project.fundingBody}
                      </p>
                    </div>
                  )}
                </motion.article>
              )
            })}
          </motion.div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5 }}
        >
          <Button asChild size="lg" className="group">
            <Link href="/research">
              All Research Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
