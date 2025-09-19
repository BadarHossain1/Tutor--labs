"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  examBoard?: string;
  goals?: string;
  availability?: string;
  budget?: string;
  message: string;
};

async function getRefCode(): Promise<string | null> {
  try {
    const res = await fetch("/api/me", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.user?.refCode ?? null;
  } catch {
    return null;
  }
}

export default function PrivateTutoringForm() {
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "Biology",
    examBoard: "",
    goals: "",
    availability: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    getRefCode().then(setRefCode);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact/private", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, refCode }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to send");
      toast.success("Thanks! We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", subject: "Biology", examBoard: "", goals: "", availability: "", budget: "", message: "" });
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-border bg-card p-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Full name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="w-full rounded-md border border-border bg-background p-3" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full rounded-md border border-border bg-background p-3" />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input name="phone" required value={form.phone} onChange={handleChange} className="w-full rounded-md border border-border bg-background p-3" />
        </div>
        <div>
          <label className="block text-sm mb-1">Subject</label>
          <select name="subject" value={form.subject} onChange={handleChange} className="w-full rounded-md border border-border bg-background p-3">
            <option>Biology</option>
            <option>Chemistry</option>
            <option>Maths</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Exam Board</label>
          <input name="examBoard" value={form.examBoard} onChange={handleChange} className="w-full rounded-md border border-border bg-background p-3" />
        </div>
        <div>
          <label className="block text-sm mb-1">Budget (per hour)</label>
          <input name="budget" value={form.budget} onChange={handleChange} className="w-full rounded-md border border-border bg-background p-3" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm mb-1">Availability</label>
          <input name="availability" value={form.availability} onChange={handleChange} placeholder="e.g., Weekdays after 5pm, weekends" className="w-full rounded-md border border-border bg-background p-3" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm mb-1">Goals</label>
          <input name="goals" value={form.goals} onChange={handleChange} placeholder="e.g., Aiming for A*, help with exam technique" className="w-full rounded-md border border-border bg-background p-3" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm mb-1">Message</label>
          <textarea name="message" required value={form.message} onChange={handleChange} rows={5} className="w-full rounded-md border border-border bg-background p-3" />
        </div>
      </div>
      <button type="submit" disabled={loading} className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold disabled:opacity-60">
        {loading ? "Sending..." : "Send enquiry"}
      </button>
      {refCode && <p className="text-xs text-muted-foreground">Your reference: <span className="font-mono">{refCode}</span></p>}
    </form>
  );
}
