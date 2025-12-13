import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

// Plugins
// import { oneTapClient } from "better-auth/client/plugins";

import { auth } from "@/lib/auth";

// const GOOGLE_CLIENT_ID = "";

const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    // Uncomment to enable one tap sign-in by Google
    // oneTapClient({ clientId: GOOGLE_CLIENT_ID }),
  ],
});

export const { useSession, signIn, signOut, signUp } = authClient;

export type Session = typeof authClient.$Infer.Session;

export default authClient;
