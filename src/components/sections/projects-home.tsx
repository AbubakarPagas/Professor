'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'
import type { ResearchProject, ResearchStatus } from '@/types'

interface ProjectsHomeSectionProps {
  projects: ResearchProject[]
}

const STATUS_VARIANT: Record<ResearchStatus, 'success' | 'secondary' | 'warning'> = {
  ongoing:   'success',
  completed: 'secondary',
  planned:   'warning',
}

const CARD_ACCENTS = [
  'from-sky-500/10 to-transparent border-sky-500/20',
  'from-gold-500/10 to-transparent border-gold-400/20',
  'from-emerald-500/10 to-transparent border-emerald-500/20',
  'from-violet-500/10 to-transparent border-violet-500/20',
]

export function ProjectsHomeSection({ projects }: ProjectsHomeSectionProps) {
  return (
    <section className="relative section overflow-hidden" aria-labelledby="projects-home-heading">
      {/* Dark background with mesh */}
      <div className="absolute inset-0 bg-navy-900 bg-mesh-dark" aria-hidden="true" />
      <div className="absolute inset-0 pattern-dots" aria-hidden="true" />
      <div className="absolute inset-0 pattern-circuit opacity-40" aria-hidden="true" />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label text-gold-400/80 justify-center">Projects &amp; Initiatives</span>
          <h2 id="projects-home-heading" className="font-serif text-display-md text-white mt-1 mb-3 leading-tight">
            Featured Innovation Initiatives
          </h2>
          <div className="h-[2px] w-14 bg-gradient-to-r from-gold-400 to-gold-300 mx-auto mb-5 rounded-full" aria-hidden="true" />
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Flagship programmes translating research excellence into national and continental impact
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-center text-white/30 text-sm py-12">No featured projects yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {projects.slice(0, 4).map((project, i) => (
              <motion.article
                key={project.id}
                variants={staggerItem}
                className={`group relative flex flex-col p-7 rounded-2xl border bg-gradient-to-br ${CARD_ACCENTS[i % CARD_ACCENTS.length]} hover:border-gold-400/30 transition-all duration-400 overflow-hidden`}
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {/* Animated top line */}
                <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400/60 transition-all duration-600" aria-hidden="true" />

                <div className="flex items-start justify-between gap-3 mb-5">
                  {project.fundingBody && (
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gold-400/70 flex-1">{project.fundingBody}</span>
                  )}
                  <Badge variant={STATUS_VARIANT[project.status]} className="flex-shrink-0 text-[10px] capitalize">{project.status}</Badge>
                </div>

                <h3 className="font-serif font-semibold text-white text-[16px] leading-snug mb-3">{project.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed flex-1 mb-6">{project.description}</p>

                {project.keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.keywords.slice(0, 4).map(k => (
                      <span key={k} className="text-[10px] text-white/35 border border-white/[0.1] rounded-full px-2.5 py-0.5">{k}</span>
                    ))}
                  </div>
                )}

                <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors group/link">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
        >
          <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/35 hover:text-white group">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
