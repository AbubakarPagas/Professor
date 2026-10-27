import Link from 'next/link'
import { ArrowRight, FlaskConical, Cpu, Leaf, Cog, Globe, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AREAS = [
  {
    icon: Cog,
    title: 'Advanced Manufacturing Technology',
    desc: 'Pioneering manufacturing processes and the establishment of AMTDI to accelerate Nigeria\'s industrial self-sufficiency.',
    accent: 'text-sky-600',
    bg: 'bg-sky-50',
    hoverBg: 'group-hover:bg-sky-100/60',
  },
  {
    icon: FlaskConical,
    title: 'Thermofluids & Energy Systems',
    desc: 'Heat transfer, fluid mechanics, and energy conversion with applications in industry and sustainable infrastructure.',
    accent: 'text-violet-600',
    bg: 'bg-violet-50',
    hoverBg: 'group-hover:bg-violet-100/60',
  },
  {
    icon: Leaf,
    title: 'Agro-processing & Green Composites',
    desc: 'Novel machinery for agricultural value chains and sustainable composite materials that reduce environmental impact.',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-50',
    hoverBg: 'group-hover:bg-emerald-100/60',
  },
  {
    icon: Cpu,
    title: 'Innovation & Entrepreneurship',
    desc: 'STEP-B, ASR-ICiE, and Young Africa Innovates — programmes that convert research excellence into enterprise.',
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    hoverBg: 'group-hover:bg-amber-100/60',
  },
  {
    icon: Globe,
    title: 'Renewable Energy',
    desc: 'Solar, biomass, and sustainable energy solutions for rural and industrial applications across sub-Saharan Africa.',
    accent: 'text-teal-600',
    bg: 'bg-teal-50',
    hoverBg: 'group-hover:bg-teal-100/60',
  },
  {
    icon: GraduationCap,
    title: 'Engineering Education',
    desc: 'Curriculum reform, capacity building, and policy advocacy to strengthen engineering education in Nigeria.',
    accent: 'text-rose-600',
    bg: 'bg-rose-50',
    hoverBg: 'group-hover:bg-rose-100/60',
  },
]

export function ResearchHomeSection() {
  return (
    <section className="relative section bg-white overflow-hidden" aria-labelledby="research-home-heading">
      {/* Faint decorative circle */}
      <div
        className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-ivory-200 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="text-center mb-16">
          <span className="section-label justify-center">Research &amp; Expertise</span>
          <h2 id="research-home-heading" className="section-title mt-1 mb-3">
            Fields of Research
          </h2>
          <div className="gold-rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-charcoal/55 max-w-xl mx-auto text-sm leading-relaxed">
            Over three decades of interdisciplinary research advancing engineering science and national development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {AREAS.map(({ icon: Icon, title, desc, accent, bg, hoverBg }) => (
            <article
              key={title}
              className="group card-base p-7 flex flex-col hover:border-gold-200 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${hoverBg} transition-colors duration-300`}
                aria-hidden="true"
              >
                <Icon className={`h-5 w-5 ${accent}`} />
              </div>
              <h3 className="font-serif font-semibold text-navy-800 mb-2.5 text-[15px] leading-snug">
                {title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed flex-1">{desc}</p>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/research">
              All Research Projects
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
