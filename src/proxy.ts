
import { type NextRequest, NextResponse } from 'next/server'

// Public paths within /admin that must not be protected
const PUBLIC_ADMIN_PATHS = ['/admin/login']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only intercept /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow the login page through
  if (PUBLIC_ADMIN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Check for Firebase session cookie.
  // Because the Firebase JS SDK stores tokens in IndexedDB (not cookies)
  // by default, we check a lightweight "auth-token" cookie that the client
  // sets after login via use-auth-cookie.ts.
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
