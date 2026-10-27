'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface AdminGuardProps {
  children: React.ReactNode
  /** If true, only superadmin can access */
  superAdminOnly?: boolean
  /** If true, superadmin or editor can access (default) */
  editorOrAbove?: boolean
}

export function AdminGuard({
  children,
  superAdminOnly = false,
  editorOrAbove = false,
}: AdminGuardProps) {
  const { user, loading, isAdmin, isSuperAdmin, canEdit } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user || !isAdmin) {
      router.replace('/admin/login')
      return
    }

    if (superAdminOnly && !isSuperAdmin) {
      router.replace('/admin')
      return
    }
  }, [user, loading, isAdmin, isSuperAdmin, canEdit, router, superAdminOnly, editorOrAbove])

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 animate-pulse">
            <GraduationCap className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <p className="text-white/70 text-sm" aria-live="polite">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) return null
  if (superAdminOnly && !isSuperAdmin) return null

  return <>{children}</>
}
