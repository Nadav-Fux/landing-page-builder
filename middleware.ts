import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuthenticated = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
                       req.nextUrl.pathname.startsWith("/register")
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")
    const isPublicRoute = req.nextUrl.pathname === "/" ||
                         req.nextUrl.pathname.startsWith("/_next") ||
                         req.nextUrl.pathname.startsWith("/favicon") ||
                         req.nextUrl.pathname.startsWith("/static")

    // If it's an API route, let it through (API will handle auth)
    if (isApiRoute) {
      return NextResponse.next()
    }

    // If it's a public route, let it through
    if (isPublicRoute) {
      return NextResponse.next()
    }

    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (isAuthenticated && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // If user is not authenticated and tries to access protected routes, redirect to login
    if (!isAuthenticated && !isAuthPage) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")
        const isPublicRoute = pathname === "/" ||
                             pathname.startsWith("/_next") ||
                             pathname.startsWith("/favicon") ||
                             pathname.startsWith("/static")

        // Allow public routes
        if (isPublicRoute) {
          return true
        }

        // Allow auth pages (they will handle their own redirects)
        if (isAuthPage) {
          return true
        }

        // Require authentication for all other routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}