"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

    // Multi-select for subjects and services
    const subjectOptions = [
      "A Level Biology",
      "A Level Chemistry",
      "A Level Maths",
      "Other",
    ];
    const serviceOptions = [
      "Payment Confirmation",
      "Private Tutoring",
      "Revision Course",
      "Predicted Papers",
      "Other",
    ];
    const [subjects, setSubjects] = useState<string[]>([]);
    const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [board, setBoard] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [contactTime, setContactTime] = useState("");

  // Payment success data
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Check if this is from a payment success redirect
    const paymentSuccess = searchParams.get("payment_success");
    const invoiceCode = searchParams.get("invoice_code");
    const plan = searchParams.get("plan");
    const subjects = searchParams.get("subjects");
    const amount = searchParams.get("amount");
    const paymentId = searchParams.get("payment_id");
    const prefilledName = searchParams.get("name");
    const prefilledEmail = searchParams.get("email");

    if (paymentSuccess === "true") {
      setIsPaymentSuccess(true);
      setPaymentData({
        invoiceCode,
        plan,
        subjects,
        amount,
        paymentId,
      });

      // Pre-fill form with payment success data
      if (prefilledName) setName(prefilledName);
      if (prefilledEmail) setEmail(prefilledEmail);
        setServices(["Payment Confirmation"]);
        setSubjects(subjects ? subjects.split(",") : []);
        setMessage("");
      
      // Auto-generate message with payment details
      const autoMessage = `Hello,

I have successfully completed a payment for my ${plan} tutoring plan. Please find my payment details below:

Invoice Code: ${invoiceCode}
Plan: ${plan}
Subjects: ${subjects}
Amount Paid: £${amount}
Payment ID: ${paymentId}

Please send me a confirmation email with my invoice and next steps to get started with my tutoring plan.

Thank you!`;
      
      setMessage(autoMessage);
    }
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Always send paymentData fields as strings (never null)
    let safePaymentData = undefined;
    if (isPaymentSuccess && paymentData) {
      safePaymentData = {
        invoiceCode: paymentData.invoiceCode || "",
        plan: paymentData.plan || "",
        subjects: paymentData.subjects || "",
        amount: paymentData.amount || "",
        paymentId: paymentData.paymentId || "",
      };
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
        subjects: subjects,
        services: services,
      budget: budget.trim(),
      board: board.trim(),
      contactMethod: contactMethod.trim(),
      contactTime: contactTime.trim(),
      message: message.trim(),
      ...(isPaymentSuccess && safePaymentData && {
        paymentData: safePaymentData,
        isPaymentConfirmation: true,
      }),
    };

    if (!payload.name || !payload.email || !payload.phone || subjects.length === 0 || services.length === 0) {
      toast.error("Please complete name, email, phone, subject and service.");
      return;
    }
    if (payload.message.length < 10) {
      toast.error("Please add a bit more detail to your message (10+ chars).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || "Could not send message.");
      } else {
        if (isPaymentSuccess) {
          toast.success("Payment confirmation sent! You'll receive an invoice and next steps via email.");
        } else {
          toast.success("Message sent! We'll get back to you soon.");
        }
        // Reset form
  setName("");
  setEmail("");
  setPhone("");
  setMessage("");
  setSubjects([]);
  setServices([]);
  setBudget("");
  setBoard("");
  setContactMethod("email");
  setContactTime("");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {isPaymentSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">🎉 Payment Successful!</h3>
          <p className="text-green-700 text-sm">
            Your payment has been processed. Please complete the form below to receive your invoice and next steps.
          </p>
          {paymentData && (
            <div className="mt-2 text-xs text-green-600">
              Invoice: {paymentData.invoiceCode} | Plan: {paymentData.plan} | Amount: £{paymentData.amount}
            </div>
          )}
        </div>
      )}
      
      <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input 
            name="name" 
            placeholder="Full name" 
            aria-label="Name" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            name="email" 
            type="email" 
            placeholder="Email" 
            aria-label="Email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            name="phone" 
            type="tel" 
            placeholder="Mobile number" 
            aria-label="Phone" 
            required 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div>
            <label className="mb-1 block text-sm font-medium">Subject / Course</label>
              <div className="flex flex-col gap-1">
                {subjectOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <Checkbox
                      checked={subjects.includes(option)}
                      onCheckedChange={(checked) => {
                        setSubjects((prev) =>
                          checked
                            ? [...prev, option]
                            : prev.filter((s) => s !== option)
                        );
                      }}
                      id={`subject-${option}`}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Service</label>
              <div className="flex flex-col gap-1">
                {serviceOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <Checkbox
                      checked={services.includes(option)}
                      onCheckedChange={(checked) => {
                        setServices((prev) =>
                          checked
                            ? [...prev, option]
                            : prev.filter((s) => s !== option)
                        );
                      }}
                      id={`service-${option}`}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Budget range</label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under £20/week">Under £20/week</SelectItem>
                <SelectItem value="£20–£40/week">£20–£40/week</SelectItem>
                <SelectItem value="£40–£60/week">£40–£60/week</SelectItem>
                <SelectItem value="£60+/week">£60+/week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Exam board</label>
            <Select value={board} onValueChange={setBoard}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AQA">AQA</SelectItem>
                <SelectItem value="OCR">OCR</SelectItem>
                <SelectItem value="Edexcel">Edexcel</SelectItem>
                <SelectItem value="WJEC">WJEC</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Preferred contact</label>
            <Select value={contactMethod} onValueChange={setContactMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Email or Phone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Best time to contact</label>
            <Select value={contactTime} onValueChange={setContactTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Tell us more</label>
            <Textarea 
              name="message" 
              placeholder="" 
              aria-label="Message" 
              className="min-h-40" 
              required 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
        </div>
        
        <Button disabled={loading} type="submit" className="justify-center">
          {loading ? "Sending…" : isPaymentSuccess ? "Send Payment Confirmation" : "Send"}
        </Button>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading contact form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
