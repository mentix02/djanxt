"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";

import NextLink from "@/components/Link";

export default function LoginForm() {
  return (
    <Grid container alignItems="center" justifyContent="center" minHeight="100dvh">
      <Grid size={{ xs: 11, sm: 8, md: 6, lg: 4, xl: 3 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box component="form">
            <Typography variant="h5" component="h1" gutterBottom>
              Sign in
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                autoFocus
                focused
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
                autoComplete="email"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
                autoComplete="current-password"
              />
              <FormControlLabel control={<Checkbox name="remember" />} label="Remember me" />
              <Button type="submit" variant="contained" fullWidth>
                Sign in
              </Button>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link component={NextLink} href="/signup">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
