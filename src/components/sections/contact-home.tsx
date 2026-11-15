'use client'

import Link from 'next/link'
import { Mail, MapPin, ExternalLink, ArrowRight, MessageSquare, Mic, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem, slideLeft, slideRight } from '@/lib/motion'
import type { SiteProfile } from '@/types'

interface ContactHomeSectionProps {
  profile: SiteProfile | null
}

export function ContactHomeSection({ profile }: ContactHomeSectionProps) {
  const email    = profile?.email ?? 'mdsmatt@gmail.com'
  const address  = profile?.address ?? profile?.institution ?? 'Nigeria'

  const PROFILES = [
    { label: 'Google Scholar', href: profile?.googleScholar || null },
    { label: 'ResearchGate',   href: profile?.researchGate  || null },
    { label: 'ORCID',          href: profile?.orcid ? `https://orcid.org/${profile.orcid}` : null },
    { label: 'LinkedIn',       href: profile?.linkedIn      || null },
  ].filter(p => p.href)

  const ENQUIRY_TYPES = [
    { icon: MessageSquare, label: 'Research Collaboration', color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { icon: Mic,           label: 'Speaking Engagements',   color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { icon: Calendar,      label: 'Academic Partnerships',  color: 'text-gold-400', bg: 'bg-gold-400/10' },
  ]

  return (
    <section className="section relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 60%, #ebe6da 100%)' }} aria-labelledby="contact-home-heading">
      <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />

      <div className="container relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label justify-center">Get in Touch</span>
          <h2 id="contact-home-heading" className="section-title mt-1 mb-3">Collaborations &amp; Enquiries</h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/50 max-w-xl mx-auto text-sm leading-relaxed">
            Research collaborations, speaking engagements, mentorship enquiries, and media requests are all welcome.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-ivory-200 shadow-[0_20px_80px_rgba(13,24,41,0.1)] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left navy panel */}
            <motion.div
              className="lg:col-span-2 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0D1829 0%, #131F36 100%)' }}
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {/* Pattern */}
              <div className="absolute inset-0 pattern-dots opacity-50" aria-hidden="true" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-gold-400/[0.07]" aria-hidden="true" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-gold-400/[0.12]" aria-hidden="true" />

              <div className="relative z-10 p-10 h-full flex flex-col">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="h-px w-5 bg-gold-400/50" aria-hidden="true" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400/70">Direct Contact</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-2xl leading-tight mb-3">Reach the Professor Directly</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-10">
                    For research collaborations, speaking engagements, academic partnerships, or media enquiries.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] border border-white/[0.1]">
                      <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-0.5">Email</p>
                      <a href={`mailto:${email}`} className="text-sm text-white/70 hover:text-gold-300 transition-colors font-medium">{email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] border border-white/[0.1]">
                      <MapPin className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-0.5">Location</p>
                      <p className="text-sm text-white/60">{address}</p>
                    </div>
                  </div>
                </div>

                {/* Enquiry types */}
                <div className="mb-8">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-3">Enquiry Types</p>
                  <div className="space-y-2">
                    {ENQUIRY_TYPES.map(({ icon: Icon, label, color, bg }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <div className={`h-6 w-6 rounded-lg ${bg} flex items-center justify-center`}>
                          <Icon className={`h-3 w-3 ${color}`} aria-hidden="true" />
                        </div>
                        <span className="text-[12px] text-white/45">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {PROFILES.length > 0 && (
                  <div className="mt-auto">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-3">Academic Profiles</p>
                    <div className="flex flex-wrap gap-2">
                      {PROFILES.map(p => (
                        <a
                          key={p.label}
                          href={p.href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-white/45 hover:text-gold-300 transition-colors border border-white/[0.1] rounded-full px-2.5 py-1 hover:border-gold-400/30"
                        >
                          {p.label}
                          <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right panel */}
            <motion.div
              className="lg:col-span-3 p-10 flex flex-col justify-center"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <div className="mb-10">
                <h3 className="font-serif font-semibold text-navy-800 text-2xl mb-2">Send a Message</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed">
                  Use the contact form to send an enquiry. Select the appropriate category and provide as much context as possible for a prompt response. Typical reply time: 48 working hours.
                </p>
              </div>

              {/* Quick contact grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                {ENQUIRY_TYPES.map(({ icon: Icon, label, color, bg }) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl ${bg}/40 border border-ivory-200 hover:border-gold-200 transition-colors`}
                  >
                    <div className={`h-9 w-9 rounded-xl ${bg} flex items-center justify-center`}>
                      <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
                    </div>
                    <span className="text-[11px] text-charcoal/60 font-medium leading-snug">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="flex-1 group">
                  <Link href="/contact">
                    Open Contact Form
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${email}`}>
                    <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                    Email Directly
                  </a>
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
