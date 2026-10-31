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
import { DataTable } from '@/components/admin/data-table'
import {
  getResearchProjects, createResearchProject, updateResearchProject, deleteResearchProject,
  createAuditLog,
} from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import type { ResearchProject, ResearchStatus } from '@/types'

const STATUS_COLOUR: Record<ResearchStatus, string> = {
  ongoing:   'bg-emerald-100 text-emerald-700',
  completed: 'bg-blue-100 text-blue-700',
  planned:   'bg-amber-100 text-amber-700',
}

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  fundingBody: z.string().optional(),
  fundingAmount: z.string().optional(),
  startYear: z.number().int().min(1900).max(2100),
  endYear: z.number().int().min(1900).max(2100).optional(),
  status: z.enum(['ongoing', 'completed', 'planned']),
  collaborators: z.string().optional(),
  keywords: z.string().min(1),
  outcomes: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean(),
})

type FormData = z.infer<typeof schema>

export default function AdminResearchPage() {
  const { data, loading, reload } = useFirestoreData(getResearchProjects)
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ResearchProject | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { title: '', description: '', keywords: '', status: 'ongoing', startYear: new Date().getFullYear(), featured: false },
    })

  const openAdd = () => {
    reset({ status: 'ongoing', startYear: new Date().getFullYear(), keywords: '', featured: false })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (r: ResearchProject) => {
    reset({
      ...r,
      startYear: r.startYear ?? new Date().getFullYear(),
      status: r.status ?? 'ongoing',
      keywords: r.keywords.join(', '),
      collaborators: r.collaborators?.join(', ') ?? '',
      endYear: r.endYear ?? undefined,
      imageUrl: r.imageUrl ?? '',
    })
    setEditing(r)
    setDialogOpen(true)
  }

  const onSubmit = async (form: FormData) => {
    const payload = {
      ...form,
      keywords: form.keywords.split(',').map(k => k.trim()).filter(Boolean),
      collaborators: form.collaborators
        ? form.collaborators.split(',').map(c => c.trim()).filter(Boolean)
        : [],
    }
    try {
      if (editing) {
        await updateResearchProject(editing.id, payload)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'update',
            collection: 'research',
            documentId: editing.id,
            documentTitle: form.title,
          })
        }
        toast({ title: 'Updated', variant: 'success' as never })
      } else {
        const ref = await createResearchProject(payload as Omit<ResearchProject, 'id' | 'createdAt' | 'updatedAt'>)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'create',
            collection: 'research',
            documentId: ref.id,
            documentTitle: form.title,
          })
        }
        toast({ title: 'Added', variant: 'success' as never })
      }
      setDialogOpen(false)
      reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    const item = data?.find(r => r.id === id)
    await deleteResearchProject(id)
    if (user) {
      await createAuditLog({
        actorUid: user.uid,
        actorEmail: user.email!,
        action: 'delete',
        collection: 'research',
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
        title="Research Projects"
        data={data ?? []}
        loading={loading}
        addLabel="Add Project"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title']}
        columns={[
          {
            key: 'title',
            header: 'Title',
            render: row => <p className="font-medium text-navy-700 max-w-sm truncate">{row.title}</p>,
          },
          {
            key: 'fundingBody',
            header: 'Funder',
            render: row => <span className="text-charcoal/60">{row.fundingBody ?? '—'}</span>,
          },
          {
            key: 'startYear',
            header: 'Years',
            render: row => (
              <span className="tabular-nums">
                {row.startYear}{row.endYear ? `–${row.endYear}` : '–Present'}
              </span>
            ),
            className: 'w-28',
          },
          {
            key: 'status',
            header: 'Status',
            render: row => (
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLOUR[row.status]}`}>
                {row.status}
              </span>
            ),
            className: 'w-28',
          },
          {
            key: 'featured',
            header: 'Featured',
            render: row => (
              <span className={row.featured ? 'text-gold-600 font-medium text-sm' : 'text-charcoal/40 text-sm'}>
                {row.featured ? 'Yes' : 'No'}
              </span>
            ),
            className: 'w-20',
          },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? 'Edit Research Project' : 'Add Research Project'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input {...register('title')} className="mt-1" />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea rows={3} {...register('description')} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Funding Body</Label>
                <Input {...register('fundingBody')} className="mt-1" />
              </div>
              <div>
                <Label>Funding Amount</Label>
                <Input {...register('fundingAmount')} className="mt-1" placeholder="e.g. ₦50,000,000" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Status *</Label>
                <Select value={watch('status')} onValueChange={v => setValue('status', v as ResearchStatus)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Start Year *</Label>
                <Input type="number" {...register('startYear', { valueAsNumber: true })} className="mt-1" />
              </div>
              <div>
                <Label>End Year</Label>
                <Input type="number" {...register('endYear', { setValueAs: v => v === '' || v === 0 ? undefined : Number(v) })} className="mt-1" placeholder="If completed" />
              </div>
            </div>

            <div>
              <Label>Keywords * (comma-separated)</Label>
              <Input {...register('keywords')} placeholder="heat transfer, energy, ..." className="mt-1" />
            </div>

            <div>
              <Label>Collaborators (comma-separated)</Label>
              <Input {...register('collaborators')} className="mt-1" />
            </div>

            <div>
              <Label>Outcomes / Impact</Label>
              <Textarea rows={2} {...register('outcomes')} className="mt-1" />
            </div>

            <div>
              <Label>Cover Image URL</Label>
              <Input type="url" {...register('imageUrl')} className="mt-1" />
            </div>

            <div className="flex items-center gap-2">
              <input id="res-feat" type="checkbox" {...register('featured')} className="h-4 w-4" />
              <Label htmlFor="res-feat" className="cursor-pointer">Featured on homepage</Label>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="navy" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save Research Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
