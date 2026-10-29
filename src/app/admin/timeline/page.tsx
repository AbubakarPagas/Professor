'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/data-table'
import {
  getTimeline, createTimelineEntry, updateTimelineEntry, deleteTimelineEntry,
  createAuditLog,
} from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import type { TimelineEntry, TimelineType } from '@/types'

const schema = z.object({
  year: z.preprocess(v => (v === '' || v === undefined || v === null ? undefined : Number(v)), z.number().int().min(1950).max(2100)),
  endYear: z.coerce.number().int().min(1950).max(2100).optional()
    .or(z.literal(0)).transform(v => v || undefined),
  title: z.string().min(3),
  organisation: z.string().min(2),
  location: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['education', 'appointment', 'leadership', 'milestone']),
  order: z.preprocess(v => (v === '' || v === undefined || v === null ? 0 : Number(v)), z.number().int().min(0)).default(0),
})

type FormData = z.infer<typeof schema>

const TYPES: TimelineType[] = ['education', 'appointment', 'leadership', 'milestone']
const TYPE_COLOUR: Record<TimelineType, string> = {
  education:   'bg-blue-100 text-blue-700',
  appointment: 'bg-teal-100 text-teal-700',
  leadership:  'bg-purple-100 text-purple-700',
  milestone:   'bg-gold-100 text-gold-700',
}

export default function AdminTimelinePage() {
  const { data, loading, reload } = useFirestoreData(getTimeline)
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<TimelineEntry | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({ type: 'appointment', year: new Date().getFullYear(), order: data?.length ?? 0 })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (entry: TimelineEntry) => {
    reset({
      ...entry,
      year: entry.year ?? new Date().getFullYear(),
      type: entry.type ?? 'appointment',
      order: entry.order ?? 0,
      endYear: entry.endYear ?? 0,
    })
    setEditing(entry)
    setDialogOpen(true)
  }

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await updateTimelineEntry(editing.id, form)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'update',
            collection: 'timeline',
            documentId: editing.id,
            documentTitle: form.title,
          })
        }
        toast({ title: 'Updated', description: 'Timeline entry updated.', variant: 'success' as never })
      } else {
        const ref = await createTimelineEntry(form as Omit<TimelineEntry, 'id' | 'createdAt' | 'updatedAt'>)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'create',
            collection: 'timeline',
            documentId: ref.id,
            documentTitle: form.title,
          })
        }
        toast({ title: 'Added', description: 'Timeline entry created.', variant: 'success' as never })
      }
      setDialogOpen(false)
      reload()
    } catch {
      toast({ title: 'Error', description: 'Could not save entry.', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    const item = data?.find(e => e.id === id)
    await deleteTimelineEntry(id)
    if (user) {
      await createAuditLog({
        actorUid: user.uid,
        actorEmail: user.email!,
        action: 'delete',
        collection: 'timeline',
        documentId: id,
        documentTitle: item?.title,
      })
    }
    toast({ title: 'Deleted', variant: 'success' as never })
    reload()
  }

  return (
    <div className="p-6 lg:p-8">
      <DataTable
        title="Career Timeline"
        data={data ?? []}
        loading={loading}
        addLabel="Add Entry"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title', 'organisation']}
        columns={[
          {
            key: 'year',
            header: 'Period',
            render: row => (
              <span className="text-sm font-medium text-navy-700">
                {row.year}{row.endYear ? `–${row.endYear}` : '–Present'}
              </span>
            ),
            className: 'w-32',
          },
          {
            key: 'type',
            header: 'Type',
            render: row => (
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TYPE_COLOUR[row.type]}`}>
                {row.type}
              </span>
            ),
            className: 'w-28',
          },
          {
            key: 'title',
            header: 'Title / Role',
            render: row => <p className="font-medium text-navy-700 truncate max-w-xs">{row.title}</p>,
          },
          {
            key: 'organisation',
            header: 'Organisation',
            render: row => <span className="text-charcoal/60">{row.organisation}</span>,
          },
          {
            key: 'location',
            header: 'Location',
            render: row => <span className="text-charcoal/40 text-xs">{row.location ?? '—'}</span>,
            className: 'w-28',
          },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editing ? 'Edit Timeline Entry' : 'Add Timeline Entry'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="tl-title">Title / Role *</Label>
              <Input id="tl-title" {...register('title')} className="mt-1"
                placeholder="Professor of Mechanical Engineering" />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="tl-org">Organisation *</Label>
              <Input id="tl-org" {...register('organisation')} className="mt-1"
                placeholder="University of Maiduguri" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="tl-type">Type *</Label>
                <Select value={watch('type')} onValueChange={v => setValue('type', v as TimelineType)}>
                  <SelectTrigger id="tl-type" className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TYPES.map(t => (
                      <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tl-year">Start Year *</Label>
                <Input id="tl-year" type="number" {...register('year')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="tl-endyear">End Year</Label>
                <Input id="tl-endyear" type="number" {...register('endYear')}
                  className="mt-1" placeholder="Leave blank if ongoing" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tl-location">Location</Label>
                <Input id="tl-location" {...register('location')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="tl-order">Display Order</Label>
                <Input id="tl-order" type="number" {...register('order')} className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="tl-desc">Description</Label>
              <Textarea id="tl-desc" rows={3} {...register('description')} className="mt-1" />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="navy" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save Entry'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
