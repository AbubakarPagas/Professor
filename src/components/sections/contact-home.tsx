import Link from 'next/link'
import { Mail, MapPin, ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SiteProfile } from '@/types'

interface ContactHomeSectionProps {
  profile: SiteProfile | null
}

export function ContactHomeSection({ profile }: ContactHomeSectionProps) {
  const email    = profile?.email ?? 'contact@profdauda.com'
  const address  = profile?.address ?? profile?.institution ?? 'Nigeria'

  const PROFILES = [
    { label: 'Google Scholar', href: profile?.googleScholar || null },
    { label: 'ResearchGate',   href: profile?.researchGate  || null },
    { label: 'ORCID',          href: profile?.orcid ? `https://orcid.org/${profile.orcid}` : null },
    { label: 'LinkedIn',       href: profile?.linkedIn      || null },
  ].filter(p => p.href)

  return (
    <section className="section bg-ivory-100" aria-labelledby="contact-home-heading">
      <div className="container">
        <div className="text-center mb-14">
          <span className="section-label justify-center">Get in Touch</span>
          <h2 id="contact-home-heading" className="section-title mt-1 mb-3">Collaborations &amp; Enquiries</h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/55 max-w-xl mx-auto text-sm leading-relaxed">
            Research collaborations, speaking engagements, mentorship enquiries, and media requests are all welcome.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-ivory-200 shadow-card-hover bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left navy panel */}
            <div className="lg:col-span-2 relative bg-navy-800 p-10 flex flex-col overflow-hidden">
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-white/[0.05]" aria-hidden="true" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-gold-400/[0.1]" aria-hidden="true" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400/70 mb-5">
                  <span className="block h-px w-4 bg-gold-400/50" />Direct Contact
                </span>
                <h3 className="font-serif font-bold text-white text-2xl leading-tight mb-4">Reach the Professor Directly</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-10">
                  For research collaborations, speaking engagements, academic partnerships, or media enquiries.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07] border border-white/[0.08]">
                      <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-0.5">Email</p>
                      <a href={`mailto:${email}`} className="text-sm text-white/75 hover:text-gold-400 transition-colors font-medium">{email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07] border border-white/[0.08]">
                      <MapPin className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-0.5">Location</p>
                      <p className="text-sm text-white/65">{address}</p>
                    </div>
                  </div>
                </div>

                {PROFILES.length > 0 && (
                  <div className="mt-8">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-3">Academic Profiles</p>
                    <div className="flex flex-wrap gap-2">
                      {PROFILES.map(p => (
                        <a
                          key={p.label}
                          href={p.href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-white/50 hover:text-gold-400 transition-colors border border-white/10 rounded-full px-2.5 py-1"
                        >
                          {p.label}
                          <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel */}
            <div className="lg:col-span-3 p-10 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-semibold text-navy-800 text-xl mb-3">Send a Message</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed mb-8">
                  Use the contact form to send an enquiry. Select the appropriate category and provide as much context as possible for a prompt response.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="flex-1">
                  <Link href="/contact">
                    Open Contact Form
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${email}`}>Email Directly</a>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
