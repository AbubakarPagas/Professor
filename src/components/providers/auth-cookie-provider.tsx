'use client'

import { useAuthCookie } from '@/hooks/use-auth-cookie'

/**
 * Client wrapper that activates the auth cookie hook.
 * Placed just inside AuthProvider in the root layout.
 */
export function AuthCookieProvider({ children }: { children: React.ReactNode }) {
  useAuthCookie()
  return <>{children}</>
}
