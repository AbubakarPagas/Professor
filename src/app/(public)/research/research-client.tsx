'use client'

import { useState } from 'react'
import { Calendar, Users, Tag, Microscope } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getResearchProjects } from '@/lib/firestore'
import type { ResearchStatus } from '@/types'

const STATUS_CONFIG: Record<ResearchStatus, { label: string; variant: 'success' | 'secondary' | 'warning' }> = {
  ongoing:   { label: 'Ongoing',   variant: 'success' },
  completed: { label: 'Completed', variant: 'secondary' },
  planned:   { label: 'Planned',   variant: 'warning' },
}

const FILTERS: Array<ResearchStatus | 'all'> = ['all', 'ongoing', 'completed', 'planned']

export function ResearchClient() {
  const { data: projects, loading, error } = useFirestoreData(getResearchProjects)
  const [filter, setFilter] = useState<ResearchStatus | 'all'>('all')

  const filtered = (projects ?? []).filter(p => filter === 'all' || p.status === filter)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 rounded-lg bg-ivory-200 animate-pulse" />
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
            className="capitalize"
          >
            {f === 'all' ? 'All Projects' : f}
          </Button>
        ))}
      </div>

      <p className="text-sm text-charcoal/50 mb-6">
        Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(project => {
          const sc = STATUS_CONFIG[project.status]
          return (
            <article key={project.id} className="card-base p-6 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <Badge variant={sc.variant}>{sc.label}</Badge>
                <span className="flex items-center gap-1 text-xs text-charcoal/45">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {project.startYear}{project.endYear ? `–${project.endYear}` : '–present'}
                </span>
              </div>
              <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-2 flex-1">
                {project.title}
              </h2>
              <p className="text-sm text-charcoal/65 leading-relaxed mb-4">{project.description}</p>
              {project.fundingBody && (
                <p className="text-xs text-charcoal/50 mb-3">
                  <strong>Funded by:</strong> {project.fundingBody}
                  {project.fundingAmount && ` · ${project.fundingAmount}`}
                </p>
              )}
              {project.collaborators && project.collaborators.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-charcoal/50 mb-3">
                  <Users className="h-3 w-3" aria-hidden="true" />
                  {project.collaborators.join(', ')}
                </div>
              )}
              {project.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-ivory-300">
                  {project.keywords.map(kw => (
                    <Badge key={kw} variant="secondary" className="text-[11px]">{kw}</Badge>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
