import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login?next=/account");

  const user = session.user;

  return (
    <Grid container alignItems="center" justifyContent="center" minHeight="90dvh">
      <Grid size={{ xs: 8, md: 8, lg: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <Typography variant="h5" component="h1" align="center">
            Welcome to your account, {user.name}!
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
