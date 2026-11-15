'use client'

import { useState } from 'react'
import { Trophy, Globe, Medal, Star, BookOpen, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getAwards } from '@/lib/firestore'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/motion'
import type { AwardCategory } from '@/types'

const CAT_CONFIG: Record<AwardCategory, {
  icon: typeof Trophy
  label: string
  variant: 'default' | 'gold' | 'success' | 'secondary'
  color: string
  bg: string
  border: string
  glow: string
}> = {
  national:      { icon: Medal,    label: 'National',      variant: 'success',   color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200',  glow: '0 4px 20px rgba(245,158,11,0.15)' },
  international: { icon: Globe,    label: 'International', variant: 'default',   color: 'text-sky-600',    bg: 'bg-sky-50',    border: 'border-sky-200',    glow: '0 4px 20px rgba(14,165,233,0.15)' },
  fellowship:    { icon: Star,     label: 'Fellowship',    variant: 'gold',      color: 'text-gold-600',   bg: 'bg-gold-50',   border: 'border-gold-200',   glow: '0 4px 20px rgba(197,161,90,0.2)' },
  recognition:   { icon: Trophy,   label: 'Recognition',   variant: 'secondary', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', glow: '0 4px 20px rgba(139,92,246,0.15)' },
  academic:      { icon: BookOpen, label: 'Academic',      variant: 'secondary', color: 'text-teal-600',   bg: 'bg-teal-50',   border: 'border-teal-200',   glow: '0 4px 20px rgba(20,184,166,0.15)' },
}

const FILTERS: Array<AwardCategory | 'all'> = ['all', 'national', 'international', 'fellowship', 'recognition', 'academic']

export function AwardsClient() {
  const { data: awards, loading } = useFirestoreData(getAwards)
  const [cat, setCat] = useState<AwardCategory | 'all'>('all')

  const filtered = (awards ?? []).filter(a => cat === 'all' || a.category === cat)

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 rounded-2xl bg-ivory-200 animate-pulse" />
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
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
        {FILTERS.map(f => (
          <Button
            key={f}
            size="sm"
            variant={cat === f ? 'default' : 'outline'}
            onClick={() => setCat(f)}
            aria-pressed={cat === f}
            className="capitalize rounded-full"
          >
            {f === 'all' ? (
              <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3" aria-hidden="true" />All Awards</span>
            ) : (
              CAT_CONFIG[f as AwardCategory].label
            )}
          </Button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={cat}
      >
        {filtered.map(award => {
          const cfg = CAT_CONFIG[award.category]
          const Icon = cfg.icon
          return (
            <motion.article
              key={award.id}
              variants={staggerItem}
              className="card-base overflow-hidden hover:border-gold-200 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`h-[2px] w-full ${cfg.bg} border-b ${cfg.border}`} aria-hidden="true" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${cfg.bg} border ${cfg.border} flex-shrink-0`}
                    style={{ boxShadow: cfg.glow }}
                    aria-hidden="true"
                  >
                    <Icon className={`h-5 w-5 ${cfg.color}`} />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                    <span className="font-serif font-bold text-charcoal/30 text-sm">{award.year}</span>
                  </div>
                </div>
                <h2 className="font-serif font-semibold text-navy-700 text-sm leading-snug mb-1.5">{award.title}</h2>
                <p className="text-xs text-charcoal/55 font-medium">{award.organisation}</p>
                {award.description && (
                  <p className="mt-3 pt-3 border-t border-ivory-100 text-xs text-charcoal/50 leading-relaxed">{award.description}</p>
                )}
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </div>
  )
}
