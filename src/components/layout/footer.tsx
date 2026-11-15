'use client'

import Link from 'next/link'
import { Mail, MapPin, ExternalLink, ArrowUpRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'
import type { SiteProfile } from '@/types'

interface FooterProps {
  profile: SiteProfile | null
}

const FOOTER_NAV = {
  'Academic Work': [
    { label: 'Research',     href: '/research' },
    { label: 'Publications', href: '/publications' },
    { label: 'Patents',      href: '/patents' },
    { label: 'Projects',     href: '/projects' },
    { label: 'Awards',       href: '/awards' },
  ],
  'Engagement': [
    { label: 'Activities',  href: '/activities' },
    { label: 'Gallery',     href: '/gallery' },
    { label: 'News',        href: '/news' },
    { label: 'Mentorship',  href: '/mentorship' },
    { label: 'Contact',     href: '/contact' },
  ],
}

export function Footer({ profile }: FooterProps) {
  const email   = profile?.email ?? 'mdsmatt@gmail.com'
  const address = profile?.address ?? profile?.institution ?? 'Nigeria'
  const name    = profile?.name ?? 'Prof. Mohammed Dauda'
  const credentials = profile?.fellowships?.length ? profile.fellowships.slice(0, 3).join(' · ') : 'FNSE · FNIMechE · MASME'

  const profiles: { label: string; href: string }[] = [
    profile?.googleScholar ? { label: 'Google Scholar', href: profile.googleScholar } : null,
    profile?.researchGate  ? { label: 'ResearchGate',   href: profile.researchGate }  : null,
    profile?.orcid         ? { label: 'ORCID',          href: `https://orcid.org/${profile.orcid}` } : null,
    profile?.linkedIn      ? { label: 'LinkedIn',       href: profile.linkedIn }       : null,
  ].filter((p): p is { label: string; href: string } => p !== null)

  return (
    <footer className="bg-navy-900 text-white/70 relative overflow-hidden" role="contentinfo">
      {/* Top decorative elements */}
      <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" aria-hidden="true" />

      {/* Animated gold bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, #8A6931 0%, #C5A15A 30%, #DBBE6B 50%, #C5A15A 70%, #8A6931 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 4s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Large background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(197,161,90,0.03), transparent 70%)' }}
        aria-hidden="true" />

      <div className="container relative py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <motion.div
            className="sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-sm" aria-hidden="true" />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-navy-900 font-serif font-bold text-sm flex-shrink-0 shadow-gold">
                  MD
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-white text-[15px] leading-tight">{name}</p>
                <p className="text-[9.5px] tracking-[0.18em] text-gold-400/70 uppercase mt-0.5">{credentials}</p>
              </div>
            </div>

            <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-xs">
              Distinguished mechanical engineer, academic leader, and pioneer of engineering innovation in Nigeria and beyond.
            </p>

            <address className="not-italic space-y-3 text-sm text-white/45">
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-gold-400 transition-colors group">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.07] border border-white/[0.08] group-hover:bg-gold-400/15 group-hover:border-gold-400/25 transition-all">
                  <Mail className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                </span>
                <span className="text-xs">{email}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.07] border border-white/[0.08]">
                  <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                </span>
                <span className="text-xs">{address}</span>
              </div>
            </address>
          </motion.div>

          {/* Nav columns */}
          {Object.entries(FOOTER_NAV).map(([group, links], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: (gi + 1) * 0.1, duration: 0.5 }}
            >
              <h3 className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold-400/80 mb-5 flex items-center gap-2">
                <span className="h-px w-3 bg-gold-400/50" aria-hidden="true" />
                {group}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-gold-300 transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="h-px w-0 bg-gold-400/50 group-hover:w-3 transition-all duration-200 flex-shrink-0" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Profiles column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold-400/80 mb-5 flex items-center gap-2">
              <span className="h-px w-3 bg-gold-400/50" aria-hidden="true" />
              Profiles
            </h3>
            <ul className="space-y-2.5" role="list">
              {(profiles.length > 0 ? profiles : ['Google Scholar', 'ResearchGate', 'ORCID', 'LinkedIn'].map(l => ({ label: l, href: '#' }))).map(p => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target={p.href !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm text-white/45 hover:text-gold-300 transition-colors group"
                  >
                    {p.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Innovation badge */}
            <div className="mt-8 p-4 rounded-2xl border border-gold-400/[0.15] bg-gold-400/[0.04]">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                <span className="text-[9px] uppercase tracking-widest text-gold-400/70 font-semibold">Innovation Hub</span>
              </div>
              <p className="text-[11px] text-white/35 leading-relaxed">Driving engineering excellence across Africa through research, patents &amp; entrepreneurship.</p>
            </div>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white/55 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white/55 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
