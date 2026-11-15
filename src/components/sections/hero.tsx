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
    let start = 0
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
  const credentials = profile?.fellowships?.length ? profile.fellowships : ['FNSE', 'FNIMechE', 'MASME']
  const title       = profile?.title ?? 'Professor of Mechanical Engineering'
  const tagline     = profile?.tagline ?? 'Engineering Ideas. Empowering People. Advancing Innovation.'
  const shortBio    = profile?.shortBio ?? 'Discover the work, leadership, and contributions of Professor Mohammed Dauda — a pioneer at the intersection of mechanical engineering, entrepreneurship, and Africa\'s sustainable development.'
  const imageUrl    = profile?.profileImageUrl ?? '/images/profile.png'
  const name        = profile?.name ?? 'Professor Mohammed Dauda'
  const stats       = profile?.stats

  const STAT_CARDS = [
    { icon: BookOpen,     value: stats?.publications ?? 100, label: 'Publications' },
    { icon: FlaskConical, value: stats?.patents ?? 15,       label: 'Patents' },
    { icon: Award,        value: stats?.awards ?? 30,        label: 'Awards' },
    { icon: Users,        value: stats?.studentsSupervised ?? 50, label: 'Mentored' },
  ]

  const PILLARS = [
    { icon: Cpu,       label: 'Engineering Excellence' },
    { icon: Lightbulb, label: 'Innovation & Patents' },
    { icon: Globe,     label: 'Entrepreneurship' },
  ]

  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const taglineParts = tagline.split('.')
    .map(s => s.trim())
    .filter(Boolean)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-900"
      aria-labelledby="hero-heading"
    >
      {/* Layered backgrounds */}
      <motion.div className="absolute inset-0" style={{ y: bgY }} aria-hidden="true">
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-mesh-dark" />
        {/* Circuit grid */}
        <div className="absolute inset-0 pattern-circuit opacity-100" />
        {/* Dot layer */}
        <div className="absolute inset-0 pattern-dots opacity-30" />
        {/* Large glowing orb top-right */}
        <div className="absolute -right-32 -top-32 h-[700px] w-[700px] rounded-full bg-gradient-radial from-gold-500/[0.06] to-transparent pointer-events-none" />
        {/* Bottom left subtle glow */}
        <div className="absolute -left-24 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-radial from-navy-700/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* Animated orbiting ring */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block" aria-hidden="true">
        <motion.div
          className="h-[520px] w-[520px] rounded-full border border-gold-400/[0.08]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-gold-400/[0.05]"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        />
        <div className="absolute inset-16 rounded-full border border-white/[0.04]" />
      </div>

      <motion.div
        className="container relative z-10 py-28 lg:py-36"
        style={{ y: textY, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Text column */}
          <div className="lg:col-span-7 order-2 lg:order-1">

            {/* Credential badges */}
            <motion.div
              className="flex flex-wrap gap-2 mb-7"
              aria-label="Professional credentials"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
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

            {/* Speciality line */}
            <motion.p
              className="text-white/40 text-xs font-semibold tracking-[0.22em] uppercase mb-4 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="h-px w-8 bg-gradient-to-r from-gold-400 to-transparent" aria-hidden="true" />
              {title}
            </motion.p>

            {/* Main heading */}
            <div className="mb-8 overflow-hidden">
              {taglineParts.map((part, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1
                    id={i === 0 ? 'hero-heading' : undefined}
                    className="font-serif font-bold leading-[1.08]"
                    style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)' }}
                  >
                    {i === taglineParts.length - 1 ? (
                      <span className="text-gradient-gold">{part}.</span>
                    ) : (
                      <span className="text-white">{part}.</span>
                    )}
                  </h1>
                </motion.div>
              ))}
            </div>

            {/* Bio */}
            <motion.p
              className="text-white/55 leading-[1.9] max-w-lg mb-8"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              {shortBio}
            </motion.p>

            {/* Innovation pillars */}
            <motion.div
              className="flex flex-wrap gap-3 mb-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.5 }}
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.65 }}
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
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

          {/* Portrait column */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Spinning outer ring */}
              <motion.div
                className="absolute -inset-10 rounded-full border border-gold-400/[0.12]"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
                aria-hidden="true"
              >
                {/* Small dot on the ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-gold-400 shadow-gold animate-pulse-glow" />
              </motion.div>

              {/* Slower inner ring */}
              <motion.div
                className="absolute -inset-5 rounded-full border border-dashed border-gold-400/[0.18]"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
                aria-hidden="true"
              />

              {/* Glow aura */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-gold-400/15 via-transparent to-transparent blur-xl" aria-hidden="true" />

              {/* Portrait */}
              <div className="relative h-60 w-60 sm:h-80 sm:w-80 lg:h-[27rem] lg:w-[27rem] rounded-full overflow-hidden ring-glow-gold">
                {/* Inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent z-10" aria-hidden="true" />
                <Image
                  src={imageUrl}
                  alt={`${name} — portrait`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width:640px) 240px, (max-width:1024px) 320px, 432px"
                />
              </div>

              {/* Name badge */}
              <motion.div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-900/95 backdrop-blur-md border border-gold-400/40 px-5 py-2.5 shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-white font-serif font-semibold text-sm">{name}</p>
              </motion.div>

              {/* Floating innovation badge */}
              <motion.div
                className="absolute -left-6 top-1/4 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-white/10 p-3 shadow-xl hidden sm:flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <div className="h-8 w-8 rounded-xl bg-gold-400/20 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-gold-400" />
                </div>
                <div>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest">Innovator</p>
                  <p className="text-white text-[11px] font-semibold">15+ Patents</p>
                </div>
              </motion.div>

              {/* Floating research badge */}
              <motion.div
                className="absolute -right-6 top-2/3 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-white/10 p-3 shadow-xl hidden sm:flex items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                aria-hidden="true"
              >
                <div className="h-8 w-8 rounded-xl bg-sky-400/20 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-sky-400" />
                </div>
                <div>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest">Scholar</p>
                  <p className="text-white text-[11px] font-semibold">100+ Papers</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
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
