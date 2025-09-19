"use client";

import { useState } from "react";
import Link from 'next/link';
import { Check } from 'lucide-react';

const Switch = ({ checked, onCheckedChange, id }: { checked: boolean, onCheckedChange: (checked: boolean) => void, id: string }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      id={id}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? 'bg-primary' : 'bg-input'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

const PricingSection = () => {
    const [membership, setMembership] = useState<'monthly' | 'annual'>('monthly');
    const [subjects, setSubjects] = useState({
        biology: true,
        chemistry: false,
        maths: false,
    });

    const handleSubjectToggle = (subject: 'biology' | 'chemistry' | 'maths') => {
        setSubjects(prev => ({ ...prev, [subject]: !prev[subject] }));
    };

    const selectedCount = Number(subjects.biology) + Number(subjects.chemistry) + Number(subjects.maths);
    const hasAny = selectedCount > 0;

    // Pricing model (original to our product):
    // Monthly: 1 subj £29, 2 subjs £49, 3 subjs £69
    // Annual: 25% off the equivalent 12 months total
    const monthlyPriceFor = (count: number) => {
        if (count <= 0) return 0;
        if (count === 1) return 29;
        if (count === 2) return 49;
        return 69; // 3 subjects
    };

    const monthly = monthlyPriceFor(selectedCount);
    const annual = Math.round(monthly * 12 * 0.75);
    const price = membership === 'monthly' ? monthly : annual;
    const priceSuffix = membership === 'monthly' ? ' per month' : ' billed annually';
    const perMonthEquivalent = membership === 'annual' && hasAny ? Math.round((annual / 12)) : null;

    return (
        <section id="pricing" className="bg-background py-20 text-foreground">
            <div className="container mx-auto px-5 max-w-[1200px]">
                <h2 className="text-center text-[32px] font-light text-primary-text mb-12" style={{ lineHeight: '1.3' }}>
                    The right <a href="https://tailoredtutors.co.uk/pricing" className="text-primary-orange hover:text-secondary-orange transition-colors">pricing</a> for your needs
                </h2>

                <div className="bg-card rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Left Column */}
                    <div className="flex-1">
                        <p className="text-secondary-text mb-3 text-base font-normal">Choose your Membership:</p>
                        
                        <div className="flex bg-background rounded-lg p-1 mb-8 text-sm font-semibold">
                            <button
                                onClick={() => setMembership('monthly')}
                                className={`flex-1 py-2.5 px-4 rounded-md transition-colors duration-300 ${membership === 'monthly' ? 'bg-primary-orange text-white' : 'text-secondary-text hover:bg-accent'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setMembership('annual')}
                                className={`flex-1 py-2.5 px-4 rounded-md transition-colors duration-300 relative ${membership === 'annual' ? 'bg-primary-orange text-white' : 'text-secondary-text hover:bg-accent'}`}
                            >
                                Exams 2026
                                <span className="absolute -top-1.5 -right-1.5 bg-[#10b981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    -25%
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center justify-between w-full max-w-[280px] sm:w-auto sm:justify-start sm:space-x-3">
                                <span className="text-primary-text font-semibold text-base">Biology</span>
                                <Switch
                                    checked={subjects.biology}
                                    onCheckedChange={() => handleSubjectToggle('biology')}
                                    id="biology-switch"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full max-w-[280px] sm:w-auto sm:justify-start sm:space-x-3">
                                <span className="text-primary-text font-semibold text-base">Chemistry</span>
                                <Switch
                                    checked={subjects.chemistry}
                                    onCheckedChange={() => handleSubjectToggle('chemistry')}
                                    id="chemistry-switch"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full max-w-[280px] sm:w-auto sm:justify-start sm:space-x-3">
                                <span className="text-primary-text font-semibold text-base">Maths</span>
                                <Switch
                                    checked={subjects.maths}
                                    onCheckedChange={() => handleSubjectToggle('maths')}
                                    id="maths-switch"
                                />
                            </div>
                        </div>

                        <p className="text-secondary-text mb-4 text-base font-normal">Memberships include:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-secondary-text text-sm font-normal">
                            <div className="flex items-center"><Check className="text-primary-orange w-4 h-4 mr-2 flex-shrink-0" /> Content Learning Tutorials</div>
                            <div className="flex items-center"><Check className="text-primary-orange w-4 h-4 mr-2 flex-shrink-0" /> 1:1 Tutor Support*</div>
                            <div className="flex items-center"><Check className="text-primary-orange w-4 h-4 mr-2 flex-shrink-0" /> Exam Training Resources</div>
                            <div className="flex items-center"><Check className="text-primary-orange w-4 h-4 mr-2 flex-shrink-0" /> Topic Quizzes</div>
                            <div className="flex items-center"><Check className="text-primary-orange w-4 h-4 mr-2 flex-shrink-0" /> Topic Question Packs</div>
                            <div className="flex items-center"><Check className="text-primary-orange w-4 h-4 mr-2 flex-shrink-0" /> Grade Guarantee*</div>
                        </div>
                        <p className="text-muted-text text-xs mt-4 font-normal">*Biology &amp; Chemistry only</p>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 md:max-w-[280px] flex flex-col items-center md:items-start text-center md:text-left pt-8 md:pt-0 border-t border-border md:border-t-0 md:border-l md:border-border md:pl-12">
                        <p className="text-primary-text font-semibold text-base mb-2">{membership === 'monthly' ? 'Monthly Membership:' : 'Annual Membership:'}</p>
                        <div className="mb-1">
                            <span className="text-5xl font-bold text-primary-text transition-colors">£{hasAny ? price : '--'}</span>
                            <span className="text-secondary-text text-base">{hasAny ? priceSuffix : ' select a subject'}</span>
                        </div>
                        {perMonthEquivalent !== null && (
                          <div className="mb-3 text-xs text-muted-text">(~£{perMonthEquivalent}/mo equivalent)</div>
                        )}
                        <ul className="text-secondary-text text-sm space-y-1 mb-6 font-normal">
                            <li>Billed Monthly</li>
                            <li>Unlimited access</li>
                            <li>No minimum commitment, cancel anytime</li>
                        </ul>
                                                <button disabled={!hasAny}
                                                    onClick={() => {
                                                        const params = new URLSearchParams();
                                                        params.set('plan', membership);
                                                        const parts: string[] = [];
                                                        if (subjects.biology) parts.push('biology');
                                                        if (subjects.chemistry) parts.push('chemistry');
                                                        if (subjects.maths) parts.push('maths');
                                                        if (parts.length) params.set('subjects', parts.join(','));
                                                        window.location.href = `/checkout?${params.toString()}`;
                                                    }}
                          className={`w-full text-center font-semibold py-3 px-6 rounded-md shadow-[0_4px_14px_rgba(255,107,53,0.25)] transition-colors duration-300 mb-3 block text-base ${hasAny ? 'bg-primary-orange text-white hover:bg-secondary-orange' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
                            {hasAny ? 'Start free trial' : 'Select a subject'}
                        </button>
                                                <button disabled={!hasAny}
                                                    onClick={() => {
                                                        const params = new URLSearchParams();
                                                        params.set('plan', membership);
                                                        const parts: string[] = [];
                                                        if (subjects.biology) parts.push('biology');
                                                        if (subjects.chemistry) parts.push('chemistry');
                                                        if (subjects.maths) parts.push('maths');
                                                        if (parts.length) params.set('subjects', parts.join(','));
                                                        window.location.href = `/checkout?${params.toString()}`;
                                                    }}
                          className={`w-full text-center border font-semibold py-3 px-6 rounded-md transition-colors duration-300 mb-4 block text-base ${hasAny ? 'border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white' : 'border-muted text-muted-foreground cursor-not-allowed'}`}>
                            {hasAny ? 'Buy now' : 'Choose your subjects'}
                        </button>

                        <p className="text-xs text-muted-text font-normal">
                            Free trial available. By continuing you agree to our <a href="/terms-and-conditions" className="underline hover:text-primary-text">Terms</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;