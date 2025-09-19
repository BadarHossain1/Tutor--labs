import { z } from "zod";
import { getUserRefCode } from "@/lib/ref-code";
import { auth as clerkAuth } from "@clerk/nextjs/server";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const runtime = "nodejs";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

export async function POST(req: Request) {
  try {
    console.log("📧 Contact form submission received");
    
    const ContactSchema = z.object({
      name: z.string().min(2, "Please enter your name"),
      email: z.string().email("Please enter a valid email"),
      phone: z.string().min(7, "Please enter a valid phone number"),
      subjects: z.array(z.string()).optional().default([]),
      services: z.array(z.string()).optional().default([]),
      budget: z.string().optional().default(""),
      board: z.string().optional().default(""),
      contactMethod: z.string().optional().default("email"),
      contactTime: z.string().optional().default(""),
      message: z.string().min(10, "Message should be at least 10 characters"),
      // Payment confirmation fields
      paymentData: z.object({
        invoiceCode: z.string().optional().nullable(),
        plan: z.string().optional().nullable(),
        subjects: z.string().optional().nullable(),
        amount: z.string().optional().nullable(),
        paymentId: z.string().optional().nullable(),
      }).optional(),
      isPaymentConfirmation: z.boolean().optional().default(false),
    });
    
    const body = await req.json();
    console.log("📄 Contact form data received:", JSON.stringify(body, null, 2));
    
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      console.error("❌ Contact form validation failed:", parsed.error.flatten());
      return Response.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    console.log("✅ Contact form validation passed");

    if (!process.env.RESEND_API_KEY || !CONTACT_EMAIL) {
      console.error("❌ Email configuration missing");
      return Response.json({ ok: false, error: "Server email is not configured" }, { status: 500 });
    }

    console.log("✅ Email configuration available");

  const { userId } = await clerkAuth();
  const refCode = userId ? await getUserRefCode(userId) : null;

  const { name, email, phone, subjects, services, budget, board, contactMethod, contactTime, message, paymentData, isPaymentConfirmation } = parsed.data;
    
    const isPayment = isPaymentConfirmation && paymentData;
    const mailSubject = isPayment 
      ? `Payment Confirmation: ${paymentData.invoiceCode} - ${name}`
      : `New enquiry from ${name} (${services && services.length > 0 ? services.join(", ") : "General"})`;
    
  let text = `From: ${name} <${email}>
Phone: ${phone}
Preferred: ${contactMethod}${contactTime ? ` (${contactTime})` : ""}
Subjects: ${subjects && subjects.length > 0 ? subjects.join(", ") : ""}
Services: ${services && services.length > 0 ? services.join(", ") : ""}
Budget: ${budget}
Board: ${board}`;

    if (isPayment) {
      text += `

PAYMENT DETAILS:
Invoice Code: ${paymentData.invoiceCode}
Plan: ${paymentData.plan}
Subjects: ${paymentData.subjects}
Amount: £${paymentData.amount}
Payment ID: ${paymentData.paymentId}`;
    }

    text += `

${message}`;

    const html = `
      <table width="100%" cellpadding="0" cellspacing="0" style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; line-height:1.6; color:#0f172a; background:#f8fafc; padding:24px;">
        <tr>
          <td align="center">
            <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
              <tr>
                <td style="padding:20px 24px; border-bottom:1px solid #e5e7eb;">
                  <h2 style="margin:0; font-size:20px;">${isPayment ? '💳 Payment Confirmation' : '📧 New contact enquiry'}</h2>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                    <tr><td style="color:#64748b; width:160px;">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
                    <tr><td style="color:#64748b;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
                    <tr><td style="color:#64748b;">Phone</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
                    <tr><td style="color:#64748b;">Preferred contact</td><td>${escapeHtml(contactMethod)}${contactTime ? ` (${escapeHtml(contactTime)})` : ""}</td></tr>
                    <tr><td style="color:#64748b;">Subject / Course</td><td>${subjects && subjects.length > 0 ? subjects.map(escapeHtml).join(", ") : ""}</td></tr>
                    <tr><td style="color:#64748b;">Service</td><td>${services && services.length > 0 ? services.map(escapeHtml).join(", ") : ""}</td></tr>
                    <tr><td style="color:#64748b;">Budget</td><td>${escapeHtml(budget)}</td></tr>
                    <tr><td style="color:#64748b;">Exam board</td><td>${escapeHtml(board)}</td></tr>
                  </table>
                  ${refCode ? `<div style="margin-top:10px; color:#64748b; font-size:12px;">User Ref: <span style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace">${escapeHtml(refCode)}</span></div>` : ""}
                  
                  ${isPayment ? `
                  <div style="margin:16px 0; padding:16px; background:#f0f9ff; border:1px solid #0ea5e9; border-radius:8px;">
                    <h3 style="margin:0 0 12px 0; color:#0369a1; font-size:16px;">💳 Payment Information</h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                      <tr><td style="color:#64748b; width:120px;">Invoice Code</td><td><strong style="color:#0369a1;">${escapeHtml(paymentData.invoiceCode || '')}</strong></td></tr>
                      <tr><td style="color:#64748b;">Plan</td><td>${escapeHtml(paymentData.plan || '')}</td></tr>
                      <tr><td style="color:#64748b;">Subjects</td><td>${escapeHtml(paymentData.subjects || '')}</td></tr>
                      <tr><td style="color:#64748b;">Amount</td><td><strong>£${escapeHtml(paymentData.amount || '')}</strong></td></tr>
                      <tr><td style="color:#64748b;">Payment ID</td><td style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace; font-size:12px;">${escapeHtml(paymentData.paymentId || '')}</td></tr>
                    </table>
                  </div>
                  ` : ''}
                  
                  <div style="height:1px; background:#e5e7eb; margin:16px 0;"></div>
                  <div>
                    <div style="color:#64748b; font-size:12px;">Message</div>
                    <div style="white-space:pre-wrap; margin-top:6px; font-size:14px;">${escapeHtml(message)}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 24px; background:#f8fafc; color:#64748b; font-size:12px; border-top:1px solid #e5e7eb;">
                  ${isPayment ? 'Payment confirmation from Tutor Lab' : 'Sent from Tutor Lab contact form'}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    try {
      console.log("📤 Attempting to send email to:", CONTACT_EMAIL);
      console.log("📤 Email subject:", mailSubject);
      
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Tutor Lab <onboarding@resend.dev>",
          to: CONTACT_EMAIL,
          subject: mailSubject,
          text,
          html,
          reply_to: email,
        }),
      });
      
      const out = await resp.json().catch(() => ({}));
      console.log("📧 Resend API response status:", resp.status);
      console.log("📧 Resend API response:", out);
      
      if (!resp.ok) {
        console.error("❌ Resend REST error", out);
        return Response.json(
          { ok: false, error: out?.message || "Failed to send email" },
          { status: 502 }
        );
      }
      
      console.log("✅ Email sent successfully with ID:", out?.id);
      return Response.json({ ok: true, id: out?.id, receivedAt: new Date().toISOString() });
    } catch (e: any) {
      console.error("❌ Resend fetch error", e);
      const msg = e?.message || "Failed to send email";
      return Response.json({ ok: false, error: msg }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact route error", err);
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
