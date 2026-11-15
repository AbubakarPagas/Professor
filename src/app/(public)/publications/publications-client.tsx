'use client'

import { useState, useMemo } from 'react'
import { ExternalLink, Search, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getPublications } from '@/lib/firestore'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'
import type { PublicationType } from '@/types'

const TYPE_LABEL: Record<PublicationType, string> = {
  journal:          'Journal Article',
  conference:       'Conference Paper',
  book:             'Book',
  book_chapter:     'Book Chapter',
  technical_report: 'Technical Report',
  thesis:           'Thesis',
}

const TYPE_BADGE: Record<PublicationType, 'default' | 'gold' | 'success' | 'secondary' | 'warning'> = {
  journal:          'default',
  conference:       'gold',
  book:             'success',
  book_chapter:     'secondary',
  technical_report: 'warning',
  thesis:           'secondary',
}

const TYPE_COLOR: Record<PublicationType, string> = {
  journal:          'text-sky-600',
  conference:       'text-gold-600',
  book:             'text-emerald-600',
  book_chapter:     'text-violet-600',
  technical_report: 'text-amber-600',
  thesis:           'text-teal-600',
}

const ALL_TYPES: Array<PublicationType | 'all'> = [
  'all', 'journal', 'conference', 'book', 'book_chapter', 'technical_report',
]

export function PublicationsClient() {
  const { data: pubs, loading } = useFirestoreData(getPublications)
  const [search, setSearch] = useState('')
  const [type,   setType]   = useState<PublicationType | 'all'>('all')

  const filtered = useMemo(() => {
    return (pubs ?? []).filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !q
        || p.title.toLowerCase().includes(q)
        || p.authors.toLowerCase().includes(q)
        || (p.journal ?? '').toLowerCase().includes(q)
        || (p.conference ?? '').toLowerCase().includes(q)
      const matchType = type === 'all' || p.type === type
      return matchSearch && matchType
    })
  }, [pubs, search, type])

  if (loading) return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-24 rounded-2xl bg-ivory-200 animate-pulse" />
      ))}
    </div>
  )

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/35" aria-hidden="true" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search title, author, journal…"
            className="pl-10 bg-white rounded-xl border-ivory-200 focus:border-gold-300"
            aria-label="Search publications"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
          {ALL_TYPES.map(t => (
            <Button
              key={t}
              size="sm"
              variant={type === t ? 'default' : 'outline'}
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className="text-xs capitalize rounded-full"
            >
              {t === 'all' ? 'All' : TYPE_LABEL[t as PublicationType]}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-sm text-charcoal/45 mb-6">
        <span className="font-semibold text-charcoal/70">{filtered.length}</span> publication{filtered.length !== 1 ? 's' : ''}
      </p>

      {!filtered.length ? (
        <div className="py-20 text-center text-charcoal/50">
          <BookOpen className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
          <p>{!pubs?.length ? 'Publications will appear here once added.' : 'No results match your search.'}</p>
        </div>
      ) : (
        <motion.ol
          className="divide-y divide-ivory-200"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={`${type}-${search}`}
          aria-label="Publications list"
        >
          {filtered.map((pub, idx) => (
            <motion.li key={pub.id} variants={staggerItem} className="py-6 flex gap-5 group hover:bg-ivory-50/50 -mx-4 px-4 transition-colors rounded-xl">
              <span className="text-xs font-bold text-charcoal/25 w-7 flex-shrink-0 mt-1 text-right font-serif">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant={TYPE_BADGE[pub.type]} className="text-[10px]">
                    {TYPE_LABEL[pub.type]}
                  </Badge>
                  <span className="text-xs text-charcoal/40 font-semibold">{pub.year}</span>
                  {pub.featured && <Badge variant="gold" className="text-[10px]">Featured</Badge>}
                </div>
                <h3 className={`font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-1.5 group-hover:${TYPE_COLOR[pub.type]} transition-colors`}>
                  {pub.title}
                </h3>
                <p className="text-sm text-charcoal/60 mb-1">{pub.authors}</p>
                {(pub.journal || pub.conference) && (
                  <p className="text-sm italic text-charcoal/50">
                    {pub.journal ?? pub.conference}
                    {pub.volume && `, vol. ${pub.volume}`}
                    {pub.issue && `(${pub.issue})`}
                    {pub.pages && `, pp. ${pub.pages}`}
                  </p>
                )}
                {pub.doi && (
                  <p className="text-xs text-charcoal/35 mt-1.5">
                    DOI:{' '}
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-600 hover:text-gold-500 transition-colors"
                    >
                      {pub.doi}
                    </a>
                  </p>
                )}
              </div>
              {pub.url && (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${pub.title}`}
                  className="flex-shrink-0 self-start mt-1 h-8 w-8 flex items-center justify-center rounded-lg border border-ivory-200 text-charcoal/35 hover:text-navy-700 hover:border-gold-200 hover:bg-gold-50 transition-all duration-200"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </motion.li>
          ))}
        </motion.ol>
      )}
    </div>
  )
}
