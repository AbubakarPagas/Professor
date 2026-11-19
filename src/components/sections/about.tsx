import Link from 'next/link'
import { CheckCircle2, ArrowRight, Building2, FlaskConical, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const expertise = [
  'Green Composite & Natural-Fibre Materials',
  'Advanced Manufacturing Technology',
  'Agro-processing Machinery',
  'Renewable Energy & Solar Systems',
  'Engineering Entrepreneurship',
  'Waste Recovery & Circular Economy',
  'Digital Systems & Mechatronics',
  'Engineering Education',
]

const highlights = [
  {
    icon: Building2,
    title: 'Academic Leadership',
    desc: 'Professor of Mechanical Engineering at the University of Maiduguri; Director of ASR-ICiE and Coordinator of the UNDP-supported UniPod.',
  },
  {
    icon: FlaskConical,
    title: 'Research & Scholarship',
    desc: 'Over 44 scholarly publications and 5 patent-related records across natural-fibre composites, manufacturing and agro-processing technologies.',
  },
  {
    icon: Users,
    title: 'Mentorship & Impact',
    desc: 'Postgraduate supervisor, entrepreneurship educator, and mentor to engineers through ASR-ICiE, UniPod and national professional networks.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="gold" className="mb-4">About</Badge>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold font-serif text-navy-700 mb-4"
          >
            Research, Innovation &amp; Institutional Leadership
          </h2>
          <div className="h-1 w-16 gradient-gold rounded-full mx-auto" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Biography text */}
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Professor Mohammed Dauda, FNSE, FNIMechE, is a Professor of Mechanical Engineering
              (Materials) at the University of Maiduguri, researcher and institutional leader whose
              career spans university teaching, engineering materials research, advanced
              manufacturing, technological innovation and entrepreneurship development.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A Fellow of the Nigerian Society of Engineers (FNSE) and Fellow of the Nigerian
              Institution of Mechanical Engineers (FNIMechE), he currently serves as Director of
              the Abdul Samad Rabiu International Centre for Innovation and Entrepreneurship
              (ASR-ICiE) and Coordinator of the UNDP-supported UniPod at the University of
              Maiduguri.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              His work connects academic knowledge with practical engineering solutions, industrial
              development, enterprise creation and opportunities for young people. He received the
              Order of the Rising Sun, Gold and Silver Rays from the Government of Japan in 2024.
            </p>

            <div className="flex gap-3">
              <Button asChild variant="navy">
                <Link href="/research">
                  Explore Research
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Areas of expertise */}
            <div>
              <h3 className="font-serif font-semibold text-navy-700 text-lg mb-4">
                Research &amp; Scholarly Interests
              </h3>
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                role="list"
                aria-label="Areas of expertise"
              >
                {expertise.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2
                      className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlight cards */}
            <div className="space-y-4">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg border border-border hover:border-gold-300 transition-colors bg-white hover:bg-gold-50/50"
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-100"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-700 text-sm mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
