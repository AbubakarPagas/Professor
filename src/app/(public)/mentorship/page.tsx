import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { GraduationCap, Users, Globe, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Mentorship',
  description:
    'Mentorship programmes and opportunities offered by Professor Mohammed Dauda for engineers, innovators, and entrepreneurs.',
}

const PROGRAMMES = [
  {
    icon: GraduationCap,
    title: 'Postgraduate Supervision',
    audience: 'PhD & Masters students',
    description:
      'Professor Dauda supervises doctoral and masters research students in mechanical engineering, manufacturing technology, and engineering entrepreneurship. Over 50 students have completed their postgraduate studies under his supervision.',
    status: 'Ongoing',
  },
  {
    icon: Users,
    title: 'Professional Mentorship Network',
    audience: 'Early-career engineers',
    description:
      'A structured mentorship network connecting young Nigerian engineers with experienced professionals. Topics include career development, technical skills, professional certification, and research pathways.',
    status: 'Ongoing',
  },
  {
    icon: Lightbulb,
    title: 'Engineering Entrepreneurship Coaching',
    audience: 'Engineering entrepreneurs',
    description:
      'Through ASR-ICiE and Young Africa Innovates, Professor Dauda coaches engineering graduates seeking to build technology-based enterprises. Coaching covers business model development, IP protection, funding pathways, and market entry.',
    status: 'Ongoing',
  },
  {
    icon: Globe,
    title: 'International Research Exchange',
    audience: 'Researchers & academics',
    description:
      'Facilitates research exchange opportunities with institutions in Japan, the United States, and across Africa. Scholars benefit from cross-cultural research partnerships and joint publication opportunities.',
    status: 'Ongoing',
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

      <div className="bg-white">
        <div className="container py-16">

          {/* Intro */}
          <div className="max-w-2xl mb-16">
            <p className="text-[15px] text-charcoal/75 leading-relaxed mb-4">
              Mentorship has been a defining thread throughout Professor Dauda&apos;s career.
              Having benefited from mentors at the University of Maiduguri, the University
              of Lagos, and Tokyo Metropolitan University, he is deeply committed to giving
              back through structured programmes that open doors for the next generation.
            </p>
            <p className="text-[15px] text-charcoal/75 leading-relaxed">
              His mentorship spans academia, industry, and entrepreneurship — reflecting the
              multidimensional nature of his own career.
            </p>
          </div>

          {/* Programme cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {PROGRAMMES.map(({ icon: Icon, title, audience, description, status }) => (
              <article key={title} className="card-base p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                    <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {status}
                  </span>
                </div>
                <h2 className="font-serif font-semibold text-navy-700 text-lg mb-0.5">{title}</h2>
                <p className="text-xs font-medium text-gold-500 uppercase tracking-wide mb-3">{audience}</p>
                <p className="text-sm text-charcoal/65 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-navy-700 p-8 text-center max-w-2xl mx-auto">
            <h2 className="font-serif font-bold text-white text-xl mb-2">
              Interested in Mentorship?
            </h2>
            <p className="text-white/60 text-sm mb-6">
              Use the contact form to send an expression of interest. Please describe your
              background, current role, and what you hope to gain from the mentorship.
            </p>
            <Button asChild variant="gold">
              <Link href="/contact">
                Express Interest
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
