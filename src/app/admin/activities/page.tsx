'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/data-table'
import { getActivities, createActivity, updateActivity, deleteActivity } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import { slugify, formatDate } from '@/lib/utils'
import type { Activity, ActivityStatus, ActivityCategory } from '@/types'

const CATEGORIES: ActivityCategory[] = [
  'conference', 'workshop', 'lecture', 'award_ceremony', 'field_visit',
  'collaboration', 'entrepreneurship', 'mentorship', 'community', 'other',
]
const CAT_LABEL: Record<ActivityCategory, string> = {
  conference: 'Conference', workshop: 'Workshop', lecture: 'Lecture',
  award_ceremony: 'Award Ceremony', field_visit: 'Field Visit',
  collaboration: 'Collaboration', entrepreneurship: 'Entrepreneurship',
  mentorship: 'Mentorship', community: 'Community', other: 'Other',
}
const STATUS_VARIANT: Record<ActivityStatus, 'default' | 'warning' | 'secondary'> = {
  published: 'default', draft: 'warning', archived: 'secondary',
}

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().min(10).max(200),
  report: z.string().min(20),
  date: z.string().min(1),
  endDate: z.string().optional(),
  venue: z.string().optional(),
  organisingInstitution: z.string().optional(),
  relatedPeople: z.string().optional(),
  relatedOrgs: z.string().optional(),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  category: z.enum(['conference','workshop','lecture','award_ceremony','field_visit','collaboration','entrepreneurship','mentorship','community','other']),
  status: z.enum(['draft','published','archived']),
  featured: z.boolean().default(false),
  tags: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function AdminActivitiesPage() {
  const { data, loading, reload } = useFirestoreData(() => getActivities(false))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Activity | null>(null)

  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({
      status: 'draft', featured: false, category: 'conference',
      date: new Date().toISOString().slice(0, 10),
    })
    setEditing(null); setDialogOpen(true)
  }

  const openEdit = (a: Activity) => {
    reset({
      ...a,
      date: a.date ? new Date(a.date).toISOString().slice(0, 10) : '',
      endDate: a.endDate ? new Date(a.endDate).toISOString().slice(0, 10) : '',
      relatedPeople: a.relatedPeople?.join(', ') ?? '',
      relatedOrgs: a.relatedOrgs?.join(', ') ?? '',
      tags: a.tags?.join(', ') ?? '',
      coverImageUrl: a.coverImageUrl ?? '',
    })
    setEditing(a); setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      date: new Date(data.date),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      relatedPeople: data.relatedPeople ? data.relatedPeople.split(',').map(s => s.trim()).filter(Boolean) : [],
      relatedOrgs: data.relatedOrgs ? data.relatedOrgs.split(',').map(s => s.trim()).filter(Boolean) : [],
      tags: data.tags ? data.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      galleryImageUrls: editing?.galleryImageUrls ?? [],
      externalLinks: editing?.externalLinks ?? [],
    }
    try {
      editing
        ? await updateActivity(editing.id, payload)
        : await createActivity(payload as Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>)
      toast({ title: editing ? 'Updated' : 'Created', variant: 'success' as never })
      setDialogOpen(false); reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteActivity(id)
    toast({ title: 'Deleted', variant: 'success' as never })
    reload()
  }

  return (
    <div className="p-6 lg:p-8">
      <DataTable
        title="Activities & Events"
        data={data ?? []}
        loading={loading}
        addLabel="New Activity"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title']}
        columns={[
          { key: 'title', header: 'Title', render: r => <p className="font-medium text-navy-700 max-w-xs truncate">{r.title}</p> },
          { key: 'category', header: 'Category', render: r => <span className="text-sm capitalize text-charcoal/60">{CAT_LABEL[r.category]}</span> },
          { key: 'date', header: 'Date', render: r => <span className="text-sm text-charcoal/50">{formatDate(r.date)}</span> },
          { key: 'status', header: 'Status', render: r => <Badge variant={STATUS_VARIANT[r.status]} className="text-[11px]">{r.status}</Badge> },
          { key: 'featured', header: 'Featured', render: r => r.featured ? <span className="text-gold-500 text-sm font-medium">Yes</span> : <span className="text-charcoal/40 text-sm">No</span> },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? 'Edit Activity' : 'New Activity'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Title *</Label>
                <Input {...register('title')} className="mt-1"
                  onChange={e => {
                    setValue('title', e.target.value)
                    if (!editing) setValue('slug', slugify(e.target.value))
                  }}
                />
              </div>
              <div>
                <Label>Slug *</Label>
                <Input {...register('slug')} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Summary * (max 200 chars)</Label>
              <Textarea rows={2} {...register('summary')} className="mt-1" />
            </div>
            <div>
              <Label>Full Report (HTML) *</Label>
              <Textarea rows={8} {...register('report')} className="mt-1 font-mono text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Input type="date" {...register('date')} className="mt-1" />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" {...register('endDate')} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Venue</Label>
                <Input {...register('venue')} className="mt-1" />
              </div>
              <div>
                <Label>Organising Institution</Label>
                <Input {...register('organisingInstitution')} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={watch('category')} onValueChange={v => setValue('category', v as ActivityCategory)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => (
                      <SelectItem key={c} value={c}>{CAT_LABEL[c]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status *</Label>
                <Select value={watch('status')} onValueChange={v => setValue('status', v as ActivityStatus)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Cover Image URL</Label>
              <Input type="url" {...register('coverImageUrl')} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Related People (comma-separated)</Label>
                <Input {...register('relatedPeople')} className="mt-1" />
              </div>
              <div>
                <Label>Related Organisations</Label>
                <Input {...register('relatedOrgs')} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input {...register('tags')} className="mt-1" />
              </div>
              <div className="flex items-end pb-0.5 gap-2">
                <input id="act-featured" type="checkbox" {...register('featured')} className="h-4 w-4" />
                <Label htmlFor="act-featured" className="cursor-pointer">Featured activity</Label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>SEO Title</Label>
                <Input {...register('seoTitle')} className="mt-1" />
              </div>
              <div>
                <Label>SEO Description</Label>
                <Input {...register('seoDescription')} className="mt-1" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Save'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
