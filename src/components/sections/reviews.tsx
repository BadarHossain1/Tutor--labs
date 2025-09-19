import Image from "next/image";
import { cn } from "@/lib/utils";

type Review = {
  platform: "Facebook" | "Google" | "Trustpilot";
  text: string;
  name: string;
};

const reviewsData: Review[] = [
  { platform: "Facebook", text: "I never expected to feel this relaxed for exams! Everything was prepared.", name: "Devina" },
  { platform: "Google", text: "I literally went from a grade E to an A in a matter of months and ended up with the best grade out of everyone in my A Level class.", name: "Stephanie Bugler" },
  { platform: "Facebook", text: "Tutor Lab is 100% the best way to take control and get the grades you want.", name: "Alex Graham" },
  { platform: "Trustpilot", text: "Absolutely worth it – Tutor Lab is so much better than in-person tutoring and is actually cheaper as well.", name: "Hamza" },
  { platform: "Facebook", text: "This is an AMAZING revision source, I've recommended it to so many of my friends, and they ABSOLUTELY love it!!!", name: "Tanya Khanna" },
  { platform: "Trustpilot", text: "Truly amazing!! YOU NEED TUTOR LAB!!", name: "Bea" },
  { platform: "Trustpilot", text: "Going from a C/B to A/A* I'm so happy I found Tutor Lab!!!", name: "Ellie" },
  { platform: "Trustpilot", text: "I can honestly say that Tutor Lab is the most valuable resource an A-Level student can have and the only one they need!", name: "Shahd" },
  { platform: "Google", text: "This was the most effective revision tool for all 3 of my subjects biology, chemistry and maths. The tutors knew exactly which methods were effective and how exam questions were meant to be answered.", name: "Zainab Al Russell" },
  { platform: "Facebook", text: "Tutor Lab changed my life for the better – it made everything look so simple that it motivated me to work even harder to achieve that grade I am hoping for.", name: "Haseeb Ali" },
  { platform: "Trustpilot", text: "The best investment I could have ever made for my education!!!! From D to A*", name: "Jasmina Silmemaj" },
  { platform: "Google", text: "It is without a doubt the best tool out there for revision . The videos are concise and informative and cover everything in the specification…it far outweighs the other revision sites.", name: "Faissa Osman" },
  { platform: "Facebook", text: "Cannot recommend it highly enough!! Got me from an E to an A in Chemistry, and a D to an A in Biology – no joke, I swear by Tutor Lab!!", name: "Hannah Kingsland" },
  { platform: "Trustpilot", text: "A-level life saver (From E's to A's). Could not recommend it enough for biology, chemistry and maths. Just give it a try!", name: "Adam" },
  { platform: "Facebook", text: "Honestly, best revision site out there. I'm convinced Tutor Lab spoon-fed me my A's.", name: "Nooran Fortia." },
  { platform: "Trustpilot", text: "TUTOR LAB WILL SAVE YOUR EXAMS. PERIOD.", name: "Muntaha" },
];

const platformLogos = {
  Facebook: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/facebook-logo-15.svg?",
  Google: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/google-logo-16.svg?",
};

const FiveStars = () => (
  <Image
    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/5-stars-14.svg?"
    alt="5 star review badge"
    width={100}
    height={18}
    className="h-[18px] w-auto"
  />
);

const PlatformLogo = ({ platform }: { platform: Review["platform"] }) => {
  if (platform === 'Trustpilot') {
    return (
      <span className="font-semibold text-base text-[#00b67a]">
        Trustpilot
      </span>
    );
  }
  const logoSrc = platformLogos[platform];
  if (!logoSrc) return null;

  return (
    <Image 
      src={logoSrc} 
      alt={`${platform} logo`} 
      width={platform === 'Google' ? 71 : 88}
      height={24}
      className="h-6 w-auto"
    />
  );
};

const ReviewCard = ({ review, className }: { review: Review; className?: string }) => (
  <div className={cn("flex-shrink-0 w-[380px] bg-card rounded-xl p-8 flex flex-col justify-between", className)}>
    <div className="flex justify-between items-center mb-6">
      <FiveStars />
      <PlatformLogo platform={review.platform} />
    </div>
    <p className="grow font-body text-base leading-relaxed text-muted-foreground">
      {review.text}
    </p>
    <p className="text-foreground font-semibold mt-6 text-base">{review.name}</p>
  </div>
);

const ReviewsSection = () => {
  const firstRow = reviewsData.slice(0, 8);
  const secondRow = reviewsData.slice(8, 16);

  const animationStyles = `
    @keyframes scroll-left {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes scroll-right {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }
    .animate-scroll-left {
      animation: scroll-left 120s linear infinite;
    }
    .animate-scroll-right {
      animation: scroll-right 120s linear infinite;
    }
    .group:hover .animate-scroll-left,
    .group:hover .animate-scroll-right {
      animation-play-state: paused;
    }
  `;

  return (
    <section className="bg-background py-20 overflow-x-hidden">
      <style>{animationStyles}</style>
      <div className="space-y-6">
        <div className="group w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="flex flex-nowrap gap-6 animate-scroll-left">
            {[...firstRow, ...firstRow].map((review, index) => (
              <ReviewCard key={`first-${index}`} review={review} />
            ))}
          </div>
        </div>
        <div className="group w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="flex flex-nowrap gap-6 animate-scroll-right">
            {[...secondRow, ...secondRow].map((review, index) => (
              <ReviewCard key={`second-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;