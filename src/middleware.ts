import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedPaths = ["/dashboard", "/profile", "/courses"];

// Helper function to check if a path is protected
function isProtectedRoute(pathname: string): boolean {
  return protectedPaths.some(path => pathname.startsWith(path));
}

// Helper function to check if Clerk is configured
function hasClerkConfig(): boolean {
  return !!(
    process.env.CLERK_SECRET_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  );
}

// Helper function to check for Clerk session
function hasClerkSession(request: NextRequest): boolean {
  // Common Clerk cookie names
  const clerkCookies = [
    "__session",
    "__clerk_db_jwt",
    `__clerk_db_jwt_${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.split("_")[1]}`,
  ];

  // Check if any Clerk session cookie exists and has a value
  return clerkCookies.some(cookieName => {
    const cookie = request.cookies.get(cookieName);
    return cookie && cookie.value && cookie.value.length > 0;
  });
}

export function middleware(request: NextRequest) {
  // Bypass auth entirely if Clerk isn't configured
  if (!hasClerkConfig()) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  // Check if the current path is protected
  if (isProtectedRoute(pathname)) {
    // Check for Clerk session
    if (!hasClerkSession(request)) {
      const url = new URL("/login", request.url);
      const redirectParam = encodeURIComponent(pathname + search);
      url.searchParams.set("redirect", redirectParam);
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
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
