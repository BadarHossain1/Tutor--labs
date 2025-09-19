export const metadata = { title: "Parents & Tuition | Tutor Lab" };

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TuitionPage() {
  const faq = [
    { q: "Can I see an example of the course?", a: "Yes—preview lessons and past paper walkthroughs are available inside the trial." },
    { q: "Do you provide an inclusive environment for SEN students?", a: "We aim to support different learning needs with concise lessons and step-by-step guidance." },
    { q: "Do you offer private tutoring?", a: "Yes—enquire to be matched with a specialist tutor for 1:1 sessions." },
  ];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-5 pt-16 pb-8 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">Top grades & exam confidence</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">Video tutorials, exam training and 1:1 support for A Level students.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/pricing" className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">Start free</Link>
          <Link href="/private-tutoring/contact" className="rounded-md border px-6 py-3 font-semibold hover:bg-accent">Private tutoring</Link>
        </div>
      </section>

      {/* Value props */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {["Structured content","Progress tracking","Expert Q&A"].map((t, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Everything needed to build confidence and consistently improve.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tutor cards */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <h2 className="text-2xl font-semibold">Learn from the best tutors</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { name: "Biology", desc: "Expert-led biology with exam technique training." },
            { name: "Chemistry", desc: "Clear explanations and deep exam prep." },
            { name: "Maths", desc: "Examiner-built tutorials and walkthroughs." },
          ].map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-4 flex gap-2">
                <Link href={`/a-level-${t.name.toLowerCase()}`} className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent">Explore</Link>
                <Link href="/private-tutoring/contact" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Private Tutoring</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Still have questions?</h3>
            <p className="text-muted-foreground">We’re happy to help you choose the best option for your child.</p>
          </div>
          <div className="flex gap-3">
            <Link className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90" href="/contact">Contact us</Link>
            <Link className="rounded-md border px-6 py-3 font-semibold hover:bg-accent" href="/pricing">See pricing</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-5 pb-16 max-w-5xl">
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-4 divide-y rounded-lg border">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`t-${i}`}>
              <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
