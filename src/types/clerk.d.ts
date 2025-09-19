declare module "@clerk/nextjs" {
  import * as React from "react";
  export const ClerkProvider: React.FC<{ children?: React.ReactNode }>;
  export const SignIn: React.FC<any>;
  export const SignUp: React.FC<any>;
  export const SignedIn: React.FC<{ children?: React.ReactNode }>;
  export const SignedOut: React.FC<{ children?: React.ReactNode }>;
  export const UserButton: React.FC<any>;
  export function useUser(): { isLoaded: boolean; isSignedIn: boolean; user: any };
}

declare module "@clerk/nextjs/server" {
  // Clerk v6 middleware & server helpers (loose types to avoid version pinning issues)
  export const clerkMiddleware: (
    handler?: (auth: any, req: Request) => any
  ) => any;
  export const createRouteMatcher: (
    routes: string[]
  ) => (req: Request) => boolean;
  export function auth(): Promise<{ userId: string | null; sessionId?: string | null; sessionClaims?: Record<string, unknown> }>;
  export const clerkClient: {
    users: {
      getUser: (userId: string) => Promise<any>;
      updateUser: (userId: string, data: any) => Promise<any>;
    };
  };
}
