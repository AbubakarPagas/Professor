import Link from 'next/link'
import { ArrowRight, Users, GraduationCap, Lightbulb, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PILLARS = [
  {
    icon: GraduationCap,
    title: 'Postgraduate Supervision',
    desc: 'Supervised over 50 PhD and Masters students, many of whom now hold professorial and senior industry positions.',
    accent: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    icon: Users,
    title: 'Professional Mentorship',
    desc: 'Guided hundreds of young engineers through professional development, career transitions, and research mentorship.',
    accent: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurship Coaching',
    desc: 'Through Young Africa Innovates and ASR-ICiE, equipping emerging entrepreneurs to commercialise engineering ideas.',
    accent: 'text-gold-400',
    bg: 'bg-gold-400/10',
  },
  {
    icon: Globe,
    title: 'International Exchange',
    desc: 'Facilitating research exchange programmes with institutions in Japan, the US, and across Africa.',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
]

export function MentorshipHomeSection() {
  return (
    <section
      className="relative section bg-navy-800 overflow-hidden"
      aria-labelledby="mentorship-home-heading"
    >
      {/* Radial glow bottom-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(197,161,90,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* Text */}
          <div className="lg:col-span-5">
            <span className="section-label text-gold-400/80">Mentorship &amp; Collaboration</span>
            <h2 id="mentorship-home-heading" className="font-serif text-display-md text-white mt-1 mb-3 leading-tight">
              Shaping the Next Generation of Engineers
            </h2>
            <div className="h-[2px] w-10 bg-gradient-to-r from-gold-400 to-gold-300 mb-7 rounded-full" aria-hidden="true" />
            <p className="text-white/50 leading-[1.85] text-[15px] mb-4">
              Beyond research and leadership, Professor Dauda is deeply committed to
              mentoring engineers, innovators, and entrepreneurs who will carry Nigeria&apos;s
              engineering legacy forward.
            </p>
            <p className="text-white/50 leading-[1.85] text-[15px] mb-10">
              From postgraduate supervision to international exchange programmes, his mentorship
              network spans institutions across Africa, Asia, and the Americas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg" className="shadow-gold">
                <Link href="/mentorship">
                  Mentorship Programmes
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/35 hover:text-white"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Pillar cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map(({ icon: Icon, title, desc, accent, bg }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.07] hover:border-gold-400/20 transition-all duration-300"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg} mb-4`} aria-hidden="true">
                  <Icon className={`h-5 w-5 ${accent}`} />
                </div>
                <h3 className="font-serif font-semibold text-white text-[15px] mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
