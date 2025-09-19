// Alternative: Minimal middleware approach
// This lets Clerk handle auth at the component level instead of middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Only handle static file exclusions and let Clerk handle auth in components
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.includes('.') ||
		pathname === '/favicon.ico'
	) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};