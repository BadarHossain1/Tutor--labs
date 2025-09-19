"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { CheckCircle } from 'lucide-react';

interface Tutor {
  id: 'biology' | 'chemistry' | 'maths';
  name: string;
  image: string;
  imageAlt: string;
  credentials: string[];
  courseLink: string;
  courseName: string;
}

const tutorsData: Tutor[] = [
  {
    id: 'biology',
    name: 'Dr. Maya Patel',
    image: 'https://images.unsplash.com/photo-1559757175-08d3dff6b838?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Dr. Maya Patel, expert A Level Biology tutor.',
    credentials: [
      'PhD in Molecular Biology, University of Leeds',
      'Former A Level Biology examiner',
      '10+ years teaching experience',
      'Specialist in exam technique and practical skills',
      'Helped 1,000+ students achieve A/A* grades',
    ],
    courseLink: '/a-level-biology',
    courseName: 'Biology',
  },
  {
    id: 'chemistry',
    name: 'Dr. Elena Costa',
    image: 'https://images.unsplash.com/photo-1559757175-a6f36e56aa8a?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Dr. Elena Costa, highly experienced A Level Chemistry tutor.',
    credentials: [
      "PhD in Physical Chemistry, University of Manchester",
      'Former Head of Chemistry at a top UK college',
      '12+ years of classroom and online teaching',
      'Author of exam-focused revision resources',
      'Proven track record of grade improvements',
    ],
    courseLink: '/a-level-chemistry',
    courseName: 'Chemistry',
  },
  {
    id: 'maths',
    name: 'Alex Nguyen',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Alex Nguyen, A Level Maths tutor and former senior examiner.',
    credentials: [
      'MSc Mathematics, University of Warwick',
      'Former A Level Maths senior examiner',
      '15+ years teaching experience',
      'Expert in problem-solving and exam strategy',
      'Created 200+ exam walkthrough videos',
    ],
    courseLink: '/a-level-maths',
    courseName: 'Maths',
  },
];

const TutorsSection = () => {
    const [activeTab, setActiveTab] = useState<Tutor['id']>('biology');

    const activeTutor = tutorsData.find(tutor => tutor.id === activeTab);
    const [imgSrc, setImgSrc] = useState<string | null>(activeTutor?.image ?? null);

    useEffect(() => {
        setImgSrc(activeTutor?.image ?? null);
    }, [activeTutor?.image]);
    
    const tabButtons = [
        { id: 'biology', name: 'Biology' },
        { id: 'chemistry', name: 'Chemistry' },
        { id: 'maths', name: 'Maths' },
    ];

    return (
        <section className="bg-background py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-center text-3xl font-light text-primary-text md:text-[32px] md:leading-[1.3]">
                    Learn from the <span className="text-primary-orange">best</span> A Level tutors
                </h2>

                <div className="mt-8 mb-12 flex justify-center">
                    <div className="inline-flex rounded-lg bg-[#242930] p-1">
                        {tabButtons.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tutor['id'])}
                                className={`rounded-md px-5 py-2 text-base font-medium transition-colors duration-200 focus:outline-none ${
                                    activeTab === tab.id
                                        ? 'bg-green-accent text-white'
                                        : 'text-secondary-text hover:text-white'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTutor && (
                    <div className="mx-auto max-w-5xl rounded-xl bg-card p-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)] md:p-10 lg:flex lg:items-start lg:gap-10">
                                                <div className="flex-shrink-0 text-center lg:text-left">
                                                        <Image
                                                            src={imgSrc || "/video-placeholder.svg"}
                                                                alt={activeTutor.imageAlt}
                                                                width={300}
                                                                height={300}
                                                                className="mx-auto rounded-lg object-cover"
                                                            onError={() => setImgSrc("/video-placeholder.svg")}
                                                            referrerPolicy="no-referrer"
                                                            />
                                                </div>
                        <div className="mt-8 lg:mt-0">
                            <h3 className="text-2xl font-medium text-primary-text">
                                {activeTutor.name}
                            </h3>
                            <ul className="mt-6 space-y-4">
                                {activeTutor.credentials.map((cred, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-accent mt-0.5" />
                                        <p className="text-base font-normal leading-relaxed text-secondary-text">{cred}</p>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={activeTutor.courseLink}
                                className="mt-8 inline-block rounded-md bg-gradient-to-r from-[#b4dc36] to-[#74b83b] px-8 py-4 text-base font-semibold text-[#1a1e23] transition-all hover:shadow-[0_4px_14px_rgba(180,220,54,0.25)]"
                            >
                                View {activeTutor.courseName} Course
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TutorsSection;