'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, Images, ArrowRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  getGalleryAlbums, createGalleryAlbum, updateGalleryAlbum, deleteGalleryAlbum,
  createAuditLog,
} from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import { slugify, formatDate } from '@/lib/utils'
import type { GalleryAlbum, GalleryCategory } from '@/types'

const CATS: GalleryCategory[] = [
  'conference','workshop','research','award','mentorship','institutional','community','portrait','other',
]
const CAT_LABEL: Record<GalleryCategory, string> = {
  conference: 'Conference', workshop: 'Workshop', research: 'Research',
  award: 'Award', mentorship: 'Mentorship', institutional: 'Institutional',
  community: 'Community', portrait: 'Portrait', other: 'Other',
}

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  category: z.enum(['conference','workshop','research','award','mentorship','institutional','community','portrait','other']),
  eventDate: z.string().optional(),
  venue: z.string().optional(),
  published: z.boolean(),
  featured: z.boolean(),
  order: z.preprocess(v => (v === '' || v === undefined || v === null ? 0 : Number(v)), z.number().int().min(0)).default(0),
})
type FormData = z.infer<typeof schema>

export default function AdminGalleryPage() {
  const { data: albums, loading, reload } = useFirestoreData(() => getGalleryAlbums(false))
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<GalleryAlbum | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const openAdd = () => {
    reset({ category: 'conference', published: false, featured: false, order: albums?.length ?? 0 })
    setEditing(null); setDialogOpen(true)
  }

  const openEdit = (a: GalleryAlbum) => {
    reset({
      ...a,
      category: a.category ?? 'conference',
      order: a.order ?? 0,
      eventDate: a.eventDate ? new Date(a.eventDate).toISOString().slice(0, 10) : '',
      coverImageUrl: a.coverImageUrl ?? '',
    })
    setEditing(a); setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
      imageCount: editing?.imageCount ?? 0,
    }
    try {
      if (editing) {
        await updateGalleryAlbum(editing.id, payload)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: payload.published ? 'publish' : 'update',
            collection: 'galleryAlbums',
            documentId: editing.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Album updated', variant: 'success' as never })
      } else {
        const ref = await createGalleryAlbum(payload as Omit<GalleryAlbum, 'id' | 'createdAt' | 'updatedAt'>)
        if (user) {
          await createAuditLog({
            actorUid: user.uid,
            actorEmail: user.email!,
            action: 'create',
            collection: 'galleryAlbums',
            documentId: ref.id,
            documentTitle: data.title,
          })
        }
        toast({ title: 'Album created', variant: 'success' as never })
      }
      setDialogOpen(false); reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    const album = albums?.find(a => a.id === id)
    setDeleting(id)
    try {
      await deleteGalleryAlbum(id)
      if (user) {
        await createAuditLog({
          actorUid: user.uid,
          actorEmail: user.email!,
          action: 'delete',
          collection: 'galleryAlbums',
          documentId: id,
          documentTitle: album?.title,
        })
      }
      toast({ title: 'Album deleted', variant: 'success' as never })
      reload()
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold font-serif text-navy-800">Gallery Albums</h1>
        <Button onClick={openAdd} size="sm">
          <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" /> New Album
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 rounded-lg bg-ivory-200 animate-pulse" />
          ))}
        </div>
      ) : !albums?.length ? (
        <div className="py-20 text-center text-charcoal/50">
          <Images className="h-10 w-10 mx-auto mb-4 opacity-30" />
          <p className="text-sm">No albums yet. Create your first gallery album.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {albums.map(album => (
            <div key={album.id} className="card-base overflow-hidden flex flex-col">
              {/* Cover */}
              <div className="relative h-40 bg-navy-50 flex-shrink-0">
                {album.coverImageUrl ? (
                  <Image
                    src={album.coverImageUrl} alt={album.title} fill
                    className="object-cover" sizes="400px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Images className="h-8 w-8 text-navy-200" aria-hidden="true" />
                  </div>
                )}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <Badge variant={album.published ? 'default' : 'warning'} className="text-[10px]">
                    {album.published ? 'Published' : 'Draft'}
                  </Badge>
                  {album.featured && <Badge variant="gold" className="text-[10px]">Featured</Badge>}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gold-500 mb-0.5">
                  {CAT_LABEL[album.category]}
                </p>
                <h2 className="font-serif font-semibold text-navy-700 text-sm leading-snug mb-1">
                  {album.title}
                </h2>
                <p className="text-xs text-charcoal/45 mb-3">
                  {album.imageCount} photo{album.imageCount !== 1 ? 's' : ''}
                  {album.eventDate && ` · ${formatDate(album.eventDate)}`}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                  <Button
                    asChild variant="outline" size="xs"
                    className="flex-1 text-xs"
                  >
                    <Link href={`/admin/gallery/${album.id}/images`}>
                      <Images className="h-3 w-3 mr-1" /> Manage Photos
                    </Link>
                  </Button>
                  <Button
                    variant="ghost" size="icon-sm"
                    onClick={() => openEdit(album)}
                    aria-label="Edit album"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost" size="icon-sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(album.id)}
                    disabled={deleting === album.id}
                    aria-label="Delete album"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Album dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? 'Edit Album' : 'New Album'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div>
              <Label>Description</Label>
              <Textarea rows={2} {...register('description')} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={watch('category')} onValueChange={v => setValue('category', v as GalleryCategory)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATS.map(c => <SelectItem key={c} value={c}>{CAT_LABEL[c]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Event Date</Label>
                <Input type="date" {...register('eventDate')} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Venue</Label>
                <Input {...register('venue')} className="mt-1" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" {...register('order')} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Cover Image URL</Label>
              <Input type="url" {...register('coverImageUrl')} className="mt-1" />
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <input id="alb-pub" type="checkbox" {...register('published')} className="h-4 w-4" />
                <Label htmlFor="alb-pub" className="cursor-pointer">Published</Label>
              </div>
              <div className="flex items-center gap-2">
                <input id="alb-feat" type="checkbox" {...register('featured')} className="h-4 w-4" />
                <Label htmlFor="alb-feat" className="cursor-pointer">Featured</Label>
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
