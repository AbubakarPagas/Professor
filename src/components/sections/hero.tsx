import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Award, FlaskConical, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CREDENTIALS = ['FNSE', 'FNIMechE', 'MASME']

const STATS = [
  { icon: BookOpen,     value: '100+', label: 'Publications' },
  { icon: FlaskConical, value: '15+',  label: 'Patents' },
  { icon: Award,        value: '30+',  label: 'Awards' },
  { icon: Users,        value: '50+',  label: 'Mentored' },
]

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-navy-800 flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background: radial glow + cross-hatch */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(197,161,90,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Decorative large circle outline, right */}
      <div
        className="absolute -right-48 top-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-white/[0.04] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full border border-gold-400/[0.06] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Text column ── */}
          <div className="lg:col-span-7 order-2 lg:order-1">

            {/* Credential pills */}
            <div className="flex flex-wrap gap-2 mb-7" aria-label="Professional credentials">
              {CREDENTIALS.map(c => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border border-gold-400/30 bg-gold-400/[0.08] px-3.5 py-1 text-[11px] font-bold tracking-[0.15em] text-gold-400"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Eyebrow */}
            <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-3">
              Professor of Mechanical Engineering
            </p>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="font-serif font-bold text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Engineering Ideas.{' '}
              <em className="not-italic text-gradient-gold">Empowering People.</em>{' '}
              Advancing&nbsp;Innovation.
            </h1>

            {/* Supporting text */}
            <p
              className="text-white/55 leading-[1.8] max-w-lg mb-10"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}
            >
              Discover the work, leadership and contributions of Professor Mohammed Dauda
              in mechanical engineering, entrepreneurship, and sustainable development across Africa.
            </p>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 gap-px mb-10 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.04]"
              aria-label="Key statistics"
            >
              {STATS.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center justify-center py-5 px-2 text-center ${
                    i < STATS.length - 1 ? 'border-r border-white/[0.08]' : ''
                  }`}
                >
                  <Icon className="h-4 w-4 text-gold-400 mb-2" aria-hidden="true" />
                  <p className="font-serif font-bold text-white text-2xl leading-none mb-1">{value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg" className="shadow-gold-lg">
                <Link href="/about">
                  About the Professor
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:border-white/35 hover:text-white"
              >
                <Link href="/research">
                  <FlaskConical className="mr-2 h-4 w-4" aria-hidden="true" />
                  Explore Research
                </Link>
              </Button>
            </div>
          </div>

          {/* ── Portrait column ── */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-6 rounded-full bg-gradient-to-br from-gold-400/15 to-transparent"
                aria-hidden="true"
              />
              {/* Dashed ring */}
              <div
                className="absolute -inset-3 rounded-full border-2 border-dashed border-gold-400/20"
                aria-hidden="true"
              />
              {/* Portrait */}
              <div className="relative h-60 w-60 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem] rounded-full overflow-hidden border-2 border-gold-400/40 bg-navy-700">
                <Image
                  src="/images/profile.jpg"
                  alt="Professor Mohammed Dauda — portrait"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width:640px) 240px, (max-width:1024px) 320px, 416px"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif font-bold text-gold-400 text-8xl select-none opacity-[0.12]">
                    MD
                  </span>
                </div>
              </div>
              {/* Badge */}
              <div
                className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 flex flex-col items-center justify-center shadow-gold text-center"
                aria-hidden="true"
              >
                <span className="font-serif font-bold text-navy-800 text-[10px] leading-tight">Prof.</span>
                <span className="font-serif font-bold text-navy-800 text-[10px] leading-tight">MD</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-ivory-100/20 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
