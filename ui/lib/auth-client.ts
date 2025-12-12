import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

import { auth } from "@/lib/auth";

const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { useSession, signIn, signOut, signUp } = authClient;

export type Session = typeof authClient.$Infer.Session;

export default authClient;
