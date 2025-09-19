import ContactForm from "@/components/contact/ContactForm";

export const metadata = { title: "Contact | Tutor Lab" };

export default function ContactPage() {
  // Server Component: renders layout and metadata; interactive form is a Client Component
  // moved to components/contact/ContactForm to keep metadata support intact.

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="container mx-auto px-5 py-16 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">Contact</h1>
        <p className="mt-6 text-lg text-muted-foreground">Questions or feedback? Reach out and we’ll get back to you.</p>
        <ContactForm />
      </section>
    </main>
  );
}
