import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

export async function POST(req: Request) {
  console.log("🔗 Webhook received!");
  
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    console.error("❌ Stripe not configured");
    return new Response("Stripe not configured", { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  
  console.log("📝 Webhook signature:", sig ? "present" : "missing");
  console.log("📦 Webhook body length:", body.length);
  
  let event: Stripe.Event;
  try {
    // For local testing, we'll be more lenient with webhook verification
    if (process.env.NODE_ENV === 'development' && !sig) {
      // In development without webhook signature, parse the body directly
      console.log("🚨 Development mode: parsing webhook without signature verification");
      event = JSON.parse(body);
    } else {
      event = stripe.webhooks.constructEvent(body, sig as string, STRIPE_WEBHOOK_SECRET);
    }
    console.log("✅ Webhook signature verified, event type:", event.type);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed.", err?.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};
      const userId = metadata.userId as string | undefined;
      const plan = metadata.plan as string | undefined;
      const subjects = (metadata.subjects as string | undefined) || "";
      const amountGbp = metadata.amountGbp as string | undefined;
      let receiptUrl: string | null = null;
      let hostedInvoiceUrl: string | null = null;

      if (userId) {
        console.log("👤 Processing payment for user:", userId);
        try {
          const user = await clerkClient.users.getUser(userId);
          const currentMeta: any = (user as any)?.unsafeMetadata || {};
          const payments: any[] = Array.isArray(currentMeta.payments) ? currentMeta.payments : [];
          
          console.log("💾 Current metadata:", JSON.stringify(currentMeta, null, 2));
          console.log("📊 Existing payments count:", payments.length);
          
          // Try to find a receipt/invoice URL
          let invoicePdf: string | null = null;
          try {
            if (session.mode === "payment" && typeof session.payment_intent === "string") {
              const pi = await stripe.paymentIntents.retrieve(session.payment_intent);
              const piAny: any = pi as any;
              const chargeId = (piAny.charges?.data?.[0]?.id) as string | undefined;
              if (chargeId) {
                const charge = await stripe.charges.retrieve(chargeId);
                receiptUrl = (charge as any)?.receipt_url || null;
              }
            } else if (session.mode === "subscription") {
              const invoiceId = typeof session.invoice === "string" ? session.invoice : undefined;
              if (invoiceId) {
                const inv = await stripe.invoices.retrieve(invoiceId);
                invoicePdf = inv.invoice_pdf || null;
                hostedInvoiceUrl = inv.hosted_invoice_url || null;
              }
            }
          } catch (e) {
            // non-fatal
            console.error("Failed to retrieve receipt/invoice", e);
          }

          const record = {
            id: session.id,
            createdAt: new Date().toISOString(),
            plan,
            subjects,
            amountGbp,
            status: session.payment_status || "paid",
            url: session.url || null,
            customer_email: session.customer_details?.email || null,
            currency: session.currency,
            receiptUrl,
            invoicePdf,
            hostedInvoiceUrl,
            // Generate unique payment/invoice codes
            invoiceCode: `INV-${session.id.slice(-8).toUpperCase()}-${new Date().getFullYear()}`,
            paymentCode: `PAY-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Date.now().toString().slice(-4)}`,
          };
          
          console.log("📄 New payment record:", JSON.stringify(record, null, 2));
          
          payments.unshift(record);
          const updated = { ...currentMeta, lastPayment: record, payments };
          
          console.log("🔄 Updating user metadata...");
          await clerkClient.users.updateUser(userId, { unsafeMetadata: updated });
          console.log("✅ User metadata updated successfully!");
          
        } catch (e) {
          console.error("❌ Failed to update Clerk metadata for user", userId, e);
        }
      } else {
        console.log("⚠️ No userId found in session metadata");
      }

      // Optional: notify admin via Resend
      try {
        if (CONTACT_EMAIL && process.env.RESEND_API_KEY) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Tutor Lab <onboarding@resend.dev>",
              to: CONTACT_EMAIL,
              subject: `Payment received: ${plan} - £${amountGbp} (Stripe)` ,
              text: `User: ${userId || "unknown"}\nSession: ${session.id}\nPlan: ${plan}\nSubjects: ${subjects}\nAmount: £${amountGbp}\nEmail: ${session.customer_details?.email || ""}`,
            }),
          });
        }
      } catch (e) {
        console.error("Failed to send admin payment email", e);
      }

      // Optional: send receipt to customer
      try {
        const customerEmail = session.customer_details?.email;
        if (customerEmail && process.env.RESEND_API_KEY) {
          const lines: string[] = [];
          lines.push(`Thank you for your payment to Tutor Lab.`);
          lines.push("");
          lines.push(`Plan: ${plan}`);
          lines.push(`Subjects: ${subjects}`);
          lines.push(`Amount: £${amountGbp}`);
          if (receiptUrl) lines.push(`Receipt: ${receiptUrl}`);
          if (hostedInvoiceUrl) lines.push(`Invoice: ${hostedInvoiceUrl}`);
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Tutor Lab <onboarding@resend.dev>",
              to: customerEmail,
              subject: `Your Tutor Lab receipt`,
              text: lines.join("\n"),
            }),
          });
        }
      } catch (e) {
        console.error("Failed to send customer receipt email", e);
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error("Webhook handling error", e);
    return new Response("server error", { status: 500 });
  }
}
