export const metadata = { title: "A Level Biology | Tutor Lab" };

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BiologyPage() {
  const faq = [
    { q: "How is this different from a private tutor?", a: "You get structured courses plus real tutor support, so you can learn content and master exam technique at your own pace." },
    { q: "Do you cover my exam board?", a: "Yes—AQA, OCR and Edexcel are fully supported across topics and skills." },
    { q: "Will I get help when I’m stuck?", a: "Absolutely. Ask questions and get personalised guidance from expert tutors." },
  ];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-5 pt-16 pb-8 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">A Level Biology</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Learn the content and master exam technique with expert-built tutorials, exam training resources and supportive Q&A.
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
          <p className="text-muted-foreground mt-2">Topic-by-topic videos, exam walkthroughs and quizzes for the major exam boards.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Lessons", value: "200+" },
              { label: "Quiz questions", value: "1,500+" },
              { label: "Hours of video", value: "30+" },
              { label: "Exam paper videos", value: "300+" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border p-4">
                <div className="text-2xl font-bold text-primary-text">{s.value}</div>
                <div className="text-sm text-secondary-text">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-muted-foreground">Exam boards: AQA • OCR • Edexcel</div>
        </div>
      </section>

      {/* Tutor support */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <h2 className="text-2xl font-semibold">Personalised tutor support</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            { title: "1:1 Q&A", desc: "Ask anything—get clear, tailored answers when you’re stuck." },
            { title: "Class recordings", desc: "Learn from expert-led sessions focused on exam skills." },
            { title: "Study plans", desc: "Know what to do next with actionable weekly guidance." },
          ].map((b) => (
            <div key={b.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subject highlights */}
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <h2 className="text-2xl font-semibold">Biology topics we train you for</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Cells", "Genetics", "Energy", "Homeostasis", "Ecology", "Required Practicals"].map((t) => (
            <div key={t} className="rounded-xl border border-border p-6">
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="text-muted-foreground mt-2">Concise video lessons and exam-focused practice.</p>
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
            <AccordionItem key={i} value={`b-${i}`}>
              <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
