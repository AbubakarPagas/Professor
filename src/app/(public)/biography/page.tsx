'use client'

import { PageHero } from '@/components/layout/page-hero'
import { motion } from 'framer-motion'
import { VIEWPORT } from '@/lib/motion'

// Source: CV 2025 — verify appointment letters for NASENI executive dates
// and confirm exact Associate Professor promotion year.
const TIMELINE: Array<{
  period: string
  title: string
  organisation: string
  location?: string
  description: string
  type: 'education' | 'appointment' | 'leadership' | 'milestone'
}> = [
  {
    period: '1990',
    title: 'Bachelor of Engineering — Mechanical Engineering',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description:
      'Graduated with a B.Eng. in Mechanical Engineering, establishing the technical foundation for a career spanning research, manufacturing, and institutional leadership.',
    type: 'education',
  },
  {
    period: '1992',
    title: 'Graduate Assistant',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description:
      'Joined the Department of Mechanical Engineering as Graduate Assistant, beginning a continuous association with the University of Maiduguri that has lasted more than three decades.',
    type: 'appointment',
  },
  {
    period: '1994',
    title: 'Master of Science — Mechanical Engineering',
    organisation: 'University of Lagos',
    location: 'Lagos, Nigeria',
    description:
      'Completed an M.Sc. in Mechanical Engineering. Thesis: "Quality Engineering and Management in Nigerian Manufacturing Industries."',
    type: 'education',
  },
  {
    period: '1997–2002',
    title: 'D.Eng. in Materials — Japanese Government Scholarship',
    organisation: 'Tokyo Metropolitan University',
    location: 'Tokyo, Japan',
    description:
      'Doctoral research under the Japanese government scholarship programme. Thesis: "Processing and Property Evaluation of Long Natural Fiber Reinforced Composites Through Recycling of Tropical Plant Wastes." Graduated 2002.',
    type: 'education',
  },
  {
    period: '2003–2004',
    title: 'UNESCO/China Great Wall Fellowship',
    organisation: 'Northeastern University',
    location: 'Shenyang, China',
    description:
      'UNESCO/People\'s Republic of China Great Wall Fellowship for postdoctoral research at Northeastern University, Shenyang.',
    type: 'education',
  },
  {
    period: '2005–2007',
    title: 'JSPS Postdoctoral Research Fellowship',
    organisation: 'Japan Society for the Promotion of Science',
    location: 'Japan',
    description:
      'Japan Society for the Promotion of Science (JSPS) postdoctoral research fellowship, extending international collaboration in composite materials research.',
    type: 'education',
  },
  {
    period: '2007',
    title: 'Associate Professor',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description:
      'Academic promotion to Associate Professor of Mechanical Engineering (per CV reconciliation; confirm exact date from appointment records).',
    type: 'appointment',
  },
  {
    period: '2010–2019',
    title: 'Executive Leadership — AMTDI Jalingo, NASENI',
    organisation: 'Advanced Manufacturing Technology Development Institute (AMTDI), NASENI',
    location: 'Jalingo, Nigeria',
    description:
      'Pioneering executive leadership at AMTDI Jalingo under the National Agency for Science and Engineering Infrastructure (NASENI). Led engineering infrastructure development, agro-processing technology programmes, and capacity-building initiatives. Confirm individual appointment title and exact dates from appointment letters.',
    type: 'leadership',
  },
  {
    period: '2012',
    title: 'Professor of Mechanical Engineering',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description:
      'Promoted to Professor of Mechanical Engineering — recognition of sustained excellence in research, teaching and academic service.',
    type: 'milestone',
  },
  {
    period: '2016',
    title: 'Patent-Related Records Filed (NASENI)',
    organisation: 'Advanced Manufacturing Technology Programme (AMT-P), NASENI',
    location: 'Nigeria',
    description:
      'Four Nigerian patent-related records filed for agro-processing equipment developed under AMT-P: rice thresher (NG/P/2016/47), fish dryer (NG/P/2016/48), 20.0 JE fish dryer (NG/P/2016/98), and Magami multi-grain thresher (NG/P/2016/99). Additionally, Japanese composite-material application JP2009138105 A is on record. Original certificates and registry checks are pending.',
    type: 'milestone',
  },
  {
    period: '2020–Feb 2025',
    title: 'Director, Centre for Entrepreneurship and Enterprise Development (CEED)',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description:
      'Served as Director of CEED from December 2020 to February 2025, overseeing entrepreneurship education, enterprise development programmes, and skills initiatives at the University of Maiduguri.',
    type: 'leadership',
  },
  {
    period: '2024',
    title: 'Order of the Rising Sun, Gold and Silver Rays',
    organisation: 'Government of Japan',
    location: 'Japan',
    description:
      'Awarded the Order of the Rising Sun, Gold and Silver Rays by the Government of Japan in recognition of contributions to materials research and Japan–Nigeria academic cooperation (award year 2024; presentation ceremony date to be confirmed).',
    type: 'milestone',
  },
  {
    period: '2025–',
    title: 'Director, ASR-ICiE & Coordinator, UNDP UniPod',
    organisation: 'University of Maiduguri / UNDP',
    location: 'Maiduguri, Nigeria',
    description:
      'Appointed Director of the Abdul Samad Rabiu International Centre for Innovation and Entrepreneurship (ASR-ICiE) and Coordinator of the UNDP-supported University Innovation Pod (UniPod) since February 2025. Advances multidisciplinary innovation, prototyping, entrepreneurship and youth skills development.',
    type: 'leadership',
  },
]

const TYPE_CONFIG: Record<string, { label: string; dotClass: string; badgeClass: string; barClass: string; borderClass: string }> = {
  education:   { label: 'Education',   dotClass: 'bg-sky-400',     badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',            barClass: 'bg-sky-400',     borderClass: 'border-sky-200' },
  appointment: { label: 'Appointment', dotClass: 'bg-gold-400',    badgeClass: 'bg-gold-50 text-gold-700 border-gold-200',          barClass: 'bg-gold-400',    borderClass: 'border-gold-200' },
  leadership:  { label: 'Leadership',  dotClass: 'bg-navy-500',    badgeClass: 'bg-navy-50 text-navy-700 border-navy-200',          barClass: 'bg-navy-500',    borderClass: 'border-navy-200' },
  milestone:   { label: 'Milestone',   dotClass: 'bg-emerald-400', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200', barClass: 'bg-emerald-400', borderClass: 'border-emerald-200' },
}

export default function BiographyPage() {
  return (
    <>
      <PageHero
        label="Biography"
        title="Career Timeline"
        description="Education, appointments, leadership roles, and milestones spanning Professor Dauda's career from 1990 to the present."
      />

      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}
      >
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
              <div
                key={cfg.label}
                className="flex items-center gap-2 text-xs text-charcoal/60 bg-white border border-ivory-200 rounded-full px-3.5 py-1.5 shadow-sm"
              >
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
                    <span className="text-[8px] font-bold text-white leading-none text-center px-0.5">
                      {entry.period.length <= 6 ? entry.period : '●'}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-2">
                    <div
                      className={`card-base overflow-hidden border-l-[3px] ${cfg.borderClass} hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300`}
                    >
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
