'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Upload, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getBiography, upsertBiography } from '@/lib/firestore'
import { uploadFile, buildStoragePath } from '@/lib/storage'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import type { Biography } from '@/types'

const schema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  subtitle: z.string().optional(),
  bio: z.string().min(20),
  shortBio: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  institution: z.string().optional(),
  department: z.string().optional(),
  address: z.string().optional(),
  linkedIn: z.string().url().optional().or(z.literal('')),
  researchGate: z.string().url().optional().or(z.literal('')),
  googleScholar: z.string().url().optional().or(z.literal('')),
  orcid: z.string().optional(),
  fellowships: z.string().optional(),
  areasOfExpertise: z.string().optional(),
  statsPublications: z.coerce.number().int().min(0).default(0),
  statsPatents: z.coerce.number().int().min(0).default(0),
  statsAwards: z.coerce.number().int().min(0).default(0),
  statsYears: z.coerce.number().int().min(0).default(0),
  statsStudents: z.coerce.number().int().min(0).default(0),
})

type FormData = z.infer<typeof schema>

export default function AdminBiographyPage() {
  const { data: bio, loading, reload } = useFirestoreData(getBiography)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [profileImageUrl, setProfileImageUrl] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset, formState: { isSubmitting, isDirty } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (bio) {
      reset({
        ...bio,
        fellowships: bio.fellowships.join(', '),
        areasOfExpertise: bio.areasOfExpertise.join(', '),
        statsPublications: bio.stats.publications,
        statsPatents: bio.stats.patents,
        statsAwards: bio.stats.awards,
        statsYears: bio.stats.yearsExperience,
        statsStudents: bio.stats.studentsSupervised,
      })
      setProfileImageUrl(bio.profileImageUrl ?? '')
    }
  }, [bio, reset])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadProgress(1)
    try {
      const url = await uploadFile(file, buildStoragePath('profile', file), p => setUploadProgress(p))
      setProfileImageUrl(url)
      toast({ title: 'Profile photo uploaded', variant: 'success' as never })
    } catch {
      toast({ title: 'Upload failed', variant: 'destructive' })
    } finally {
      setUploadProgress(0)
    }
  }

  const onSubmit = async (data: FormData) => {
    const payload: Omit<Biography, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      title: data.title,
      titles: data.title ? [data.title] : [],
      subtitle: data.subtitle,
      bio: data.bio,
      fullBio: data.bio,
      shortBio: data.shortBio,
      tagline: data.shortBio ?? '',
      email: data.email || undefined,
      phone: data.phone,
      institution: data.institution,
      department: data.department,
      address: data.address,
      linkedIn: data.linkedIn || undefined,
      researchGate: data.researchGate || undefined,
      googleScholar: data.googleScholar || undefined,
      orcid: data.orcid,
      profileImageUrl: profileImageUrl || undefined,
      fellowships: data.fellowships ? data.fellowships.split(',').map(f => f.trim()).filter(Boolean) : [],
      areasOfExpertise: data.areasOfExpertise ? data.areasOfExpertise.split(',').map(a => a.trim()).filter(Boolean) : [],
      stats: {
        publications: data.statsPublications,
        patents: data.statsPatents,
        awards: data.statsAwards,
        yearsExperience: data.statsYears,
        studentsSupervised: data.statsStudents,
      },
    }
    try {
      await upsertBiography(payload)
      toast({ title: 'Biography saved', variant: 'success' as never })
      reload()
    } catch {
      toast({ title: 'Error saving biography', variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 rounded bg-gray-200 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold font-serif text-navy-800">Biography & Profile</h1>
        <Button form="bio-form" type="submit" variant="navy" disabled={isSubmitting} aria-busy={isSubmitting}>
          <Save className="mr-2 h-4 w-4" aria-hidden="true" />
          {isSubmitting ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>

      <form id="bio-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile photo */}
        <Card>
          <CardHeader><CardTitle className="text-base">Profile Photo</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-5">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gold-200 flex-shrink-0">
                {profileImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profileImageUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <UserCircle className="h-full w-full text-gray-300 p-2" aria-hidden="true" />
                )}
                {uploadProgress > 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                    <span className="text-white text-xs">{Math.round(uploadProgress)}%</span>
                  </div>
                )}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploadProgress > 0}
                >
                  <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WebP. Max 5MB.</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core info */}
        <Card>
          <CardHeader><CardTitle className="text-base">Core Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input {...register('name')} className="mt-1" />
              </div>
              <div>
                <Label>Title / Position *</Label>
                <Input {...register('title')} placeholder="Professor of Mechanical Engineering" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input {...register('subtitle')} placeholder="e.g. Former Vice Chancellor…" className="mt-1" />
            </div>
            <div>
              <Label>Short Bio (2–3 sentences) *</Label>
              <Textarea rows={3} {...register('shortBio')} className="mt-1" />
            </div>
            <div>
              <Label>Full Biography (HTML or plain text) *</Label>
              <Textarea rows={8} {...register('bio')} className="mt-1" />
            </div>
            <div>
              <Label>Fellowships (comma-separated, e.g. FNSE, FNIMechE)</Label>
              <Input {...register('fellowships')} className="mt-1" />
            </div>
            <div>
              <Label>Areas of Expertise (comma-separated)</Label>
              <Input {...register('areasOfExpertise')} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader><CardTitle className="text-base">Contact & Institution</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" {...register('email')} className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input {...register('phone')} className="mt-1" />
              </div>
              <div>
                <Label>Institution</Label>
                <Input {...register('institution')} className="mt-1" />
              </div>
              <div>
                <Label>Department</Label>
                <Input {...register('department')} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input {...register('address')} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Academic profiles */}
        <Card>
          <CardHeader><CardTitle className="text-base">Academic Profiles</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>LinkedIn URL</Label>
                <Input type="url" {...register('linkedIn')} className="mt-1" />
              </div>
              <div>
                <Label>ResearchGate URL</Label>
                <Input type="url" {...register('researchGate')} className="mt-1" />
              </div>
              <div>
                <Label>Google Scholar URL</Label>
                <Input type="url" {...register('googleScholar')} className="mt-1" />
              </div>
              <div>
                <Label>ORCID</Label>
                <Input {...register('orcid')} placeholder="0000-0000-0000-0000" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader><CardTitle className="text-base">Statistics (shown on homepage)</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { name: 'statsPublications', label: 'Publications' },
                { name: 'statsPatents', label: 'Patents' },
                { name: 'statsAwards', label: 'Awards' },
                { name: 'statsYears', label: 'Years Exp.' },
                { name: 'statsStudents', label: 'Students' },
              ].map(f => (
                <div key={f.name}>
                  <Label>{f.label}</Label>
                  <Input type="number" {...register(f.name as keyof FormData)} className="mt-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
