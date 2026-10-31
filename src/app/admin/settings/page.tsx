'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Settings, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getSiteSettings, upsertSiteSettings, createAuditLog } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import type { SiteSettings } from '@/types'

const schema = z.object({
  contactEmail:       z.string().email().optional().or(z.literal('')),
  contactPhone:       z.string().optional(),
  twitterHandle:      z.string().optional(),
  linkedIn:           z.string().url().optional().or(z.literal('')),
  contactFormEnabled: z.boolean(),
  maintenanceMode:    z.boolean(),
  // Derived from SiteProfile but editable here for convenience
  siteTitle:          z.string().min(3).optional().or(z.literal('')),
  siteDescription:    z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function AdminSettingsPage() {
  const { data: settings, loading, reload } = useFirestoreData(getSiteSettings)
  const { user } = useAuth()

  const {
    register, handleSubmit, reset, formState: { isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contactEmail: '', contactPhone: '', twitterHandle: '',
      linkedIn: '', siteTitle: '', siteDescription: '',
      contactFormEnabled: true, maintenanceMode: false,
    },
  })

  useEffect(() => {
    if (settings) {
      reset({
        contactEmail:       settings.contactEmail ?? '',
        contactPhone:       settings.contactPhone ?? '',
        twitterHandle:      settings.twitterHandle ?? '',
        linkedIn:           settings.linkedIn ?? '',
        contactFormEnabled: settings.contactFormEnabled ?? true,
        maintenanceMode:    settings.maintenanceMode ?? false,
        siteTitle:          settings.siteTitle ?? '',
        siteDescription:    settings.siteDescription ?? '',
      })
    }
  }, [settings, reset])

  const onSubmit = async (form: FormData) => {
    try {
      await upsertSiteSettings({
        ...form,
        siteTitle:       form.siteTitle ?? '',
        siteDescription: form.siteDescription ?? '',
        siteKeywords:    settings?.siteKeywords ?? [],
        ogImage:         settings?.ogImage,
        contactFormEnabled: form.contactFormEnabled ?? true,
        maintenanceMode:    form.maintenanceMode ?? false,
      } as Omit<SiteSettings, 'id' | 'createdAt' | 'updatedAt'>)
      if (user) {
        await createAuditLog({
          actorUid: user.uid,
          actorEmail: user.email!,
          action: 'site_setting_change',
          collection: 'siteSettings',
          documentId: 'main',
          documentTitle: 'Site Settings',
        })
      }
      toast({ title: 'Settings saved', variant: 'success' as never })
      reload()
    } catch {
      toast({ title: 'Error saving settings', variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-ivory-200 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="h-5 w-5 text-charcoal/40" aria-hidden="true" />
          <h1 className="font-serif font-bold text-navy-800 text-xl">Site Settings</h1>
        </div>
        <Button
          form="settings-form"
          type="submit"
          variant="navy"
          disabled={isSubmitting || !isDirty}
          aria-busy={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" aria-hidden="true" />
          {isSubmitting ? 'Saving…' : 'Save Settings'}
        </Button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="s-email">Contact Email</Label>
                <Input
                  id="s-email" type="email" {...register('contactEmail')}
                  className="mt-1" placeholder="contact@example.com"
                />
              </div>
              <div>
                <Label htmlFor="s-phone">Contact Phone</Label>
                <Input id="s-phone" {...register('contactPhone')} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Social Profiles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="s-twitter">Twitter / X Handle</Label>
                <Input
                  id="s-twitter" {...register('twitterHandle')}
                  className="mt-1" placeholder="@handle"
                />
              </div>
              <div>
                <Label htmlFor="s-linkedin">LinkedIn URL</Label>
                <Input id="s-linkedin" type="url" {...register('linkedIn')} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature flags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Feature Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                id="s-contact-enabled"
                type="checkbox"
                {...register('contactFormEnabled')}
                className="h-4 w-4"
              />
              <div>
                <Label htmlFor="s-contact-enabled" className="cursor-pointer">
                  Contact Form Enabled
                </Label>
                <p className="text-xs text-charcoal/40 mt-0.5">
                  When disabled, the contact form will not accept new submissions.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <input
                id="s-maintenance"
                type="checkbox"
                {...register('maintenanceMode')}
                className="h-4 w-4"
              />
              <div>
                <Label htmlFor="s-maintenance" className="cursor-pointer text-amber-700">
                  Maintenance Mode
                </Label>
                <p className="text-xs text-charcoal/40 mt-0.5">
                  Shows a maintenance notice on the public site.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Site identity (convenience) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Site Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="s-title">Default Site Title</Label>
              <Input id="s-title" {...register('siteTitle')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="s-desc">Default Site Description</Label>
              <Input id="s-desc" {...register('siteDescription')} className="mt-1" />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
