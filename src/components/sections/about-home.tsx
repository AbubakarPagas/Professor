'use client'

import Link from 'next/link'
import { CheckCircle2, ArrowRight, GraduationCap, Building2, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem, slideLeft, slideRight } from '@/lib/motion'
import type { SiteProfile, ExpertiseArea } from '@/types'

interface AboutHomeSectionProps {
  profile: SiteProfile | null
  expertise: ExpertiseArea[]
}

export function AboutHomeSection({ profile, expertise }: AboutHomeSectionProps) {
  const name = profile?.name ?? 'Professor Mohammed Dauda'
  const bio  = profile?.bio ?? profile?.shortBio ?? ''
  const fellowships  = profile?.fellowships?.length ? profile.fellowships : ['FNSE', 'FNIMechE']
  const expertiseList = expertise.length
    ? expertise.filter(e => e.active).map(e => e.title)
    : profile?.areasOfExpertise?.length
      ? profile.areasOfExpertise
      : ['Green Composite & Natural-Fibre Materials', 'Advanced Manufacturing Technology', 'Agro-processing Machinery', 'Renewable Energy & Solar Systems', 'Engineering Entrepreneurship & Innovation', 'Engineering Education']

  const highlights = [
    profile?.title
      ? { icon: GraduationCap, text: profile.title }
      : { icon: GraduationCap, text: 'Professor of Mechanical Engineering (Materials)' },
    profile?.institution
      ? { icon: Building2, text: profile.institution }
      : { icon: Building2, text: 'University of Maiduguri, Nigeria' },
    { icon: Globe, text: 'Director, ASR-ICiE (2025–present)' },
    { icon: Zap,   text: 'Coordinator, UNDP UniPod' },
  ]

  return (
    <section id="about" className="relative section overflow-hidden" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fefdf9 60%, #f9f7f2 100%)' }} aria-labelledby="about-home-heading">
      {/* Background — warm white with crosshatch grain */}
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
      <div className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(197,161,90,0.07), transparent 70%)' }} aria-hidden="true" />
      <div className="absolute right-0 top-0 h-64 w-64 opacity-30 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(197,161,90,0.12), transparent 70%)' }} />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <span className="section-label">About the Professor</span>
            <h2 id="about-home-heading" className="section-title mt-1 mb-3">Research, Innovation &amp; Institutional Leadership</h2>
            <div className="gold-rule mb-8" aria-hidden="true" />

            {bio ? (
              <div
                className="text-charcoal/75 leading-[1.9] mb-8 text-[15.5px]"
                dangerouslySetInnerHTML={{ __html: bio }}
              />
            ) : (
              <>
                <p className="text-charcoal/75 leading-[1.9] mb-5 text-[15.5px]">
                  {name}, FNSE, FNIMechE, is a Professor of Mechanical Engineering (Materials) at the University of Maiduguri, researcher and institutional leader whose career spans university teaching, engineering materials research, advanced manufacturing, technological innovation and entrepreneurship development.
                </p>
                <p className="text-charcoal/75 leading-[1.9] mb-8 text-[15.5px]">
                  He currently serves as Director of the Abdul Samad Rabiu International Centre for Innovation and Entrepreneurship (ASR-ICiE) and Coordinator of the UNDP-supported University Innovation Pod (UniPod), enabling multidisciplinary innovation and enterprise opportunities for young Nigerians and Africans.
                </p>
              </>
            )}

            {/* Highlight list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-navy-700 font-medium p-3 rounded-xl border border-ivory-200 bg-ivory-50 hover:border-gold-200 hover:bg-gold-50/50 transition-all duration-200"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-50 border border-gold-200 shadow-sm">
                    <Icon className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                  </span>
                  <span className="leading-snug text-[13px]">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="group">
                <Link href="/about">
                  Full Biography
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/biography">Career Timeline</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — expertise */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Areas of Expertise</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gold-200 to-transparent" />
            </div>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              aria-label="Areas of expertise"
              role="list"
            >
              {expertiseList.slice(0, 10).map(item => (
                <motion.li
                  key={item}
                  variants={staggerItem}
                  className="group flex items-center gap-3 p-3.5 rounded-xl border border-ivory-200 bg-ivory-50 hover:border-gold-300 hover:bg-gradient-to-br hover:from-gold-50 hover:to-white transition-all duration-250 cursor-default"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-100 border border-gold-200 group-hover:bg-gold-200 transition-colors">
                    <CheckCircle2 className="h-3 w-3 text-gold-600" aria-hidden="true" />
                  </div>
                  <span className="text-[13px] text-charcoal/75 group-hover:text-navy-700 transition-colors leading-snug font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Fellowships */}
            <div className="p-6 rounded-2xl border border-gold-200/70 bg-gradient-to-br from-gold-50 via-white to-ivory-50 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gold-200" aria-hidden="true" />
                <p className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-gold-600/70 px-2">Professional Fellowships</p>
                <div className="h-px flex-1 bg-gold-200" aria-hidden="true" />
              </div>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {fellowships.map((c, i) => (
                  <motion.span
                    key={c}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="inline-flex items-center rounded-full bg-gradient-to-br from-white to-gold-50 border border-gold-300/70 px-4 py-1.5 text-[12px] font-bold tracking-widest text-gold-700 shadow-sm hover:shadow-md hover:border-gold-400 transition-all duration-200"
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
