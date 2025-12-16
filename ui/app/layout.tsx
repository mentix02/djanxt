import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PropsWithChildren } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import "./globals.css";
import Providers from "@/app/providers";
import BottomNavbar from "@/components/layout/BottomNavbar";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Djanxt",
    template: "%s | Djanxt",
  },
  description: "A Django + Next.js boilerplate",
};

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>
          <Box sx={{ pb: 7 }}>
            <Box>{children}</Box>
            <Paper elevation={3} sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
              <BottomNavbar />
            </Paper>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
