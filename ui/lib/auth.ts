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

  // Social Providers
  // Uncomment and configure the providers you want to use.
  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
  },
  // Plugins
  plugins: [nextCookies()],
  // Email & password configuration.
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Set last_login after a successful sign-in
      if (ctx.path !== "/sign-in/email" && ctx.path !== "/callback/:id") return;
      const context = ctx.context;

      if (context.session?.user) {
        await db
          .update(userTable)
          .set({ last_login: new Date() })
          .where(eq(userTable.id, parseInt(context.session.user.id!)));
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, context) => {
          if (!context || !context.body || !context.body.password) return { data: user };

          const hashedPassword = await context?.context.password.hash(context.body.password);
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
  // Session management
  session: {
    modelName: "better_auth_session",
    cookieCache: { enabled: true, maxAge: 5 * 60 }, // 5 minutes
  },

  // Core database schema config.
  account: { modelName: "better_auth_account", accountLinking: { enabled: true } },
  verification: { modelName: "better_auth_verification" },
  user: {
    modelName: "user_user", // Django naming convention: appName_modelName
    fields: {
      updatedAt: "updated_at",
      createdAt: "date_joined",
      emailVerified: "email_verified",
    },
    additionalFields: {
      last_login: { type: "date", required: false, input: false },
      password: { type: "string", required: false, input: false, defaultValue: "" },
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

export type Session = typeof auth.$Infer.Session;
