import type { Metadata } from 'next'
import { Mail, MapPin, ExternalLink, MessageSquare, Calendar, Mic } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact & Collaborations',
  description:
    'Get in touch with Professor Mohammed Dauda for research collaborations, speaking engagements, mentorship, or media enquiries.',
}

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@profdauda.com',
    href: 'mailto:contact@profdauda.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nigeria',
    href: null,
  },
]

const ENQUIRY_TYPES = [
  { icon: MessageSquare, label: 'Research Collaboration' },
  { icon: Mic,           label: 'Speaking Engagements' },
  { icon: Calendar,      label: 'Academic Partnerships' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Contact & Collaborations"
        description="Research collaborations, speaking engagements, mentorship enquiries, and media requests are all welcome."
      />

      <div className="bg-ivory-100">
        <div className="container py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">

              {/* Contact info card */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-6 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" />
                  Contact Information
                </h2>
                <div className="space-y-5">
                  {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold-50 border border-gold-200">
                        <Icon className="h-4 w-4 text-gold-500" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-charcoal/40 mb-0.5">{label}</p>
                        {href
                          ? <a href={href} className="text-sm font-medium text-navy-800 hover:text-gold-600 transition-colors">{value}</a>
                          : <p className="text-sm text-charcoal/65">{value}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquiry types */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-5 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" />
                  Types of Enquiry
                </h2>
                <ul className="space-y-3">
                  {ENQUIRY_TYPES.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-charcoal/65">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-navy-50 border border-navy-100">
                        <Icon className="h-3.5 w-3.5 text-navy-500" aria-hidden="true" />
                      </div>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Academic profiles */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-5 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" />
                  Academic Profiles
                </h2>
                <div className="space-y-2">
                  {['Google Scholar', 'ResearchGate', 'ORCID', 'LinkedIn'].map(name => (
                    <a
                      key={name}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-ivory-200 bg-ivory-50 text-sm font-medium text-charcoal/65 hover:border-gold-300 hover:bg-gold-50/60 hover:text-navy-800 transition-all duration-200"
                    >
                      {name}
                      <ExternalLink className="h-3.5 w-3.5 opacity-35 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Press note */}
              <div className="rounded-xl bg-gradient-to-br from-gold-50 to-ivory-50 border border-gold-200 p-5">
                <p className="text-sm text-gold-800 leading-relaxed">
                  <strong className="font-semibold">Media &amp; Press:</strong> Please include your publication name and article deadline when reaching out for press enquiries.
                </p>
              </div>

            </aside>

            {/* Form */}
            <div className="lg:col-span-8">
              <div className="card-base p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="font-serif font-bold text-navy-800 text-2xl mb-1.5">
                    Send a Message
                  </h2>
                  <p className="text-sm text-charcoal/50">
                    Responses are typically within 48 working hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
