'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About',        href: '/about' },
  { label: 'Biography',    href: '/biography' },
  { label: 'Research',     href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'Patents',      href: '/patents' },
  { label: 'Projects',     href: '/projects' },
  { label: 'Activities',   href: '/activities' },
  { label: 'Gallery',      href: '/gallery' },
  { label: 'News',         href: '/news' },
  { label: 'Awards',       href: '/awards' },
  { label: 'Mentorship',   href: '/mentorship' },
  { label: 'Contact',      href: '/contact' },
]

const PRIMARY = NAV_LINKS.slice(0, 7)
const MORE    = NAV_LINKS.slice(7)

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen]     = useState(false)
  const pathname  = usePathname()
  const moreRef   = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false); setMoreOpen(false) }, [pathname])

  // Close More dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-navy-800/98 backdrop-blur-md shadow-[0_2px_24px_rgba(13,24,41,0.35)]'
          : 'bg-navy-800'
      )}
      role="banner"
    >
      {/* Gradient gold top accent */}
      <div
        className="h-[3px] w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300"
        aria-hidden="true"
      />

      <nav
        className="container flex h-[60px] items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 flex-shrink-0"
          aria-label="Professor Mohammed Dauda — home"
        >
          <span
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-navy-800 font-serif font-bold text-sm select-none shadow-gold group-hover:shadow-gold-lg transition-all duration-300"
            aria-hidden="true"
          >
            MD
          </span>
          <span className="hidden sm:block leading-none">
            <span className="block text-[13.5px] font-serif font-bold text-white tracking-tight">
              Prof. Mohammed Dauda
            </span>
            <span className="block text-[9.5px] tracking-[0.2em] text-gold-400/75 uppercase mt-[3px]">
              FNSE · FNIMechE · MASME
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center" role="list">
          {PRIMARY.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-[12.5px] font-medium tracking-wide transition-colors duration-200',
                  isActive(link.href)
                    ? 'text-gold-400'
                    : 'text-white/70 hover:text-white'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-gold-400 to-gold-300 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          ))}

          {/* More dropdown */}
          <li className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(v => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={cn(
                'flex items-center gap-1 px-3 py-2 text-[12.5px] font-medium tracking-wide transition-colors duration-200',
                MORE.some(l => isActive(l.href)) ? 'text-gold-400' : 'text-white/70 hover:text-white'
              )}
            >
              More
              <ChevronDown className={cn('h-3 w-3 transition-transform duration-200', moreOpen && 'rotate-180')} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-modal border border-ivory-200 py-1.5 z-50 overflow-hidden">
                {MORE.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      'block px-4 py-2.5 text-sm transition-colors',
                      isActive(link.href)
                        ? 'text-navy-800 font-semibold bg-gold-50'
                        : 'text-charcoal hover:bg-ivory-100 hover:text-navy-800'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Mobile button */}
        <button
          className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          {mobileOpen
            ? <X className="h-5 w-5" aria-hidden="true" />
            : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden bg-navy-900 border-t border-white/8 pb-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="container flex flex-col gap-0.5 pt-3" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive(link.href)
                      ? 'bg-gold-400/15 text-gold-400 border-l-2 border-gold-400 pl-4'
                      : 'text-white/70 hover:bg-white/8 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
