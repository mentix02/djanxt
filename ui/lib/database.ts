import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { varchar, bigint, pgTable, boolean, timestamp } from "drizzle-orm/pg-core";

export const pgPool = new Pool({ connectionString: process.env.DATABASE_URL });

const db = drizzle({ client: pgPool });

export const userTable = pgTable("user_user", {
  image: varchar({ length: 200 }),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 254 }).notNull(),
  password: varchar({ length: 128 }).notNull(),

  is_staff: boolean().notNull().default(false),
  is_active: boolean().notNull().default(true),
  is_superuser: boolean().notNull().default(false),
  email_verified: boolean()
    .notNull()
    .$default(() => false),

  last_login: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
  date_joined: timestamp({ withTimezone: true })
    .notNull()
    .$default(() => new Date()),

  access_key: varchar({ length: 32 }).notNull(),
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
});

export default db;
