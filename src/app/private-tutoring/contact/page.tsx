import type { Metadata } from "next";
import PrivateTutoringForm from "@/components/contact/PrivateTutoringForm";

export const metadata: Metadata = {
  title: "Private Tutoring Contact | Tutor Lab",
};

export default function PrivateTutoringContactPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="container mx-auto px-5 py-16 max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">Tell us about your tutoring needs</h1>
        <p className="mt-3 text-muted-foreground">This goes to our team—expect a quick reply.</p>
        <div className="mt-10">
          <PrivateTutoringForm />
        </div>
      </section>
    </main>
  );
}
