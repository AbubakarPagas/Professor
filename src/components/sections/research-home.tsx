import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ResearchProject } from '@/types'

interface ResearchHomeSectionProps {
  projects: ResearchProject[]
}

const ACCENT_CYCLE = [
  { text: 'text-sky-600',     bg: 'bg-sky-50',     hover: 'group-hover:bg-sky-100/60' },
  { text: 'text-violet-600',  bg: 'bg-violet-50',  hover: 'group-hover:bg-violet-100/60' },
  { text: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'group-hover:bg-emerald-100/60' },
  { text: 'text-amber-600',   bg: 'bg-amber-50',   hover: 'group-hover:bg-amber-100/60' },
  { text: 'text-teal-600',    bg: 'bg-teal-50',    hover: 'group-hover:bg-teal-100/60' },
  { text: 'text-rose-600',    bg: 'bg-rose-50',    hover: 'group-hover:bg-rose-100/60' },
]

export function ResearchHomeSection({ projects }: ResearchHomeSectionProps) {
  return (
    <section className="relative section bg-white overflow-hidden" aria-labelledby="research-home-heading">
      <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-ivory-200 pointer-events-none" aria-hidden="true" />

      <div className="container relative">
        <div className="text-center mb-16">
          <span className="section-label justify-center">Research &amp; Expertise</span>
          <h2 id="research-home-heading" className="section-title mt-1 mb-3">Featured Research</h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/55 max-w-xl mx-auto text-sm leading-relaxed">
            Interdisciplinary research advancing engineering science and national development
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-charcoal/40 text-sm py-12">No featured research yet. Mark projects as featured in the admin dashboard.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {projects.slice(0, 6).map((project, idx) => {
              const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length]
              return (
                <article key={project.id} className="group card-base p-7 flex flex-col hover:border-gold-200 hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ${accent.hover} transition-colors duration-300`} aria-hidden="true">
                    <span className={`text-lg font-serif font-bold ${accent.text}`}>{(idx + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-charcoal/35">{project.status}</span>
                    {project.startYear && <span className="text-[10px] text-charcoal/30">{project.startYear}{project.endYear ? `–${project.endYear}` : '–'}</span>}
                  </div>
                  <h3 className="font-serif font-semibold text-navy-800 mb-2.5 text-[15px] leading-snug">{project.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed flex-1">{project.description}</p>
                  {project.fundingBody && (
                    <p className="mt-3 text-xs text-charcoal/40 truncate">Funded by: {project.fundingBody}</p>
                  )}
                </article>
              )
            })}
          </div>
        )}

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/research">All Research Projects <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
