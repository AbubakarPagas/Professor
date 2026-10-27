'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, Lightbulb, Trophy,
  Images, Newspaper, Microscope, Mail,
  UserCircle, LogOut, Menu, X, CalendarDays,
  Users, Settings, BarChart3, FlaskConical, GraduationCap,
  Briefcase, Clock, Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',    href: '/admin' },
    ],
  },
  {
    label: 'Profile',
    items: [
      { icon: UserCircle,     label: 'Biography',     href: '/admin/biography' },
      { icon: Clock,          label: 'Career Timeline', href: '/admin/timeline' },
      { icon: FlaskConical,   label: 'Expertise',     href: '/admin/expertise' },
    ],
  },
  {
    label: 'Academic Work',
    items: [
      { icon: BookOpen,       label: 'Publications',  href: '/admin/publications' },
      { icon: Microscope,     label: 'Research',      href: '/admin/research' },
      { icon: Lightbulb,      label: 'Patents',       href: '/admin/patents' },
      { icon: Briefcase,      label: 'Projects',      href: '/admin/projects' },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { icon: CalendarDays,   label: 'Activities',    href: '/admin/activities' },
      { icon: Images,         label: 'Gallery',       href: '/admin/gallery' },
      { icon: Newspaper,      label: 'News',          href: '/admin/news' },
      { icon: Trophy,         label: 'Awards',        href: '/admin/awards' },
      { icon: GraduationCap,  label: 'Mentorship',    href: '/admin/mentorship' },
    ],
  },
  {
    label: 'Communication',
    items: [
      { icon: Mail,           label: 'Enquiries',     href: '/admin/messages' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { icon: Settings,       label: 'Site Settings', href: '/admin/settings' },
      { icon: BarChart3,      label: 'SEO Settings',  href: '/admin/seo' },
      { icon: Users,          label: 'Administrators', href: '/admin/users' },
      { icon: Shield,         label: 'Audit Log',     href: '/admin/audit' },
    ],
  },
]

function SidebarInner() {
  const pathname = usePathname()
  const { signOut, user, role } = useAuth()

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin' && pathname.startsWith(href))

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-white font-serif font-bold text-sm flex-shrink-0">
            MD
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-tight truncate">Admin CMS</p>
            <p className="text-[10px] text-white/45 truncate mt-0.5">{user?.email}</p>
            {role && (
              <span className="inline-block mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold-400">
                {role}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 py-2">
        <nav aria-label="Admin navigation">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="mb-1">
              <p className="px-5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {group.label}
              </p>
              <ul className="space-y-0.5 px-2" role="list">
                {group.items.map(({ icon: Icon, label, href }) => {
                  const active = isActive(href)
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                          active
                            ? 'bg-gold-400 text-white shadow-sm'
                            : 'text-white/65 hover:text-white hover:bg-white/10'
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          View Public Site
        </Link>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 w-56 bg-navy-700"
        aria-label="Admin navigation"
      >
        <SidebarInner />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center gap-3 h-12 px-4 bg-navy-700 border-b border-white/10">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-white hover:bg-white/10 p-1.5 rounded"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="text-white text-sm font-semibold">Admin CMS</span>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed inset-y-0 left-0 z-50 w-64 bg-navy-700 shadow-xl flex flex-col"
            aria-label="Admin navigation"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <SidebarInner />
          </aside>
        </>
      )}
    </>
  )
}
