'use client'

import { CheckCircle2, Clock, XCircle, Globe, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useFirestoreData } from '@/hooks/use-firestore'
import { getPatents } from '@/lib/firestore'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'
import type { PatentStatus } from '@/types'

const STATUS_CONFIG: Record<PatentStatus, {
  label: string
  icon: typeof CheckCircle2
  variant: 'success' | 'warning' | 'secondary'
  color: string
  bg: string
  border: string
  glow: string
}> = {
  granted: { label: 'Granted', icon: CheckCircle2, variant: 'success',   color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', glow: '0 4px 20px rgba(16,185,129,0.15)' },
  pending: { label: 'Pending', icon: Clock,        variant: 'warning',   color: 'text-amber-600',   bg: 'bg-amber-50',  border: 'border-amber-200',  glow: '0 4px 20px rgba(245,158,11,0.15)' },
  expired: { label: 'Expired', icon: XCircle,      variant: 'secondary', color: 'text-charcoal',    bg: 'bg-ivory-100', border: 'border-ivory-200',  glow: '0 4px 16px rgba(0,0,0,0.06)' },
}

export function PatentsClient() {
  const { data: patents, loading } = useFirestoreData(getPatents)

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-48 rounded-2xl bg-ivory-200 animate-pulse" />
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
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {patents.map(patent => {
        const sc = STATUS_CONFIG[patent.status]
        const Icon = sc.icon
        return (
          <motion.article
            key={patent.id}
            variants={staggerItem}
            className="card-base overflow-hidden hover:border-gold-200 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
          >
            <div className={`h-[2px] w-full ${sc.bg} border-b ${sc.border}`} aria-hidden="true" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${sc.bg} border ${sc.border} flex-shrink-0`}
                  style={{ boxShadow: sc.glow }}
                  aria-hidden="true"
                >
                  <Icon className={`h-5 w-5 ${sc.color}`} />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant={sc.variant} className="text-[10px] flex items-center gap-1">
                    <Icon className="h-2.5 w-2.5" aria-hidden="true" /> {sc.label}
                  </Badge>
                  <span className="font-serif font-bold text-charcoal/30 text-sm">{patent.year}</span>
                </div>
              </div>

              <h2 className="font-serif font-semibold text-navy-700 text-[15px] leading-snug mb-2.5">
                {patent.title}
              </h2>
              <p className="text-sm text-charcoal/60 mb-4">{patent.inventors}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/45">
                <span className="flex items-center gap-1.5 bg-ivory-50 border border-ivory-200 rounded-full px-2.5 py-1">
                  <Globe className="h-3 w-3 text-gold-500" aria-hidden="true" />
                  {patent.country}
                </span>
                {patent.patentNumber && (
                  <span className="bg-ivory-50 border border-ivory-200 rounded-full px-2.5 py-1 font-medium">
                    No. {patent.patentNumber}
                  </span>
                )}
              </div>

              {patent.description && (
                <p className="mt-4 pt-4 border-t border-ivory-100 text-sm text-charcoal/55 leading-relaxed">
                  {patent.description}
                </p>
              )}
            </div>
          </motion.article>
        )
      })}
    </motion.div>
  )
}
