import type { Metadata } from 'next'
import { CheckCircle2, GraduationCap, Building2, BookOpen, FlaskConical, Users, Award } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Professor Mohammed Dauda — his background, credentials, expertise, and lifelong commitment to engineering excellence.',
}

const FELLOWSHIPS = [
  { code: 'FNSE',     name: 'Fellow, Nigerian Society of Engineers' },
  { code: 'FNIMechE', name: 'Fellow, Nigerian Institution of Mechanical Engineers' },
  { code: 'MASME',    name: 'Member, American Society of Mechanical Engineers' },
]

const EXPERTISE = [
  'Advanced Manufacturing Technology',
  'Thermofluids & Energy Systems',
  'Agro-processing Machinery',
  'Green Composite Materials',
  'Engineering Entrepreneurship',
  'Renewable Energy Systems',
  'Technology Policy & Innovation',
  'Engineering Education & Curriculum Reform',
  'Industrial Automation',
  'Research Management',
]

const EDUCATION = [
  { degree: 'Ph.D. / Postdoctoral Research', institution: 'Tokyo Metropolitan University, Japan', field: 'Mechanical Engineering' },
  { degree: 'Masters Degree',                institution: 'University of Lagos, Nigeria',          field: 'Mechanical Engineering' },
  { degree: 'B.Eng.',                         institution: 'University of Maiduguri, Nigeria',     field: 'Mechanical Engineering' },
]

const STATS = [
  { icon: BookOpen,     value: '100+', label: 'Publications' },
  { icon: FlaskConical, value: '15+',  label: 'Patents' },
  { icon: Award,        value: '30+',  label: 'Awards' },
  { icon: Users,        value: '50+',  label: 'Students Mentored' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About the Professor"
        title="Professor Mohammed Dauda"
        subtitle="FNSE · FNIMechE · MASME"
        description="Distinguished mechanical engineer, academic leader, and pioneer of engineering innovation, entrepreneurship, and sustainable development in Nigeria."
      />

      {/* Stats bar */}
      <div className="bg-white border-b border-ivory-200">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-ivory-200">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-7 px-4 text-center group">
                <Icon className="h-4 w-4 text-gold-400 mb-2.5" aria-hidden="true" />
                <p className="font-serif font-bold text-navy-800 text-2xl leading-none mb-1">{value}</p>
                <p className="text-[11px] text-charcoal/45 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">

            {/* Main biography */}
            <div className="lg:col-span-7 space-y-6 text-[15.5px] text-charcoal/75 leading-[1.9]">

              <p className="text-[17px] text-charcoal/85 leading-[1.85] font-medium border-l-[3px] border-gold-400 pl-6">
                Professor Mohammed Dauda, FNSE, FNIMechE, MASME is one of Nigeria&apos;s most
                distinguished mechanical engineers and academic leaders, with a career spanning
                over three decades of teaching, research, institutional leadership, and policy
                engagement.
              </p>

              <p>
                Educated at the University of Maiduguri, the University of Lagos, and Tokyo
                Metropolitan University in Japan, he brings a uniquely international
                perspective to Nigerian engineering challenges. His appointment as Professor of
                Mechanical Engineering in 2012 came after years of sustained scholarly
                contribution and academic service.
              </p>
              <p>
                As Head of the Department of Mechanical Engineering and founding Director of
                the Centre for Entrepreneurship and Enterprise Development (CEED), he championed
                the integration of engineering science with enterprise creation — a vision that
                has catalysed the entrepreneurship journeys of hundreds of graduates.
              </p>
              <p>
                In a pivotal national role at the National Agency for Science and Engineering
                Infrastructure (NASENI), Professor Dauda established the Advanced Manufacturing
                Technology Development Institute (AMTDI), a landmark institution aimed at
                reducing Nigeria&apos;s dependence on foreign manufacturing technology and
                building domestic industrial capacity.
              </p>
              <p>
                His more recent leadership — of the Abdul Samad Rabiu International Centre
                for Innovation and Entrepreneurship (ASR-ICiE), the UNDP Timbuktoo UniPod
                initiative, and the Young Africa Innovates programme — confirms his enduring
                commitment to translating engineering knowledge into economic transformation
                across Africa.
              </p>
              <p>
                His research contributions include over a hundred peer-reviewed publications,
                more than fifteen patents granted in Nigeria and Japan, and numerous
                technology transfers to industry. He has supervised more than fifty
                postgraduate students and mentored hundreds of young engineers across
                sub-Saharan Africa.
              </p>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-5 space-y-10">

              {/* Fellowships */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-5 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" />
                  Professional Fellowships
                </h2>
                <ul className="space-y-4" role="list">
                  {FELLOWSHIPS.map(f => (
                    <li key={f.code} className="flex items-start gap-3">
                      <span className="flex h-8 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-gold-200 bg-gradient-to-br from-gold-50 to-white text-[10px] font-bold text-gold-600 tracking-wider shadow-sm">
                        {f.code}
                      </span>
                      <span className="text-sm text-charcoal/70 leading-snug pt-1">{f.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-5 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" />
                  Education
                </h2>
                <ul className="space-y-5" role="list">
                  {EDUCATION.map(e => (
                    <li key={e.institution} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-50 border border-navy-100 mt-0.5">
                        <GraduationCap className="h-3.5 w-3.5 text-navy-500" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy-800 text-sm leading-snug">{e.degree}</p>
                        <p className="text-charcoal/60 text-sm">{e.institution}</p>
                        <p className="text-charcoal/40 text-xs mt-0.5">{e.field}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise */}
              <div className="card-base p-7">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-5 flex items-center gap-2">
                  <span className="block h-px w-4 bg-gold-400" />
                  Areas of Expertise
                </h2>
                <ul className="space-y-2" role="list">
                  {EXPERTISE.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-charcoal/65 py-1.5 border-b border-ivory-100 last:border-0">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
