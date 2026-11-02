'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Award, FlaskConical, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SiteProfile } from '@/types'

interface HeroSectionProps {
  profile: SiteProfile | null
}

export function HeroSection({ profile }: HeroSectionProps) {
  const credentials = profile?.fellowships?.length ? profile.fellowships : ['FNSE', 'FNIMechE', 'MASME']
  const title       = profile?.title ?? 'Professor of Mechanical Engineering'
  const tagline     = profile?.tagline ?? 'Engineering Ideas. Empowering People. Advancing Innovation.'
  const shortBio    = profile?.shortBio ?? 'Discover the work, leadership and contributions of Professor Mohammed Dauda in mechanical engineering, entrepreneurship, and sustainable development across Africa.'
  const imageUrl    = profile?.profileImageUrl ?? '/images/profile.png'
  const name        = profile?.name ?? 'Professor Mohammed Dauda'
  const stats       = profile?.stats

  const STAT_CARDS = [
    { icon: BookOpen,     value: stats ? `${stats.publications}+` : '—', label: 'Publications' },
    { icon: FlaskConical, value: stats ? `${stats.patents}+`      : '—', label: 'Patents' },
    { icon: Award,        value: stats ? `${stats.awards}+`       : '—', label: 'Awards' },
    { icon: Users,        value: stats ? `${stats.studentsSupervised}+` : '—', label: 'Mentored' },
  ]

  return (
    <section
      className="relative min-h-screen bg-navy-800 flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(197,161,90,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        aria-hidden="true"
      />
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-white/[0.04] pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full border border-gold-400/[0.06] pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Text column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex flex-wrap gap-2 mb-7" aria-label="Professional credentials">
              {credentials.map(c => (
                <span key={c} className="inline-flex items-center rounded-full border border-gold-400/30 bg-gold-400/[0.08] px-3.5 py-1 text-[11px] font-bold tracking-[0.15em] text-gold-400">
                  {c}
                </span>
              ))}
            </div>

            <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-3">{title}</p>

            <h1 id="hero-heading" className="font-serif font-bold text-white leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {tagline.includes('.') ? (
                <>
                  {tagline.split('.').slice(0, -1).join('.')}
                  <em className="not-italic text-gradient-gold">.</em>
                </>
              ) : (
                <em className="not-italic text-gradient-gold">{tagline}</em>
              )}
            </h1>

            <p className="text-white/55 leading-[1.8] max-w-lg mb-10" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>
              {shortBio}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-px mb-10 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.04]" aria-label="Key statistics">
              {STAT_CARDS.map(({ icon: Icon, value, label }, i) => (
                <div key={label} className={`flex flex-col items-center justify-center py-5 px-2 text-center ${i < STAT_CARDS.length - 1 ? 'border-r border-white/[0.08]' : ''}`}>
                  <Icon className="h-4 w-4 text-gold-400 mb-2" aria-hidden="true" />
                  <p className="font-serif font-bold text-white text-2xl leading-none mb-1">{value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg" className="shadow-gold-lg">
                <Link href="/about">About the Professor <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:border-white/35 hover:text-white">
                <Link href="/research"><FlaskConical className="mr-2 h-4 w-4" aria-hidden="true" />Explore Research</Link>
              </Button>
            </div>
          </div>

          {/* Portrait column */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-gold-400/15 to-transparent" aria-hidden="true" />
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-gold-400/20" aria-hidden="true" />
              <div className="relative h-60 w-60 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem] rounded-full overflow-hidden border-2 border-gold-400/40 bg-navy-700">
                <Image
                  src={imageUrl}
                  alt={`${name} — portrait`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width:640px) 240px, (max-width:1024px) 320px, 416px"
                />
              </div>
              {/* Name badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-800 border border-gold-400/30 px-5 py-2.5 shadow-xl">
                <p className="text-white font-serif font-semibold text-sm">{name}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
