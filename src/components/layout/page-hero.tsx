'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  description?: string
}

export function PageHero({ label, title, subtitle, description }: PageHeroProps) {
  return (
    <div className="relative bg-navy-900 pt-[62px] overflow-hidden">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-mesh-dark" aria-hidden="true" />
      <div className="absolute inset-0 pattern-circuit opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 pattern-diagonal" aria-hidden="true" />

      {/* Top-right glowing orb */}
      <div
        className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(197,161,90,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Animated rings */}
      <motion.div
        className="absolute right-16 top-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full border border-gold-400/[0.08] hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        aria-hidden="true"
      />
      <div
        className="absolute right-24 top-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full border border-white/[0.04] hidden lg:block"
        aria-hidden="true"
      />

      <div className="container relative py-16 lg:py-22">
        {label && (
          <motion.p
            className="inline-flex items-center gap-2.5 text-[10.5px] font-bold tracking-[0.22em] uppercase text-gold-400/80 mb-5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="block h-px w-6 bg-gradient-to-r from-gold-400 to-transparent" aria-hidden="true" />
            {label}
          </motion.p>
        )}

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-serif font-bold text-white leading-[1.08]"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)' }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
        </div>

        {subtitle && (
          <motion.p
            className="text-gold-400/80 text-sm font-semibold tracking-[0.06em] mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p
            className="text-white/50 max-w-2xl text-[15px] leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          className="mt-7 h-[2px] w-16 bg-gradient-to-r from-gold-400 via-gold-300 to-transparent rounded-full"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory-100/20 to-transparent pointer-events-none" aria-hidden="true" />
    </div>
  )
}
