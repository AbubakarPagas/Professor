import Link from 'next/link'
import { Trophy, Star, Globe, Medal, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const featuredAwards = [
  {
    icon: Trophy,
    year: '2022',
    title: 'National Merit Award for Engineering Excellence',
    body: 'Nigerian Society of Engineers',
    category: 'National',
  },
  {
    icon: Globe,
    year: '2020',
    title: 'International Recognition for Innovation in Manufacturing',
    body: 'ASME International',
    category: 'International',
  },
  {
    icon: Medal,
    year: '2018',
    title: 'Fellow — Nigerian Institution of Mechanical Engineers',
    body: 'NIMechE',
    category: 'Fellowship',
  },
  {
    icon: Star,
    year: '2015',
    title: 'Distinguished Academic Contribution Award',
    body: 'Federal Government of Nigeria',
    category: 'National',
  },
]

const categoryColour: Record<string, string> = {
  National: 'bg-green-100 text-green-700',
  International: 'bg-blue-100 text-blue-700',
  Fellowship: 'bg-gold-100 text-gold-700',
  Academic: 'bg-purple-100 text-purple-700',
}

export function AwardsHighlightSection() {
  return (
    <section className="section-padding gradient-navy" aria-labelledby="awards-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gold-500/20 text-gold-300 border-gold-500/30">Honours</Badge>
          <h2
            id="awards-heading"
            className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4"
          >
            Awards & Recognition
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Decades of excellence recognised by national and international bodies
          </p>
          <div className="h-1 w-16 gradient-gold rounded-full mx-auto mt-4" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {featuredAwards.map(({ icon: Icon, year, title, body, category }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300 group"
            >
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors"
                aria-hidden="true"
              >
                <Icon className="h-6 w-6 text-gold-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${categoryColour[category] ?? 'bg-gray-100 text-gray-700'}`}
                  >
                    {category}
                  </span>
                  <span className="text-xs text-white/40">{year}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-xs text-white/50">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 hover:border-gold-400"
          >
            <Link href="/awards">
              View All Awards
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
