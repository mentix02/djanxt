"use server";

import { eq } from "drizzle-orm";
import { headers as NextHeaders } from "next/headers";

import { auth } from "@/lib/auth";
import db, { userTable, hashPassword } from "@/lib/database";

export const setPassword = async (password: string) => {
  const headers = await NextHeaders();

  const session = await auth.api.getSession({ headers });
  if (!session) throw new Error("Not authenticated");
  // Set password for BetterAuth's built-in authentication system
  await auth.api.setPassword({ body: { newPassword: password }, headers });

  // Set password for Django auth system for compatibility
  await db
    .update(userTable)
    .set({ password: await hashPassword(password) })
    .where(eq(userTable.id, parseInt(session.user.id)));
};
