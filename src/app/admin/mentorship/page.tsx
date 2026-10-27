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
import { DataTable } from '@/components/admin/data-table'
import {
  getMentorshipPrograms, createMentorshipProgram,
  updateMentorshipProgram, deleteMentorshipProgram,
} from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import type { MentorshipProgram } from '@/types'

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  targetAudience: z.string().min(5),
  outcomes: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  active: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
})

type FormData = z.infer<typeof schema>

export default function AdminMentorshipPage() {
  const { data, loading, reload } = useFirestoreData(getMentorshipPrograms)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<MentorshipProgram | null>(null)

  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({ active: true, order: data?.length ?? 0 })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (m: MentorshipProgram) => {
    reset({ ...m, imageUrl: m.imageUrl ?? '' })
    setEditing(m)
    setDialogOpen(true)
  }

  const onSubmit = async (form: FormData) => {
    try {
      editing
        ? await updateMentorshipProgram(editing.id, form)
        : await createMentorshipProgram(form as Omit<MentorshipProgram, 'id' | 'createdAt' | 'updatedAt'>)
      toast({ title: editing ? 'Updated' : 'Added', variant: 'success' as never })
      setDialogOpen(false)
      reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteMentorshipProgram(id)
    toast({ title: 'Deleted', variant: 'success' as never })
    reload()
  }

  return (
    <div className="p-6 lg:p-8">
      <DataTable
        title="Mentorship Programmes"
        data={data ?? []}
        loading={loading}
        addLabel="Add Programme"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title', 'targetAudience']}
        columns={[
          {
            key: 'title',
            header: 'Programme',
            render: row => <p className="font-medium text-navy-700 max-w-xs truncate">{row.title}</p>,
          },
          {
            key: 'targetAudience',
            header: 'Target Audience',
            render: row => <span className="text-charcoal/60">{row.targetAudience}</span>,
          },
          {
            key: 'active',
            header: 'Status',
            render: row => (
              <span className={row.active
                ? 'text-emerald-600 font-medium text-sm'
                : 'text-charcoal/40 text-sm'}>
                {row.active ? 'Active' : 'Inactive'}
              </span>
            ),
            className: 'w-24',
          },
          {
            key: 'order',
            header: 'Order',
            render: row => <span className="tabular-nums text-charcoal/40">{row.order}</span>,
            className: 'w-16',
          },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editing ? 'Edit Programme' : 'Add Mentorship Programme'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Programme Title *</Label>
              <Input {...register('title')} className="mt-1" />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label>Description * (shown to visitors)</Label>
              <Textarea rows={4} {...register('description')} className="mt-1" />
              {errors.description && (
                <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <Label>Target Audience *</Label>
              <Input {...register('targetAudience')} className="mt-1"
                placeholder="e.g. Postgraduate engineering students" />
            </div>

            <div>
              <Label>Outcomes / Goals</Label>
              <Textarea rows={2} {...register('outcomes')} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Image URL</Label>
                <Input type="url" {...register('imageUrl')} className="mt-1" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" {...register('order')} className="mt-1" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input id="ment-active" type="checkbox" {...register('active')} className="h-4 w-4" />
              <Label htmlFor="ment-active" className="cursor-pointer">Active (visible on public site)</Label>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="navy" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save Programme'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
