import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { z } from "zod";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

type Plan = "monthly" | "annual";
const subjectKeys = ["biology", "chemistry", "maths"] as const;
type SubjectKey = typeof subjectKeys[number];

function monthlyPriceFor(count: number) {
  if (count <= 0) return 0;
  if (count === 1) return 29;
  if (count === 2) return 49;
  return 69;
}

function computeAmount(plan: Plan, selectedCount: number) {
  const monthly = monthlyPriceFor(selectedCount);
  const gbp = plan === "monthly" ? monthly : Math.round(monthly * 12 * 0.75);
  return gbp;
}

export async function POST(req: Request) {
  if (!stripe) {
    return Response.json({ ok: false, error: "Stripe is not configured" }, { status: 500 });
  }

  const { userId } = await auth();
  if (!userId) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const Schema = z.object({
    plan: z.enum(["monthly", "annual"]).default("monthly"),
    subjects: z.array(z.enum(subjectKeys)).nonempty(),
    // Optional return URLs to override
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
  });

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const { plan, subjects, successUrl, cancelUrl } = parsed.data;
  const selectedCount = subjects.length;
  const amountGbp = computeAmount(plan as Plan, selectedCount);

  if (amountGbp <= 0) {
    return Response.json({ ok: false, error: "No subjects selected" }, { status: 400 });
  }

  const url = new URL(req.url);
  const origin = req.headers.get("origin") || `${url.protocol}//${url.host}`;
  const defaultSuccess = `${origin}/payment/success`;
  const defaultCancel = `${origin}/checkout?plan=${plan}&subjects=${subjects.join(",")}`;

  try {
    const sessionConfig: any = {
      mode: plan === "monthly" ? "subscription" : "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Tutor Lab ${plan === "monthly" ? "Monthly" : "Annual"} Plan`,
              description: `Subjects: ${subjects.join(", ")}`,
            },
            unit_amount: amountGbp * 100, // pence
            recurring: plan === "monthly" ? { interval: "month" } : undefined,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || defaultSuccess,
      cancel_url: cancelUrl || defaultCancel,
      metadata: {
        userId,
        plan,
        subjects: subjects.join(","),
        amountGbp: String(amountGbp),
      },
      allow_promotion_codes: true,
    };

    // Only add customer_creation for payment mode (annual), not subscription mode (monthly)
    if (plan !== "monthly") {
      sessionConfig.customer_creation = "if_required";
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return Response.json({ ok: true, url: session.url });
  } catch (e: any) {
    console.error("Stripe session create error", e);
    return Response.json({ ok: false, error: e?.message || "Failed to create checkout" }, { status: 500 });
  }
}
