import { updateSession } from '@/utils/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Update Supabase session for every request
  const { response, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  const guestRoutes = ['/auth/signin']
  const homeRoute = '/'

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isGuest = guestRoutes.some(route => pathname.startsWith(route))

  if (!user && pathname === homeRoute) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  } else if (user && pathname === homeRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users away from protected routes
  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/signin'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from guest-only routes
  if (user && isGuest) {
    const redirectTo = request.nextUrl.searchParams.get('redirectTo')
    const url = request.nextUrl.clone()
    url.pathname = redirectTo ?? '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}