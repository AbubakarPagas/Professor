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
import { getResearchProjects, createResearchProject, updateResearchProject, deleteResearchProject } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import type { ResearchProject, ResearchStatus } from '@/types'

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  fundingBody: z.string().optional(),
  fundingAmount: z.string().optional(),
  startYear: z.coerce.number().int().min(1900).max(2100),
  endYear: z.coerce.number().int().min(1900).max(2100).optional().or(z.literal(0)).transform(v => v || undefined),
  status: z.enum(['ongoing', 'completed', 'planned']),
  collaborators: z.string().optional(),
  keywords: z.string().min(1),
  outcomes: z.string().optional(),
})

type FormData = z.infer<typeof schema> & { collaboratorsRaw?: string }

export default function AdminResearchPage() {
  const { data, loading, reload } = useFirestoreData(getResearchProjects)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ResearchProject | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({ status: 'ongoing', startYear: new Date().getFullYear(), keywords: '' })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (r: ResearchProject) => {
    reset({
      ...r,
      keywords: r.keywords.join(', '),
      collaborators: r.collaborators?.join(', ') ?? '',
    })
    setEditing(r)
    setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      keywords: data.keywords.split(',').map(k => k.trim()).filter(Boolean),
      collaborators: data.collaborators
        ? data.collaborators.split(',').map(c => c.trim()).filter(Boolean)
        : [],
    }
    try {
      editing
        ? await updateResearchProject(editing.id, payload)
        : await createResearchProject(payload as Omit<ResearchProject, 'id' | 'createdAt' | 'updatedAt'>)
      toast({ title: editing ? 'Updated' : 'Added', variant: 'success' as never })
      setDialogOpen(false)
      reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteResearchProject(id)
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
          { key: 'title', header: 'Title', render: row => <p className="font-medium text-navy-700 max-w-sm truncate">{row.title}</p> },
          { key: 'fundingBody', header: 'Funder', render: row => <span className="text-muted-foreground">{row.fundingBody ?? '—'}</span> },
          { key: 'startYear', header: 'Years', render: row => <span>{row.startYear}{row.endYear ? `–${row.endYear}` : '–'}</span> },
          { key: 'status', header: 'Status', render: row => <span className="capitalize text-muted-foreground">{row.status}</span> },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input {...register('title')} className="mt-1" />
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
                <Input {...register('fundingAmount')} className="mt-1" />
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
                <Input type="number" {...register('startYear')} className="mt-1" />
              </div>
              <div>
                <Label>End Year</Label>
                <Input type="number" {...register('endYear')} className="mt-1" placeholder="If completed" />
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
              <Label>Outcomes</Label>
              <Textarea rows={2} {...register('outcomes')} className="mt-1" />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="navy" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Save'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
