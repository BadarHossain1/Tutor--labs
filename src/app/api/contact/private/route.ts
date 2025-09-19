import { z } from "zod";

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
    const ContactSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(7),
      subject: z.string().optional().default(""),
      board: z.string().optional().default(""),
      goals: z.string().min(5),
      availability: z.string().optional().default(""),
      budget: z.string().optional().default(""),
      preferredDays: z.string().optional().default(""),
      message: z.string().min(10),
      refCode: z.string().optional().nullable(),
    });
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !CONTACT_EMAIL) {
      return Response.json({ ok: false, error: "Server email is not configured" }, { status: 500 });
    }

  const refCode = parsed.data.refCode ?? null;

    const { name, email, phone, subject, board, goals, availability, budget, preferredDays, message } = parsed.data;
  const mailSubject = `Private Tutoring enquiry: ${name}`;
    const text = `From: ${name} <${email}>
Phone: ${phone}
Subject/Course: ${subject}
Exam Board: ${board}
Goals: ${goals}
Availability: ${availability}
Preferred Days: ${preferredDays}
Budget: ${budget}
User Ref Code: ${refCode ?? "(guest)"}

${message}`;
    const html = `
      <table width="100%" cellpadding="0" cellspacing="0" style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; line-height:1.6; color:#0f172a; background:#f8fafc; padding:24px;">
        <tr>
          <td align="center">
            <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
              <tr>
                <td style="padding:20px 24px; border-bottom:1px solid #e5e7eb;">
                  <h2 style="margin:0; font-size:20px;">Private Tutoring enquiry</h2>
                </td>
              </tr>
              <tr><td style="padding:16px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  <tr><td style="color:#64748b; width:160px;">Name</td><td><strong>${name}</strong></td></tr>
                  <tr><td style="color:#64748b;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
                  <tr><td style="color:#64748b;">Phone</td><td><a href="tel:${phone}">${phone}</a></td></tr>
                  ${refCode ? `<tr><td style="color:#64748b;">User Ref Code</td><td>${refCode}</td></tr>` : ""}
                  <tr><td style="color:#64748b;">Subject/Course</td><td>${subject}</td></tr>
                  <tr><td style="color:#64748b;">Exam Board</td><td>${board}</td></tr>
                  <tr><td style="color:#64748b;">Goals</td><td>${goals}</td></tr>
                  <tr><td style="color:#64748b;">Availability</td><td>${availability}</td></tr>
                  <tr><td style="color:#64748b;">Preferred Days</td><td>${preferredDays}</td></tr>
                  <tr><td style="color:#64748b;">Budget</td><td>${budget}</td></tr>
                </table>
                <div style="height:1px; background:#e5e7eb; margin:16px 0;"></div>
                <div>
                  <div style="color:#64748b; font-size:12px;">Message</div>
                  <div style="white-space:pre-wrap; margin-top:6px; font-size:14px;">${message}</div>
                </div>
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
    `;

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
    if (!resp.ok) {
      console.error("Resend REST error", out);
      return Response.json({ ok: false, error: out?.message || "Failed to send email" }, { status: 502 });
    }
    return Response.json({ ok: true, id: out?.id });
  } catch (e) {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
