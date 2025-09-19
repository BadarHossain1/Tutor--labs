import HeroSection from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats";
import TutorsSection from "@/components/sections/tutors";
import Testimonials from "@/components/sections/testimonials";
import Features from "@/components/sections/features";
import ReviewsSection from "@/components/sections/reviews";
import UniversitiesSection from "@/components/sections/universities";
import PricingSection from "@/components/sections/pricing";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <StatsSection />
        <TutorsSection />
        <Testimonials />
        <Features />
        <ReviewsSection />
        <UniversitiesSection />
        <PricingSection />
      </main>
    </div>
  );
}