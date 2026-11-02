'use client'

import { useState } from 'react'
import {
  Database, CheckCircle2, AlertCircle, RefreshCw, Rocket,
  BookOpen, Trophy, FlaskConical, Lightbulb, Calendar, Newspaper,
  GraduationCap, Clock, UserCircle, Settings, Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { runSeed, type SeedResult } from '@/lib/firestore-seed'
import { useAuth } from '@/lib/auth-context'
import {
  SEED_PROFILE, SEED_EXPERTISE, SEED_TIMELINE, SEED_RESEARCH,
  SEED_AWARDS, SEED_PUBLICATIONS, SEED_PATENTS, SEED_MENTORSHIP,
  SEED_ACTIVITIES, SEED_NEWS,
} from '@/lib/seed-data'

const PREVIEW_ITEMS = [
  { icon: UserCircle,    label: 'Site Profile & Biography', count: 1,                         colour: 'bg-blue-50 text-blue-600' },
  { icon: Settings,      label: 'Site Settings',             count: 1,                         colour: 'bg-slate-50 text-slate-600' },
  { icon: FlaskConical,  label: 'Expertise Areas',           count: SEED_EXPERTISE.length,     colour: 'bg-cyan-50 text-cyan-600' },
  { icon: Clock,         label: 'Career Timeline Entries',   count: SEED_TIMELINE.length,      colour: 'bg-teal-50 text-teal-600' },
  { icon: Lightbulb,     label: 'Research Projects',         count: SEED_RESEARCH.length,      colour: 'bg-amber-50 text-amber-600' },
  { icon: Trophy,        label: 'Awards & Fellowships',      count: SEED_AWARDS.length,        colour: 'bg-yellow-50 text-yellow-600' },
  { icon: BookOpen,      label: 'Publications',              count: SEED_PUBLICATIONS.length,  colour: 'bg-indigo-50 text-indigo-600' },
  { icon: Lightbulb,     label: 'Patents',                   count: SEED_PATENTS.length,       colour: 'bg-orange-50 text-orange-600' },
  { icon: GraduationCap, label: 'Mentorship Programmes',     count: SEED_MENTORSHIP.length,    colour: 'bg-green-50 text-green-600' },
  { icon: Calendar,      label: 'Activities & Events',       count: SEED_ACTIVITIES.length,    colour: 'bg-purple-50 text-purple-600' },
  { icon: Newspaper,     label: 'News Articles',             count: SEED_NEWS.length,          colour: 'bg-rose-50 text-rose-600' },
]

const TOTAL_DOCS = PREVIEW_ITEMS.reduce((s, i) => s + i.count, 0)

type SeedState = 'idle' | 'running' | 'done' | 'error'

export default function AdminSeedPage() {
  const { isSuperAdmin } = useAuth()
  const [state,   setState]   = useState<SeedState>('idle')
  const [result,  setResult]  = useState<SeedResult | null>(null)
  const [overwrite, setOverwrite] = useState(false)

  if (!isSuperAdmin) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-96">
        <div className="text-center text-charcoal/40">
          <Database className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold text-navy-700">Superadmin Only</p>
          <p className="text-sm">The seed tool requires superadmin access.</p>
        </div>
      </div>
    )
  }

  const handleSeed = async () => {
    setState('running')
    setResult(null)
    try {
      const res = await runSeed(overwrite)
      setResult(res)
      setState(res.success ? 'done' : 'error')
    } catch (e) {
      setResult({ success: false, written: {}, errors: [String(e)] })
      setState('error')
    }
  }

  const totalWritten = result ? Object.values(result.written).reduce((s, n) => s + n, 0) : 0
  const skipped      = result ? PREVIEW_ITEMS.filter(i => (result.written[i.label.toLowerCase().replace(/ /g, '_')] ?? 0) === 0 && state === 'done').length : 0

  return (
    <div className="p-6 lg:p-8 max-w-4xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-white">
          <Database className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif text-navy-800">Database Seed</h1>
          <p className="text-xs text-charcoal/50">Push all of Prof. Dauda&apos;s information to Firestore in one click</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="mt-5 mb-7 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium mb-0.5">How this works</p>
          <p className="text-blue-700/80 text-[13px] leading-relaxed">
            This tool writes <strong>{TOTAL_DOCS} documents</strong> across 11 Firestore collections.
            Collections that already have data are <strong>skipped by default</strong> to avoid duplicates.
            Enable <strong>&ldquo;Overwrite existing&rdquo;</strong> to replace everything.
            The profile and site settings are always merged (safe to re-run).
          </p>
        </div>
      </div>

      {/* What will be seeded */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-serif">What will be written to Firestore</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PREVIEW_ITEMS.map(({ icon: Icon, label, count, colour }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-lg border border-ivory-200 bg-ivory-50">
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${colour}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm text-charcoal/75 flex-1">{label}</span>
                <Badge variant="secondary" className="text-xs">{count}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-ivory-200 flex items-center justify-between text-sm">
            <span className="text-charcoal/50">Total documents</span>
            <span className="font-bold text-navy-700">{TOTAL_DOCS}</span>
          </div>
        </CardContent>
      </Card>

      {/* Overwrite toggle */}
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50">
        <input
          id="overwrite-toggle"
          type="checkbox"
          checked={overwrite}
          onChange={e => setOverwrite(e.target.checked)}
          className="h-4 w-4 accent-amber-600"
        />
        <label htmlFor="overwrite-toggle" className="cursor-pointer flex-1">
          <span className="text-sm font-medium text-amber-800">Overwrite existing data</span>
          <p className="text-xs text-amber-700/70 mt-0.5">
            If checked, existing documents in each collection will be cleared before writing.
            Use this to reset to the seed data. <strong>Irreversible.</strong>
          </p>
        </label>
      </div>

      {/* Action button */}
      <Button
        onClick={handleSeed}
        disabled={state === 'running'}
        variant="navy"
        size="lg"
        className="w-full sm:w-auto"
        aria-busy={state === 'running'}
      >
        {state === 'running' ? (
          <><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Writing to Firestore…</>
        ) : state === 'done' ? (
          <><RefreshCw className="mr-2 h-4 w-4" />Run Seed Again</>
        ) : (
          <><Rocket className="mr-2 h-4 w-4" />Push All Data to Firestore</>
        )}
      </Button>

      {/* Results */}
      {result && (
        <Card className={`mt-6 ${result.success ? 'border-emerald-200' : 'border-red-200'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-base font-serif flex items-center gap-2 ${result.success ? 'text-emerald-700' : 'text-red-600'}`}>
              {result.success
                ? <><CheckCircle2 className="h-5 w-5" />Seed Complete</>
                : <><AlertCircle className="h-5 w-5" />Seed Completed with Errors</>
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Written counts */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Documents Written</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(result.written).map(([key, count]) => (
                  <div key={key} className="flex items-center justify-between p-2.5 rounded-lg bg-ivory-50 border border-ivory-200">
                    <span className="text-xs text-charcoal/60 capitalize">{key.replace(/_/g, ' ')}</span>
                    <Badge variant={count > 0 ? 'success' : 'secondary'} className="text-[10px]">
                      {count > 0 ? `+${count}` : 'skipped'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className={`rounded-lg p-3 text-sm ${result.success ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
              {result.success ? (
                <p>
                  <strong>{totalWritten} document{totalWritten !== 1 ? 's' : ''}</strong> written successfully.
                  {totalWritten < TOTAL_DOCS && (
                    <> {TOTAL_DOCS - totalWritten} skipped (already existed — run with Overwrite to replace).</>
                  )}
                  {' '}The public site will now show real data.
                </p>
              ) : (
                <div>
                  <p className="font-medium mb-1">Some writes failed:</p>
                  <ul className="space-y-1 text-xs">
                    {result.errors.map((e, i) => <li key={i} className="font-mono">{e}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {/* Next steps */}
            {result.success && totalWritten > 0 && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
                <p className="font-medium mb-1">✓ Next steps</p>
                <ul className="text-[13px] text-blue-700/80 space-y-1 list-disc list-inside">
                  <li>Visit the public homepage to see live data</li>
                  <li>Use the Biography admin page to upload a profile photo</li>
                  <li>Edit any entry via the admin content pages</li>
                  <li>Update placeholder links (Google Scholar, ORCID, etc.) in Biography</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
