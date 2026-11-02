import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ResearchProject, ResearchStatus } from '@/types'

interface ProjectsHomeSectionProps {
  projects: ResearchProject[]
}

const STATUS_VARIANT: Record<ResearchStatus, 'success' | 'secondary' | 'warning'> = {
  ongoing:   'success',
  completed: 'secondary',
  planned:   'warning',
}

export function ProjectsHomeSection({ projects }: ProjectsHomeSectionProps) {
  return (
    <section className="relative section bg-navy-800 overflow-hidden" aria-labelledby="projects-home-heading">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 70%, rgba(197,161,90,0.07) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} aria-hidden="true" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="section-label text-gold-400/80 justify-center">Projects &amp; Initiatives</span>
          <h2 id="projects-home-heading" className="font-serif text-display-md text-white mt-1 mb-3 leading-tight">Featured Projects &amp; Innovation Initiatives</h2>
          <div className="h-[2px] w-10 bg-gradient-to-r from-gold-400 to-gold-300 mx-auto mb-5 rounded-full" aria-hidden="true" />
          <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
            Flagship programmes translating research excellence into national and continental impact
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-white/30 text-sm py-12">No featured projects yet. Mark projects as featured in the admin dashboard.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {projects.slice(0, 4).map(project => (
              <article key={project.id} className="group relative flex flex-col p-7 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-gold-400/25 transition-all duration-300">
                <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400/40 transition-all duration-500" aria-hidden="true" />
                <div className="flex items-start justify-between gap-3 mb-5">
                  {project.fundingBody && (
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gold-400/70">{project.fundingBody}</span>
                  )}
                  <Badge variant={STATUS_VARIANT[project.status]} className="flex-shrink-0 text-[10px] capitalize">{project.status}</Badge>
                </div>
                <h3 className="font-serif font-semibold text-white text-[15px] leading-snug mb-3">{project.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed flex-1 mb-6">{project.description}</p>
                {project.keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.keywords.slice(0, 3).map(k => (
                      <span key={k} className="text-[10px] text-white/30 border border-white/10 rounded-full px-2 py-0.5">{k}</span>
                    ))}
                  </div>
                )}
                <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/35 hover:text-white">
            <Link href="/projects">View All Projects <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
