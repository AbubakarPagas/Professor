'use client'

import Link from 'next/link'
import { ArrowRight, Users, GraduationCap, Lightbulb, Globe, BookOpen, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem, slideLeft } from '@/lib/motion'
import type { MentorshipProgram } from '@/types'

interface MentorshipHomeSectionProps {
  programs: MentorshipProgram[]
  profile: { shortBio?: string; name?: string } | null
}

const ICON_CYCLE = [GraduationCap, Users, Lightbulb, Globe, BookOpen, Rocket]
const ACCENT_CYCLE = [
  { text: 'text-sky-300',     bg: 'bg-sky-400/[0.12]',     border: 'border-sky-400/20',     dot: 'bg-sky-400' },
  { text: 'text-violet-300',  bg: 'bg-violet-400/[0.12]',  border: 'border-violet-400/20',  dot: 'bg-violet-400' },
  { text: 'text-gold-300',    bg: 'bg-gold-400/[0.12]',    border: 'border-gold-400/20',    dot: 'bg-gold-400' },
  { text: 'text-emerald-300', bg: 'bg-emerald-400/[0.12]', border: 'border-emerald-400/20', dot: 'bg-emerald-400' },
]

export function MentorshipHomeSection({ programs, profile }: MentorshipHomeSectionProps) {
  const items = programs.filter(p => p.active)

  return (
    <section className="relative section overflow-hidden" aria-labelledby="mentorship-home-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-900 bg-mesh-dark" aria-hidden="true" />
      <div className="absolute inset-0 pattern-dots opacity-70" aria-hidden="true" />

      {/* Decorative glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle at right, rgba(197,161,90,0.07), transparent 70%)' }}
        aria-hidden="true" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* Text */}
          <motion.div
            className="lg:col-span-5"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-6 bg-gold-400/60" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-400/80">Mentorship &amp; Collaboration</span>
            </div>
            <h2 id="mentorship-home-heading" className="font-serif text-display-md text-white mt-1 mb-3 leading-[1.1]">
              Shaping the Next Generation of Engineers
            </h2>
            <div className="h-[2px] w-14 bg-gradient-to-r from-gold-400 to-gold-200 mb-7 rounded-full" aria-hidden="true" />
            <p className="text-white/50 leading-[1.9] text-[15px] mb-10">
              Beyond research and leadership, {profile?.name ?? 'Professor Dauda'} is deeply committed to mentoring engineers, innovators, and entrepreneurs who will carry engineering excellence forward across Africa and beyond.
            </p>

            {/* Stats teaser */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04]">
                <p className="font-serif font-bold text-white text-3xl mb-1">50+</p>
                <p className="text-[11px] text-white/35 uppercase tracking-widest">PG Students Mentored</p>
              </div>
              <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04]">
                <p className="font-serif font-bold text-white text-3xl mb-1">4+</p>
                <p className="text-[11px] text-white/35 uppercase tracking-widest">Active Programmes</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg" className="shadow-gold group">
                <Link href="/mentorship">
                  Mentorship Programmes
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/35 hover:text-white">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="lg:col-span-7">
            {items.length === 0 ? (
              <p className="text-center text-white/30 text-sm py-12">No mentorship programmes yet.</p>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                {items.slice(0, 4).map((prog, idx) => {
                  const Icon   = ICON_CYCLE[idx % ICON_CYCLE.length]
                  const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length]
                  return (
                    <motion.div
                      key={prog.id}
                      variants={staggerItem}
                      className={`group p-6 rounded-2xl border ${accent.border} bg-white/[0.04] hover:bg-white/[0.07] hover:border-gold-400/25 transition-all duration-300`}
                    >
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg} mb-5 group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                        <Icon className={`h-6 w-6 ${accent.text}`} />
                      </div>
                      <h3 className="font-serif font-semibold text-white text-[15px] mb-2 leading-snug">{prog.title}</h3>
                      {prog.targetAudience && (
                        <p className={`text-[11px] font-semibold mb-2 uppercase tracking-wider ${accent.text} opacity-70`}>{prog.targetAudience}</p>
                      )}
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-3">{prog.description}</p>

                      {/* Bottom indicator */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                        <div className={`h-1.5 w-1.5 rounded-full ${accent.dot} animate-pulse-glow`} aria-hidden="true" />
                        <span className="text-[10px] text-white/25 uppercase tracking-widest">Active</span>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
