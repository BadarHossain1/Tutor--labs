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

	// Check for authentication token in cookies
	const sessionToken = request.cookies.get('__session')?.value ||
		request.cookies.get('__clerk_db_jwt')?.value ||
		request.cookies.get('__clerk_session')?.value;

	// Protected routes
	const protectedRoutes = ['/dashboard'];
	const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

	if (isProtectedRoute && !sessionToken) {
		// Redirect to login if accessing protected route without authentication
		url.pathname = '/login';
		url.searchParams.set('redirect', pathname);
		return NextResponse.redirect(url);
	}

	// Redirect authenticated users away from auth pages
	const authRoutes = ['/login', '/register'];
	const isAuthRoute = authRoutes.includes(pathname);

	if (isAuthRoute && sessionToken) {
		url.pathname = '/dashboard';
		return NextResponse.redirect(url);
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