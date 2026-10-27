'use client'

import { useState } from 'react'
import { Shield, Search, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAuditLogs } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { formatDate } from '@/lib/utils'
import type { AuditAction } from '@/types'

const ACTION_COLOUR: Record<AuditAction, string> = {
  create:              'bg-emerald-100 text-emerald-700',
  update:              'bg-blue-100 text-blue-700',
  delete:              'bg-red-100 text-red-700',
  publish:             'bg-green-100 text-green-700',
  unpublish:           'bg-amber-100 text-amber-700',
  archive:             'bg-slate-100 text-slate-600',
  role_change:         'bg-purple-100 text-purple-700',
  site_setting_change: 'bg-orange-100 text-orange-700',
  login:               'bg-sky-100 text-sky-700',
  logout:              'bg-gray-100 text-gray-600',
}

export default function AdminAuditPage() {
  const { data: logs, loading, reload } = useFirestoreData(() => getAuditLogs(200))
  const [search, setSearch] = useState('')

  const filtered = search
    ? (logs ?? []).filter(l =>
        l.actorEmail.toLowerCase().includes(search.toLowerCase()) ||
        l.action.toLowerCase().includes(search.toLowerCase()) ||
        l.collection.toLowerCase().includes(search.toLowerCase()) ||
        (l.documentTitle ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : (logs ?? [])

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-charcoal/40" aria-hidden="true" />
          <h1 className="font-serif font-bold text-navy-800 text-xl">Audit Log</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={reload}
          disabled={loading}
          aria-label="Refresh audit log"
        >
          <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </Button>
      </div>

      <div className="relative mb-5">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          placeholder="Filter by actor, action, collection or document…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Filter audit log"
        />
      </div>

      {loading ? (
        <div className="space-y-2" aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-ivory-200 animate-pulse" />
          ))}
        </div>
      ) : !filtered.length ? (
        <div className="py-20 text-center text-charcoal/40" role="status">
          <Shield className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
          <p className="text-sm">No audit log entries found.</p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table" aria-label="Audit log">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-navy-700 uppercase tracking-wider" scope="col">Timestamp</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-navy-700 uppercase tracking-wider" scope="col">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-navy-700 uppercase tracking-wider" scope="col">Collection</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-navy-700 uppercase tracking-wider" scope="col">Document</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-navy-700 uppercase tracking-wider" scope="col">Actor</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-navy-700 uppercase tracking-wider" scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((log, idx) => (
                    <tr
                      key={log.id}
                      className={`border-b last:border-0 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/40'}`}
                    >
                      <td className="px-4 py-3 text-xs text-charcoal/50 whitespace-nowrap">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ACTION_COLOUR[log.action]}`}>
                          {log.action.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-charcoal/60">
                        {log.collection}
                      </td>
                      <td className="px-4 py-3 text-xs max-w-[200px] truncate text-charcoal/70">
                        {log.documentTitle ?? log.documentId ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-xs text-charcoal/60 whitespace-nowrap">
                        {log.actorEmail}
                      </td>
                      <td className="px-4 py-3 text-xs text-charcoal/50 max-w-[180px] truncate">
                        {log.details ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-charcoal/35 mt-3 text-right">
        Showing last {filtered.length} of {logs?.length ?? 0} entries
      </p>
    </div>
  )
}
