"use client";

import { PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import theme from "@/theme";

export default function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
