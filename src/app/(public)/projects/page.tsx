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
      'Professor Dauda played a pioneering executive leadership role at AMTDI Jalingo under NASENI (2010–2019), contributing to engineering infrastructure development and agro-processing technology programmes. AMTDI\'s mandate covers indigenous manufacturing capacity, engineering training, and technology development for Nigerian industry.',
    outcomes: [
      'Development of agro-processing machinery (rice threshers, fish dryers, multi-grain threshers)',
      'Engineering infrastructure established at AMTDI Jalingo',
      'Four patent-related records filed for agro-processing equipment (2016)',
    ],
  },
  {
    tag: 'Academic Centre',
    status: 'Completed',
    icon: BookOpen,
    color: 'text-gold-600',
    bg: 'bg-gold-50',
    border: 'border-gold-200',
    glow: 'rgba(197,161,90,0.15)',
    title: 'Centre for Entrepreneurship and Enterprise Development (CEED)',
    org: 'University of Maiduguri',
    description:
      'Professor Dauda served as Director of CEED from December 2020 to February 2025, overseeing entrepreneurship education, enterprise development programmes and skills initiatives. CEED embeds enterprise thinking into engineering education at the University of Maiduguri.',
    outcomes: [
      'Entrepreneurship curriculum and skills programmes delivered',
      'Industry-academia linkage activities',
      'Handover to ASR-ICiE directorship, February 2025',
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
    org: 'University of Maiduguri',
    description:
      'Since February 2025, Professor Dauda serves as Director of ASR-ICiE, advancing multidisciplinary innovation, prototyping, entrepreneurship, creative technologies and youth skills development. The centre translates university expertise into practical enterprise opportunities for young Nigerians and Africans.',
    outcomes: [
      'Multidisciplinary innovation and prototyping activities',
      'Youth entrepreneurship and enterprise development programmes',
      'University–industry collaboration and enterprise support',
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
    title: 'UNDP-Supported University Innovation Pod (UniPod)',
    org: 'UNDP / University of Maiduguri',
    description:
      'Professor Dauda serves as Coordinator of the UNDP-supported UniPod at the University of Maiduguri (2025–present). The UniPod provides young innovators with access to labs, mentorship and enterprise support to develop solutions aligned with sustainable development goals. A focal-person role preceded this formal coordinator appointment.',
    outcomes: [
      'Innovation labs and enterprise support for young Nigerians and Africans',
      'SDG-aligned technology development activities',
      'University innovation ecosystem strengthening',
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
    title: 'TETFund Mobile STEM School',
    org: 'University of Maiduguri / Tertiary Education Trust Fund (TETFund)',
    description:
      'Professor Dauda serves as principal investigator for the TETFund-funded Mobile STEM School, an outreach project bringing hands-on science, technology, engineering and mathematics experiences to out-of-school and underserved learners. The project is currently under implementation.',
    outcomes: [
      'Funded project under implementation',
      'Practical STEM outreach to underserved communities',
      'Verify actual beneficiary figures from approved project records before publication',
    ],
  },
  {
    tag: 'Research Prototype',
    status: 'Active',
    icon: Lightbulb,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    glow: 'rgba(20,184,166,0.12)',
    title: 'MCRP Fish Dryer Research Prototype',
    org: 'University of Maiduguri / MCRP',
    description:
      'A research prototype that compares indirect combustion heating fish drying against the traditional half-drum kiln. Features an insulated drying chamber, solar-powered forced-air circulation, and alternative fuel trials. This is a separate, later university research prototype — distinct from the NASENI AMT-P institutional patent-related fish dryer records (NG/P/2016/48, /98).',
    outcomes: [
      'Prototype built; preliminary comparative tests completed',
      'Solar-powered forced-air circulation trialled',
      'Further independent validation ongoing',
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
        label="Innovation & Impact"
        title="Flagship Projects & Programmes"
        description="Institutional leadership, research prototypes and innovation programmes — connecting engineering research with practical impact."
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
