/**
 * Next.js Edge Middleware — server-side admin route protection.
 *
 * This adds a first layer of defence at the edge: admin routes will
 * return a redirect to /admin/login for any request that does not
 * carry a Firebase session cookie.
 *
 * NOTE: Full authorisation is enforced by Firestore Security Rules.
 * This middleware prevents direct URL access only and is NOT a
 * substitute for server-side Firebase token verification on sensitive
 * write operations.
 *
 * The login page itself and static assets are explicitly allowed through.
 */

import { type NextRequest, NextResponse } from 'next/server'

// Public paths within /admin that must not be protected
const PUBLIC_ADMIN_PATHS = ['/admin/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only intercept /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow the login page and Next.js internals
  if (PUBLIC_ADMIN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Check for Firebase session cookie (__session is the standard name
  // used by Firebase Hosting / SDKs; adjust the cookie name if you
  // implement custom session cookies via Firebase Admin SDK).
  //
  // Because the Firebase JS SDK stores tokens in IndexedDB (not cookies)
  // by default, we fall back to checking a lightweight "auth-token"
  // cookie that the client sets after login via a custom hook.
  const sessionCookie =
    request.cookies.get('__session')?.value ||
    request.cookies.get('auth-token')?.value

  if (!sessionCookie) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
