'use client'

import { CheckCircle2, GraduationCap, BookOpen, FlaskConical, Users, Award, Globe, Cpu, Lightbulb, Leaf, Sun, Recycle } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem, slideLeft, slideRight } from '@/lib/motion'

const FELLOWSHIPS = [
  {
    code: 'FNSE',
    name: 'Fellow, Nigerian Society of Engineers',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    code: 'FNIMechE',
    name: 'Fellow, Nigerian Institution of Mechanical Engineers',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
  },
]

const EXPERTISE = [
  { label: 'Green Composite & Natural-Fibre Materials', icon: Leaf },
  { label: 'Advanced Manufacturing Technology',         icon: Cpu },
  { label: 'Agro-processing Machinery',                 icon: Lightbulb },
  { label: 'Renewable Energy & Solar Systems',          icon: Sun },
  { label: 'Waste Recovery & Circular Economy',         icon: Recycle },
  { label: 'Engineering Entrepreneurship & Innovation', icon: Globe },
  { label: 'Digital Systems & Mechatronics',            icon: Cpu },
  { label: 'Engineering Education',                     icon: GraduationCap },
]

const EDUCATION = [
  {
    degree: 'D.Eng. — Materials',
    institution: 'Tokyo Metropolitan University, Japan',
    field: 'Materials Engineering',
    year: '2002',
  },
  {
    degree: 'JSPS Postdoctoral Fellowship',
    institution: 'Japan Society for the Promotion of Science',
    field: 'Materials & Composites Research',
    year: '2005–2007',
  },
  {
    degree: 'UNESCO/China Great Wall Fellowship',
    institution: 'Northeastern University, Shenyang, China',
    field: 'Research Fellowship',
    year: '2003–2004',
  },
  {
    degree: 'M.Sc. — Mechanical Engineering',
    institution: 'University of Lagos, Nigeria',
    field: 'Mechanical Engineering',
    year: '1994',
  },
  {
    degree: 'B.Eng. — Mechanical Engineering',
    institution: 'University of Maiduguri, Nigeria',
    field: 'Mechanical Engineering',
    year: '1990',
  },
]

const STATS = [
  { icon: BookOpen,     value: '44+',  label: 'Publications',      color: 'text-sky-600',     bg: 'bg-sky-50',     border: 'border-sky-200' },
  { icon: FlaskConical, value: '5',    label: 'Patent Records',    color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-200' },
  { icon: Award,        value: '30+',  label: 'Awards',            color: 'text-gold-600',    bg: 'bg-gold-50',    border: 'border-gold-200' },
  { icon: Users,        value: '50+',  label: 'Students Supervised', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
]

// Source: approved biography text — 17 November 2026
const BIO_PARAGRAPHS = [
  'Professor Mohammed Dauda, FNSE, FNIMechE, is a Professor of Mechanical Engineering specialising in materials at the University of Maiduguri, Nigeria. His professional career encompasses engineering education, materials research, advanced manufacturing, technology development, institutional leadership and innovation-driven entrepreneurship.',
  'He obtained his Bachelor of Engineering in Mechanical Engineering from the University of Maiduguri in 1990 and his Master of Science in Mechanical Engineering from the University of Lagos in 1994. He subsequently undertook research training in Japan, earning a Doctor of Engineering in Materials from Tokyo Metropolitan University in 2002.',
  'His international academic experience includes a UNESCO/People\'s Republic of China Great Wall Fellowship at Northeastern University, Shenyang, from 2003 to 2004, and a Japan Society for the Promotion of Science postdoctoral research fellowship from 2005 to 2007.',
  'Beginning his university career in 1992, Professor Dauda progressed through the academic ranks and became a Professor of Mechanical Engineering in 2012. He has contributed to teaching, postgraduate supervision, curriculum development and research across engineering materials, manufacturing technologies and related fields.',
  'His engineering leadership extends beyond the university. At the National Agency for Science and Engineering Infrastructure (NASENI), he played a pioneering role in the development and management of the Advanced Manufacturing Technology Development Institute, Jalingo. He also served as Director of Engineering Infrastructure at NASENI headquarters and participated in national technology-development and capacity-building initiatives.',
  'Returning to university-based institutional leadership, he served as Director of the Centre for Entrepreneurship and Enterprise Development at the University of Maiduguri from December 2020 to February 2025.',
  'Since February 2025, he has served as Director of ASR-ICiE and Coordinator of the UNDP-supported UniPod, advancing multidisciplinary innovation, prototyping, entrepreneurship, creative technologies and youth skills development.',
  'His research and professional interests include natural-fibre composites, advanced engineering materials, manufacturing processes, renewable energy technologies, engineering product development, technology transfer and university–industry collaboration.',
  'Professor Dauda is a Fellow of the Nigerian Society of Engineers and the Nigerian Institution of Mechanical Engineers, and a registered engineer with COREN. His international recognition includes the Order of the Rising Sun from the Government of Japan, alongside awards and fellowships supporting research, teaching innovation and international academic exchange.',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About the Professor"
        title="Professor Mohammed Dauda"
        subtitle="FNSE · FNIMechE"
        description="Professor of Mechanical Engineering (Materials) at the University of Maiduguri — researcher, innovation leader, and mentor."
      />

      {/* Stats bar */}
      <div
        className="relative overflow-hidden border-b border-ivory-200"
        style={{ background: 'linear-gradient(90deg, #fdfcf8 0%, #ffffff 50%, #fdfcf8 100%)' }}
      >
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
                <div
                  className={`h-10 w-10 rounded-2xl ${bg} border ${border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                >
                  <Icon className={`h-4.5 w-4.5 ${color}`} aria-hidden="true" />
                </div>
                <p className="font-serif font-bold text-navy-800 text-3xl leading-none mb-1.5 stat-number">{value}</p>
                <p className="text-[11px] text-charcoal/40 uppercase tracking-widest">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fdfcf8 60%, #f9f7f2 100%)' }}
      >
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div
          className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(197,161,90,0.05), transparent 70%)' }}
          aria-hidden="true"
        />

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
                  className={`leading-[1.95] text-charcoal/75 ${
                    i === 0
                      ? 'text-[17px] font-medium border-l-[3px] border-gold-400 pl-6 text-charcoal/85'
                      : 'text-[15.5px]'
                  }`}
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
                      <span
                        className={`flex h-10 w-20 flex-shrink-0 items-center justify-center rounded-xl border ${f.border} ${f.bg} text-[10.5px] font-bold ${f.color} tracking-wider shadow-sm`}
                      >
                        {f.code}
                      </span>
                      <span className="text-sm text-charcoal/65 leading-snug">{f.name}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-charcoal/40 leading-relaxed">
                  Also registered with the Council for the Regulation of Engineering in Nigeria (COREN).
                </p>
              </div>

              {/* Education */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/35 mb-6 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Education & International Training
                </h2>
                <ul className="space-y-5" role="list">
                  {EDUCATION.map((e, i) => (
                    <motion.li
                      key={e.institution + e.year}
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
                        <p className="text-charcoal/40 text-xs mt-0.5">{e.field} · {e.year}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Expertise */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/35 mb-6 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Research & Scholarly Interests
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

              {/* International honour */}
              <div className="card-base p-7 border-gold-200/70 bg-gradient-to-br from-gold-50/60 via-white to-ivory-50">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/35 mb-4 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  International Recognition
                </h2>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold-100 border border-gold-200 shadow-sm">
                    <Award className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800 text-sm leading-snug">
                      Order of the Rising Sun, Gold and Silver Rays
                    </p>
                    <p className="text-charcoal/60 text-sm">Government of Japan · 2024</p>
                    <p className="text-charcoal/45 text-xs mt-1 leading-relaxed">
                      Awarded in recognition of contributions to materials research and Japan–Nigeria academic cooperation.
                    </p>
                  </div>
                </div>
              </div>

            </motion.aside>
          </div>
        </div>
      </div>
    </>
  )
}
