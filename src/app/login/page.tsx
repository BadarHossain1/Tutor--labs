import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
const CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export const metadata: Metadata = {
  title: "Login | Tutor Lab",
};

export default function LoginPage() {
  return (
    <main className="container py-14">
      <div className="mx-auto max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-light">Welcome back to <span className="text-primary font-semibold">Tutor Lab</span></h1>
        <p className="mt-2 text-muted-foreground">Log in to continue your learning journey.</p>
      </div>
      {CLERK_ENABLED ? (
        <div className="mx-auto max-w-md rounded-lg bg-card p-6 shadow flex justify-center">
          <SignIn appearance={{ elements: { footer: "hidden" } }} routing="hash" signUpUrl="/register" />
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-lg bg-card p-6 shadow text-center">
          <p className="text-muted-foreground">
            Login is temporarily unavailable. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env to enable authentication.
          </p>
        </div>
      )}
    </main>
  );
}