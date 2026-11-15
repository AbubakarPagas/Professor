'use client'

import { CheckCircle2, GraduationCap, Building2, BookOpen, FlaskConical, Users, Award, Globe, Cpu, Lightbulb } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem, slideLeft, slideRight } from '@/lib/motion'

const FELLOWSHIPS = [
  { code: 'FNSE',     name: 'Fellow, Nigerian Society of Engineers',              color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  { code: 'FNIMechE', name: 'Fellow, Nigerian Institution of Mechanical Engineers', color: 'text-sky-600',   bg: 'bg-sky-50',   border: 'border-sky-200' },
  { code: 'MASME',    name: 'Member, American Society of Mechanical Engineers',    color: 'text-navy-600',  bg: 'bg-navy-50',  border: 'border-navy-200' },
]

const EXPERTISE = [
  { label: 'Advanced Manufacturing Technology', icon: Cpu },
  { label: 'Thermofluids & Energy Systems',     icon: FlaskConical },
  { label: 'Agro-processing Machinery',         icon: Lightbulb },
  { label: 'Green Composite Materials',         icon: Lightbulb },
  { label: 'Engineering Entrepreneurship',      icon: Globe },
  { label: 'Renewable Energy Systems',          icon: Lightbulb },
  { label: 'Technology Policy & Innovation',    icon: Globe },
  { label: 'Engineering Education Reform',      icon: GraduationCap },
  { label: 'Industrial Automation',             icon: Cpu },
  { label: 'Research Management',               icon: BookOpen },
]

const EDUCATION = [
  { degree: 'Ph.D. / Postdoctoral Research', institution: 'Tokyo Metropolitan University, Japan', field: 'Mechanical Engineering', year: '2000s' },
  { degree: 'Masters Degree',                institution: 'University of Lagos, Nigeria',          field: 'Mechanical Engineering', year: '1990s' },
  { degree: 'B.Eng.',                         institution: 'University of Maiduguri, Nigeria',     field: 'Mechanical Engineering', year: '1980s' },
]

const STATS = [
  { icon: BookOpen,     value: '100+', label: 'Publications',     color: 'text-sky-600',   bg: 'bg-sky-50',   border: 'border-sky-200' },
  { icon: FlaskConical, value: '15+',  label: 'Patents',          color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  { icon: Award,        value: '30+',  label: 'Awards',           color: 'text-gold-600',  bg: 'bg-gold-50',  border: 'border-gold-200' },
  { icon: Users,        value: '50+',  label: 'Students Mentored', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
]

const BIO_PARAGRAPHS = [
  'Professor Mohammed Dauda, FNSE, FNIMechE, MASME is one of Nigeria\'s most distinguished mechanical engineers and academic leaders, with a career spanning over three decades of teaching, research, institutional leadership, and policy engagement.',
  'Educated at the University of Maiduguri, the University of Lagos, and Tokyo Metropolitan University in Japan, he brings a uniquely international perspective to Nigerian engineering challenges. His appointment as Professor of Mechanical Engineering in 2012 came after years of sustained scholarly contribution and academic service.',
  'As Head of the Department of Mechanical Engineering and founding Director of the Centre for Entrepreneurship and Enterprise Development (CEED), he championed the integration of engineering science with enterprise creation — a vision that has catalysed the entrepreneurship journeys of hundreds of graduates.',
  'In a pivotal national role at NASENI, Professor Dauda established the Advanced Manufacturing Technology Development Institute (AMTDI), a landmark institution aimed at reducing Nigeria\'s dependence on foreign manufacturing technology and building domestic industrial capacity.',
  'His more recent leadership — of the Abdul Samad Rabiu International Centre for Innovation and Entrepreneurship (ASR-ICiE), the UNDP Timbuktoo UniPod initiative, and the Young Africa Innovates programme — confirms his enduring commitment to translating engineering knowledge into economic transformation across Africa.',
  'His research contributions include over a hundred peer-reviewed publications, more than fifteen patents granted in Nigeria and Japan, and numerous technology transfers to industry. He has supervised more than fifty postgraduate students and mentored hundreds of young engineers across sub-Saharan Africa.',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About the Professor"
        title="Professor Mohammed Dauda"
        subtitle="FNSE · FNIMechE · MASME"
        description="Distinguished mechanical engineer, academic leader, and pioneer of engineering innovation, entrepreneurship, and sustainable development in Nigeria."
      />

      {/* Stats bar */}
      <div className="relative overflow-hidden border-b border-ivory-200" style={{ background: 'linear-gradient(90deg, #fdfcf8 0%, #ffffff 50%, #fdfcf8 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="container relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-ivory-200">
            {STATS.map(({ icon: Icon, value, label, color, bg, border }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center justify-center py-8 px-4 text-center group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className={`h-10 w-10 rounded-2xl ${bg} border ${border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                  <Icon className={`h-4.5 w-4.5 ${color}`} aria-hidden="true" />
                </div>
                <p className="font-serif font-bold text-navy-800 text-3xl leading-none mb-1.5 stat-number">{value}</p>
                <p className="text-[11px] text-charcoal/40 uppercase tracking-widest">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fdfcf8 60%, #f9f7f2 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(197,161,90,0.05), transparent 70%)' }}
          aria-hidden="true" />

        <div className="container py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">

            {/* Main biography */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {BIO_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  className={`leading-[1.95] text-charcoal/75 ${i === 0 ? 'text-[17px] font-medium border-l-[3px] border-gold-400 pl-6 text-charcoal/85' : 'text-[15.5px]'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="lg:col-span-5 space-y-6"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >

              {/* Fellowships */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/35 mb-6 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Professional Fellowships
                </h2>
                <ul className="space-y-4" role="list">
                  {FELLOWSHIPS.map((f, i) => (
                    <motion.li
                      key={f.code}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VIEWPORT}
                      transition={{ delay: i * 0.1, duration: 0.45 }}
                    >
                      <span className={`flex h-10 w-20 flex-shrink-0 items-center justify-center rounded-xl border ${f.border} ${f.bg} text-[10.5px] font-bold ${f.color} tracking-wider shadow-sm`}>
                        {f.code}
                      </span>
                      <span className="text-sm text-charcoal/65 leading-snug">{f.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/35 mb-6 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Education
                </h2>
                <ul className="space-y-5" role="list">
                  {EDUCATION.map((e, i) => (
                    <motion.li
                      key={e.institution}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VIEWPORT}
                      transition={{ delay: i * 0.1, duration: 0.45 }}
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-50 border border-gold-200 mt-0.5 shadow-sm">
                        <GraduationCap className="h-4 w-4 text-gold-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy-800 text-sm leading-snug">{e.degree}</p>
                        <p className="text-charcoal/60 text-sm">{e.institution}</p>
                        <p className="text-charcoal/40 text-xs mt-0.5">{e.field}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Expertise */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/35 mb-6 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Areas of Expertise
                </h2>
                <motion.ul
                  className="space-y-1.5"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  role="list"
                >
                  {EXPERTISE.map(({ label, icon: Icon }) => (
                    <motion.li
                      key={label}
                      variants={staggerItem}
                      className="flex items-center gap-3 text-sm text-charcoal/65 py-2 border-b border-ivory-100 last:border-0 hover:text-navy-700 transition-colors group"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0 group-hover:bg-gold-100 transition-colors">
                        <CheckCircle2 className="h-3 w-3 text-gold-500" aria-hidden="true" />
                      </div>
                      {label}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

            </motion.aside>
          </div>
        </div>
      </div>
    </>
  )
}
