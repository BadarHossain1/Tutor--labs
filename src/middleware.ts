import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/courses(.*)",
]);

const hasClerk = !!process.env.CLERK_SECRET_KEY && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default clerkMiddleware(async (auth, req) => {
  // Bypass auth entirely if Clerk isn't configured
  if (!hasClerk) {
    return NextResponse.next();
  }

  const url = new URL(req.url);

  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const redirect = encodeURIComponent(url.pathname + (url.search || ""));
      return NextResponse.redirect(new URL(`/login?redirect=${redirect}`, url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
