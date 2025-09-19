"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { Check, FileText, Mail, ArrowRight, Download } from "lucide-react";

function PaymentSuccessInner() {
  const search = useSearchParams();
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useClerkUser() as any;

  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [invoiceCode, setInvoiceCode] = useState<string>("");

  useEffect(() => {
    // Always check for session_id in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    if (sessionId) {
      setLoading(true);
      fetch(`/api/stripe/session?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.session) {
            // Extract payment info from Stripe session
            const session = data.session;
            const lineItem = session.line_items?.data?.[0];
            const plan = lineItem?.description || session.metadata?.plan || "";
            const subjects = session.metadata?.subjects || "";
            const amountGbp = session.amount_total ? (session.amount_total / 100).toString() : "";
            const createdAt = session.created ? new Date(session.created * 1000).toISOString() : new Date().toISOString();
            const paymentId = session.id;
            const receiptUrl = session.payment_intent?.charges?.data?.[0]?.receipt_url || "";
            const paymentInfo = {
              id: paymentId,
              createdAt,
              plan,
              subjects,
              amountGbp,
              status: session.payment_status,
              receiptUrl,
            };
            setPaymentData(paymentInfo);
            setInvoiceCode(`INV-${paymentId.slice(-8).toUpperCase()}-${new Date().getFullYear()}`);
          } else {
            setPaymentData(null);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Stripe session:", error);
          setLoading(false);
        });
    } else if (isLoaded && isSignedIn) {
      // Fallback: fetch from /api/me if signed in and no session_id
      fetch("/api/me", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => {
          const lastPayment = d?.user?.lastPayment;
          if (lastPayment) {
            setPaymentData(lastPayment);
            setInvoiceCode(`INV-${lastPayment.id.slice(-8).toUpperCase()}-${new Date().getFullYear()}`);
          } else {
            setPaymentData(null);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  const handleContactRedirect = () => {
    const params = new URLSearchParams();
    params.set("payment_success", "true");
    params.set("invoice_code", invoiceCode);
    if (paymentData) {
      params.set("plan", paymentData.plan || "");
      params.set("subjects", paymentData.subjects || "");
      params.set("amount", paymentData.amountGbp || "");
      params.set("payment_id", paymentData.id || "");
    }
    if (user?.primaryEmailAddress?.emailAddress) {
      params.set("email", user.primaryEmailAddress.emailAddress);
    }
    if (user?.fullName) {
      params.set("name", user.fullName);
    }
    router.push(`/contact?${params.toString()}`);
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5 py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your payment has been processed successfully.</p>
        </div>

        {paymentData && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Payment Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice Code:</span>
                <span className="font-mono font-medium">{invoiceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="capitalize">{paymentData.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subjects:</span>
                <span>{paymentData.subjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-semibold">£{paymentData.amountGbp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Date:</span>
                <span>{new Date(paymentData.createdAt).toLocaleDateString()}</span>
              </div>
              {paymentData.receiptUrl && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt:</span>
                  <a href={paymentData.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View Receipt
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => window.open(`/api/invoice?payment_id=${paymentData.id}`, '_blank')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <p className="text-blue-800 mb-4">
            To get started with your tutoring plan, please contact us with your payment details. 
            We'll send you a confirmation email with your invoice and next steps.
          </p>
          <button
            onClick={handleContactRedirect}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Us for Confirmation
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <PaymentSuccessInner />
    </Suspense>
  );
}