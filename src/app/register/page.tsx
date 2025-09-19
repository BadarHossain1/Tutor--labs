import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
const CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export const metadata: Metadata = {
  title: "Register | Tutor Lab",
};

export default function RegisterPage() {
  return (
    <main className="container py-14">
      <div className="mx-auto max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-light">Create your <span className="text-primary font-semibold">Tutor Lab</span> account</h1>
        <p className="mt-2 text-muted-foreground">Start your free trial and track your progress.</p>
      </div>
      {CLERK_ENABLED ? (
        <div className="mx-auto max-w-md rounded-lg bg-card p-6 shadow flex justify-center">
          <SignUp appearance={{ elements: { footer: "hidden" } }} routing="hash" signInUrl="/login" />
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-lg bg-card p-6 shadow text-center">
          <p className="text-muted-foreground">
            Registration is temporarily unavailable. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env to enable authentication.
          </p>
        </div>
      )}
    </main>
  );
}