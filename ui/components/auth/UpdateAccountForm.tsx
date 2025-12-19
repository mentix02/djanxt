"use client";

import { User } from "better-auth";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import SetNewPassword from "@/components/auth/SetNewPassword";
import UpdatePassword from "@/components/auth/UpdatePassword";
import UpdatePersonalInformation from "@/components/auth/UpdatePersonalInformation";

interface UpdateAccountFormProps {
  user: User;
  hasPassword: boolean;
}

export default function UpdateAccountForm({ user, hasPassword }: UpdateAccountFormProps) {
  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="90dvh">
      <Grid size={{ xs: 12, sm: 12, md: 8, lg: 6 }} padding={3}>
        <Card variant="outlined">
          <CardContent>
            <Grid container padding={2} spacing={4}>
              {/* Profile Header */}
              <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                <Avatar
                  alt={user.name || "User"}
                  src={user.image || undefined}
                  sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Grid>

              {/* Name Update Section */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <UpdatePersonalInformation name={user.name} />
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
