import Link from 'next/link'
import { Mail, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react'

const FOOTER_LINKS = {
  'Academic Work': [
    { label: 'Research',      href: '/research' },
    { label: 'Publications',  href: '/publications' },
    { label: 'Patents',       href: '/patents' },
    { label: 'Projects',      href: '/projects' },
    { label: 'Awards',        href: '/awards' },
  ],
  'Engagement': [
    { label: 'Activities',    href: '/activities' },
    { label: 'Gallery',       href: '/gallery' },
    { label: 'News',          href: '/news' },
    { label: 'Mentorship',    href: '/mentorship' },
    { label: 'Contact',       href: '/contact' },
  ],
  'Profiles': [
    { label: 'Google Scholar', href: '#', external: true },
    { label: 'ResearchGate',   href: '#', external: true },
    { label: 'ORCID',          href: '#', external: true },
    { label: 'LinkedIn',       href: '#', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white/75" role="contentinfo">
      {/* Gradient accent top border */}
      <div
        className="h-[3px] w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300"
        aria-hidden="true"
      />

      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-navy-800 font-serif font-bold text-sm flex-shrink-0 shadow-gold">
                MD
              </span>
              <div>
                <p className="font-serif font-bold text-white text-[15px] leading-tight">Prof. Mohammed Dauda</p>
                <p className="text-[9.5px] tracking-[0.18em] text-gold-400/70 uppercase mt-0.5">FNSE · FNIMechE · MASME</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Distinguished mechanical engineer, academic leader, and pioneer of engineering innovation in Nigeria and beyond.
            </p>
            <address className="not-italic space-y-2.5 text-sm text-white/50">
              <a
                href="mailto:contact@profdauda.com"
                className="flex items-center gap-2.5 hover:text-gold-400 transition-colors group"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/8 group-hover:bg-gold-400/20 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                </span>
                contact@profdauda.com
              </a>
              <span className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/8">
                  <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                </span>
                Nigeria
              </span>
            </address>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400/80 mb-5">
                {group}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map(link => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-white/50 hover:text-gold-400 transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-50" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-gold-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Professor Mohammed Dauda. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
