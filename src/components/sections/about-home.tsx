import Link from 'next/link'
import { CheckCircle2, ArrowRight, GraduationCap, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EXPERTISE = [
  'Advanced Manufacturing Technology',
  'Thermofluids & Energy Systems',
  'Agro-processing Machinery',
  'Green Composite Materials',
  'Engineering Entrepreneurship',
  'Renewable Energy Systems',
  'Technology Policy & Innovation',
  'Engineering Education',
]

const HIGHLIGHTS = [
  { icon: GraduationCap, text: 'Professor of Mechanical Engineering since 2012' },
  { icon: Building2,     text: 'Director-General, NASENI' },
]

export function AboutHomeSection() {
  return (
    <section
      id="about"
      className="relative section bg-white overflow-hidden"
      aria-labelledby="about-home-heading"
    >
      {/* Faint corner accent */}
      <div
        className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-gold-50 opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <div>
            <span className="section-label">About the Professor</span>
            <h2 id="about-home-heading" className="section-title mt-1 mb-3">
              A Career at the Frontier of Engineering
            </h2>
            <div className="gold-rule mb-8" aria-hidden="true" />

            <p className="text-charcoal/75 leading-[1.85] mb-5 text-[15px]">
              Professor Mohammed Dauda, FNSE, FNIMechE, MASME is a distinguished mechanical
              engineer and academic leader whose career spans research, teaching, policy, and
              institutional leadership at the highest levels in Nigeria.
            </p>
            <p className="text-charcoal/75 leading-[1.85] mb-5 text-[15px]">
              Educated at the University of Maiduguri, the University of Lagos, and Tokyo
              Metropolitan University, he was appointed Professor of Mechanical Engineering in
              2012. He has led the Department of Mechanical Engineering and established the
              Centre for Entrepreneurship and Enterprise Development (CEED).
            </p>
            <p className="text-charcoal/75 leading-[1.85] mb-8 text-[15px]">
              As Director-General at NASENI, he established AMTDI — the Advanced Manufacturing
              Technology Development Institute — driving Nigeria&apos;s industrial
              self-sufficiency agenda.
            </p>

            {/* Highlight pills */}
            <div className="flex flex-col gap-3 mb-10">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-navy-700 font-medium">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold-50 border border-gold-200">
                    <Icon className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
                  </span>
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/about">
                  Full Biography
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/biography">Career Timeline</Link>
              </Button>
            </div>
          </div>

          {/* Right — expertise */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/45">
                Areas of Expertise
              </h3>
              <div className="flex-1 h-px bg-ivory-300" />
            </div>
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              aria-label="Areas of expertise"
              role="list"
            >
              {EXPERTISE.map(item => (
                <li
                  key={item}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-ivory-200 bg-ivory-50 hover:border-gold-200 hover:bg-gold-50/60 transition-all duration-200 cursor-default"
                >
                  <CheckCircle2
                    className="h-4 w-4 text-gold-400 flex-shrink-0 group-hover:text-gold-500 transition-colors"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-charcoal/75 group-hover:text-navy-700 transition-colors leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Credentials badge strip */}
            <div className="mt-8 p-5 rounded-xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gold-600/70 mb-3">
                Professional Fellowships
              </p>
              <div className="flex flex-wrap gap-2">
                {['FNSE', 'FNIMechE', 'MASME'].map(c => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-full bg-white border border-gold-200 px-3.5 py-1 text-[11px] font-bold tracking-widest text-gold-700 shadow-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
