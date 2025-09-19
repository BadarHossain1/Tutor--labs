import React from 'react';
import Image from 'next/image';

const featuresData = [
  {
    icon: "/globe.svg",
    alt: "Lightning bolt icon representing efficient A level revision",
    title: "Efficient content mastery",
    description: "Video tutorials, progress and confidence tracking, template notes",
  },
  {
    icon: "/vercel.svg",
    alt: "Medal icon representing award-winning exam techniques",
    title: "Elite exam technique",
    description: "Exam question walkthrough videos, past paper bank, structured revision method",
  },
  {
    icon: "/next.svg",
    alt: "Upward trending graph icon representing A level grade improvement",
    title: "Expert application skills",
    description: "Quizzes, question packs, questions by theme",
  },
  {
    icon: "/window.svg",
    alt: "Checkmark icon indicating grade improvement confidence",
    title: "Guaranteed grade confidence",
    description: "Personalised support with exam expert A Level tutors",
  },
];

interface FeatureItem {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

const FeatureCard = ({ item }: { item: FeatureItem }) => {
  return (
    <div className="flex items-start gap-6">
      <Image
        src={item.icon}
        alt={item.alt}
        width={40}
        height={40}
        className="w-10 h-10 object-contain flex-shrink-0"
        unoptimized
      />
      <div>
        <h3 className="mb-2">{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-background py-20">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12 items-start">
        <div>
          <h2>
            Everything you <span className="text-primary">need,</span>
            <br />
            nothing you don't
          </h2>
        </div>
        <div className="space-y-12">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} item={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;