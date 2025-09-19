"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  details: string;
  videoUrl: string;
  transcript: string;
  // Optional: thumbnail image to show in card and as video poster
  thumbnailUrl?: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Umma",
    details: "A*AA, Medicine",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/umma-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/umma-thumb.jpg",
    transcript: `I actually ended up getting A*AA, which was above my target grades—which is perfect: I'm nearly coming to the end of my 3rd year of medical school.

So I was doing A Level Biology, Chemistry and Maths.

I think I started using Tutor Lab around December or January of Year 12, and pretty much carried on for the rest of my A Levels.

My target grades were always three A's. In the beginning of A Levels, I think I struggled quite a bit. There's such a massive transition from GCSE to A Levels. Sometimes I would just struggle to keep up a bit.

One of the most valuable things for me was definitely Tutor Lab's method of revising. It helped me have a lot more structure to my revision and also just made me a lot calmer and more confident towards my exams.

Before Tutor Lab, I just was just watching YouTube videos and, like, any topics that I could find. Sometimes they were helpful, sometimes they didn't cover the topic in as much detail.

So that's why I felt like I needed to find something else that was comprehensive, covered the content, but also worked on my exam technique as well.

And I felt like just having that support, knowing that you're being taught by people who know what they're talking about, made such a difference.

I definitely recommend signing up for the Free Trial, seeing how it feels. You probably will really enjoy it—at least you've given it a go!`,
  },
  {
    name: "Louis",
    details: "Biology & Chemistry",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/louis-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/louis-thumb.jpg",
    transcript: `I have to feel confident that I'm going to do well. Otherwise, I freak out.

That's one of the reasons why I use Tutor Lab.

I just feel so much calmer, like I know exactly what I need to do.

I was looking for a resource that could help me not only understand the content better, but also understand the exams better, and to have an A Level expert that I could ask questions to.

Every single Tutor Lab teacher is an expert in their A Level course. They know the inside and out of your specification and they know exactly what you need to do to get top marks.

It's so much cheaper than getting a private tutor, and you can use it whenever you want. It just covers every aspect of what you need and leaves out everything you don't.

People are very skeptical of online revision resources. Is this going to help me or not? But you can use the Free Trial, and if you don't like it, then that's fine.

Build that trust up as you use it.

Just give it a try, is the bottom line.`,
  },
  {
    name: "Shermin",
    details: "Biology",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/shermin-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/shermin-thumb.jpg",
    transcript: `I couldn't really understand the content in school because my teacher was going through the presentations really quickly.

After getting a D, I decided to do something about it.

From the TL videos, I took notes and then compared to my school notes—Tutor Lab was the best. It was all condensed together: I wouldn't be able to fit all the information I need for ATP onto just one page otherwise!

You can ask any question, and within 24 hours, there will be someone answering it.

Even if I didn't get anything in school, I knew like I could log in, and there will be lots of information there to help me.

Every video helped me a lot with understanding and engaging with my subjects that I used to hate.

Before that, like two months ago, I couldn't even imagine getting A's and A*s, but now I can.

That's the proof.`,
  },
  {
    name: "Lauren",
    details: "Biology & Chemistry",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/lauren-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/lauren-thumb.jpg",
    transcript: `If you use Tutor Lab, I feel like you could just throw your textbook away.

Even if you know all of the content in the exam, I feel like you could know everything and then still not get full marks. My biggest thing is not knowing what to write in the exam. Even when I knew the knowledge, I wouldn't know how to write it, and I'm a waffler!

There's so much knowledge, but then there's only certain key words that you have to write to get the mark. In class, we never get told what we are meant to write. When you use Tutor Lab, it literally tells you what the mark scheme wants you to say.

After watching a video, I feel like that's given me all the information I need. Very simplified, easy to understand, condensed videos of everything that you need to know.

And my friends are like, "Woah, how did you get that mark? How did you know to write that?" And I'm like "Tutor Lab". I'd be a lot more stressed about my A Levels if I didn't have it.`,
  },
  {
    name: "Carla",
    details: "AAA, Pharmaceutical Sciences",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/carla-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/carla-thumb.jpg",
    transcript: `I will say, A Levels were quite tough. I did Biology, Chemistry, Mathematics, and German.

I think Tutor Lab definitely helped me, for sure. I watched all the videos. I did all the exercises. It was, like, full-on. Everything was covered.

You didn't need an extra subscription or something else—it was just all there.

I found them via YouTube videos, and I got hooked. I was like, "Okay, I need this." 

It's almost dramatic what I'm saying—life-changing.

It was one of the best decisions I've made. 100% recommend.`,
  },
  {
    name: "Natalya",
    details: "Biology & Chemistry",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/natalya-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/natalya-thumb.jpg",
    transcript: `Tutor Lab is the only reason I'm ever going to get a grade in this.

After year 12, I didn't know most of the AS content. I was like a ball of stress, just trying to, like, get work into my head.

Having a textbook is so daunting. I don't want to read it. I just look at it like... where do I even start? Whereas when I'm watching the Tutor Lab videos, I see the percentage go up—like, 'you've completed that much of the course,' and I'm like, 'Yes!'

You don't want any faff. You don't want any extras. You don't want to feel like you're wasting time or doing something that you don't necessarily have to.

And because it's got the free trial, I was like, "Well, what can I lose?"

I couldn't have gotten what I did from school alone.`,
  },
  {
    name: "Yoyen",
    details: "Biology & Chemistry",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/yoyen-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/yoyen-thumb.jpg",
    transcript: `The free trial, (the videos), was way clearer than how my teacher explained it.

It just gives us the key points that we need: They look for certain keywords that you must include to get the marks.

What's really helpful is that he included the cheat sheet—like the fill-in-the-blank section—on the topic covered. I can't find anything else like it online anywhere.

I went back to class with my notes. I looked at my friends like, what we used to do is we would answer a 7-mark question by just filling two pages and then only get like 3 or 4 marks. But after I started using the notes from Tutor Lab, I could get almost every single mark.

It actually really boosted up my confidence.

If I could change anything about how I revised, I would've started watching these videos way before I even started A Levels, because they helped me so much.`,
  },
  {
    name: "Isra",
    details: "Biology",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/isra-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/isra-thumb.jpg",
    transcript: `For me, self-confidence is one of my biggest issues.

When I have a complex concept that I struggle to understand, immediately I think "is it me?" or "am I stupid?"

Tutor Lab definitely take that feeling away.

When you ask a question, the tutors really understand where you are coming from. They know what all the pitfalls are.

It just gave me confidence for whenever I go into a lesson and need to answer a question.

My self-confidence beforehand would have been like a 4 or 5, and now it's definitely a good 7 or 8.

One of the biggest things no amount of money can buy is to give someone the belief that they can do it.

If you feel like it is right for you, it's definitely worth the money.`,
  },
  {
    name: "Luke",
    details: "Dentistry, University of Sheffield",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/luke-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/luke-thumb.jpg",
    transcript: `I use Tutor Lab pretty much every day.

I know I can come home, watch a 5–10 minute video on it that'll explain everything:it'll condense everything down, give you everything you actually need to know.

I use it daily to refresh and make sure I'm going over all my knowledge.

I use all the live web classes to make sure I'm just keeping up to date with everything.

I use it because it gives me everything that I need to know in one given space, one given time.

5–10 minutes, rather than an hour.

It's a no brainer.`,
  },
  {
    name: "Rebecca",
    details: "Biology & Chemistry",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/rebecca-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/rebecca-thumb.jpg",
    transcript: `If I don't get an A... I will be... shocked.

I'm quite good at remembering things, so I can remember a lot. But when it comes to the exam, it's not really about just learning all the content... It's about learning how to pass the exam.

Unless you're doing all the past papers and focusing on that instead of just writing notes—especially at this point. Because I remember in April last year thinking, "Oh, I need to go over my notes again. I need to relearn this again."

Actually, it's exam technique. It's so, so important.

I really do think with Tutor Lab, I will get this A.`,
  },
  {
    name: "Emily",
    details: "Biology",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/emily-b-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/emily-thumb.jpg",
    transcript: `It was sort of at the end of Year 11, and I was looking for A Level tutors because I thought I might need some help.

I just found Tutor Lab on the internet, and I was amazed by it, really.

I tried it, did the free trial, and it was so good—like, the format, the 24/7 support, everything was really organized, and it was just so easy.

I think the main thing it's helped me with most is definitely the A Level Biology content.

When I was doing stuff in class, I'd literally just go on TL—it's so easy because it's all there, ready for me when I need it.`,
  },
  {
    name: "Roubin",
    details: "Biology & Chemistry",
    videoUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/roubin-testimonial.mp4",
    thumbnailUrl: "https://tailoredtutors.co.uk/wp-content/uploads/2025/02/roubin-thumb.jpg",
    transcript: `Look at these A* students, yeah? You think they're at home revising in their books?

They've got Tutor Lab, man.

Listen, it's a heck of a lot of work to do. There's a lot of content.

Taking out the book itself, yeah? The book is like this thick. That's just Year 2.

There's so much information in the book that is so irrelevant. What's the point of studying it when you've got videos at your disposal?

If you're trying to get the best marks, you don't want to faff about.

I finished the whole A Level Biology course within what, two weeks?

Instead of spending two years on it.

Mate.

It makes me laugh.

Listen, it makes revision so much better.`,
  },
];

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  onClick: () => void;
}> = ({ testimonial, onClick }) => (
  <div onClick={onClick} className="cursor-pointer group">
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-transform group-hover:scale-[1.02] group-hover:shadow-xl">
      {testimonial.thumbnailUrl ? (
        <img
          src={testimonial.thumbnailUrl}
          alt={`${testimonial.name} testimonial thumbnail`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/video-placeholder.svg";
          }}
        />
      ) : (
        <img src="/video-placeholder.svg" alt="Video placeholder" className="h-full w-full object-cover" />
      )}

      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-transform group-hover:scale-110">
          <Play className="h-7 w-7 fill-black text-black ml-1" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
        <p className="text-sm text-secondary-text">{testimonial.details}</p>
        <p className="text-sm mt-1 underline">Read more...</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] =
    React.useState<Testimonial | null>(null);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (selectedTestimonial && videoRef.current) {
      // Prepare the video; let the user press play to allow audio.
      videoRef.current.load();
      videoRef.current.currentTime = 0;
    }
  }, [selectedTestimonial]);

  return (
    <section className="bg-background py-20">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-3xl font-light text-primary-text text-center md:text-left">
              Preferred by <span className="text-primary">65,000+</span> students
            </h2>
            <div className="flex items-center gap-3">
              <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 top-0 h-10 w-10 rounded-full border-border bg-transparent hover:bg-accent text-foreground" />
              <CarouselNext className="relative translate-x-0 translate-y-0 right-0 top-0 h-10 w-10 rounded-full border-border bg-transparent hover:bg-accent text-foreground" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CarouselContent className="-ml-6">
            {testimonialsData.map((testimonial) => (
                <CarouselItem
                key={testimonial.name}
                className="pl-6 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                <TestimonialCard
                    testimonial={testimonial}
                    onClick={() => setSelectedTestimonial(testimonial)}
                />
                </CarouselItem>
            ))}
            </CarouselContent>
        </div>
      </Carousel>

      <Dialog
        open={selectedTestimonial !== null}
        onOpenChange={(isOpen) => !isOpen && setSelectedTestimonial(null)}
      >
        <DialogContent className="bg-card border-border p-0 max-w-5xl h-[90vh] md:h-auto flex flex-col md:flex-row !rounded-xl overflow-hidden">
          {selectedTestimonial && (
            <>
              <div className="w-full md:w-3/5 bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  key={selectedTestimonial.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  // Use thumbnail as poster if available
                  poster={selectedTestimonial.thumbnailUrl || "/video-placeholder.svg"}
                  playsInline
                  onPlay={(e) => {
                    // Unmute on first user interaction
                    const el = e.currentTarget as HTMLVideoElement;
                    el.muted = false;
                    el.volume = 1.0;
                  }}
                >
                  <source src={selectedTestimonial.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="w-full md:w-2/5 flex flex-col">
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle className="text-xl font-medium text-primary-text">
                    {selectedTestimonial.name}'s transcript
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full px-6 pb-6">
                        <div className="text-secondary-text space-y-4 pr-3">
                        {selectedTestimonial.transcript.split("\n\n").map((paragraph, i) => (
                            <p key={i} className="text-base leading-relaxed">
                            {paragraph}
                            </p>
                        ))}
                        </div>
                    </ScrollArea>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}