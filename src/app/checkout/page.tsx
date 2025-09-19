"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { useUser as useClerkUser } from "@clerk/nextjs";

type Plan = "monthly" | "annual";

const monthlyPriceFor = (count: number) => {
  if (count <= 0) return 0;
  if (count === 1) return 29;
  if (count === 2) return 49;
  return 69; // 3 subjects
};

const subjectKeys = ["biology", "chemistry", "maths"] as const;
type SubjectKey = typeof subjectKeys[number];

function CheckoutInner() {
  const search = useSearchParams();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useClerkUser() as any;

  // initial state from URL
  const initialPlan = (search.get("plan") as Plan) || "monthly";
  const initialSubjectsCSV = search.get("subjects") || "";
  const initialSelected = new Set(
    initialSubjectsCSV
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => subjectKeys.includes(s as SubjectKey)) as SubjectKey[]
  );

  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [subjects, setSubjects] = useState<Record<SubjectKey, boolean>>({
    biology: initialSelected.has("biology"),
    chemistry: initialSelected.has("chemistry"),
    maths: initialSelected.has("maths"),
  });

  const selectedCount = (subjects.biology ? 1 : 0) + (subjects.chemistry ? 1 : 0) + (subjects.maths ? 1 : 0);
  const hasAny = selectedCount > 0;

  const price = useMemo(() => {
    const monthly = monthlyPriceFor(selectedCount);
    if (plan === "monthly") return monthly;
    return Math.round(monthly * 12 * 0.75);
  }, [plan, selectedCount]);

  const perMonthEquivalent = useMemo(() => {
    if (plan === "annual" && hasAny) return Math.round((price / 12));
    return null;
  }, [plan, hasAny, price]);

  const toggleSubject = (key: SubjectKey) => setSubjects((prev) => ({ ...prev, [key]: !prev[key] }));

  const subjectsCSV = useMemo(() => {
    return subjectKeys.filter((k) => subjects[k]).join(",");
  }, [subjects]);

  const proceedHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("plan", plan);
    if (subjectsCSV) params.set("subjects", subjectsCSV);
    return `/register?${params.toString()}`;
  }, [plan, subjectsCSV]);

  const handlePrimary = async () => {
    if (!hasAny) return;
    if (!isSignedIn) {
      router.push(proceedHref);
      return;
    }
    // Create Stripe session then redirect
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, subjects: subjectKeys.filter((k) => subjects[k]) }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.error || "Failed to start checkout");
      window.location.href = data.url as string;
    } catch (e) {
      // fallback: go to dashboard or show minimal alert
      alert("Could not start Stripe checkout. Please try again.");
    }
  };

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="container mx-auto px-5 py-16 max-w-5xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">Review your selection and continue to create your account.</p>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Selection column */}
          <div className="md:col-span-3 bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-primary-text mb-4">Your membership</h2>

            <div className="flex bg-background rounded-lg p-1 mb-6 text-sm font-semibold w-full max-w-[360px]">
              <button
                onClick={() => setPlan("monthly")}
                className={`flex-1 py-2.5 px-4 rounded-md transition-colors duration-300 ${plan === "monthly" ? "bg-primary-orange text-white" : "text-secondary-text hover:bg-accent"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPlan("annual")}
                className={`flex-1 py-2.5 px-4 rounded-md transition-colors duration-300 relative ${plan === "annual" ? "bg-primary-orange text-white" : "text-secondary-text hover:bg-accent"}`}
              >
                Exams 2026
                <span className="absolute -top-1.5 -right-1.5 bg-[#10b981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">-25%</span>
              </button>
            </div>

            <p className="text-secondary-text mb-3 text-base font-normal">Subjects included:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {subjectKeys.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => toggleSubject(k)}
                  className={`flex items-center justify-between rounded-md border p-3 text-sm font-medium transition-colors ${subjects[k] ? "border-primary-orange bg-primary-orange/10 text-primary-text" : "border-border hover:bg-accent text-secondary-text"}`}
                >
                  <span className="capitalize">{k}</span>
                  {subjects[k] && <Check className="w-4 h-4 text-primary-orange" />}
                </button>
              ))}
            </div>

            <p className="text-muted-text text-xs mt-4 font-normal">You can change subjects anytime from your account. 1:1 Tutor Support and Grade Guarantee apply to Biology & Chemistry only.</p>
          </div>

          {/* Summary column */}
          <aside className="md:col-span-2 bg-card rounded-xl border border-border p-6 h-fit">
            <h3 className="text-lg font-semibold text-primary-text mb-4">Order summary</h3>
            <ul className="text-secondary-text text-sm space-y-1 mb-4">
              <li className="flex justify-between"><span>Plan</span><span className="capitalize">{plan}</span></li>
              <li className="flex justify-between"><span>Subjects</span><span>{subjectsCSV || "None selected"}</span></li>
            </ul>
            <div className="mb-1">
              <span className="text-4xl font-bold text-primary-text">£{hasAny ? price : "--"}</span>
              <span className="text-secondary-text text-base">{hasAny ? (plan === "monthly" ? " per month" : " billed annually") : " select subjects"}</span>
            </div>
            {perMonthEquivalent !== null && (
              <div className="mb-3 text-xs text-muted-text">(~£{perMonthEquivalent}/mo equivalent)</div>
            )}

            <button
              disabled={!hasAny || !isLoaded}
              onClick={handlePrimary}
              className={`w-full text-center font-semibold py-3 px-6 rounded-md shadow-[0_4px_14px_rgba(255,107,53,0.25)] transition-colors duration-300 mb-3 block text-base ${hasAny ? "bg-primary-orange text-white hover:bg-secondary-orange" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
            >
              {!hasAny ? "Choose subjects" : isSignedIn ? "Pay with Stripe" : "Create account to continue"}
            </button>

            <Link href="/pricing" className="block w-full text-center border font-semibold py-3 px-6 rounded-md transition-colors duration-300 text-base border-border text-secondary-text hover:bg-accent">
              Back to pricing
            </Link>

            <div className="mt-4 text-xs text-muted-text">
              By continuing you agree to our
              {" "}
              <Link href="/terms-and-conditions" className="underline hover:text-primary-text">Terms</Link>.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<main className="container py-16"><p>Loading checkout…</p></main>}>
      <CheckoutInner />
    </Suspense>
  );
}
