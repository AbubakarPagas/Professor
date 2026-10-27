'use client'

import { useState } from 'react'
import { Mail, MailOpen, Trash2, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  getContactMessages, deleteContactMessage, markMessageRead, updateContactStatus,
} from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { toast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/utils'
import type { ContactMessage, ContactStatus, EnquiryCategory } from '@/types'

const STATUS_COLOUR: Record<ContactStatus, string> = {
  new:      'bg-gold-100 text-gold-700',
  read:     'bg-gray-100 text-gray-600',
  replied:  'bg-emerald-100 text-emerald-700',
  archived: 'bg-slate-100 text-slate-500',
}

const CATEGORY_LABEL: Record<EnquiryCategory, string> = {
  speaking:              'Speaking Engagement',
  mentorship:            'Mentorship',
  research_collaboration: 'Research Collaboration',
  institutional:         'Institutional',
  media:                 'Media',
  general:               'General',
}

export default function AdminMessagesPage() {
  const { data: messages, loading, reload } = useFirestoreData(getContactMessages)
  const [viewing, setViewing] = useState<ContactMessage | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const openMsg = async (msg: ContactMessage) => {
    setViewing(msg)
    if (!msg.read) {
      await markMessageRead(msg.id)
      reload()
    }
  }

  const handleStatusChange = async (id: string, status: ContactStatus) => {
    await updateContactStatus(id, status)
    toast({ title: 'Status updated', variant: 'success' as never })
    reload()
    if (viewing?.id === id) {
      setViewing(prev => prev ? { ...prev, status, read: status !== 'new' } : prev)
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleting(true)
    try {
      await deleteContactMessage(confirmDelete)
      if (viewing?.id === confirmDelete) setViewing(null)
      setConfirmDelete(null)
      toast({ title: 'Enquiry deleted', variant: 'success' as never })
      reload()
    } catch {
      toast({ title: 'Delete failed', variant: 'destructive' })
    } finally {
      setDeleting(false)
    }
  }

  const unread = (messages ?? []).filter(m => !m.read).length

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-serif font-bold text-navy-800 text-xl">Contact Enquiries</h1>
        {unread > 0 && (
          <Badge className="bg-red-500 text-white" aria-label={`${unread} unread`}>
            {unread} unread
          </Badge>
        )}
      </div>

      {loading ? (
        <div className="space-y-3" aria-busy="true" aria-label="Loading enquiries">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-ivory-200 animate-pulse" />
          ))}
        </div>
      ) : !messages?.length ? (
        <div className="py-20 text-center text-charcoal/50" role="status">
          <Mail className="h-10 w-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
          <p className="text-sm">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-2" role="list" aria-label="Enquiry list">
          {messages.map(msg => (
            <div
              key={msg.id}
              role="listitem"
              className={`card-base p-4 flex items-start gap-4 cursor-pointer hover:border-gold-300 transition-all ${
                msg.status === 'new' ? 'border-l-4 border-l-gold-400' : ''
              }`}
            >
              <button
                className="flex items-start gap-4 flex-1 text-left min-w-0"
                onClick={() => openMsg(msg)}
                aria-label={`Open enquiry from ${msg.name}`}
              >
                <div className={`mt-0.5 flex-shrink-0 ${msg.read ? 'text-charcoal/40' : 'text-gold-500'}`}>
                  {msg.read
                    ? <MailOpen className="h-4 w-4" aria-hidden="true" />
                    : <Mail className="h-4 w-4" aria-hidden="true" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-semibold text-navy-700 text-sm">{msg.name}</span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLOUR[msg.status]}`}>
                      {msg.status}
                    </span>
                    {msg.enquiryCategory && (
                      <span className="text-[10px] text-charcoal/40 font-medium">
                        {CATEGORY_LABEL[msg.enquiryCategory]}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal/45 mb-0.5">{msg.email}</p>
                  <p className="text-sm font-medium text-charcoal/70 truncate">{msg.subject}</p>
                  <p className="text-xs text-charcoal/45 truncate">{msg.message}</p>
                </div>
              </button>
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-xs text-charcoal/40 whitespace-nowrap">
                  {formatDate(msg.createdAt)}
                </span>
                <button
                  onClick={() => setConfirmDelete(msg.id)}
                  className="text-red-400 hover:text-red-600 p-1 rounded transition-colors"
                  aria-label={`Delete enquiry from ${msg.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View dialog */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        {viewing && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">{viewing.subject}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2 text-xs text-charcoal/55 bg-ivory-100 rounded-md p-3">
                <div><strong>From:</strong> {viewing.name}</div>
                <div><strong>Email:</strong> {viewing.email}</div>
                {viewing.organisation && (
                  <div className="col-span-2"><strong>Organisation:</strong> {viewing.organisation}</div>
                )}
                {viewing.enquiryCategory && (
                  <div><strong>Category:</strong> {CATEGORY_LABEL[viewing.enquiryCategory]}</div>
                )}
                <div><strong>Received:</strong> {formatDate(viewing.createdAt)}</div>
              </div>

              <div className="border-t border-ivory-300 pt-3">
                <p className="whitespace-pre-wrap text-charcoal/80 leading-relaxed text-sm">
                  {viewing.message}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal/60 block mb-1.5">
                  Update Status
                </label>
                <Select
                  value={viewing.status}
                  onValueChange={v => handleStatusChange(viewing.id, v as ContactStatus)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => { setConfirmDelete(viewing.id); setViewing(null) }}
              >
                <Trash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" /> Delete
              </Button>
              <Button asChild size="sm">
                <a href={`mailto:${viewing.email}?subject=Re: ${encodeURIComponent(viewing.subject)}`}>
                  Reply by Email
                </a>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Enquiry?</DialogTitle>
            <DialogDescription>
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting} aria-busy={deleting}>
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
