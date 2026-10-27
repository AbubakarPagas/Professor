import Link from 'next/link'
import { Mail, MapPin, ExternalLink, ArrowRight, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CONTACT_ITEMS = [
  { icon: Mail,   label: 'Email',    value: 'contact@profdauda.com', href: 'mailto:contact@profdauda.com' },
  { icon: MapPin, label: 'Location', value: 'Nigeria', href: null },
]

const PROFILES = [
  { label: 'Google Scholar', href: '#' },
  { label: 'ResearchGate',   href: '#' },
  { label: 'ORCID',          href: '#' },
  { label: 'LinkedIn',       href: '#' },
]

export function ContactHomeSection() {
  return (
    <section className="section bg-ivory-100" aria-labelledby="contact-home-heading">
      <div className="container">
        <div className="text-center mb-14">
          <span className="section-label justify-center">Get in Touch</span>
          <h2 id="contact-home-heading" className="section-title mt-1 mb-3">
            Collaborations &amp; Enquiries
          </h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/55 max-w-xl mx-auto text-sm leading-relaxed">
            Research collaborations, speaking engagements, mentorship enquiries, and media requests are all welcome.
          </p>
        </div>

        {/* Card */}
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-ivory-200 shadow-card-hover bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left navy panel */}
            <div className="lg:col-span-2 relative bg-navy-800 p-10 flex flex-col overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-white/[0.05]" aria-hidden="true" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-gold-400/[0.1]" aria-hidden="true" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400/70 mb-5">
                  <span className="block h-px w-4 bg-gold-400/50" />
                  Direct Contact
                </span>
                <h3 className="font-serif font-bold text-white text-2xl leading-tight mb-4">
                  Reach the Professor Directly
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-10 flex-1">
                  For research collaborations, speaking engagements, academic partnerships, or media enquiries.
                </p>

                <div className="space-y-5">
                  {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07] border border-white/[0.08]">
                        <Icon className="h-4 w-4 text-gold-400" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-0.5">{label}</p>
                        {href
                          ? <a href={href} className="text-sm text-white/75 hover:text-gold-400 transition-colors font-medium">{value}</a>
                          : <p className="text-sm text-white/65">{value}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="lg:col-span-3 p-10">
              <h3 className="font-serif font-semibold text-navy-800 text-lg mb-6">
                Academic Profiles
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {PROFILES.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-xl border border-ivory-200 bg-ivory-50 text-sm font-medium text-charcoal/65 hover:border-gold-300 hover:bg-gold-50/60 hover:text-navy-800 transition-all duration-200"
                  >
                    {label}
                    <ExternalLink className="h-3.5 w-3.5 opacity-35 group-hover:opacity-75 transition-opacity" aria-hidden="true" />
                  </a>
                ))}
              </div>

              <div className="rounded-xl border border-ivory-200 bg-ivory-50 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy-50 border border-navy-100">
                    <MessageSquare className="h-4 w-4 text-navy-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800 text-sm mb-1">Prefer a direct message?</p>
                    <p className="text-sm text-charcoal/55 leading-relaxed">
                      Use the contact form for detailed enquiries and responses within 48 hours.
                    </p>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/contact">
                    Open Contact Form
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
