export const metadata = { title: "Predicted Papers | Tutor Lab" };

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PredictedPapersPage() {
  const faq = [
    { q: "How accurate are your predicted papers?", a: "They’re data-informed and exam-style, but no prediction can be 100% certain—use them alongside full-topic revision." },
    { q: "How should I use them?", a: "Sit under timed conditions, mark with the scheme, and revise weak areas using our tutorials and question packs." },
    { q: "Do you have AS as well as A Level?", a: "We focus on the A Level spec; check the library for available sets." },
  ];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-5 pt-16 pb-8 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">Unmatched prediction accuracy</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          A Level Predicted Papers for Biology and Chemistry grounded in past-paper analysis—not guesswork.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/pricing" className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">Enroll to access</Link>
          <Link href="/about-us/guarantee" className="rounded-md border px-6 py-3 font-semibold hover:bg-accent">A/A* Guarantee</Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-4">
          {["Board-specific styling","High match to real papers","Mark schemes included","Use with topic videos"].map((t, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Train exam technique and prioritise high-yield topics.</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it’s built */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <h2 className="text-2xl font-semibold">How our predictions are built</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { step: 1, text: "We break down past papers into specific topics and skills." },
            { step: 2, text: "We analyse the data to identify patterns and weightings." },
            { step: 3, text: "We assemble realistic papers that mirror likely structures." },
          ].map((s) => (
            <div key={s.step} className="rounded-xl border border-border bg-card p-6">
              <div className="text-sm text-secondary-text">Step {s.step}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Get a competitive edge</h3>
            <p className="text-muted-foreground">Start a membership to access Predicted Papers and exam training resources.</p>
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
            <AccordionItem key={i} value={`p-${i}`}>
              <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
