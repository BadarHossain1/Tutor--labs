// Clerk v6 compatible middleware for Edge Runtime
// This approach uses environment variables to conditionally apply Clerk middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // Skip static files and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // Public routes that don't need authentication
    const publicRoutes = [
        '/',
        '/about-us',
        '/contact',
        '/pricing',
        '/faqs',
        '/privacy-policy',
        '/terms-and-conditions',
        '/results',
        '/a-level-biology',
        '/a-level-chemistry',
        '/a-level-maths',
        '/private-tutoring',
        '/september-free'
    ];

    // Check if current path is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute) {
        // Check for Clerk session cookies
        const hasClerkSession =
            request.cookies.has('__session') ||
            request.cookies.has('__clerk_db_jwt') ||
            request.cookies.getAll().some(cookie =>
                cookie.name.startsWith('__clerk_') && cookie.value
            );

        if (!hasClerkSession) {
            // Redirect to login if no session found
            url.pathname = '/login';
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }
    }

    // Redirect authenticated users away from auth pages
    const authRoutes = ['/login', '/register'];
    if (authRoutes.includes(pathname)) {
        const hasClerkSession =
            request.cookies.has('__session') ||
            request.cookies.has('__clerk_db_jwt') ||
            request.cookies.getAll().some(cookie =>
                cookie.name.startsWith('__clerk_') && cookie.value
            );

        if (hasClerkSession) {
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files) 
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};