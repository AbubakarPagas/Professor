import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects & Initiatives',
  description:
    "Major projects and innovation initiatives led by Professor Mohammed Dauda — from AMTDI and CEED to ASR-ICiE and UNDP's Young Africa Innovates.",
}

const PROJECTS = [
  {
    tag: 'National Institution',
    status: 'Active',
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
      <div className="container py-16">
        <div className="space-y-10">
          {PROJECTS.map(({ tag, status, title, org, description, outcomes }) => (
            <article
              key={title}
              className="card-base p-7 hover:border-gold-300 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-gold-500">
                  {tag}
                </span>
                <Badge variant={STATUS_VARIANT[status] ?? 'secondary'}>{status}</Badge>
              </div>
              <h2 className="font-serif font-semibold text-navy-700 text-xl leading-snug mb-1">
                {title}
              </h2>
              <p className="text-sm text-gold-600 font-medium mb-4">{org}</p>
              <p className="text-[15px] text-charcoal/75 leading-relaxed mb-5">{description}</p>
              {outcomes.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3">
                    Key Outcomes
                  </h3>
                  <ul className="space-y-1.5">
                    {outcomes.map(o => (
                      <li key={o} className="flex items-start gap-2 text-sm text-charcoal/65">
                        <ArrowRight className="h-3.5 w-3.5 text-gold-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
