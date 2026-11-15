'use client'

import { PageHero } from '@/components/layout/page-hero'
import { GraduationCap, Users, Globe, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'

const PROGRAMMES = [
  {
    icon: GraduationCap,
    title: 'Postgraduate Supervision',
    audience: 'PhD & Masters Students',
    description:
      'Professor Dauda supervises doctoral and masters research students in mechanical engineering, manufacturing technology, and engineering entrepreneurship. Over 50 students have completed their postgraduate studies under his supervision.',
    status: 'Ongoing',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    icon: Users,
    title: 'Professional Mentorship Network',
    audience: 'Early-Career Engineers',
    description:
      'A structured mentorship network connecting young Nigerian engineers with experienced professionals. Topics include career development, technical skills, professional certification, and research pathways.',
    status: 'Ongoing',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    icon: Lightbulb,
    title: 'Engineering Entrepreneurship Coaching',
    audience: 'Engineering Entrepreneurs',
    description:
      'Through ASR-ICiE and Young Africa Innovates, Professor Dauda coaches engineering graduates seeking to build technology-based enterprises. Coaching covers business model development, IP protection, funding pathways, and market entry.',
    status: 'Ongoing',
    color: 'text-gold-600',
    bg: 'bg-gold-50',
    border: 'border-gold-200',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    icon: Globe,
    title: 'International Research Exchange',
    audience: 'Researchers & Academics',
    description:
      'Facilitates research exchange opportunities with institutions in Japan, the United States, and across Africa. Scholars benefit from cross-cultural research partnerships and joint publication opportunities.',
    status: 'Ongoing',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
]

export default function MentorshipPage() {
  return (
    <>
      <PageHero
        label="Mentorship"
        title="Mentorship & Collaboration"
        description="Committed to developing the next generation of engineers, entrepreneurs, and academic leaders through structured mentorship and collaborative research."
      />

      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fdfcf8 60%, #f9f7f2 100%)' }}>
        <div className="absolute inset-0 pattern-crosshatch" aria-hidden="true" />
        <div className="absolute -right-32 top-0 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle at top right, rgba(197,161,90,0.05), transparent 70%)' }}
          aria-hidden="true" />

        <div className="container py-16 lg:py-20 relative">

          {/* Intro */}
          <motion.div
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[15.5px] text-charcoal/70 leading-[1.9] mb-4">
              Mentorship has been a defining thread throughout Professor Dauda&apos;s career.
              Having benefited from mentors at the University of Maiduguri, the University
              of Lagos, and Tokyo Metropolitan University, he is deeply committed to giving
              back through structured programmes that open doors for the next generation.
            </p>
            <p className="text-[15.5px] text-charcoal/70 leading-[1.9]">
              His mentorship spans academia, industry, and entrepreneurship — reflecting the
              multidimensional nature of his own career.
            </p>
          </motion.div>

          {/* Programme cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {PROGRAMMES.map(({ icon: Icon, title, audience, description, status, color, bg, border, statusColor }) => (
              <motion.article
                key={title}
                variants={staggerItem}
                className="card-base overflow-hidden hover:border-gold-200 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`h-[2px] w-full ${bg} border-b ${border}`} aria-hidden="true" />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} border ${border} flex-shrink-0`}
                      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                      aria-hidden="true"
                    >
                      <Icon className={`h-5.5 w-5.5 ${color}`} />
                    </div>
                    <span className={`text-[11px] font-semibold tracking-wider uppercase ${statusColor} border px-3 py-1 rounded-full`}>
                      {status}
                    </span>
                  </div>
                  <h2 className="font-serif font-semibold text-navy-700 text-lg mb-1">{title}</h2>
                  <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${color}`}>{audience}</p>
                  <p className="text-sm text-charcoal/65 leading-relaxed">{description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="rounded-3xl overflow-hidden max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-navy-800 p-10 text-center overflow-hidden">
              <div className="absolute inset-0 pattern-dots opacity-50" aria-hidden="true" />
              <div className="absolute inset-0 bg-mesh-dark" aria-hidden="true" />
              <div className="relative z-10">
                <h2 className="font-serif font-bold text-white text-2xl mb-3">
                  Interested in Mentorship?
                </h2>
                <p className="text-white/55 text-sm mb-7 max-w-md mx-auto leading-relaxed">
                  Use the contact form to send an expression of interest. Please describe your
                  background, current role, and what you hope to gain from the mentorship.
                </p>
                <Button asChild variant="gold" className="shadow-gold group">
                  <Link href="/contact">
                    Express Interest
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
