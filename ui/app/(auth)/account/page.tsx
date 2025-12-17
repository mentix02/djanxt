import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { auth } from "@/lib/auth";
import UpdateAccountForm from "@/components/auth/UpdateAccountForm";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login?next=/account");

  return (
    <Grid container alignItems="center" justifyContent="center" minHeight="90dvh">
      <Grid size={{ xs: 12, sm: 12, md: 8, lg: 6 }}>
        <Paper
          elevation={3}
          sx={{
            boxShadow: 4,
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
          }}
        >
          <UpdateAccountForm />
        </Paper>
      </Grid>
    </Grid>
  );
}
