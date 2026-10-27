'use client'

import { useState, useMemo } from 'react'
import { ExternalLink, Search, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getPublications } from '@/lib/firestore'
import type { PublicationType } from '@/types'

const TYPE_LABEL: Record<PublicationType, string> = {
  journal: 'Journal Article',
  conference: 'Conference Paper',
  book: 'Book',
  book_chapter: 'Book Chapter',
  technical_report: 'Technical Report',
  thesis: 'Thesis',
}

const TYPE_BADGE: Record<PublicationType, 'default' | 'gold' | 'success' | 'secondary' | 'warning'> = {
  journal:         'default',
  conference:      'gold',
  book:            'success',
  book_chapter:    'secondary',
  technical_report: 'warning',
  thesis:          'secondary',
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
        <div key={i} className="h-24 rounded-lg bg-ivory-200 animate-pulse" />
      ))}
    </div>
  )

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" aria-hidden="true" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search title, author, journal…"
            className="pl-9 bg-white"
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
              className="text-xs capitalize"
            >
              {t === 'all' ? 'All' : TYPE_LABEL[t as PublicationType]}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-sm text-charcoal/50 mb-5">
        {filtered.length} publication{filtered.length !== 1 ? 's' : ''}
      </p>

      {!filtered.length ? (
        <div className="py-20 text-center text-charcoal/50">
          <BookOpen className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
          <p>{!pubs?.length ? 'Publications will appear here once added.' : 'No results match your search.'}</p>
        </div>
      ) : (
        <ol className="divide-y divide-ivory-300" aria-label="Publications list">
          {filtered.map((pub, idx) => (
            <li key={pub.id} className="py-5 flex gap-5">
              <span className="text-xs font-semibold text-charcoal/30 w-6 flex-shrink-0 mt-0.5 text-right">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge variant={TYPE_BADGE[pub.type]} className="text-[11px]">
                    {TYPE_LABEL[pub.type]}
                  </Badge>
                  <span className="text-xs text-charcoal/45 font-medium">{pub.year}</span>
                  {pub.featured && <Badge variant="gold" className="text-[11px]">Featured</Badge>}
                </div>
                <h3 className="font-semibold text-navy-700 text-[15px] leading-snug mb-1">
                  {pub.title}
                </h3>
                <p className="text-sm text-charcoal/65 mb-1">{pub.authors}</p>
                {(pub.journal || pub.conference) && (
                  <p className="text-sm italic text-charcoal/55">
                    {pub.journal ?? pub.conference}
                    {pub.volume && `, ${pub.volume}`}
                    {pub.issue && `(${pub.issue})`}
                    {pub.pages && `, pp. ${pub.pages}`}
                  </p>
                )}
                {pub.doi && (
                  <p className="text-xs text-charcoal/40 mt-1">
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
                  className="flex-shrink-0 text-charcoal/40 hover:text-navy-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
