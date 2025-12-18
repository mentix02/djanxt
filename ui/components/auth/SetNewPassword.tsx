"use client";

import Grid from "@mui/material/Grid";

import { enqueueSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import { useForm, SubmitHandler } from "react-hook-form";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { SetPasswordData, SetPasswordSchema } from "@/actions/auth/types";

import { setPassword } from "@/actions/auth/actions";

export default function SetNewPassword() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(SetPasswordSchema),
  });

  const setPasswordHandler: SubmitHandler<SetPasswordData> = async (values) => {
    await setPassword(values.password);
    enqueueSnackbar("Password set successfully", { variant: "success" });
    reset();
  };

  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit(setPasswordHandler)}>
      <Grid size={{ xs: 12 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          You don't have a password set. Create one to log in with email/password.
        </Alert>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextFieldElement
          fullWidth
          size="small"
          type="password"
          name="password"
          control={control}
          label="New Password"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextFieldElement
          fullWidth
          size="small"
          type="password"
          control={control}
          name="confirmPassword"
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
