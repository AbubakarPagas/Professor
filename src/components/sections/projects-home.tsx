import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const PROJECTS = [
  {
    tag: 'Institutional Leadership',
    title: 'Advanced Manufacturing Technology Development Institute (AMTDI)',
    desc: 'Established at NASENI to drive Nigeria\'s manufacturing capacity, provide indigenous solutions and reduce import dependency across critical industrial sectors.',
    href: '/projects',
    status: 'Active',
  },
  {
    tag: 'Entrepreneurship',
    title: 'Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship (ASR-ICiE)',
    desc: 'An international centre fostering engineering entrepreneurship, technology commercialisation, and innovation-driven enterprise development in Africa.',
    href: '/projects',
    status: 'Active',
  },
  {
    tag: 'UNDP Initiative',
    title: 'Timbuktoo UniPod — Young Africa Innovates',
    desc: 'The UNDP-supported UniPod initiative enabling young African innovators to develop market-ready solutions aligned with sustainable development goals.',
    href: '/projects',
    status: 'Active',
  },
  {
    tag: 'Research Programme',
    title: 'STEP-B Project',
    desc: 'Science and Technology Education Post-Basic project aimed at strengthening technical and vocational education for engineering entrepreneurship.',
    href: '/projects',
    status: 'Completed',
  },
]

const STATUS_VARIANT: Record<string, 'success' | 'secondary' | 'warning'> = {
  Active: 'success',
  Completed: 'secondary',
  Planned: 'warning',
}

export function ProjectsHomeSection() {
  return (
    <section
      className="relative section bg-navy-800 overflow-hidden"
      aria-labelledby="projects-home-heading"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 70%, rgba(197,161,90,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="section-label text-gold-400/80 justify-center">Projects &amp; Initiatives</span>
          <h2 id="projects-home-heading" className="font-serif text-display-md text-white mt-1 mb-3 leading-tight">
            Featured Projects &amp; Innovation Initiatives
          </h2>
          <div className="h-[2px] w-10 bg-gradient-to-r from-gold-400 to-gold-300 mx-auto mb-5 rounded-full" aria-hidden="true" />
          <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
            Flagship programmes translating research excellence into national and continental impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {PROJECTS.map(({ tag, title, desc, href, status }) => (
            <article
              key={title}
              className="group relative flex flex-col p-7 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-gold-400/25 transition-all duration-300"
            >
              {/* Top gold accent line on hover */}
              <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400/40 transition-all duration-500" aria-hidden="true" />

              <div className="flex items-start justify-between gap-3 mb-5">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gold-400/70">
                  {tag}
                </span>
                <Badge variant={STATUS_VARIANT[status]} className="flex-shrink-0 text-[10px]">
                  {status}
                </Badge>
              </div>
              <h3 className="font-serif font-semibold text-white text-[15px] leading-snug mb-3">
                {title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1 mb-6">{desc}</p>
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
              >
                Learn more
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 hover:border-white/35 hover:text-white"
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
