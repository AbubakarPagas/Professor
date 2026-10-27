'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { createContactMessage } from '@/lib/firestore'
import { toast } from '@/hooks/use-toast'
import type { EnquiryCategory } from '@/types'

const schema = z.object({
  name:            z.string().min(2, 'Please enter your full name'),
  email:           z.string().email('Please enter a valid email address'),
  organisation:    z.string().optional(),
  enquiryCategory: z.enum([
    'speaking', 'mentorship', 'research_collaboration', 'institutional', 'media', 'general',
  ], { errorMap: () => ({ message: 'Please select an enquiry type' }) }),
  subject:         z.string().min(4, 'Please enter a subject'),
  message:         z.string().min(20, 'Message must be at least 20 characters'),
})

type FormData = z.infer<typeof schema>

const CATEGORY_LABELS: Record<EnquiryCategory, string> = {
  speaking:              'Speaking Engagement',
  mentorship:            'Mentorship Request',
  research_collaboration: 'Research Collaboration',
  institutional:         'Institutional Enquiry',
  media:                 'Media / Press',
  general:               'General Enquiry',
}

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { enquiryCategory: 'general' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await createContactMessage(data)
      setSent(true)
      reset()
      toast({ title: 'Message sent', description: 'We will be in touch shortly.' })
    } catch {
      toast({ title: 'Failed to send', description: 'Please try again.', variant: 'destructive' })
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-emerald-200 bg-emerald-50">
        <CheckCircle2 className="h-12 w-12 text-emerald-600 mb-4" aria-hidden="true" />
        <h3 className="font-serif font-semibold text-emerald-800 text-lg mb-2">Message Received</h3>
        <p className="text-emerald-700 text-sm mb-6 max-w-xs leading-relaxed">
          Thank you for reaching out. Professor Dauda or his team will respond to your enquiry shortly.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSent(false)}>Send Another Message</Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Contact form"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="cf-name">Full Name *</Label>
          <Input
            id="cf-name"
            autoComplete="name"
            placeholder="Your full name"
            {...register('name')}
            className="mt-1.5 bg-white"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
          />
          {errors.name && (
            <p id="cf-name-err" className="text-xs text-red-600 mt-1" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="cf-email">Email Address *</Label>
          <Input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register('email')}
            className="mt-1.5 bg-white"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
          />
          {errors.email && (
            <p id="cf-email-err" className="text-xs text-red-600 mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Organisation + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="cf-org">Organisation</Label>
          <Input
            id="cf-org"
            autoComplete="organization"
            placeholder="Your institution or company"
            {...register('organisation')}
            className="mt-1.5 bg-white"
          />
        </div>
        <div>
          <Label htmlFor="cf-category">Enquiry Type *</Label>
          <Select
            value={watch('enquiryCategory')}
            onValueChange={v => setValue('enquiryCategory', v as EnquiryCategory)}
          >
            <SelectTrigger
              id="cf-category"
              className="mt-1.5 bg-white"
              aria-invalid={!!errors.enquiryCategory}
              aria-describedby={errors.enquiryCategory ? 'cf-cat-err' : undefined}
            >
              <SelectValue placeholder="Select enquiry type" />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(CATEGORY_LABELS) as [EnquiryCategory, string][]).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.enquiryCategory && (
            <p id="cf-cat-err" className="text-xs text-red-600 mt-1" role="alert">
              {errors.enquiryCategory.message}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <Label htmlFor="cf-subject">Subject *</Label>
        <Input
          id="cf-subject"
          placeholder="Brief subject of your enquiry"
          {...register('subject')}
          className="mt-1.5 bg-white"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'cf-subj-err' : undefined}
        />
        {errors.subject && (
          <p id="cf-subj-err" className="text-xs text-red-600 mt-1" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="cf-message">Message *</Label>
        <Textarea
          id="cf-message"
          rows={6}
          placeholder="Please describe your enquiry in detail…"
          {...register('message')}
          className="mt-1.5 bg-white"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-msg-err' : undefined}
        />
        {errors.message && (
          <p id="cf-msg-err" className="text-xs text-red-600 mt-1" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? (
          'Sending…'
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
