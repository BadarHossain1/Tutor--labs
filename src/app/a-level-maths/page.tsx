export const metadata = { title: "A Level Maths | Tutor Lab" };

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function MathsPage() {
  const faq = [
    { q: "What exam boards do you cover?", a: "AQA, OCR and Edexcel are supported with topic-by-topic videos and walkthroughs." },
    { q: "Why is Maths priced differently?", a: "It reflects resource scope vs. Biology and Chemistry while still covering the full spec." },
    { q: "Do you offer private tutoring?", a: "Yes—enquire via our Private Tutoring page for 1:1 sessions." },
  ];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-5 pt-16 pb-8 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">A Level Maths</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Master methods and exam technique with concise tutorials and expert-built question walkthroughs.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/register" className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">Start free</Link>
          <Link href="/pricing" className="rounded-md border px-6 py-3 font-semibold hover:bg-accent">See pricing</Link>
        </div>
      </section>

      {/* Spec coverage + stats */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">We cover the entire specification</h2>
          <p className="text-muted-foreground mt-2">Pure, Mechanics and Statistics for AQA • OCR • Edexcel.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Lessons", value: "120+" },
              { label: "Past paper walkthroughs", value: "90+" },
              { label: "Hours of video", value: "20+" },
              { label: "Exam question videos", value: "1000+" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border p-4">
                <div className="text-2xl font-bold text-primary-text">{s.value}</div>
                <div className="text-sm text-secondary-text">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic highlights */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <h2 className="text-2xl font-semibold">Maths topics we train you for</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Algebra", "Calculus", "Trigonometry", "Vectors", "Mechanics", "Statistics"].map((t) => (
            <div key={t} className="rounded-xl border border-border p-6">
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="text-muted-foreground mt-2">Concise walkthroughs and targeted practice.</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-muted-foreground">Try it free, then pick a plan that suits your subjects.</p>
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
            <AccordionItem key={i} value={`m-${i}`}>
              <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
