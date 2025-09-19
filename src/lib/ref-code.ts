import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

function makeRefCode() {
  return `TL-${Math.random().toString(36).slice(2,7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
}

export async function ensureUserRefCode(userId: string): Promise<string> {
  const rows = await db.select({ refCode: userTable.refCode }).from(userTable).where(eq(userTable.id, userId)).limit(1);
  const existing = rows?.[0]?.refCode;
  if (existing) return existing;
  const code = makeRefCode();
  await db.update(userTable).set({ refCode: code }).where(eq(userTable.id, userId));
  return code;
}

export async function getUserRefCode(userId: string): Promise<string | null> {
  const rows = await db.select({ refCode: userTable.refCode }).from(userTable).where(eq(userTable.id, userId)).limit(1);
  return rows?.[0]?.refCode ?? null;
}
