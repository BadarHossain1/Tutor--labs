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
		pathname === '/favicon.ico' ||
		pathname.startsWith('/public')
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

	// Check for Clerk session cookies - improved detection
	const hasClerkSession =
		request.cookies.has('__session') ||
		request.cookies.has('__clerk_db_jwt') ||
		request.cookies.getAll().some(cookie =>
			cookie.name.startsWith('__clerk_') && cookie.value && cookie.value.length > 10
		);

	// Protected routes that require authentication
	const protectedRoutes = ['/dashboard'];
	const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

	if (isProtectedRoute && !hasClerkSession) {
		// Redirect to login if accessing protected route without authentication
		url.pathname = '/login';
		url.searchParams.set('redirect', pathname);
		return NextResponse.redirect(url);
	}

	// Redirect authenticated users away from auth pages
	const authRoutes = ['/login', '/register'];
	const isAuthRoute = authRoutes.includes(pathname);

	if (isAuthRoute && hasClerkSession) {
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