'use client'

import { CheckCircle2, Clock, XCircle, Globe, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getPatents } from '@/lib/firestore'
import type { PatentStatus } from '@/types'

const STATUS_CONFIG: Record<PatentStatus, { label: string; icon: typeof CheckCircle2; variant: 'success' | 'warning' | 'secondary' }> = {
  granted:  { label: 'Granted',  icon: CheckCircle2, variant: 'success' },
  pending:  { label: 'Pending',  icon: Clock,        variant: 'warning' },
  expired:  { label: 'Expired',  icon: XCircle,      variant: 'secondary' },
}

export function PatentsClient() {
  const { data: patents, loading } = useFirestoreData(getPatents)

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-44 rounded-lg bg-ivory-200 animate-pulse" />
      ))}
    </div>
  )

  if (!patents?.length) return (
    <div className="py-20 text-center text-charcoal/50">
      <Lightbulb className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
      <p>Patent records will appear here once added.</p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {patents.map(patent => {
        const sc = STATUS_CONFIG[patent.status]
        const Icon = sc.icon
        return (
          <article key={patent.id} className="card-base p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <Badge variant={sc.variant} className="flex items-center gap-1.5">
                <Icon className="h-3 w-3" aria-hidden="true" /> {sc.label}
              </Badge>
              <span className="text-xs font-semibold text-charcoal/45">{patent.year}</span>
            </div>
            <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-2">
              {patent.title}
            </h2>
            <p className="text-sm text-charcoal/65 mb-3">{patent.inventors}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal/45">
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" aria-hidden="true" /> {patent.country}
              </span>
              {patent.patentNumber && <span>No. {patent.patentNumber}</span>}
            </div>
            {patent.description && (
              <p className="mt-3 text-sm text-charcoal/55 leading-relaxed border-t border-ivory-300 pt-3">
                {patent.description}
              </p>
            )}
          </article>
        )
      })}
    </div>
  )
}
