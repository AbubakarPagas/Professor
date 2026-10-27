'use client'

import Link from 'next/link'
import {
  BookOpen, Lightbulb, Trophy, Images, Newspaper,
  Microscope, Mail, UserCircle, CalendarDays,
  Clock, FlaskConical, Briefcase, GraduationCap,
  Users, Settings, BarChart3, Shield,
  TrendingUp, AlertCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getDashboardCounts, getAuditLogs } from '@/lib/firestore'
import { formatDate } from '@/lib/utils'

// ─── Stat card ───────────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, colour, href,
}: {
  label: string
  value: number | string
  sub?: string
  colour: string
  href: string
}) {
  return (
    <Link href={href} className="block group">
      <Card className="hover:border-gold-300 hover:shadow-card-hover transition-all">
        <CardContent className="p-4">
          <p className="text-xs font-medium text-charcoal/50 mb-1">{label}</p>
          <p className={`text-3xl font-bold font-serif ${colour} group-hover:scale-105 transition-transform origin-left`}>
            {value}
          </p>
          {sub && <p className="text-xs text-charcoal/40 mt-0.5">{sub}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}

// ─── Section shortcut card ────────────────────────────────────────────────────

const SECTIONS = [
  { icon: UserCircle,     title: 'Biography',      desc: 'Profile, credentials, stats',          href: '/admin/biography',    colour: 'bg-blue-50 text-blue-600' },
  { icon: Clock,          title: 'Timeline',        desc: 'Career & education history',           href: '/admin/timeline',     colour: 'bg-slate-50 text-slate-600' },
  { icon: FlaskConical,   title: 'Expertise',       desc: 'Areas of expertise & skills',          href: '/admin/expertise',    colour: 'bg-cyan-50 text-cyan-700' },
  { icon: BookOpen,       title: 'Publications',    desc: 'Journals, books, conference papers',   href: '/admin/publications', colour: 'bg-indigo-50 text-indigo-600' },
  { icon: Microscope,     title: 'Research',        desc: 'Funded research projects',             href: '/admin/research',     colour: 'bg-teal-50 text-teal-600' },
  { icon: Lightbulb,      title: 'Patents',         desc: 'Patent & IP records',                  href: '/admin/patents',      colour: 'bg-amber-50 text-amber-600' },
  { icon: Briefcase,      title: 'Projects',        desc: 'Initiatives & consultancies',          href: '/admin/projects',     colour: 'bg-orange-50 text-orange-600' },
  { icon: Trophy,         title: 'Awards',          desc: 'Honours & fellowships',                href: '/admin/awards',       colour: 'bg-yellow-50 text-yellow-700' },
  { icon: CalendarDays,   title: 'Activities',      desc: 'Events & engagement reports',          href: '/admin/activities',   colour: 'bg-purple-50 text-purple-600' },
  { icon: Newspaper,      title: 'News',            desc: 'Articles & press items',               href: '/admin/news',         colour: 'bg-rose-50 text-rose-600' },
  { icon: Images,         title: 'Gallery',         desc: 'Albums & photographs',                 href: '/admin/gallery',      colour: 'bg-sky-50 text-sky-600' },
  { icon: GraduationCap,  title: 'Mentorship',      desc: 'Mentorship programmes',                href: '/admin/mentorship',   colour: 'bg-green-50 text-green-600' },
  { icon: Mail,           title: 'Enquiries',       desc: 'Contact form submissions',             href: '/admin/messages',     colour: 'bg-emerald-50 text-emerald-600' },
  { icon: Settings,       title: 'Site Settings',   desc: 'Global site configuration',            href: '/admin/settings',     colour: 'bg-gray-50 text-gray-600' },
  { icon: BarChart3,      title: 'SEO Settings',    desc: 'Metadata & search optimisation',       href: '/admin/seo',          colour: 'bg-violet-50 text-violet-600' },
  { icon: Users,          title: 'Administrators',  desc: 'User accounts & roles',                href: '/admin/users',        colour: 'bg-pink-50 text-pink-600' },
  { icon: Shield,         title: 'Audit Log',       desc: 'Administrative change history',        href: '/admin/audit',        colour: 'bg-red-50 text-red-600' },
]

export default function AdminDashboard() {
  const { user, role } = useAuth()
  const { data: counts, loading: countsLoading } = useFirestoreData(getDashboardCounts)
  const { data: logs, loading: logsLoading } = useFirestoreData(() => getAuditLogs(8))

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif font-bold text-navy-800 text-2xl">Dashboard</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          Welcome back, <span className="font-medium">{user?.email}</span>
          {role && (
            <Badge variant="outline" className="ml-2 text-[10px] capitalize">{role}</Badge>
          )}
        </p>
      </div>

      {/* Stats row */}
      <section aria-label="Content statistics">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">
          Content Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">
          {countsLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-ivory-200 animate-pulse" />
            ))
          ) : (
            <>
              <StatCard label="Publications"   value={counts?.publications ?? 0}  href="/admin/publications" colour="text-indigo-700" />
              <StatCard label="Patents"         value={counts?.patents ?? 0}        href="/admin/patents"      colour="text-amber-700" />
              <StatCard label="Awards"          value={counts?.awards ?? 0}         href="/admin/awards"       colour="text-yellow-700" />
              <StatCard label="Research"        value={counts?.research ?? 0}       href="/admin/research"     colour="text-teal-700" />
              <StatCard
                label="Activities"
                value={counts?.activities ?? 0}
                sub={counts?.activitiesDraft ? `${counts.activitiesDraft} draft` : undefined}
                href="/admin/activities"
                colour="text-purple-700"
              />
              <StatCard
                label="News Articles"
                value={counts?.news ?? 0}
                sub={counts?.newsDraft ? `${counts.newsDraft} draft` : undefined}
                href="/admin/news"
                colour="text-rose-700"
              />
              <StatCard label="Gallery Albums"  value={counts?.albums ?? 0}         href="/admin/gallery"      colour="text-sky-700" />
              <StatCard label="Photos"          value={counts?.images ?? 0}         href="/admin/gallery"      colour="text-sky-600" />
              <StatCard
                label="Enquiries"
                value={counts?.messages ?? 0}
                sub={counts?.messagesUnread ? `${counts.messagesUnread} unread` : undefined}
                href="/admin/messages"
                colour="text-emerald-700"
              />
            </>
          )}
        </div>
      </section>

      {/* Quick nav grid */}
      <section aria-label="Quick navigation">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">
          Manage Content
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {SECTIONS.map(({ icon: Icon, title, desc, href, colour }) => (
            <Link
              key={href}
              href={href}
              className="card-base p-4 flex items-start gap-3 group hover:border-gold-300"
            >
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${colour} group-hover:scale-105 transition-transform`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy-700 text-sm">{title}</p>
                <p className="text-xs text-charcoal/50 leading-snug mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section aria-label="Recent activity">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">
          Recent Administrative Activity
        </h2>
        <Card>
          <CardContent className="p-0">
            {logsLoading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-ivory-200 animate-pulse" />
                ))}
              </div>
            ) : !logs?.length ? (
              <div className="py-10 text-center text-charcoal/40">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
                <p className="text-sm">No administrative actions recorded yet.</p>
              </div>
            ) : (
              <ul role="list" aria-label="Recent audit log entries">
                {logs.map((log, idx) => (
                  <li
                    key={log.id}
                    className={`flex items-start gap-3 px-5 py-3 text-sm ${idx < logs.length - 1 ? 'border-b border-ivory-200' : ''}`}
                  >
                    <Shield className="h-4 w-4 text-charcoal/30 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-navy-700 capitalize">{log.action}</span>
                      {log.documentTitle && (
                        <span className="text-charcoal/60"> — {log.documentTitle}</span>
                      )}
                      <span className="text-charcoal/40"> in </span>
                      <span className="text-charcoal/60">{log.collection}</span>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs text-charcoal/40">{log.actorEmail}</p>
                      <p className="text-xs text-charcoal/30">{formatDate(log.timestamp)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <div className="mt-2 text-right">
          <Link href="/admin/audit" className="text-xs text-navy-600 hover:text-gold-600 transition-colors">
            View full audit log →
          </Link>
        </div>
      </section>

      {/* Unread enquiries alert */}
      {!countsLoading && !!counts?.messagesUnread && (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 px-5 py-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-amber-800">
            You have{' '}
            <strong>{counts.messagesUnread}</strong>{' '}
            unread contact{counts.messagesUnread === 1 ? ' enquiry' : ' enquiries'}.{' '}
            <Link href="/admin/messages" className="underline hover:text-amber-900">
              Review now
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
