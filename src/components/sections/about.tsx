import Link from 'next/link'
import { CheckCircle2, ArrowRight, Building2, FlaskConical, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const expertise = [
  'Mechanical Engineering Design',
  'Thermofluids & Energy Systems',
  'Manufacturing Technology',
  'Engineering Entrepreneurship',
  'Research & Innovation Policy',
  'Renewable Energy Systems',
  'Engineering Education',
  'Industrial Automation',
]

const highlights = [
  {
    icon: Building2,
    title: 'Academic Leadership',
    desc: 'Held senior leadership positions in leading Nigerian universities, shaping engineering education.',
  },
  {
    icon: FlaskConical,
    title: 'Research Excellence',
    desc: 'Principal investigator on numerous funded research projects with national and international impact.',
  },
  {
    icon: Users,
    title: 'Mentorship & Impact',
    desc: 'Supervised 50+ postgraduate students, fostering the next generation of Nigerian engineers.',
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
            A Life Devoted to Engineering Excellence
          </h2>
          <div className="h-1 w-16 gradient-gold rounded-full mx-auto" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Biography text */}
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Professor Mohammed Dauda, FNSE, FNIMechE, MASME, is a distinguished mechanical
              engineer and academic leader with over three decades of transformative contributions
              to engineering education, research, and practice in Nigeria.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A Fellow of the Nigerian Society of Engineers (FNSE), Fellow of the Nigerian
              Institution of Mechanical Engineers (FNIMechE), and Member of the American Society
              of Mechanical Engineers (MASME), he has dedicated his career to advancing engineering
              science and fostering innovation that addresses Nigeria&apos;s socio-economic challenges.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              His research spans thermofluids, manufacturing technology, renewable energy, and
              engineering entrepreneurship, yielding over a hundred publications, fifteen patents,
              and numerous technology transfers to industry.
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
                Areas of Expertise
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
