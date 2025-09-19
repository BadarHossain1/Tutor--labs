import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET() {
  console.log("🧪 Test webhook called via GET!");
  
  try {
    // Copy the exact pattern from /api/me
    const { userId } = await auth();
    
    if (!userId) {
      return Response.json({ error: "Must be logged in to test webhook" }, { status: 401 });
    }

    console.log("� Processing test payment for user:", userId);
    
    // Use exact same pattern as /api/me
    const user = await clerkClient.users.getUser(userId);
    const meta: any = (user as any)?.unsafeMetadata || {};
    const payments: any[] = Array.isArray(meta.payments) ? meta.payments : [];
    
    console.log("💾 Current metadata:", JSON.stringify(meta, null, 2));
    console.log("📊 Existing payments count:", payments.length);

    // Simulate a Stripe checkout session completed event
    const testSession = {
      id: `cs_test_${Date.now()}`,
      payment_status: "paid",
      customer_details: {
        email: user.primaryEmailAddress?.emailAddress || "test@example.com"
      },
      currency: "gbp",
      metadata: {
        userId: userId,
        plan: "monthly",
        subjects: "biology,chemistry",
        amountGbp: "29.00"
      }
    };

    const record = {
      id: testSession.id,
      createdAt: new Date().toISOString(),
      plan: testSession.metadata.plan,
      subjects: testSession.metadata.subjects,
      amountGbp: testSession.metadata.amountGbp,
      status: testSession.payment_status,
      url: null,
      customer_email: testSession.customer_details?.email || null,
      currency: testSession.currency,
      receiptUrl: null,
      invoicePdf: null,
      hostedInvoiceUrl: null,
      // Generate unique payment/invoice codes
      invoiceCode: `INV-${testSession.id.slice(-8).toUpperCase()}-${new Date().getFullYear()}`,
      paymentCode: `PAY-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Date.now().toString().slice(-4)}`,
    };
    
    console.log("📄 New test payment record:", JSON.stringify(record, null, 2));
    
    payments.unshift(record);
    const updated = { ...meta, lastPayment: record, payments };
    
    console.log("🔄 Updating user metadata...");
    await clerkClient.users.updateUser(userId, { unsafeMetadata: updated });
    console.log("✅ User metadata updated successfully!");

    return Response.json({ 
      success: true, 
      message: "Test payment added successfully",
      record: record
    });
    
  } catch (error) {
    console.error("❌ Test webhook error:", error);
    return Response.json({ 
      error: "Test webhook failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}