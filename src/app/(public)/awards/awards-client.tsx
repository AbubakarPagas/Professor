'use client'

import { useState } from 'react'
import { Trophy, Globe, Medal, Star, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getAwards } from '@/lib/firestore'
import type { AwardCategory } from '@/types'

const CAT_CONFIG: Record<AwardCategory, { icon: typeof Trophy; label: string; variant: 'default' | 'gold' | 'success' | 'secondary' }> = {
  national:      { icon: Medal,    label: 'National',      variant: 'success' },
  international: { icon: Globe,    label: 'International', variant: 'default' },
  fellowship:    { icon: Star,     label: 'Fellowship',    variant: 'gold' },
  recognition:   { icon: Trophy,   label: 'Recognition',   variant: 'secondary' },
  academic:      { icon: BookOpen, label: 'Academic',      variant: 'secondary' },
}

const FILTERS: Array<AwardCategory | 'all'> = ['all', 'national', 'international', 'fellowship', 'recognition', 'academic']

export function AwardsClient() {
  const { data: awards, loading } = useFirestoreData(getAwards)
  const [cat, setCat] = useState<AwardCategory | 'all'>('all')

  const filtered = (awards ?? []).filter(a => cat === 'all' || a.category === cat)

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-36 rounded-lg bg-ivory-200 animate-pulse" />
      ))}
    </div>
  )

  if (!awards?.length) return (
    <div className="py-20 text-center text-charcoal/50">
      <Trophy className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
      <p>Award records will appear here once added.</p>
    </div>
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {FILTERS.map(f => (
          <Button
            key={f}
            size="sm"
            variant={cat === f ? 'default' : 'outline'}
            onClick={() => setCat(f)}
            aria-pressed={cat === f}
            className="capitalize"
          >
            {f === 'all' ? 'All Awards' : CAT_CONFIG[f as AwardCategory].label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(award => {
          const cfg = CAT_CONFIG[award.category]
          const Icon = cfg.icon
          return (
            <article key={award.id} className="card-base p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 border border-gold-200 flex-shrink-0">
                  <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={cfg.variant} className="text-[11px]">{cfg.label}</Badge>
                  <span className="text-xs text-charcoal/40 font-medium">{award.year}</span>
                </div>
              </div>
              <h2 className="font-semibold text-navy-700 text-sm leading-snug mb-1">{award.title}</h2>
              <p className="text-xs text-charcoal/55">{award.organisation}</p>
              {award.description && (
                <p className="mt-2 text-xs text-charcoal/55 leading-relaxed">{award.description}</p>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
