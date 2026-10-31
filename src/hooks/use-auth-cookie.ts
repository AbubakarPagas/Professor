'use client'

/**
 * Keeps a lightweight cookie in sync with Firebase Auth state
 * so the edge middleware can gate admin routes server-side.
 *
 * The cookie does NOT store the ID token – it is only a presence
 * signal so the middleware can redirect unauthenticated users
 * before React hydrates.  Actual authorisation is enforced by
 * Firestore Security Rules.
 */

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'

const COOKIE_NAME = 'auth-token'
const COOKIE_MAX_AGE = 60 * 60 // 1 hour (Firebase ID tokens expire after 1h)

export function useAuthCookie() {
  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // Refresh the token and store only a flag value; the actual
        // token lives in IndexedDB and is never exposed in a cookie.
        try {
          await user.getIdToken(/* forceRefresh= */ true)
        } catch {
          // Ignore token refresh errors; the cookie will expire anyway
        }
        document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
      } else {
        // Remove the cookie on sign-out
        document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
      }
    })
    return unsubscribe
  }, [])
}
