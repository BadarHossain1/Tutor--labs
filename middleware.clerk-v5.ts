// Alternative middleware using Clerk v5 approach (if you want to switch back)
// This uses the newer authMiddleware which is more Edge Runtime compatible

import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    // Routes that can be visited while signed out
    publicRoutes: [
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
        '/september-free',
        '/api/contact',
        '/api/stripe/webhook'
    ],
    // Routes that can always be visited, even without authentication
    ignoredRoutes: [
        '/api/stripe/webhook',
        '/_next',
        '/favicon.ico'
    ]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};