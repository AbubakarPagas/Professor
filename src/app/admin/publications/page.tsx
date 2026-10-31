'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DataTable } from '@/components/admin/data-table'
import { Badge } from '@/components/ui/badge'
import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
  createAuditLog,
} from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import type { Publication, PublicationType } from '@/types'

const schema = z.object({
  title: z.string().min(3),
  authors: z.string().min(2),
  journal: z.string().optional(),
  conference: z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  year: z.preprocess(v => (v === '' || v === undefined || v === null ? undefined : Number(v)), z.number().int().min(1900).max(2100)),
  doi: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  abstract: z.string().optional(),
  type: z.enum(['journal', 'conference', 'book', 'book_chapter', 'technical_report', 'thesis']),
  featured: z.boolean(),
  citations: z.preprocess(
    v => (v === '' || v === undefined || v === null ? undefined : Number(v)),
    z.number().int().min(0).optional()
  ),
})

type FormData = z.infer<typeof schema>

const pubTypes: PublicationType[] = ['journal', 'conference', 'book', 'book_chapter', 'technical_report', 'thesis']
const typeLabel: Record<PublicationType, string> = {
  journal: 'Journal',
  conference: 'Conference',
  book: 'Book',
  book_chapter: 'Book Chapter',
  technical_report: 'Technical Report',
  thesis: 'Thesis',
}

export default function AdminPublicationsPage() {
  const { data, loading, error, reload } = useFirestoreData(getPublications)
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Publication | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({ type: 'journal', featured: false, year: new Date().getFullYear() })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (pub: Publication) => {
    reset({
      ...pub,
      year: pub.year ?? new Date().getFullYear(),
      type: pub.type ?? 'journal',
      citations: pub.citations ?? undefined,
      url: pub.url ?? '',
      doi: pub.doi ?? '',
    })
    setEditing(pub)
    setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (editing) {
        await updatePublication(editing.id, data)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'update',
            collection: 'publications',
            documentId: editing.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Updated', description: 'Publication updated.', variant: 'success' as never })
      } else {
        const ref = await createPublication(data as Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'create',
            collection: 'publications',
            documentId: ref.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Added', description: 'Publication added.', variant: 'success' as never })
      }
      setDialogOpen(false)
      reload()
    } catch {
      toast({ title: 'Error', description: 'Operation failed.', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    const item = data?.find(p => p.id === id)
    await deletePublication(id)
    if (user) {
      await createAuditLog({
        actorUid: user.uid,
        actorEmail: user.email!,
        action: 'delete',
        collection: 'publications',
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
        title="Publications"
        data={data ?? []}
        loading={loading}
        addLabel="Add Publication"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title', 'authors']}
        columns={[
          {
            key: 'title',
            header: 'Title',
            render: row => (
              <p className="font-medium text-navy-700 max-w-xs truncate" title={row.title}>
                {row.title}
              </p>
            ),
          },
          {
            key: 'authors',
            header: 'Authors',
            render: row => (
              <p className="text-muted-foreground max-w-[180px] truncate">{row.authors}</p>
            ),
          },
          {
            key: 'type',
            header: 'Type',
            render: row => (
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {typeLabel[row.type]}
              </Badge>
            ),
          },
          { key: 'year', header: 'Year', className: 'w-16' },
          {
            key: 'featured',
            header: 'Featured',
            render: row => (
              <span className={row.featured ? 'text-gold-600 font-medium' : 'text-muted-foreground'}>
                {row.featured ? 'Yes' : 'No'}
              </span>
            ),
            className: 'w-20',
          },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editing ? 'Edit Publication' : 'Add Publication'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="pub-title">Title *</Label>
              <Input id="pub-title" {...register('title')} className="mt-1" />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="pub-authors">Authors *</Label>
              <Input id="pub-authors" placeholder="Dauda, M., Smith, J." {...register('authors')} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pub-type">Type *</Label>
                <Select
                  value={watch('type')}
                  onValueChange={v => setValue('type', v as PublicationType)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pubTypes.map(t => (
                      <SelectItem key={t} value={t}>{typeLabel[t]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pub-year">Year *</Label>
                <Input id="pub-year" type="number" {...register('year')} className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pub-journal">Journal</Label>
                <Input id="pub-journal" {...register('journal')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pub-conference">Conference</Label>
                <Input id="pub-conference" {...register('conference')} className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pub-volume">Volume</Label>
                <Input id="pub-volume" {...register('volume')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pub-issue">Issue</Label>
                <Input id="pub-issue" {...register('issue')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pub-pages">Pages</Label>
                <Input id="pub-pages" placeholder="1-12" {...register('pages')} className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pub-doi">DOI</Label>
                <Input id="pub-doi" placeholder="10.xxxx/..." {...register('doi')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pub-url">URL</Label>
                <Input id="pub-url" type="url" {...register('url')} className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="pub-abstract">Abstract</Label>
              <Textarea id="pub-abstract" rows={4} {...register('abstract')} className="mt-1" />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="pub-featured"
                type="checkbox"
                {...register('featured')}
                className="h-4 w-4"
              />
              <Label htmlFor="pub-featured" className="cursor-pointer">
                Mark as Featured
              </Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
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
