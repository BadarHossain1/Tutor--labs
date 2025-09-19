import React from "react";

const statItems = [
  {
    value: "700+",
    description: "5-star reviews",
  },
  {
    value: "37,800",
    description: "personal questions answered",
  },
  {
    value: "12,960",
    description: "exam walkthrough training videos",
  },
  {
    value: "65,000+",
    description: "students supported, and counting",
  },
  {
    value: "500,000+",
    description: "condensed learning hours completed",
  },
  {
    value: "150",
    description: "top schools and colleges partnered since 2015",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-background py-20 text-foreground">
      <div className="container mx-auto px-5">
        <h2 className="text-center text-[40px] font-light leading-[1.3] mb-16">
          2.7 average grade <span className="text-primary">improvement</span>
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-light text-foreground lg:text-6xl">
                {item.value}
              </div>
              <div className="mt-2 text-base text-secondary-text max-w-[220px] mx-auto">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;