import PricingSection from "@/components/sections/pricing";

export const metadata = {
  title: "Pricing | Tutor Lab",
  description: "Membership pricing for Biology, Chemistry, and Maths.",
};

export default function PricingPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="container mx-auto px-5 py-12">
        <h1 className="sr-only">Pricing</h1>
        <PricingSection />
      </div>
    </main>
  );
}
