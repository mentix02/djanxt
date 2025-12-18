"use client";

import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";

import authClient, { useSession } from "@/lib/auth-client";
import SetNewPassword from "@/components/auth/SetNewPassword";
import UpdatePassword from "@/components/auth/UpdatePassword";
import UpdatePersonalInformation from "@/components/auth/UpdatePersonalInformation";

export default function UpdateAccountForm() {
  const { data: session } = useSession();

  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    authClient.listAccounts().then(({ data }) => {
      if (isMounted) {
        const account = data?.find((account) => account.providerId === "credential");
        setHasPassword(!!account);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [session]);

  if (hasPassword === null) {
    return (
      <Grid container justifyContent="center" alignItems="center" minHeight="90dvh">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="90dvh">
      <Grid size={{ xs: 12, sm: 12, md: 8, lg: 6 }} padding={3}>
        <Card variant="outlined">
          <CardContent>
            <Grid container padding={2} spacing={4}>
              {/* Profile Header */}
              <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                <Avatar
                  alt={session?.user.name || "User"}
                  src={session?.user.image || undefined}
                  sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {session?.user.email}
                </Typography>
              </Grid>

              {/* Name Update Section */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <UpdatePersonalInformation name={session!.user.name} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider />
              </Grid>

              {/* Password Section */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  {hasPassword ? "Change Password" : "Set a Password for Your Account"}
                </Typography>

                {hasPassword ? (
                  // Change Password
                  <UpdatePassword />
                ) : (
                  // Set Password
                  <SetNewPassword />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
