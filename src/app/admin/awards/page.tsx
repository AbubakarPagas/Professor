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
import { getAwards, createAward, updateAward, deleteAward, createAuditLog } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import type { Award, AwardCategory } from '@/types'

const schema = z.object({
  title: z.string().min(3),
  organisation: z.string().min(2),
  year: z.number().int().min(1900).max(2100),
  category: z.enum(['national', 'international', 'fellowship', 'recognition', 'academic']),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

const categories: AwardCategory[] = ['national', 'international', 'fellowship', 'recognition', 'academic']

export default function AdminAwardsPage() {
  const { data, loading, reload } = useFirestoreData(getAwards)
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Award | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { title: '', organisation: '', year: new Date().getFullYear(), category: 'national' },
    })

  const openAdd = () => {
    reset({ category: 'national', year: new Date().getFullYear() })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (a: Award) => {
    reset({
      ...a,
      year: a.year ?? new Date().getFullYear(),
      category: a.category ?? 'national',
      imageUrl: a.imageUrl ?? '',
    })
    setEditing(a)
    setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (editing) {
        await updateAward(editing.id, data)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'update',
            collection: 'awards',
            documentId: editing.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Updated', variant: 'success' as never })
      } else {
        const ref = await createAward(data as Omit<Award, 'id' | 'createdAt' | 'updatedAt'>)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'create',
            collection: 'awards',
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
    const item = data?.find(a => a.id === id)
    await deleteAward(id)
    if (user) {
      await createAuditLog({
        actorUid: user.uid,
        actorEmail: user.email!,
        action: 'delete',
        collection: 'awards',
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
        title="Awards & Honours"
        data={data ?? []}
        loading={loading}
        addLabel="Add Award"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title', 'organisation']}
        columns={[
          { key: 'title', header: 'Title', render: row => <p className="font-medium text-navy-700 max-w-xs truncate">{row.title}</p> },
          { key: 'organisation', header: 'Organisation', render: row => <span className="text-muted-foreground">{row.organisation}</span> },
          { key: 'year', header: 'Year', className: 'w-16' },
          { key: 'category', header: 'Category', render: row => <span className="capitalize text-muted-foreground">{row.category}</span> },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? 'Edit Award' : 'Add Award'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input {...register('title')} className="mt-1" />
            </div>
            <div>
              <Label>Awarding Organisation *</Label>
              <Input {...register('organisation')} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={watch('category')} onValueChange={v => setValue('category', v as AwardCategory)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Year *</Label>
                <Input type="number" {...register('year', { valueAsNumber: true })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea rows={3} {...register('description')} className="mt-1" />
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
