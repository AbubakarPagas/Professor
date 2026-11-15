'use client'

import { Mail, MapPin, ExternalLink, MessageSquare, Calendar, Mic } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { ContactForm } from './contact-form'
import { motion } from 'framer-motion'
import { VIEWPORT, slideLeft, slideRight, staggerContainer, staggerItem } from '@/lib/motion'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@mohammeddauda.com',
    href: 'mailto:contact@mohammeddauda.com',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nigeria',
    href: null,
    color: 'text-gold-600',
    bg: 'bg-gold-50',
    border: 'border-gold-200',
  },
]

const ENQUIRY_TYPES = [
  { icon: MessageSquare, label: 'Research Collaboration', desc: 'Joint research and academic partnerships' },
  { icon: Mic,           label: 'Speaking Engagements',   desc: 'Conferences, keynotes, and panels' },
  { icon: Calendar,      label: 'Academic Partnerships',  desc: 'Institutional collaborations' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Contact & Collaborations"
        description="Research collaborations, speaking engagements, mentorship enquiries, and media requests are all welcome."
      />

      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />

        <div className="container py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Sidebar */}
            <motion.aside
              className="lg:col-span-4 space-y-5"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >

              {/* Contact info card */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-charcoal/35 mb-6 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Contact Information
                </h2>
                <div className="space-y-5">
                  {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color, bg, border }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${bg} border ${border} shadow-sm`}>
                        <Icon className={`h-4.5 w-4.5 ${color}`} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-charcoal/35 mb-0.5">{label}</p>
                        {href
                          ? <a href={href} className="text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors">{value}</a>
                          : <p className="text-sm text-charcoal/65 font-medium">{value}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquiry types */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-charcoal/35 mb-5 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Types of Enquiry
                </h2>
                <ul className="space-y-4">
                  {ENQUIRY_TYPES.map(({ icon: Icon, label, desc }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gold-50 border border-gold-200 mt-0.5">
                        <Icon className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-700">{label}</p>
                        <p className="text-xs text-charcoal/50 mt-0.5">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Academic profiles */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-charcoal/35 mb-5 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" aria-hidden="true" />
                  Academic Profiles
                </h2>
                <div className="space-y-2">
                  {['Google Scholar', 'ResearchGate', 'ORCID', 'LinkedIn'].map(name => (
                    <a
                      key={name}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-ivory-200 bg-ivory-50 text-sm font-medium text-charcoal/60 hover:border-gold-300 hover:bg-gold-50 hover:text-navy-800 transition-all duration-200"
                    >
                      {name}
                      <ExternalLink className="h-3.5 w-3.5 opacity-30 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Press note */}
              <div className="rounded-2xl bg-gradient-to-br from-gold-50 to-ivory-50 border border-gold-200 p-5">
                <p className="text-sm text-gold-800 leading-relaxed">
                  <strong className="font-semibold">Media &amp; Press:</strong> Please include your publication name and article deadline when reaching out for press enquiries.
                </p>
              </div>

            </motion.aside>

            {/* Form */}
            <motion.div
              className="lg:col-span-8"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <div className="card-base p-8 sm:p-10 overflow-hidden">
                {/* Top gold accent */}
                <div className="h-[2px] -mx-10 -mt-10 mb-8 bg-gradient-to-r from-gold-400 via-gold-300 to-transparent" aria-hidden="true" />

                <div className="mb-8">
                  <h2 className="font-serif font-bold text-navy-800 text-2xl mb-1.5">
                    Send a Message
                  </h2>
                  <p className="text-sm text-charcoal/45">
                    Responses are typically within 48 working hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  )
}
