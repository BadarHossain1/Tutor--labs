export const metadata = {
  title: "Private Tutoring | Tutor Lab",
  description: "One-to-one tutoring tailored to you.",
};

export default function PrivateTutoringPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="container mx-auto px-5 py-16 max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">Private Tutoring</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Get matched with an expert tutor for personalised, curriculum-aligned support. Sessions are flexible, online, and focused on building exam confidence.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold">What you get</h2>
            <ul className="mt-4 list-disc pl-5 text-muted-foreground space-y-2">
              <li>1:1 sessions with experienced tutors</li>
              <li>Targeted topic support and exam skills</li>
              <li>Homework help and feedback</li>
              <li>Flexible scheduling</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold">How it works</h2>
            <ol className="mt-4 list-decimal pl-5 text-muted-foreground space-y-2">
              <li>Tell us your goals and exam board</li>
              <li>We match you with a specialist tutor</li>
              <li>Start your first session within a week</li>
            </ol>
          </div>
        </div>
        <a href="/private-tutoring/contact" className="inline-block mt-10 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">Enquire now</a>
      </section>
    </main>
  );
}
