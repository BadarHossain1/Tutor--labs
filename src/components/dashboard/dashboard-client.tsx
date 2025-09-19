"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser as useClerkUser, UserButton } from "@clerk/nextjs";
import { CreditCard, Receipt, Calendar, CheckCircle, Download } from "lucide-react";

export const DashboardClient = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useClerkUser() as any;
  const [refCode, setRefCode] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [lastPayment, setLastPayment] = useState<any | null>(null);
  const [payments, setPayments] = useState<any[]>([]);

  const testWebhook = async () => {
    try {
      console.log("Testing webhook...");
      const response = await fetch("/api/stripe/test-webhook", {
        method: "GET",
      });
      
      const result = await response.json();
      console.log("Test webhook result:", result);
      
      if (response.ok) {
        alert("Test payment added successfully! Check the dashboard.");
        // Refresh the user data by calling the effect
        window.location.reload();
      } else {
        alert(`Test failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Test webhook error:", error);
      alert("Test failed: Network error");
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login?redirect=/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/me", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => {
          const u = d?.user || {};
          setRefCode(u.refCode ?? null);
          setName(user?.fullName || "");
          setPhone(u.phone || "");
          setLastPayment(u.lastPayment || null);
          setPayments(Array.isArray(u.payments) ? u.payments.slice(0, 3) : []);
        })
        .catch(() => setRefCode(null));
    }
  }, [isSignedIn, user?.fullName]);

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error("Failed to save");
    } catch (e) {
      // no-op minimal handling
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) return <div className="container py-10">Loading...</div>;
  if (!isSignedIn) return null;

  return (
    <div className="container py-10 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, <span className="text-primary">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</span></h1>
          <p className="text-muted-foreground mt-2">Manage your tutoring plan and account settings.</p>
          {refCode && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Your reference:</span>
              <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{refCode}</code>
            </div>
          )}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-3">
              <button
                onClick={testWebhook}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              >
                🧪 Test Webhook (Dev Only)
              </button>
            </div>
          )}
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-card border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Your Progress
          </h2>
          <p className="text-muted-foreground">Courses & completion tracking coming soon.</p>
        </div>
        
        <div className="rounded-lg bg-card border p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input 
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input 
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <button 
              onClick={saveProfile} 
              disabled={saving} 
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>

        {/* Billing & Payments Section */}
        <div className="rounded-lg bg-card border p-6 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Billing & Payments
          </h2>
          
          {lastPayment ? (
            <div className="space-y-4">
              {/* Current Plan */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-800">Active Plan</span>
                  <span className="text-green-700 font-semibold">£{lastPayment.amountGbp}</span>
                </div>
                <div className="text-sm text-green-700">
                  <div className="capitalize">{lastPayment.plan} Plan</div>
                  <div>Subjects: {lastPayment.subjects}</div>
                  {lastPayment.invoiceCode && (
                    <div className="mt-2">
                      <span className="font-mono text-xs bg-green-100 px-2 py-1 rounded">
                        {lastPayment.invoiceCode}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <a 
                  href="/pricing" 
                  className="flex-1 text-center text-sm bg-muted hover:bg-muted/80 px-3 py-2 rounded-md transition-colors"
                >
                  Change Plan
                </a>
                <button
                  onClick={() => window.open(`/api/invoice?payment_id=${lastPayment.id}`, '_blank')}
                  className="flex-1 text-center text-sm bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Invoice
                </button>
                {lastPayment.receiptUrl && (
                  <a 
                    href={lastPayment.receiptUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md transition-colors"
                  >
                    View Receipt
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No active plan yet</p>
              <a 
                href="/pricing" 
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                View Pricing Plans
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Payment History (if any) */}
      {payments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Recent Payments
          </h3>
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="px-6 py-3 bg-muted/50 border-b">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground">
                <span>Date</span>
                <span>Plan</span>
                <span>Subjects</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
            </div>
            {payments.map((payment, i) => (
              <div key={payment.id || i} className="px-6 py-4 border-b last:border-b-0">
                <div className="grid grid-cols-6 gap-4 text-sm items-center">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </span>
                  <span className="capitalize">{payment.plan}</span>
                  <span>{payment.subjects}</span>
                  <span className="font-semibold">£{payment.amountGbp}</span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    Paid
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`/api/invoice?payment_id=${payment.id}`, '_blank')}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center gap-1"
                      title="Download Invoice"
                    >
                      <Download className="w-3 h-3" />
                      Invoice
                    </button>
                    {payment.receiptUrl && (
                      <a
                        href={payment.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
                        title="View Receipt"
                      >
                        <Receipt className="w-3 h-3" />
                        Receipt
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;