'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Award, FlaskConical, Users, Cpu, Globe, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import type { SiteProfile } from '@/types'

interface HeroSectionProps {
  profile: SiteProfile | null
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || target === 0) return
    const duration = 1800
    const startTime = performance.now()
    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const PILL_VARIANTS = {
  hidden:  { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
}

export function HeroSection({ profile }: HeroSectionProps) {
  const credentials = profile?.fellowships?.length ? profile.fellowships : ['FNSE', 'FNIMechE']
  const title       = profile?.title ?? 'Professor of Mechanical Engineering (Materials)'
  const tagline     = profile?.tagline ?? 'Engineering Ideas. Empowering People. Advancing Innovation.'
  const shortBio    = profile?.shortBio ?? 'Professor Mohammed Dauda is a mechanical engineer, researcher and institutional leader whose career spans university teaching, engineering materials research, advanced manufacturing, technological innovation and entrepreneurship development. He is Professor at the University of Maiduguri, Director of ASR-ICiE and Coordinator of the UNDP-supported UniPod.'
  const imageUrl    = profile?.profileImageUrl ?? '/images/profile.png'
  const name        = profile?.name ?? 'Professor Mohammed Dauda'
  const stats       = profile?.stats

  const STAT_CARDS = [
    { icon: BookOpen,     value: stats?.publications ?? 44, label: 'Publications' },
    { icon: FlaskConical, value: stats?.patents ?? 5,       label: 'Patents' },
    { icon: Award,        value: stats?.awards ?? 30,       label: 'Awards' },
    { icon: Users,        value: stats?.studentsSupervised ?? 50, label: 'Mentored' },
  ]

  const PILLARS = [
    { icon: Cpu,       label: 'Engineering Materials' },
    { icon: Lightbulb, label: 'Innovation & Entrepreneurship' },
    { icon: Globe,     label: 'Community Impact' },
  ]

  // Background-only parallax — content stays fixed
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY         = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scrollCueOp = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const taglineParts = tagline.split('.')
    .map(s => s.trim())
    .filter(Boolean)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-900"
      aria-labelledby="hero-heading"
    >
      {/* ── Background layer (parallax) ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }} aria-hidden="true">
        <div className="absolute inset-0 bg-mesh-dark" />
        <div className="absolute inset-0 pattern-circuit opacity-100" />
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="absolute -right-32 -top-32 h-[700px] w-[700px] rounded-full bg-gradient-radial from-gold-500/[0.06] to-transparent pointer-events-none" />
        <div className="absolute -left-24 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-radial from-navy-700/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* ── Orbiting rings behind portrait (desktop) ── */}
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block" aria-hidden="true">
        <motion.div
          className="h-[560px] w-[560px] rounded-full border border-gold-400/[0.07]"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-10 rounded-full border border-gold-400/[0.04]"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
        />
      </div>

      {/* ── Main content (no scroll transform — stays solid while scrolling) ── */}
      <div className="container relative z-10 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

          {/* ── Text column ── */}
          <div className="lg:col-span-7 order-2 lg:order-1">

            {/* Credential badges */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              aria-label="Professional credentials"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            >
              {credentials.map((c) => (
                <motion.span
                  key={c}
                  variants={PILL_VARIANTS}
                  className="inline-flex items-center rounded-full border border-gold-400/40 bg-gold-400/[0.1] px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] text-gold-300 backdrop-blur-sm"
                >
                  {c}
                </motion.span>
              ))}
            </motion.div>

            {/* Prominent name */}
            <motion.h1
              id="hero-heading"
              className="font-serif font-bold text-white leading-tight mb-1"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              Prof. Mohammed Dauda,{' '}
              <span className="text-gradient-gold">FNSE, FNIMechE</span>
            </motion.h1>

            {/* Role line */}
            <motion.p
              className="text-white/45 text-[11px] font-semibold tracking-[0.22em] uppercase mb-7 flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
            >
              <span className="h-px w-8 bg-gradient-to-r from-gold-400 to-transparent" aria-hidden="true" />
              {title}
            </motion.p>

            {/* Tagline — the visual centrepiece */}
            <div className="mb-8 overflow-hidden">
              {taglineParts.map((part, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    className="font-serif font-bold leading-[1.06]"
                    style={{ fontSize: 'clamp(2.4rem, 4.8vw, 2.5rem)' }}
                  >
                    {i === taglineParts.length - 1 ? (
                      <span className="text-gradient-gold">{part}.</span>
                    ) : (
                      <span className="text-white">{part}.</span>
                    )}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bio */}
            <motion.p
              className="text-white/55 leading-[1.9] max-w-[520px] mb-8"
              style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.6 }}
            >
              {shortBio}
            </motion.p>

            {/* Innovation pillars */}
            <motion.div
              className="flex flex-wrap gap-2.5 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              {PILLARS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-3.5 py-1.5 text-[11.5px] text-white/60 font-medium backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-4 gap-px mb-10 rounded-2xl overflow-hidden border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm"
              aria-label="Key statistics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.08, duration: 0.6 }}
            >
              {STAT_CARDS.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center justify-center py-5 px-2 text-center group hover:bg-white/[0.04] transition-colors duration-200 ${i < STAT_CARDS.length - 1 ? 'border-r border-white/[0.08]' : ''}`}
                >
                  <Icon className="h-4 w-4 text-gold-400 mb-2 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  <p className="font-serif font-bold text-white text-2xl leading-none mb-1 stat-number">
                    <AnimatedCounter target={value} suffix="+" />
                  </p>
                  <p className="text-[9.5px] text-white/35 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.16, duration: 0.5 }}
            >
              <Button asChild variant="gold" size="lg" className="shadow-gold-lg group">
                <Link href="/about">
                  About the Professor
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:border-white/35 hover:text-white group">
                <Link href="/research">
                  <FlaskConical className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" aria-hidden="true" />
                  Explore Research
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* ── Portrait column — editorial card ── */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outer glow halo */}
              <div
                className="absolute -inset-6 rounded-[2rem] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 60% 40%, rgba(197,161,90,0.18) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
                aria-hidden="true"
              />

              {/* Card frame */}
              <div
                className="relative rounded-[1.75rem] overflow-hidden"
                style={{
                  width: 'clamp(240px, 28vw, 280px)',
                  aspectRatio: '3 / 4',
                  boxShadow: '0 0 0 1px rgba(197,161,90,0.3), 0 32px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                {/* Portrait image — fills the full card */}
                <Image
                  src={imageUrl}
                  alt={`${name} — portrait`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width:640px) 240px, (max-width:1024px) 320px, 380px"
                />

                {/* Bottom fade to allow name plate to sit cleanly */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-2/5 z-10"
                  style={{ background: 'linear-gradient(to top, rgba(10,15,40,0.92) 0%, rgba(10,15,40,0.6) 50%, transparent 100%)' }}
                  aria-hidden="true"
                />

                {/* Name plate inside the card */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 pt-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <p className="font-serif font-bold text-white text-lg leading-tight mb-0.5">{name}</p>
                  <p className="text-gold-400 text-[11px] font-semibold tracking-[0.14em] uppercase">{title}</p>
                </motion.div>

                {/* Top-right corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none z-10"
                  style={{ background: 'radial-gradient(circle at top right, rgba(197,161,90,0.15), transparent 70%)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Gold corner tick marks */}
              {/* top-left */}
              <div className="absolute -top-px -left-px w-6 h-6 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-0 w-5 h-[1.5px] bg-gold-400/60" />
                <div className="absolute top-0 left-0 w-[1.5px] h-5 bg-gold-400/60" />
              </div>
              {/* top-right */}
              <div className="absolute -top-px -right-px w-6 h-6 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-5 h-[1.5px] bg-gold-400/60" />
                <div className="absolute top-0 right-0 w-[1.5px] h-5 bg-gold-400/60" />
              </div>
              {/* bottom-left */}
              <div className="absolute -bottom-px -left-px w-6 h-6 pointer-events-none" aria-hidden="true">
                <div className="absolute bottom-0 left-0 w-5 h-[1.5px] bg-gold-400/60" />
                <div className="absolute bottom-0 left-0 w-[1.5px] h-5 bg-gold-400/60" />
              </div>
              {/* bottom-right */}
              <div className="absolute -bottom-px -right-px w-6 h-6 pointer-events-none" aria-hidden="true">
                <div className="absolute bottom-0 right-0 w-5 h-[1.5px] bg-gold-400/60" />
                <div className="absolute bottom-0 right-0 w-[1.5px] h-5 bg-gold-400/60" />
              </div>

              {/* Stat badge — top-left of card */}
              <motion.div
                className="absolute -left-5 top-10 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-white/10 px-4 py-3 shadow-xl hidden sm:block"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <p className="text-[9px] text-white/35 uppercase tracking-widest mb-0.5">Publications</p>
                <p className="text-white font-serif font-bold text-lg leading-none">44<span className="text-gold-400 text-sm">+</span></p>
              </motion.div>

              {/* Stat badge — bottom-right of card */}
              <motion.div
                className="absolute -right-5 bottom-16 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-white/10 px-4 py-3 shadow-xl hidden sm:block"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                aria-hidden="true"
              >
                <p className="text-[9px] text-white/35 uppercase tracking-widest mb-0.5">Patents</p>
                <p className="text-white font-serif font-bold text-lg leading-none">5<span className="text-gold-400 text-sm">+</span></p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Scroll cue — fades out as soon as user starts scrolling ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: scrollCueOp }}
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/25 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          className="h-10 w-[1px] bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
