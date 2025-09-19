import React from 'react';
import { Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]">
        <div
          className="absolute inset-0 opacity-20 lg:opacity-100 bg-cover bg-center"
          style={{
            backgroundImage: "url('/banner.png')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-5 relative z-10">
        <div className="flex items-center min-h-[550px] lg:min-h-[650px] py-16 lg:py-0">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.2] text-primary-text">
              A/A* <span className="text-primary-orange">Guaranteed</span><br />
              with expert A Level tutoring
            </h1>
            <p className="mt-4 md:mt-6 font-body text-xl md:text-2xl text-secondary-text">
              Strategic exam training to unlock<br className="hidden sm:block"/>
              your potential.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                className="w-full sm:w-auto text-center btn-text text-white py-4 px-8 rounded-md bg-gradient-to-br from-primary-orange to-secondary-orange shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-transform duration-300 hover:scale-105"
              >
                Free Trial
              </a>
              <a
                href="/private-tutoring/"
                className="w-full sm:w-auto text-center btn-text text-primary-orange py-[15px] px-[31px] rounded-md border border-primary-orange transition-colors duration-300 hover:bg-primary-orange hover:text-white"
              >
                Private Tutoring
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;