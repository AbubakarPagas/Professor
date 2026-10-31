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
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/data-table'
import { getNewsItems, createNewsItem, updateNewsItem, deleteNewsItem, createAuditLog } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import { slugify, formatDate } from '@/lib/utils'
import type { NewsItem } from '@/types'

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  body: z.string().min(20),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  tags: z.string().optional(),
  published: z.boolean(),
  publishedAt: z.string().min(1),
  author: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function AdminNewsPage() {
  const { data: newsItems, loading, reload } = useFirestoreData(() => getNewsItems(false))
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<NewsItem | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { title: '', slug: '', excerpt: '', body: '', publishedAt: new Date().toISOString().slice(0, 10), published: false },
    })

  const titleValue = watch('title') ?? ''

  const openAdd = () => {
    reset({
      published: false,
      publishedAt: new Date().toISOString().slice(0, 10),
    })
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (n: NewsItem) => {
    reset({
      ...n,
      tags: n.tags.join(', '),
      publishedAt: n.publishedAt ? new Date(n.publishedAt).toISOString().slice(0, 10) : '',
    })
    setEditing(n)
    setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      publishedAt: new Date(data.publishedAt),
    }
    try {
      if (editing) {
        await updateNewsItem(editing.id, payload)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: payload.published ? 'publish' : 'update',
            collection: 'news',
            documentId: editing.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Updated', variant: 'success' as never })
      } else {
        const ref = await createNewsItem(payload as Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'create',
            collection: 'news',
            documentId: ref.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Published', variant: 'success' as never })
      }
      setDialogOpen(false)
      reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    const item = newsItems?.find(n => n.id === id)
    await deleteNewsItem(id)
    if (user) {
      await createAuditLog({
        actorUid: user.uid,
        actorEmail: user.email!,
        action: 'delete',
        collection: 'news',
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
        title="News & Press"
        data={newsItems ?? []}
        loading={loading}
        addLabel="New Article"
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        searchKeys={['title']}
        columns={[
          { key: 'title', header: 'Title', render: row => <p className="font-medium text-navy-700 max-w-xs truncate">{row.title}</p> },
          { key: 'publishedAt', header: 'Date', render: row => <span className="text-muted-foreground text-xs">{formatDate(row.publishedAt)}</span> },
          {
            key: 'published',
            header: 'Status',
            render: row => (
              <Badge variant={row.published ? 'default' : 'secondary'} className="text-xs">
                {row.published ? 'Published' : 'Draft'}
              </Badge>
            ),
          },
        ]}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? 'Edit Article' : 'New Article'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                {...register('title')}
                className="mt-1"
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
            <div>
              <Label>Excerpt *</Label>
              <Textarea rows={2} {...register('excerpt')} className="mt-1" />
            </div>
            <div>
              <Label>Body (HTML) *</Label>
              <Textarea rows={8} {...register('body')} className="mt-1 font-mono text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cover Image URL</Label>
                <Input type="url" {...register('coverImageUrl')} className="mt-1" />
              </div>
              <div>
                <Label>Author</Label>
                <Input {...register('author')} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input {...register('tags')} className="mt-1" />
              </div>
              <div>
                <Label>Published Date *</Label>
                <Input type="date" {...register('publishedAt')} className="mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input id="news-pub" type="checkbox" {...register('published')} className="h-4 w-4" />
              <Label htmlFor="news-pub" className="cursor-pointer">Published (visible on site)</Label>
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
