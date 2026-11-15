'use client'

import { useState } from 'react'
import { Calendar, Users, Microscope, FlaskConical, Atom, Flame, Leaf, Wrench, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getResearchProjects } from '@/lib/firestore'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'
import type { ResearchStatus } from '@/types'

const STATUS_CONFIG: Record<ResearchStatus, { label: string; variant: 'success' | 'secondary' | 'warning' }> = {
  ongoing:   { label: 'Ongoing',   variant: 'success' },
  completed: { label: 'Completed', variant: 'secondary' },
  planned:   { label: 'Planned',   variant: 'warning' },
}

const ICON_CYCLE = [FlaskConical, Atom, Flame, Leaf, Wrench, Zap]

const ACCENT_CYCLE = [
  { text: 'text-sky-500',     bg: 'bg-sky-50',     border: 'border-sky-200',     glow: 'rgba(14,165,233,0.12)' },
  { text: 'text-violet-500',  bg: 'bg-violet-50',  border: 'border-violet-200',  glow: 'rgba(139,92,246,0.12)' },
  { text: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', glow: 'rgba(16,185,129,0.12)' },
  { text: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-200',   glow: 'rgba(245,158,11,0.12)' },
  { text: 'text-teal-500',    bg: 'bg-teal-50',    border: 'border-teal-200',    glow: 'rgba(20,184,166,0.12)' },
  { text: 'text-rose-500',    bg: 'bg-rose-50',    border: 'border-rose-200',    glow: 'rgba(244,63,94,0.12)' },
]

const FILTERS: Array<ResearchStatus | 'all'> = ['all', 'ongoing', 'completed', 'planned']

export function ResearchClient() {
  const { data: projects, loading, error } = useFirestoreData(getResearchProjects)
  const [filter, setFilter] = useState<ResearchStatus | 'all'>('all')

  const filtered = (projects ?? []).filter(p => filter === 'all' || p.status === filter)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-52 rounded-2xl bg-ivory-200 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) return <p className="text-red-600 py-10">Error loading research data.</p>

  if (!projects?.length) {
    return (
      <div className="py-20 text-center text-charcoal/50">
        <Microscope className="h-12 w-12 mx-auto mb-4 opacity-30" aria-hidden="true" />
        <p>Research projects will appear here once added via the admin dashboard.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by status">
        {FILTERS.map(f => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className="capitalize rounded-full"
          >
            {f === 'all' ? 'All Projects' : STATUS_CONFIG[f as ResearchStatus].label}
          </Button>
        ))}
      </div>

      <p className="text-sm text-charcoal/45 mb-6">
        Showing <span className="font-semibold text-charcoal/70">{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={filter}
      >
        {filtered.map((project, idx) => {
          const sc     = STATUS_CONFIG[project.status]
          const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length]
          const Icon   = ICON_CYCLE[idx % ICON_CYCLE.length]
          return (
            <motion.article
              key={project.id}
              variants={staggerItem}
              className="card-base p-6 flex flex-col overflow-hidden hover:border-gold-200 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent.bg} border ${accent.border} flex-shrink-0`}
                  style={{ boxShadow: `0 4px 20px ${accent.glow}` }}
                  aria-hidden="true"
                >
                  <Icon className={`h-5 w-5 ${accent.text}`} />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={sc.variant} className="text-[10px]">{sc.label}</Badge>
                  <span className="flex items-center gap-1 text-xs text-charcoal/40">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {project.startYear}{project.endYear ? `–${project.endYear}` : '–present'}
                  </span>
                </div>
              </div>

              <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-2.5 flex-1">
                {project.title}
              </h2>
              <p className="text-sm text-charcoal/60 leading-relaxed mb-4">{project.description}</p>

              {project.fundingBody && (
                <p className="text-xs text-charcoal/45 mb-2">
                  <span className="font-semibold text-charcoal/55">Funded by:</span> {project.fundingBody}
                  {project.fundingAmount && ` · ${project.fundingAmount}`}
                </p>
              )}
              {project.collaborators && project.collaborators.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-charcoal/45 mb-3">
                  <Users className="h-3 w-3" aria-hidden="true" />
                  {project.collaborators.join(', ')}
                </div>
              )}
              {project.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-ivory-100">
                  {project.keywords.slice(0, 4).map(kw => (
                    <span key={kw} className={`text-[10px] ${accent.text} ${accent.bg} border ${accent.border} rounded-full px-2.5 py-0.5 font-medium`}>{kw}</span>
                  ))}
                </div>
              )}
            </motion.article>
          )
        })}
      </motion.div>
    </div>
  )
}
