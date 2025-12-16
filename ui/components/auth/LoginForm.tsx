"use client";

import { useRef, useEffect } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import FormControlLabel from "@mui/material/FormControlLabel";

import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckboxElement, TextFieldElement } from "react-hook-form-mui";

import Google from "@mui/icons-material/Google";

import NextLink from "@/components/Link";
import { SigninData, SigninDataSchema } from "@/actions/auth/types";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninData>({
    resolver: zodResolver(SigninDataSchema),
  });

  const signInHandler: SubmitHandler<SigninData> = async (values) => {
    // noinspection JSUnusedGlobalSymbols
    await signIn.email(
      { ...values, callbackURL: "/account" },
      {
        onError: (ctx) => {
          if (ctx.error.status === 403)
            setError("root.non_field_error", { message: "Email not verified. Please check your inbox." });
          else setError("root.non_field_error", { message: ctx.error.message, type: ctx.error.statusText });
        },
      },
    );
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({ provider: "google", callbackURL: "/account" });
    if (error) setError("root.non_field_error", { message: error.message, type: error.statusText });
  };

  useEffect(() => {
    emailRef.current?.focus();
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
          <Box component="form" onSubmit={handleSubmit(signInHandler)} noValidate>
            <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Typography variant="h5" component="h1" gutterBottom>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your account
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <TextFieldElement
                required
                fullWidth
                name="email"
                type="email"
                label="Email"
                control={control}
                inputRef={emailRef}
                autoComplete="email"
              />
              <TextFieldElement
                required
                fullWidth
                name="password"
                type="password"
                label="Password"
                control={control}
                autoComplete="current-password"
              />

              <FormControlLabel control={<CheckboxElement name="rememberMe" control={control} />} label="Remember me" />

              {errors.root?.non_field_error && (
                <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
                  {errors.root.non_field_error.message}
                </Typography>
              )}

              <Button type="submit" variant="contained" fullWidth sx={{ py: 1.25 }} loading={isSubmitting}>
                Sign in
              </Button>

              {isSubmitting && <LinearProgress />}

              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link component={NextLink} href="/signup">
                  Sign up
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
                onClick={handleGoogleSignIn}
                startIcon={<Google sx={{ width: 20, height: 20 }} />}
              >
                Sign in with Google
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
