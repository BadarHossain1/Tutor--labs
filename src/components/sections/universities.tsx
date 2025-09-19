"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const logos = [
  { name: 'University of Bristol', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University_of_Bristol_Logo-17.svg?' },
  { name: 'University of Cambridge', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University_of_Cambridge_Logo-2-18.svg?' },
  { name: 'University of Oxford', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University_of_Oxford_logo-19.svg?' },
  { name: 'University of Warwick', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University-of-Warwick-white-3-20.svg?' },
  { name: 'UCL', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University-college-London-logo-white-3-21.svg?' },
  { name: 'University of Aberdeen', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/images/University-of-Aberdeen-white-2-5.png?' },
  { name: 'Imperial College London', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/Logo_for_Imperial_College_London_logo-22.svg?' },
  { name: 'LSE', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/LSE_logo-23.svg?' },
  { name: 'University of Bath', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University-of-Bath-white-24.svg?' },
  { name: 'Loughborough University', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University-of-Loughbrough-white-2-25.svg?' },
  { name: 'Durham University', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University-of-Durham-white-2-26.svg?' },
  { name: 'Lancaster University', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University-of-Lancaster-white-2-27.svg?' },
  { name: 'University of Exeter', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/University-of-Exeter-white-2-28.svg?' },
];

const LogoImage = ({ src, alt }: { src: string; alt: string }) => {
  const [url, setUrl] = useState(src);
  return (
    <Image
      src={url}
      alt={alt}
      width={160}
      height={48}
      className="h-10 w-auto object-contain"
      unoptimized
      onError={() => setUrl('/window.svg')}
    />
  );
};

const UniversitiesSection = () => {
  return (
    <>
      <style>{`
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.5rem * ${logos.length}));
          }
        }
        .animate-scroll {
           animation: scroll 60s linear infinite;
        }
      `}</style>
      <section className="bg-background py-20">
        <div className="container mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-normal text-primary-text mb-12">
            Our students get into
          </h2>
          <div
            className="relative group w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center px-8 h-16">
                  <LogoImage src={logo.src} alt={`${logo.name} logo`} />
                </div>
              ))}
            </div>

            <button
              aria-label="Scroll left"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Scroll right"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniversitiesSection;