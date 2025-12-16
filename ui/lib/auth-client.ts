import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";

// Plugins
import type { auth } from "@/lib/auth";

const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), customSessionClient<typeof auth>()],
});

export const { useSession, signIn, signOut, signUp } = authClient;

export type Session = typeof authClient.$Infer.Session;

export default authClient;
