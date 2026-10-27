'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'
import { getAdminUserByUid } from './firestore'
import type { AdminUser, UserRole } from '@/types'

interface AuthContextType {
  user: User | null
  adminUser: AdminUser | null
  loading: boolean
  /** True if the user is any kind of admin (superadmin | editor | readonly) */
  isAdmin: boolean
  /** True only for superadmin */
  isSuperAdmin: boolean
  /** True for superadmin or editor */
  canEdit: boolean
  role: UserRole | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshAdminUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  const loadAdminUser = async (u: User) => {
    try {
      const admin = await getAdminUserByUid(u.uid)
      setAdminUser(admin)
    } catch {
      setAdminUser(null)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async u => {
      setUser(u)
      if (u) {
        await loadAdminUser(u)
      } else {
        setAdminUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    await loadAdminUser(cred.user)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
    setAdminUser(null)
  }

  const refreshAdminUser = async () => {
    if (user) await loadAdminUser(user)
  }

  // An admin is any user with a valid, active record in the adminUsers collection.
  // Fallback: if NEXT_PUBLIC_ADMIN_EMAIL is set and matches, treat as superadmin
  // (useful before the first adminUsers document is created).
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? ''
  const isFallbackAdmin = !!user && !!ADMIN_EMAIL && user.email === ADMIN_EMAIL

  const isAdmin = !!(adminUser?.active) || isFallbackAdmin
  const role: UserRole | null = adminUser?.role ?? (isFallbackAdmin ? 'superadmin' : null)
  const isSuperAdmin = role === 'superadmin'
  const canEdit = role === 'superadmin' || role === 'editor'

  return (
    <AuthContext.Provider
      value={{
        user,
        adminUser,
        loading,
        isAdmin,
        isSuperAdmin,
        canEdit,
        role,
        signIn,
        signOut,
        refreshAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
