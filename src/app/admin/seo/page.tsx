'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BarChart3, Save, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSiteSettings, upsertSiteSettings } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import type { SiteSettings } from '@/types'

const schema = z.object({
  siteTitle:       z.string().min(10, 'Title should be at least 10 characters').max(70, 'Keep under 70 characters'),
  siteDescription: z.string().min(50, 'Description should be at least 50 characters').max(165, 'Keep under 165 characters'),
  siteKeywords:    z.string().optional(),
  ogImage:         z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitterHandle:   z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function AdminSeoPage() {
  const { data: settings, loading, reload } = useFirestoreData(getSiteSettings)

  const {
    register, handleSubmit, reset, watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (settings) {
      reset({
        siteTitle:       settings.siteTitle ?? '',
        siteDescription: settings.siteDescription ?? '',
        siteKeywords:    settings.siteKeywords?.join(', ') ?? '',
        ogImage:         settings.ogImage ?? '',
        twitterHandle:   settings.twitterHandle ?? '',
      })
    }
  }, [settings, reset])

  const titleLen = watch('siteTitle')?.length ?? 0
  const descLen  = watch('siteDescription')?.length ?? 0

  const onSubmit = async (form: FormData) => {
    try {
      await upsertSiteSettings({
        ...settings,
        siteTitle:          form.siteTitle,
        siteDescription:    form.siteDescription,
        siteKeywords:       form.siteKeywords
          ? form.siteKeywords.split(',').map(k => k.trim()).filter(Boolean)
          : [],
        ogImage:            form.ogImage || undefined,
        twitterHandle:      form.twitterHandle || undefined,
        contactEmail:       settings?.contactEmail,
        contactPhone:       settings?.contactPhone,
        linkedIn:           settings?.linkedIn,
        contactFormEnabled: settings?.contactFormEnabled ?? true,
        maintenanceMode:    settings?.maintenanceMode ?? false,
      } as Omit<SiteSettings, 'id' | 'createdAt' | 'updatedAt'>)
      toast({ title: 'SEO settings saved', variant: 'success' as never })
      reload()
    } catch {
      toast({ title: 'Error saving SEO settings', variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-ivory-200 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-charcoal/40" aria-hidden="true" />
          <h1 className="font-serif font-bold text-navy-800 text-xl">SEO Settings</h1>
        </div>
        <Button
          form="seo-form"
          type="submit"
          variant="navy"
          disabled={isSubmitting || !isDirty}
          aria-busy={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" aria-hidden="true" />
          {isSubmitting ? 'Saving…' : 'Save SEO Settings'}
        </Button>
      </div>

      {/* Info banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <p>
          These settings affect the default metadata used by search engines and social platforms.
          Individual pages and articles use their own titles and descriptions where available.
        </p>
      </div>

      <form id="seo-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Search Engine Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="seo-title">Page Title *</Label>
                <span className={`text-xs ${titleLen > 70 ? 'text-red-500' : 'text-charcoal/40'}`}>
                  {titleLen}/70
                </span>
              </div>
              <Input id="seo-title" {...register('siteTitle')} />
              {errors.siteTitle && (
                <p className="text-xs text-destructive mt-1">{errors.siteTitle.message}</p>
              )}
              <p className="text-xs text-charcoal/40 mt-1">
                Appears in browser tabs and search results. Keep under 60–70 characters.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="seo-desc">Meta Description *</Label>
                <span className={`text-xs ${descLen > 165 ? 'text-red-500' : 'text-charcoal/40'}`}>
                  {descLen}/165
                </span>
              </div>
              <Textarea id="seo-desc" rows={3} {...register('siteDescription')} />
              {errors.siteDescription && (
                <p className="text-xs text-destructive mt-1">{errors.siteDescription.message}</p>
              )}
              <p className="text-xs text-charcoal/40 mt-1">
                Shown in search snippets. 50–165 characters is ideal.
              </p>
            </div>

            <div>
              <Label htmlFor="seo-keywords">Keywords (comma-separated)</Label>
              <Input id="seo-keywords" {...register('siteKeywords')} className="mt-1"
                placeholder="mechanical engineering, FNSE, research, Nigeria" />
              <p className="text-xs text-charcoal/40 mt-1">
                Secondary signal — focus on naturally placed keywords in content.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Social Sharing (Open Graph)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="seo-og">Default OG Image URL</Label>
              <Input id="seo-og" type="url" {...register('ogImage')} className="mt-1"
                placeholder="https://firebasestorage.googleapis.com/…" />
              {errors.ogImage && (
                <p className="text-xs text-destructive mt-1">{errors.ogImage.message}</p>
              )}
              <p className="text-xs text-charcoal/40 mt-1">
                Shown when the site is shared on social platforms. Recommended: 1200×630px.
              </p>
            </div>
            <div>
              <Label htmlFor="seo-twitter">Twitter/X Handle</Label>
              <Input id="seo-twitter" {...register('twitterHandle')} className="mt-1"
                placeholder="@ProfDauda" />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
