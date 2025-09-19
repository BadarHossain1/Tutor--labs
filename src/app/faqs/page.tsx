import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = { title: "FAQs | Tutor Lab" };

export default function FaqsPage() {
  const categories = [
    {
      title: "Membership",
      items: [
        { q: "How does the free trial work?", a: "Start free to preview lessons. After the trial, continue on monthly or annual membership—cancel anytime on monthly." },
        { q: "Is it too late to start?", a: "No. We’ll help you prioritise high-yield topics and exam skills based on your timeline." },
        { q: "How does the subscription work?", a: "You’ll get access to all resources for your selected subjects. Manage your plan in your account." },
      ],
    },
    {
      title: "Subjects & Content",
      items: [
        { q: "Do you cover my exam board?", a: "Yes—AQA, OCR and Edexcel are supported with topic-by-topic videos, quizzes and exam walkthroughs." },
        { q: "Do you have free resources?", a: "We share sample lessons and tips—try the free trial to see inside the course." },
        { q: "What’s the A/A* Guarantee?", a: "Follow our proven method and required practice. If you don’t hit your target, see our Guarantee for what to do next." },
      ],
    },
    {
      title: "Support",
      items: [
        { q: "Do you offer private 1:1 tutoring?", a: "Yes—enquire via Private Tutoring to be matched with a specialist." },
        { q: "How do I ask questions?", a: "Use the Q&A support to get personalised help from expert tutors." },
      ],
    },
  ];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="container mx-auto px-5 py-16 max-w-6xl">
        {/* Hero */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-primary">Frequently asked questions</h1>
          <p className="mt-3 text-muted-foreground">Answers about memberships, content, and support.</p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">{cat.title}</h2>
              <Accordion type="single" collapsible className="mt-4 divide-y rounded-lg border">
                {cat.items.map((f, i) => (
                  <AccordionItem key={i} value={`item-${idx}-${i}`}>
                    <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Still have questions?</h3>
            <p className="text-muted-foreground">We’ll help you find the right option.</p>
          </div>
          <a href="/contact" className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90">Contact us</a>
        </div>
      </section>
    </main>
  );
}
