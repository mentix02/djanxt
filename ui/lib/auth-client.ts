import { createAuthClient } from "better-auth/react";

// Plugins
import { jwtClient, adminClient, customSessionClient, inferAdditionalFields } from "better-auth/client/plugins";

import type { auth } from "@/lib/auth";

const authClient = createAuthClient({
  plugins: [
    adminClient(),
    jwtClient({
      jwks: { jwksPath: process.env.NEXT_PUBLIC_JWK_ENDPOINT },
    }),
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
  ],
});

export const { useSession, signIn, signOut, signUp } = authClient;

export type Session = typeof authClient.$Infer.Session;

export default authClient;
