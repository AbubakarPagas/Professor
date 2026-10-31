'use client'

import { use, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, Trash2, Pencil, ArrowLeft, Images } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  getGalleryAlbumById, getGalleryImages,
  createGalleryImage, updateGalleryImage, deleteGalleryImage,
  updateGalleryAlbum,
} from '@/lib/firestore'
import { uploadFile, buildStoragePath, deleteFile } from '@/lib/storage'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import type { GalleryImage } from '@/types'

const schema = z.object({
  title: z.string().min(1),
  altText: z.string().min(1, 'Alt text is required for accessibility'),
  caption: z.string().optional(),
  credit: z.string().optional(),
  order: z.preprocess(v => (v === '' || v === undefined || v === null ? 0 : Number(v)), z.number().int().min(0)).default(0),
  featured: z.boolean(),
})
type FormData = z.infer<typeof schema>

export default function AlbumImagesPage({ params }: { params: Promise<{ albumId: string }> }) {
  const { albumId } = use(params)
  const { data: album } = useFirestoreData(() => getGalleryAlbumById(albumId), [albumId])
  const { data: images, loading, reload } = useFirestoreData(
    () => getGalleryImages(albumId), [albumId]
  )
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [editTarget, setEditTarget] = useState<GalleryImage | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset, formState: { isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  // Upload multiple files
  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    let done = 0
    try {
      for (const file of files) {
        const path = buildStoragePath(`gallery/${albumId}`, file)
        const url = await uploadFile(file, path, p => {
          setUploadProgress(Math.round((done / files.length) * 100 + p / files.length))
        })
        await createGalleryImage({
          albumId,
          title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          altText: file.name,
          imageUrl: url,
          order: (images?.length ?? 0) + done,
          featured: false,
        })
        done++
      }
      // Update album imageCount
      if (album) {
        await updateGalleryAlbum(albumId, { imageCount: (album.imageCount ?? 0) + done })
      }
      toast({ title: `${done} photo${done !== 1 ? 's' : ''} uploaded`, variant: 'success' as never })
      reload()
    } catch {
      toast({ title: 'Upload failed', variant: 'destructive' })
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleDelete = async (img: GalleryImage) => {
    try {
      await deleteGalleryImage(img.id)
      try { await deleteFile(img.imageUrl) } catch {} // best-effort storage cleanup
      if (album) {
        await updateGalleryAlbum(albumId, { imageCount: Math.max(0, (album.imageCount ?? 1) - 1) })
      }
      toast({ title: 'Photo deleted', variant: 'success' as never })
      reload()
    } catch {
      toast({ title: 'Delete failed', variant: 'destructive' })
    }
  }

  const openEdit = (img: GalleryImage) => {
    reset({
      title: img.title ?? '',
      altText: img.altText ?? '',
      caption: img.caption,
      credit: img.credit,
      order: img.order ?? 0,
      featured: img.featured ?? false,
    })
    setEditTarget(img)
  }

  const onEditSubmit = async (data: FormData) => {
    if (!editTarget) return
    try {
      await updateGalleryImage(editTarget.id, data)
      toast({ title: 'Photo updated', variant: 'success' as never })
      setEditTarget(null); reload()
    } catch {
      toast({ title: 'Update failed', variant: 'destructive' })
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/gallery">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Albums
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold font-serif text-navy-800">{album?.title ?? 'Album Photos'}</h1>
          <p className="text-sm text-charcoal/50">{images?.length ?? 0} photos</p>
        </div>
      </div>

      {/* Upload area */}
      <div
        className="mb-8 border-2 border-dashed border-ivory-300 rounded-xl p-8 text-center hover:border-gold-400 transition-colors cursor-pointer"
        onClick={() => !uploading && fileRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Click to upload photos"
        onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
      >
        {uploading ? (
          <div>
            <p className="text-sm font-medium text-navy-700 mb-2">Uploading… {uploadProgress}%</p>
            <div className="h-2 bg-ivory-300 rounded-full overflow-hidden">
              <div className="h-full bg-gold-400 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 text-charcoal/30 mx-auto mb-2" aria-hidden="true" />
            <p className="text-sm font-medium text-navy-700">Click to upload photos</p>
            <p className="text-xs text-charcoal/40 mt-1">JPG, PNG, WebP — multiple files supported</p>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFilesChange}
          disabled={uploading}
          aria-label="Select photos to upload"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-md bg-ivory-200 animate-pulse" />
          ))}
        </div>
      ) : !images?.length ? (
        <div className="py-16 text-center text-charcoal/50">
          <Images className="h-10 w-10 mx-auto mb-4 opacity-30" />
          <p className="text-sm">No photos yet. Upload above to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map(img => (
            <div key={img.id} className="group relative aspect-square rounded-md overflow-hidden bg-navy-50">
              <Image
                src={img.thumbnailUrl ?? img.imageUrl}
                alt={img.altText}
                fill
                className="object-cover"
                sizes="200px"
              />
              {img.featured && (
                <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold-400" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2">
                <Button
                  variant="ghost" size="icon-sm"
                  className="opacity-0 group-hover:opacity-100 text-white hover:bg-white/20 transition-opacity"
                  onClick={() => openEdit(img)}
                  aria-label="Edit photo"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost" size="icon-sm"
                  className="opacity-0 group-hover:opacity-100 text-red-300 hover:bg-white/20 transition-opacity"
                  onClick={() => handleDelete(img)}
                  aria-label="Delete photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-1.5 py-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                {img.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif">Edit Photo</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input {...register('title')} className="mt-1" />
              </div>
              <div>
                <Label>Alt Text * <span className="text-charcoal/40 font-normal">(for accessibility)</span></Label>
                <Input {...register('altText')} className="mt-1" />
              </div>
              <div>
                <Label>Caption</Label>
                <Textarea rows={2} {...register('caption')} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Photo Credit</Label>
                  <Input {...register('credit')} className="mt-1" />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input type="number" {...register('order')} className="mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input id="img-feat" type="checkbox" {...register('featured')} className="h-4 w-4" />
                <Label htmlFor="img-feat" className="cursor-pointer">Featured photo</Label>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setEditTarget(null)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Save'}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
