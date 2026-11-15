'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

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
          ? 'bg-navy-900/95 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.4)] border-b border-white/[0.06]'
          : 'bg-gradient-to-b from-navy-900 to-navy-900/98'
      )}
      role="banner"
    >
      {/* Animated gradient top bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, #8A6931 0%, #C5A15A 30%, #DBBE6B 50%, #C5A15A 70%, #8A6931 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 4s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <nav
        className="container flex h-[62px] items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 flex-shrink-0"
          aria-label="Professor Mohammed Dauda — home"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-md group-hover:bg-gold-400/35 transition-all duration-500" aria-hidden="true" />
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-navy-900 font-serif font-bold text-sm select-none shadow-gold group-hover:shadow-gold-lg transition-all duration-300"
              aria-hidden="true"
            >
              MD
            </span>
          </div>
          <span className="hidden sm:block leading-none">
            <span className="block text-[13.5px] font-serif font-bold text-white tracking-tight group-hover:text-gold-200 transition-colors duration-300">
              Prof. Mohammed Dauda
            </span>
            <span className="block text-[9.5px] tracking-[0.22em] text-gold-400/70 uppercase mt-[3px]">
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
                  'relative px-3 py-2 text-[12.5px] font-medium tracking-wide transition-all duration-200',
                  isActive(link.href)
                    ? 'text-gold-400'
                    : 'text-white/65 hover:text-white'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-gold-400 to-gold-300 rounded-full"
                    aria-hidden="true"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
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
                MORE.some(l => isActive(l.href)) ? 'text-gold-400' : 'text-white/65 hover:text-white'
              )}
            >
              More
              <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-3 w-3" />
              </motion.span>
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white shadow-modal border border-ivory-200 py-2 z-50 overflow-hidden"
                >
                  {/* Gradient top */}
                  <div className="h-[2px] mx-3 mb-1.5 rounded-full bg-gradient-to-r from-gold-300 to-gold-500" aria-hidden="true" />
                  {MORE.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-150',
                        isActive(link.href)
                          ? 'text-navy-800 font-semibold bg-gold-50'
                          : 'text-charcoal hover:bg-ivory-50 hover:text-navy-800'
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && <Zap className="h-3 w-3 text-gold-500" aria-hidden="true" />}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile button */}
        <button
          className="lg:hidden flex items-center justify-center h-9 w-9 rounded-xl text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-navy-900/98 backdrop-blur-xl border-t border-white/[0.06]"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="container flex flex-col gap-0 py-4 pb-6" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200',
                      isActive(link.href)
                        ? 'text-gold-400 bg-gold-400/10 border border-gold-400/20'
                        : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                    )}
                  >
                    {isActive(link.href) && <span className="h-1.5 w-1.5 rounded-full bg-gold-400 flex-shrink-0" aria-hidden="true" />}
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
