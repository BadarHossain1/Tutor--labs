export const metadata = {
  title: "September Free | Tutor Lab",
  description: "Kick off your studies with a free September offer.",
};

export default function SeptemberFreePage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="container mx-auto px-5 py-16 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">September Free</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Join now and get September for free. Explore lessons, quizzes, and exam prep with no commitment.
        </p>
        <a href="/register" className="inline-block mt-10 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">Try for free</a>
      </section>
    </main>
  );
}
