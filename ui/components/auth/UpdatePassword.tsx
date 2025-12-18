"use client";

import Grid from "@mui/material/Grid";

import { enqueueSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@mui/material/Button";
import authClient from "@/lib/auth-client";
import { UpdatePasswordSchema, UpdatePasswordData } from "@/actions/auth/types";

export default function UpdatePassword() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const updatePasswordHandler: SubmitHandler<UpdatePasswordData> = async (values) => {
    await authClient.changePassword({ ...values, revokeOtherSessions: true });
    enqueueSnackbar("Password updated successfully", { variant: "success" });
  };

  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit(updatePasswordHandler)}>
      <Grid size={12}>
        <TextFieldElement
          fullWidth
          size="small"
          type="password"
          control={control}
          name="currentPassword"
          label="Current Password"
        />
      </Grid>

      <Grid size={6}>
        <TextFieldElement
          fullWidth
          size="small"
          type="password"
          control={control}
          name="newPassword"
          label="New Password"
        />
      </Grid>

      <Grid size={6}>
        <TextFieldElement
          fullWidth
          size="small"
          type="password"
          control={control}
          name="newPasswordConfirm"
          label="Confirm New Password"
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Button type="submit" color="primary" variant="contained" loading={isSubmitting}>
          {isSubmitting ? "Setting..." : "Set Password"}
        </Button>
      </Grid>
    </Grid>
  );
}
