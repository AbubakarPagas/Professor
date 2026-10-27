'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, UserPlus, AlertTriangle } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/admin/data-table'
import { getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser, createAuditLog } from '@/lib/firestore'
import { useFirestoreData } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/utils'
import type { AdminUser, UserRole } from '@/types'

const addSchema = z.object({
  uid:         z.string().min(10, 'Firebase UID is required (from Firebase Console > Authentication)'),
  email:       z.string().email(),
  displayName: z.string().optional(),
  role:        z.enum(['superadmin', 'editor', 'readonly']),
  active:      z.boolean().default(true),
})

const editSchema = z.object({
  displayName: z.string().optional(),
  role:        z.enum(['superadmin', 'editor', 'readonly']),
  active:      z.boolean().default(true),
})

type AddFormData  = z.infer<typeof addSchema>
type EditFormData = z.infer<typeof editSchema>

const ROLE_COLOUR: Record<UserRole, string> = {
  superadmin: 'bg-purple-100 text-purple-700',
  editor:     'bg-blue-100 text-blue-700',
  readonly:   'bg-gray-100 text-gray-600',
}

const ROLE_DESCRIPTION: Record<UserRole, string> = {
  superadmin: 'Full access including user management and site settings',
  editor:     'Can create, edit, publish and delete all content',
  readonly:   'Can view admin dashboard and read data only',
}

export default function AdminUsersPage() {
  const { data: users, loading, reload } = useFirestoreData(getAdminUsers)
  const { user: currentUser, isSuperAdmin, role: currentRole } = useAuth()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<AdminUser | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<AdminUser | null>(null)
  const [deleting, setDeleting] = useState(false)

  const addForm = useForm<AddFormData>({
    resolver: zodResolver(addSchema),
    defaultValues: { role: 'editor', active: true },
  })

  const editForm = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
  })

  // Only superadmin can manage users
  if (!isSuperAdmin) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 py-16 justify-center text-charcoal/40">
          <Shield className="h-8 w-8 opacity-40" aria-hidden="true" />
          <div>
            <p className="font-semibold text-navy-700">Access Restricted</p>
            <p className="text-sm">Only superadmins can manage user accounts.</p>
          </div>
        </div>
      </div>
    )
  }

  const onAdd = async (form: AddFormData) => {
    try {
      // Prevent privilege escalation: only superadmin can create superadmin
      if (form.role === 'superadmin' && currentRole !== 'superadmin') {
        toast({ title: 'Access denied', description: 'Only superadmins can grant superadmin role.', variant: 'destructive' })
        return
      }
      await createAdminUser(form as Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>)
      await createAuditLog({
        actorUid:    currentUser!.uid,
        actorEmail:  currentUser!.email!,
        action:      'create',
        collection:  'adminUsers',
        documentId:  form.uid,
        documentTitle: form.email,
        details:     `Role: ${form.role}`,
      })
      toast({ title: 'Admin user added', variant: 'success' as never })
      setAddOpen(false)
      addForm.reset({ role: 'editor', active: true })
      reload()
    } catch (err) {
      toast({ title: 'Error', description: String(err), variant: 'destructive' })
    }
  }

  const onEdit = async (form: EditFormData) => {
    if (!editing) return
    try {
      // Prevent privilege escalation
      if (form.role === 'superadmin' && currentRole !== 'superadmin') {
        toast({ title: 'Access denied', variant: 'destructive' })
        return
      }
      // Prevent removing own superadmin role
      if (editing.uid === currentUser?.uid && form.role !== 'superadmin') {
        toast({
          title: 'Cannot demote yourself',
          description: 'Ask another superadmin to change your role.',
          variant: 'destructive',
        })
        return
      }
      await updateAdminUser(editing.uid, form)
      await createAuditLog({
        actorUid:    currentUser!.uid,
        actorEmail:  currentUser!.email!,
        action:      'role_change',
        collection:  'adminUsers',
        documentId:  editing.uid,
        documentTitle: editing.email,
        details:     `Role changed to: ${form.role}`,
      })
      toast({ title: 'User updated', variant: 'success' as never })
      setEditing(null)
      reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    if (confirmDelete.uid === currentUser?.uid) {
      toast({ title: 'Cannot delete your own account', variant: 'destructive' })
      setConfirmDelete(null)
      return
    }
    setDeleting(true)
    try {
      await deleteAdminUser(confirmDelete.uid)
      await createAuditLog({
        actorUid:    currentUser!.uid,
        actorEmail:  currentUser!.email!,
        action:      'delete',
        collection:  'adminUsers',
        documentId:  confirmDelete.uid,
        documentTitle: confirmDelete.email,
      })
      toast({ title: 'User removed', variant: 'success' as never })
      setConfirmDelete(null)
      reload()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-charcoal/40" aria-hidden="true" />
          <h1 className="font-serif font-bold text-navy-800 text-xl">Administrators</h1>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <UserPlus className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Add Admin
        </Button>
      </div>

      {/* Role legend */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.entries(ROLE_DESCRIPTION) as [UserRole, string][]).map(([role, desc]) => (
          <Card key={role} className="border-l-4 border-l-navy-300">
            <CardContent className="p-3">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize mb-1 ${ROLE_COLOUR[role]}`}>
                {role}
              </span>
              <p className="text-xs text-charcoal/60">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataTable
        title=""
        data={users ?? []}
        loading={loading}
        searchKeys={['email', 'displayName']}
        onEdit={u => {
          editForm.reset({ role: u.role, displayName: u.displayName ?? '', active: u.active })
          setEditing(u)
        }}
        onDelete={id => {
          const u = users?.find(x => x.id === id)
          if (u) setConfirmDelete(u)
          return Promise.resolve()
        }}
        columns={[
          {
            key: 'email',
            header: 'Email',
            render: row => (
              <div>
                <p className="font-medium text-navy-700">{row.email}</p>
                {row.displayName && <p className="text-xs text-charcoal/50">{row.displayName}</p>}
              </div>
            ),
          },
          {
            key: 'role',
            header: 'Role',
            render: row => (
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROLE_COLOUR[row.role]}`}>
                {row.role}
              </span>
            ),
            className: 'w-28',
          },
          {
            key: 'active',
            header: 'Status',
            render: row => (
              <span className={row.active ? 'text-emerald-600 font-medium text-sm' : 'text-red-500 text-sm'}>
                {row.active ? 'Active' : 'Disabled'}
              </span>
            ),
            className: 'w-20',
          },
          {
            key: 'createdAt',
            header: 'Added',
            render: row => <span className="text-charcoal/40 text-xs">{formatDate(row.createdAt)}</span>,
            className: 'w-32',
          },
        ]}
      />

      {/* Add user dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">Add Administrator</DialogTitle>
            <DialogDescription>
              The user must already have a Firebase Auth account. Copy their UID from
              the Firebase Console → Authentication → Users.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={addForm.handleSubmit(onAdd)} className="space-y-4">
            <div>
              <Label htmlFor="u-uid">Firebase UID *</Label>
              <Input id="u-uid" {...addForm.register('uid')} className="mt-1 font-mono text-xs"
                placeholder="abc123XYZ789…" />
              {addForm.formState.errors.uid && (
                <p className="text-xs text-destructive mt-1">{addForm.formState.errors.uid.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="u-email">Email Address *</Label>
              <Input id="u-email" type="email" {...addForm.register('email')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="u-name">Display Name</Label>
              <Input id="u-name" {...addForm.register('displayName')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="u-role">Role *</Label>
              <Select
                value={addForm.watch('role')}
                onValueChange={v => addForm.setValue('role', v as UserRole)}
              >
                <SelectTrigger id="u-role" className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="readonly">Read-only</SelectItem>
                  <SelectItem value="superadmin">Superadmin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input id="u-active" type="checkbox" {...addForm.register('active')} className="h-4 w-4" />
              <Label htmlFor="u-active" className="cursor-pointer">Active account</Label>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={addForm.formState.isSubmitting}>
                {addForm.formState.isSubmitting ? 'Adding…' : 'Add Administrator'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit role dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        {editing && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">Edit: {editing.email}</DialogTitle>
            </DialogHeader>
            <form onSubmit={editForm.handleSubmit(onEdit)} className="space-y-4">
              <div>
                <Label>Display Name</Label>
                <Input {...editForm.register('displayName')} className="mt-1" />
              </div>
              <div>
                <Label>Role *</Label>
                <Select
                  value={editForm.watch('role')}
                  onValueChange={v => editForm.setValue('role', v as UserRole)}
                >
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="readonly">Read-only</SelectItem>
                    <SelectItem value="superadmin">Superadmin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <input id="eu-active" type="checkbox" {...editForm.register('active')} className="h-4 w-4" />
                <Label htmlFor="eu-active" className="cursor-pointer">Active account</Label>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setEditing(null)}>Cancel</Button>
                <Button type="submit" disabled={editForm.formState.isSubmitting}>
                  {editForm.formState.isSubmitting ? 'Saving…' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              Remove Administrator?
            </DialogTitle>
            <DialogDescription>
              This will revoke <strong>{confirmDelete?.email}</strong>&apos;s admin access. Their
              Firebase Auth account will not be deleted — only their admin record.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting} aria-busy={deleting}>
              {deleting ? 'Removing…' : 'Remove Access'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
