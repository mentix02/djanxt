"use client";

import { useRef, useEffect } from "react";
import { redirect } from "next/navigation";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import { signUp, signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import { useForm, SubmitHandler } from "react-hook-form";

import Google from "@mui/icons-material/Google";

import NextLink from "@/components/Link";
import { SignupData, SignupDataSchema } from "@/actions/auth/types";

export default function SignupForm() {
  const nameRef = useRef<HTMLInputElement>(null);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({
    resolver: zodResolver(SignupDataSchema),
  });

  const signUpHandler: SubmitHandler<SignupData> = async (values) => {
    const { data, error } = await signUp.email({ ...values });
    if (error) setError("root.non_field_error", { message: error.message, type: error.statusText });
    if (data) redirect("/dashboard");
  };

  const handleGoogleSignUp = async () => {
    const { error } = await signIn.social({ provider: "google", callbackURL: "/dashboard" });
    if (error) setError("root.non_field_error", { message: error.message, type: error.statusText });
  };

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center" minHeight="90dvh">
      <Grid size={{ xs: 11, sm: 8, md: 6, lg: 4, xl: 3 }}>
        <Paper
          elevation={3}
          sx={(theme) => ({
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <Box component="form" onSubmit={handleSubmit(signUpHandler)} noValidate>
            <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Typography variant="h5" component="h1">
                Create your account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join now — it only takes a minute
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <TextFieldElement
                required
                fullWidth
                name="name"
                type="text"
                label="Full name"
                control={control}
                inputRef={nameRef}
                autoComplete="name"
              />
              <TextFieldElement
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
                autoComplete="email"
                control={control}
              />
              <TextFieldElement
                required
                fullWidth
                name="password"
                type="password"
                label="Password"
                control={control}
                autoComplete="new-password"
              />

              {errors.root?.non_field_error && (
                <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
                  {errors.root.non_field_error.message}
                </Typography>
              )}

              <Button type="submit" variant="contained" fullWidth sx={{ py: 1.25 }}>
                Create account
              </Button>

              {isSubmitting && <LinearProgress />}

              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                Already have an account?{" "}
                <Link component={NextLink} href="/login">
                  Log in
                </Link>
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 0 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  OR
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Stack>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleSignUp}
                startIcon={<Google sx={{ width: 20, height: 20 }} />}
              >
                Sign up with Google
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
