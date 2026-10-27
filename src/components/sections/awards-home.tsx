import Link from 'next/link'
import { ArrowRight, Trophy, Globe, Star, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const HIGHLIGHTS = [
  {
    icon: Trophy,
    category: 'National',
    title: 'Engineering Excellence Award',
    body: 'Nigerian Society of Engineers',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: Globe,
    category: 'International',
    title: 'ASME International Recognition',
    body: 'American Society of Mechanical Engineers',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
  },
  {
    icon: Star,
    category: 'Fellowship',
    title: 'Fellow of the Nigerian Society of Engineers',
    body: 'NSE — FNSE',
    color: 'text-gold-600',
    bg: 'bg-gold-50',
    border: 'border-gold-200',
  },
  {
    icon: Medal,
    category: 'Fellowship',
    title: 'Fellow of the Nigerian Institution of Mechanical Engineers',
    body: 'NIMechE — FNIMechE',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
]

export function AwardsHomeSection() {
  return (
    <section className="section bg-ivory-100" aria-labelledby="awards-home-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading */}
          <div className="lg:sticky lg:top-28">
            <span className="section-label">Honours &amp; Recognition</span>
            <h2 id="awards-home-heading" className="section-title mt-1 mb-3">
              Awards, Fellowships &amp; International Recognition
            </h2>
            <div className="gold-rule mb-7" aria-hidden="true" />
            <p className="text-charcoal/65 leading-[1.85] text-[15px] mb-10 max-w-md">
              Decades of engineering excellence recognised by national and international
              professional bodies, governments, and academic institutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { value: '30+', label: 'Awards & Honours' },
                { value: '3',   label: 'International Fellowships' },
              ].map(s => (
                <div key={s.label} className="p-5 rounded-xl border border-ivory-300 bg-white text-center shadow-card">
                  <p className="font-serif font-bold text-navy-800 text-3xl mb-1">{s.value}</p>
                  <p className="text-xs text-charcoal/50 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link href="/awards">
                View All Awards
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Right — highlights */}
          <ul className="space-y-4" role="list" aria-label="Award highlights">
            {HIGHLIGHTS.map(({ icon: Icon, category, title, body, color, bg, border }) => (
              <li
                key={title}
                className="group flex items-start gap-5 p-6 card-base hover:border-gold-200 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${bg} border ${border} group-hover:scale-105 transition-transform duration-300`}
                  aria-hidden="true"
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-charcoal/35 block mb-1">
                    {category}
                  </span>
                  <p className="font-serif font-semibold text-navy-800 text-[15px] leading-snug mb-0.5">
                    {title}
                  </p>
                  <p className="text-sm text-charcoal/55">{body}</p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}
