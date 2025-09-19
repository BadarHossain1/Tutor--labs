export const metadata = { title: "A/A* Guarantee | Tutor Lab" };

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GuaranteePage() {
  const faq = [
    { q: "Which subjects are covered?", a: "Biology and Chemistry memberships are covered. Maths is excluded." },
    { q: "How do I qualify?", a: "Complete the required number of past papers using our method over a set period and maintain an active membership." },
    { q: "How do I claim?", a: "Submit your first-choice uni offer and your final grade within the claim window after Results Day." },
  ];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-5 pt-16 pb-8 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">A/A* guaranteed or your money back</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">Get the grade for your first choice university using our proven method.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/register" className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">Start free</Link>
          <Link href="/pricing" className="rounded-md border px-6 py-3 font-semibold hover:bg-accent">See pricing</Link>
        </div>
      </section>

      {/* Key info */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Subjects", desc: "Biology & Chemistry memberships are eligible." },
            { title: "How to qualify", desc: "Follow the TT method and complete the required practice over 9+ weeks." },
            { title: "Claim window", desc: "Submit your claim with evidence after Results Day within the deadline." },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <h2 className="text-2xl font-semibold">Our guarantee is simple</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            "Start a paid membership (Bio/Chem)",
            "Complete required past papers",
            "Receive a first-choice uni offer",
            "Submit a refund claim",
          ].map((t, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <div className="text-sm text-secondary-text">Step {i + 1}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Start your path to an A/A*</h3>
            <p className="text-muted-foreground">Join now and follow the proven method to maximise exam results.</p>
          </div>
          <div className="flex gap-3">
            <Link className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90" href="/pricing">See pricing</Link>
            <Link className="rounded-md border px-6 py-3 font-semibold hover:bg-accent" href="/register">Start free</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-5 pb-16 max-w-5xl">
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-4 divide-y rounded-lg border">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`g-${i}`}>
              <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
