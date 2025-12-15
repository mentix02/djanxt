import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";

// Plugins
// import { oneTapClient } from "better-auth/client/plugins";

import type { auth } from "@/lib/auth";

// const GOOGLE_CLIENT_ID = "";

const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
    // Uncomment to enable one tap sign-in by Google
    // oneTapClient({ clientId: GOOGLE_CLIENT_ID }),
  ],
});

export const { useSession, signIn, signOut, signUp } = authClient;

export type Session = typeof authClient.$Infer.Session;

export default authClient;
