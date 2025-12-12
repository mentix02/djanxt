// import { redis } from "bun";
import * as crypto from "crypto";

import { eq } from "drizzle-orm";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";

import db, { pgPool, userTable } from "@/lib/database";

const DJ_ARGON_PREFIX = "argon2";

export const auth = betterAuth({
  // Storages
  database: pgPool,
  advanced: { database: { generateId: "serial" } },
  // Uncomment the secondaryStorage object and the redis import at the top
  // to use an in-memory storage for faster session management. Note: some
  // migrations with the BetterAuth CLI tool may not work because Bun doesn't support
  // better-sqlite - and the CLI needs it. It's dumb, I know. To generate schemas
  // and process the migrations, just uncomment the Bun import and the secondaryStorage.

  // secondaryStorage: {
  //   get: async (key: string) => await redis.get(key),
  //   delete: async (key: string) => void (await redis.del(key)),
  //   set: async (key: string, value: string, ttl?: number) =>
  //     await (ttl ? redis.set(key, value, "EX", ttl) : redis.set(key, value)),
  // },

  // Plugins
  plugins: [nextCookies()],
  // Email & password configuration.
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Set last_login after a successful sign-in
      if (ctx.path !== "/sign-in/email") return;
      const context = ctx.context;
      await db
        .update(userTable)
        .set({ last_login: new Date() })
        .where(eq(userTable.id, parseInt(context.session?.user.id!)));
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, context) => {
          const hashedPassword = await context?.context.password.hash(context?.body.password);
          const userWithPassword = { ...user, password: hashedPassword };
          return { data: userWithPassword };
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => DJ_ARGON_PREFIX + (await Bun.password.hash(password, "argon2id")),
      verify: async ({ hash, password }): Promise<boolean> =>
        await Bun.password.verify(
          password,
          hash.startsWith(DJ_ARGON_PREFIX) ? hash.substring(DJ_ARGON_PREFIX.length) : hash,
          "argon2id",
        ),
    },
  },
  // Core database schema config.
  session: { modelName: "better_auth_session" },
  account: { modelName: "better_auth_account" },
  verification: { modelName: "better_auth_verification" },
  user: {
    modelName: "user_user", // Django naming convention: appName_modelName
    fields: {
      updatedAt: "updated_at",
      createdAt: "date_joined",
      emailVerified: "email_verified",
    },
    additionalFields: {
      password: { type: "string", required: true, input: false },
      last_login: { type: "date", required: false, input: false },
      is_staff: { type: "boolean", defaultValue: false, required: true, input: false },
      is_active: { type: "boolean", defaultValue: true, required: true, input: false },
      is_superuser: { type: "boolean", defaultValue: false, required: true, input: false },
      access_key: {
        type: "string",
        required: true,
        input: false,
        defaultValue: () => crypto.randomBytes(24).toString("base64url"),
      },
    },
  },
});
