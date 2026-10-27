'use client'

import { usePathname } from 'next/navigation'
import { AdminGuard } from './admin-guard'
import { AdminSidebar } from './admin-sidebar'

/**
 * Wraps all /admin/* pages.
 * - The login page renders its children directly (no guard, no sidebar).
 * - All other admin pages are wrapped in AdminGuard + the sidebar shell.
 */
export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    // Login page is fully standalone — no guard, no sidebar
    return <>{children}</>
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-ivory-100">
        <AdminSidebar />
        <main className="flex-1 min-h-screen lg:ml-56 pt-12 lg:pt-0">
          {children}
        </main>
      </div>
    </AdminGuard>
  )
}
