import { auth, clerkClient } from "@clerk/nextjs/server";
import { ensureUserRefCode } from "@/lib/ref-code";

export async function GET() {
  const { userId, sessionClaims } = await auth();
  if (!userId) return Response.json({ user: null });

  // Prefer Clerk metadata; ensure a fallback exists in DB as well
  let refCode: string | null = null;
  let meta: any = {};
  try {
    // Check Clerk metadata first
    const user = await clerkClient.users.getUser(userId);
    meta = (user as any)?.unsafeMetadata || {};
    refCode = (meta as any)?.refCode ?? null;
    if (!refCode) {
      // Generate and persist a new refCode
      const generated = await ensureUserRefCode(userId).catch(() => null);
      refCode = generated || `TL-${Math.random().toString(36).slice(2,7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      await clerkClient.users.updateUser(userId, {
        unsafeMetadata: { ...(meta as any), refCode },
      });
    }
  } catch {
    refCode = null;
  }

  return Response.json({
    user: {
      id: userId,
      name: (sessionClaims as any)?.name ?? null,
      email: (sessionClaims as any)?.email ?? null,
      refCode,
      phone: meta?.phone ?? null,
      lastPayment: meta?.lastPayment ?? null,
      payments: Array.isArray(meta?.payments) ? meta?.payments : [],
    },
  });
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { name, phone } = body as { name?: string; phone?: string };
  try {
    const user = await clerkClient.users.getUser(userId);
    const currentMeta = (user as any)?.unsafeMetadata || {};
    const updates: any = {};
    if (typeof name === "string" && name.trim()) {
      // Split name into first/last heuristically
      const parts = name.trim().split(/\s+/);
      updates.firstName = parts[0];
      updates.lastName = parts.slice(1).join(" ") || null;
    }
    if (typeof phone === "string") {
      updates.unsafeMetadata = { ...currentMeta, phone };
    }
    if (Object.keys(updates).length > 0) {
      await clerkClient.users.updateUser(userId, updates);
    }
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: "Failed to update profile" }, { status: 500 });
  }
}
