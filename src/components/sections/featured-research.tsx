import Link from 'next/link'
import { ArrowRight, FlaskConical, Cpu, Leaf, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const researchAreas = [
  {
    icon: FlaskConical,
    title: 'Thermofluids & Energy',
    description:
      'Advanced research in heat transfer, fluid mechanics, and energy conversion systems for sustainable industrial applications.',
    tags: ['Heat Transfer', 'Fluid Dynamics', 'Energy Systems'],
  },
  {
    icon: Cpu,
    title: 'Manufacturing Technology',
    description:
      'Innovative manufacturing processes and automation technologies tailored to Africa\'s industrial development needs.',
    tags: ['Automation', 'Process Engineering', 'Industry 4.0'],
  },
  {
    icon: Leaf,
    title: 'Renewable Energy',
    description:
      'Harnessing solar, wind, and biomass energy resources to provide sustainable power solutions for Nigerian communities.',
    tags: ['Solar Energy', 'Biomass', 'Energy Policy'],
  },
  {
    icon: Wrench,
    title: 'Engineering Entrepreneurship',
    description:
      'Bridging the gap between engineering innovation and enterprise creation to drive economic development.',
    tags: ['Innovation', 'SMEs', 'Technology Transfer'],
  },
]

export function FeaturedResearchSection() {
  return (
    <section
      className="section-padding bg-gray-50"
      aria-labelledby="research-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="gold" className="mb-4">Research</Badge>
          <h2
            id="research-heading"
            className="text-3xl sm:text-4xl font-bold font-serif text-navy-700 mb-4"
          >
            Research Themes & Innovation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge research programmes addressing Nigeria&apos;s engineering and development challenges
          </p>
          <div className="h-1 w-16 gradient-gold rounded-full mx-auto mt-4" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {researchAreas.map(({ icon: Icon, title, description, tags }) => (
            <Card
              key={title}
              className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border hover:border-gold-300"
            >
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 group-hover:bg-gold-100 transition-colors mb-3">
                  <Icon className="h-6 w-6 text-navy-600 group-hover:text-gold-600 transition-colors" aria-hidden="true" />
                </div>
                <CardTitle className="text-navy-700 text-lg font-serif">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed mb-4">
                  {description}
                </CardDescription>
                <div className="flex flex-wrap gap-1">
                  {tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="navy" size="lg">
            <Link href="/research">
              View All Research Projects
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
