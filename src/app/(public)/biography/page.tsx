'use client'

import { PageHero } from '@/components/layout/page-hero'
import { motion } from 'framer-motion'
import { VIEWPORT } from '@/lib/motion'

const TIMELINE: Array<{
  period: string
  title: string
  organisation: string
  location?: string
  description: string
  type: 'education' | 'appointment' | 'leadership' | 'milestone'
}> = [
  {
    period: 'B.Eng.',
    title: 'Bachelor of Engineering — Mechanical Engineering',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description:
      'Foundational undergraduate studies in mechanical engineering, establishing the analytical and technical base for a distinguished academic career.',
    type: 'education',
  },
  {
    period: 'M.Sc.',
    title: 'Master of Science — Mechanical Engineering',
    organisation: 'University of Lagos',
    location: 'Lagos, Nigeria',
    description:
      'Postgraduate research focusing on thermofluids and manufacturing systems. Developed early expertise in energy conversion and industrial processes.',
    type: 'education',
  },
  {
    period: 'Ph.D./Postdoc',
    title: 'Doctoral & Postdoctoral Research — Mechanical Engineering',
    organisation: 'Tokyo Metropolitan University',
    location: 'Tokyo, Japan',
    description:
      'Advanced research in manufacturing technology and materials science at one of Japan\'s leading technical universities. Gained international perspective and pioneering expertise.',
    type: 'education',
  },
  {
    period: '2012',
    title: 'Appointed Professor of Mechanical Engineering',
    organisation: 'University (Nigeria)',
    description:
      'Promotion to full Professor recognising sustained excellence in research, teaching, and academic contribution.',
    type: 'appointment',
  },
  {
    period: '2012–',
    title: 'Head, Department of Mechanical Engineering',
    organisation: 'University (Nigeria)',
    description:
      'Led the department through significant growth, curriculum reform, and enhanced research output. Strengthened industry linkages and postgraduate supervision.',
    type: 'leadership',
  },
  {
    period: '2012–',
    title: 'Director, Centre for Entrepreneurship and Enterprise Development (CEED)',
    organisation: 'University (Nigeria)',
    description:
      'Founded and directed CEED, embedding engineering entrepreneurship into the academic culture and producing enterprise-ready graduates.',
    type: 'leadership',
  },
  {
    period: 'NASENI',
    title: 'Director-General, National Agency for Science and Engineering Infrastructure',
    organisation: 'NASENI — Federal Government of Nigeria',
    description:
      'Led Nigeria\'s premier science and engineering infrastructure agency. Oversaw major institutional reforms, infrastructure investments, and the establishment of AMTDI.',
    type: 'leadership',
  },
  {
    period: 'AMTDI',
    title: 'Founder, Advanced Manufacturing Technology Development Institute',
    organisation: 'NASENI / AMTDI',
    description:
      'Established AMTDI as a national centre of excellence for advanced manufacturing — developing indigenous capacity in precision engineering, agro-processing machinery, and industrial tooling.',
    type: 'milestone',
  },
  {
    period: 'STEP-B',
    title: 'Project Manager, Science and Technology Education Post-Basic (STEP-B)',
    organisation: 'Federal Government / World Bank',
    description:
      'Managed the STEP-B national project to strengthen science, technology, and vocational education across Nigeria, benefiting thousands of students and institutions.',
    type: 'milestone',
  },
  {
    period: 'ASR-ICiE',
    title: 'Director, Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship',
    organisation: 'ASR-ICiE',
    description:
      'Led the establishment and operations of an international centre dedicated to innovation, technology commercialisation, and engineering entrepreneurship across Africa.',
    type: 'leadership',
  },
  {
    period: 'UNDP',
    title: 'Timbuktoo UniPod Initiative — Young Africa Innovates',
    organisation: 'UNDP / Timbuktoo Initiative',
    description:
      'Championed the UNDP-backed UniPod initiative and Young Africa Innovates programme, building innovation ecosystems for young African engineers and entrepreneurs.',
    type: 'milestone',
  },
]

const TYPE_CONFIG: Record<string, { label: string; dotClass: string; badgeClass: string; barClass: string; borderClass: string }> = {
  education:   { label: 'Education',   dotClass: 'bg-sky-400',     badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',           barClass: 'bg-sky-400',     borderClass: 'border-sky-200' },
  appointment: { label: 'Appointment', dotClass: 'bg-gold-400',    badgeClass: 'bg-gold-50 text-gold-700 border-gold-200',         barClass: 'bg-gold-400',    borderClass: 'border-gold-200' },
  leadership:  { label: 'Leadership',  dotClass: 'bg-navy-500',    badgeClass: 'bg-navy-50 text-navy-700 border-navy-200',         barClass: 'bg-navy-500',    borderClass: 'border-navy-200' },
  milestone:   { label: 'Milestone',   dotClass: 'bg-emerald-400', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200', barClass: 'bg-emerald-400', borderClass: 'border-emerald-200' },
}

export default function BiographyPage() {
  return (
    <>
      <PageHero
        label="Biography"
        title="Career Timeline"
        description="A chronological account of Professor Dauda's education, appointments, leadership roles, and landmark achievements."
      />

      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />

        <div className="container py-16 lg:py-20 relative">

          {/* Legend */}
          <motion.div
            className="flex flex-wrap gap-4 mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
            aria-label="Timeline legend"
          >
            {Object.values(TYPE_CONFIG).map(cfg => (
              <div key={cfg.label} className="flex items-center gap-2 text-xs text-charcoal/60 bg-white border border-ivory-200 rounded-full px-3.5 py-1.5 shadow-sm">
                <span className={`h-2.5 w-2.5 rounded-full ${cfg.dotClass}`} aria-hidden="true" />
                {cfg.label}
              </div>
            ))}
          </motion.div>

          {/* Timeline list */}
          <ol className="relative max-w-3xl" aria-label="Career timeline">
            {/* Animated vertical line */}
            <motion.div
              className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-gold-400 via-gold-200 to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />

            {TIMELINE.map((entry, i) => {
              const cfg = TYPE_CONFIG[entry.type]
              return (
                <motion.li
                  key={i}
                  className="relative flex gap-8 mb-10 last:mb-0"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Dot */}
                  <div
                    className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-white shadow-md ${cfg.dotClass}`}
                    aria-hidden="true"
                  >
                    <span className="text-[9px] font-bold text-white leading-none text-center px-0.5">
                      {entry.period.length <= 5 ? entry.period : '●'}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-2">
                    <div className={`card-base overflow-hidden border-l-[3px] ${cfg.borderClass} hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300`}>
                      {/* Top colour bar */}
                      <div className={`h-[2px] w-full ${cfg.barClass} opacity-60`} aria-hidden="true" />
                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`pill border text-[10px] font-semibold ${cfg.badgeClass}`}>{cfg.label}</span>
                          <span className="text-xs font-semibold text-charcoal/40">{entry.period}</span>
                        </div>
                        <h2 className="font-semibold text-navy-700 text-base leading-snug mb-1">
                          {entry.title}
                        </h2>
                        <p className="text-sm text-gold-600 font-medium mb-1">{entry.organisation}</p>
                        {entry.location && (
                          <p className="text-xs text-charcoal/40 mb-2">{entry.location}</p>
                        )}
                        <p className="text-sm text-charcoal/65 leading-relaxed">{entry.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )
}
