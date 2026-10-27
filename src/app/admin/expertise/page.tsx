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
  getExpertiseAreas, createExpertiseArea, updateExpertiseArea, deleteExpertiseArea,
} from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import type { ExpertiseArea } from '@/types'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

type FormData = z.infer<typeof schema>

export default function AdminExpertisePage() {
  const { data, loading, reload } = useFirestoreData(getExpertiseAreas)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ExpertiseArea | null>(null)

  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({ active: true, order: data?.length ?? 0 })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (area: ExpertiseArea) => {
    reset(area)
    setEditing(area)
    setDialogOpen(true)
  }

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await updateExpertiseArea(editing.id, form)
        toast({ title: 'Updated', variant: 'success' as never })
      } else {
        await createExpertiseArea(form as Omit<ExpertiseArea, 'id' | 'createdAt' | 'updatedAt'>)
        toast({ title: 'Added', variant: 'success' as never })
      }
      setDialogOpen(false)
      reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteExpertiseArea(id)
    toast({ title: 'Deleted', variant: 'success' as never })
    reload()
  }

  return (
    <div className="p-6 lg:p-8">
      <DataTable
        title="Expertise Areas"
        data={data ?? []}
        loading={loading}
        addLabel="Add Expertise"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title']}
        columns={[
          {
            key: 'order',
            header: '#',
            render: row => <span className="text-charcoal/40 tabular-nums">{row.order + 1}</span>,
            className: 'w-10',
          },
          {
            key: 'title',
            header: 'Area',
            render: row => <p className="font-medium text-navy-700">{row.title}</p>,
          },
          {
            key: 'description',
            header: 'Description',
            render: row => (
              <p className="text-charcoal/60 text-xs max-w-xs truncate">
                {row.description ?? '—'}
              </p>
            ),
          },
          {
            key: 'active',
            header: 'Visible',
            render: row => (
              <span className={row.active ? 'text-emerald-600 font-medium text-sm' : 'text-charcoal/40 text-sm'}>
                {row.active ? 'Yes' : 'Hidden'}
              </span>
            ),
            className: 'w-20',
          },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editing ? 'Edit Expertise' : 'Add Expertise Area'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="exp-title">Title *</Label>
              <Input id="exp-title" {...register('title')} className="mt-1"
                placeholder="e.g. Manufacturing Technology" />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="exp-desc">Description</Label>
              <Textarea id="exp-desc" rows={3} {...register('description')} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exp-icon">Icon name (Lucide)</Label>
                <Input id="exp-icon" {...register('icon')} className="mt-1"
                  placeholder="e.g. Cog" />
              </div>
              <div>
                <Label htmlFor="exp-order">Display Order</Label>
                <Input id="exp-order" type="number" {...register('order')} className="mt-1" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input id="exp-active" type="checkbox" {...register('active')} className="h-4 w-4" />
              <Label htmlFor="exp-active" className="cursor-pointer">Visible on public site</Label>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="navy" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
