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
import { DataTable } from '@/components/admin/data-table'
import { Badge } from '@/components/ui/badge'
import { getPatents, createPatent, updatePatent, deletePatent, createAuditLog } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import type { Patent, PatentStatus } from '@/types'

const schema = z.object({
  title: z.string().min(3),
  inventors: z.string().min(2),
  patentNumber: z.string().optional(),
  country: z.string().min(2),
  status: z.enum(['granted', 'pending', 'expired']),
  year: z.preprocess(v => (v === '' || v === undefined || v === null ? undefined : Number(v)), z.number().int().min(1900).max(2100)),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

const statusColour: Record<PatentStatus, string> = {
  granted: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  expired: 'bg-gray-100 text-gray-600',
}

export default function AdminPatentsPage() {
  const { data, loading, reload } = useFirestoreData(getPatents)
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Patent | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({ status: 'granted', year: new Date().getFullYear() })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (p: Patent) => {
    reset({
      ...p,
      year: p.year ?? new Date().getFullYear(),
      status: p.status ?? 'granted',
      url: p.url ?? '',
    })
    setEditing(p)
    setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (editing) {
        await updatePatent(editing.id, data)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'update',
            collection: 'patents',
            documentId: editing.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Updated', variant: 'success' as never })
      } else {
        const ref = await createPatent(data as Omit<Patent, 'id' | 'createdAt' | 'updatedAt'>)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'create',
            collection: 'patents',
            documentId: ref.id,
            documentTitle: data.title,
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
    const item = data?.find(p => p.id === id)
    await deletePatent(id)
    if (user) {
      await createAuditLog({
        actorUid: user.uid,
        actorEmail: user.email!,
        action: 'delete',
        collection: 'patents',
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
        title="Patents"
        data={data ?? []}
        loading={loading}
        addLabel="Add Patent"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title', 'inventors']}
        columns={[
          {
            key: 'title',
            header: 'Title',
            render: row => <p className="font-medium text-navy-700 max-w-xs truncate">{row.title}</p>,
          },
          { key: 'inventors', header: 'Inventors', render: row => <span className="text-muted-foreground">{row.inventors}</span> },
          { key: 'country', header: 'Country' },
          { key: 'year', header: 'Year', className: 'w-16' },
          {
            key: 'status',
            header: 'Status',
            render: row => (
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColour[row.status]}`}>
                {row.status}
              </span>
            ),
          },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? 'Edit Patent' : 'Add Patent'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input {...register('title')} className="mt-1" />
            </div>
            <div>
              <Label>Inventors *</Label>
              <Input {...register('inventors')} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Patent Number</Label>
                <Input {...register('patentNumber')} className="mt-1" />
              </div>
              <div>
                <Label>Country *</Label>
                <Input {...register('country')} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status *</Label>
                <Select value={watch('status')} onValueChange={v => setValue('status', v as PatentStatus)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="granted">Granted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Year *</Label>
                <Input type="number" {...register('year')} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea rows={3} {...register('description')} className="mt-1" />
            </div>
            <div>
              <Label>URL</Label>
              <Input type="url" {...register('url')} className="mt-1" />
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
