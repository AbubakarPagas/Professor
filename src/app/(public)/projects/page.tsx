'use client'

import { PageHero } from '@/components/layout/page-hero'
import { ArrowRight, Building2, Globe, Lightbulb, Rocket, BookOpen, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'

const PROJECTS = [
  {
    tag: 'National Institution',
    status: 'Active',
    icon: Building2,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    glow: 'rgba(14,165,233,0.12)',
    title: 'Advanced Manufacturing Technology Development Institute (AMTDI)',
    org: 'NASENI — National Agency for Science and Engineering Infrastructure',
    description:
      'Established under the leadership of Professor Dauda as Director-General of NASENI, AMTDI is Nigeria\'s foremost institute for advanced manufacturing research and development. Its mandate is to develop indigenous manufacturing technologies, train engineers, and reduce Nigeria\'s dependence on imported industrial equipment.',
    outcomes: [
      'Development of agro-processing machinery prototypes',
      'Training programmes for hundreds of engineers',
      'Technology transfer to Nigerian SMEs',
    ],
  },
  {
    tag: 'Academic Centre',
    status: 'Active',
    icon: BookOpen,
    color: 'text-gold-600',
    bg: 'bg-gold-50',
    border: 'border-gold-200',
    glow: 'rgba(197,161,90,0.15)',
    title: 'Centre for Entrepreneurship and Enterprise Development (CEED)',
    org: 'University of Nigeria',
    description:
      'Founded by Professor Dauda to embed entrepreneurship into engineering education. CEED has equipped thousands of students with the skills to convert engineering knowledge into sustainable enterprises, contributing directly to job creation and economic diversification.',
    outcomes: [
      'Hundreds of engineering graduate start-ups',
      'Curriculum reform integrating enterprise skills',
      'Industry-academia linkage programmes',
    ],
  },
  {
    tag: 'International Centre',
    status: 'Active',
    icon: Globe,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    glow: 'rgba(139,92,246,0.12)',
    title: 'Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship (ASR-ICiE)',
    org: 'ASR-ICiE',
    description:
      'An international centre dedicated to engineering innovation, technology commercialisation, and entrepreneurship education. ASR-ICiE operates programmes that connect researchers with investors, incubate engineering start-ups, and provide mentorship to emerging entrepreneurs across Africa.',
    outcomes: [
      'Multiple innovation cohorts launched',
      'International partnerships established',
      'Engineer-entrepreneurs incubated',
    ],
  },
  {
    tag: 'UNDP Initiative',
    status: 'Active',
    icon: Rocket,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    glow: 'rgba(16,185,129,0.12)',
    title: 'Timbuktoo UniPod — Young Africa Innovates',
    org: 'UNDP / Timbuktoo Innovation Platform',
    description:
      'The UNDP Timbuktoo UniPod initiative, led by Professor Dauda in Nigeria, provides university-based innovation hubs (UniPods) that equip young engineers with tools, mentorship, and market access to develop solutions aligned with Africa\'s Sustainable Development Goals.',
    outcomes: [
      'UniPod hubs operational at partner universities',
      'Young innovators programme cohorts launched',
      'SDG-aligned technology solutions developed',
    ],
  },
  {
    tag: 'Research Programme',
    status: 'Completed',
    icon: Lightbulb,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    glow: 'rgba(245,158,11,0.12)',
    title: 'Science and Technology Education Post-Basic (STEP-B)',
    org: 'Federal Government of Nigeria / World Bank',
    description:
      'Professor Dauda served as a key project manager for STEP-B, a nationally significant programme to strengthen secondary and post-basic science, technology, and vocational education. The programme built laboratory infrastructure, trained teachers, and produced revised curricula.',
    outcomes: [
      'National curriculum reform completed',
      'Laboratory infrastructure upgraded across schools',
      'Thousands of STEM teachers trained',
    ],
  },
]

const STATUS_VARIANT: Record<string, 'success' | 'secondary'> = {
  Active: 'success',
  Completed: 'secondary',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Projects & Initiatives"
        title="Projects, Initiatives & Programmes"
        description="Flagship programmes and institutions established or led by Professor Dauda that are driving engineering innovation and entrepreneurship across Nigeria and Africa."
      />

      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />

        <div className="container py-16 lg:py-20 relative">
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {PROJECTS.map(({ tag, status, icon: Icon, color, bg, border, glow, title, org, description, outcomes }) => (
              <motion.article
                key={title}
                variants={staggerItem}
                className="card-base overflow-hidden hover:border-gold-200 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Top colour accent */}
                <div className={`h-[2px] w-full ${bg.replace('bg-', 'bg-')} border-b ${border}`} style={{ background: glow.replace('rgba', 'linear-gradient(90deg, transparent, ').replace('0.12)', '0.4), transparent)') }} aria-hidden="true" />

                <div className="p-7">
                  <div className="flex flex-wrap items-start gap-3 mb-5">
                    {/* Icon */}
                    <div
                      className={`flex h-13 w-13 min-w-[52px] min-h-[52px] items-center justify-center rounded-2xl ${bg} border ${border} flex-shrink-0`}
                      style={{ boxShadow: `0 4px 20px ${glow}` }}
                      aria-hidden="true"
                    >
                      <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[11px] font-semibold tracking-widest uppercase ${color}`}>{tag}</span>
                        <Badge variant={STATUS_VARIANT[status] ?? 'secondary'}>{status}</Badge>
                      </div>
                      <h2 className="font-serif font-semibold text-navy-700 text-xl leading-snug mb-1">{title}</h2>
                      <p className={`text-sm font-semibold mb-0 ${color}`}>{org}</p>
                    </div>
                  </div>

                  <p className="text-[15px] text-charcoal/70 leading-relaxed mb-5">{description}</p>

                  {outcomes.length > 0 && (
                    <div className={`p-4 rounded-xl border ${border} ${bg}/40`}>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal/45 mb-3 flex items-center gap-2">
                        <span className={`h-px w-3 ${bg.replace('bg-', 'bg-gradient-to-r from-')} bg-current`} aria-hidden="true" />
                        Key Outcomes
                      </h3>
                      <ul className="space-y-2">
                        {outcomes.map(o => (
                          <li key={o} className="flex items-start gap-2.5 text-sm text-charcoal/65">
                            <ArrowRight className={`h-3.5 w-3.5 ${color} flex-shrink-0 mt-0.5`} aria-hidden="true" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}
