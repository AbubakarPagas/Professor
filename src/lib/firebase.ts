import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// initializeApp just stores config — safe at module level in any context.
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

// ─── Lazy service singletons ──────────────────────────────────────────────────
// getAuth / getFirestore / getStorage are only called inside the getters below,
// NOT at module level. This means importing this file is safe during SSR / build
// — the Firebase Auth SDK only initializes when a getter is first called (which
// happens in client components via useEffect, never during prerendering).

let _auth: Auth | null = null
export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(app)
  return _auth
}

let _db: Firestore | null = null
export function getFirebaseDb(): Firestore {
  if (!_db) _db = getFirestore(app)
  return _db
}

let _storage: FirebaseStorage | null = null
export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) _storage = getStorage(app)
  return _storage
}

export default app
