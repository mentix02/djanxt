"use client";

import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Key from "@mui/icons-material/Key";
import Home from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import Dashboard from "@mui/icons-material/Dashboard";
import PersonAdd from "@mui/icons-material/PersonAdd";

import Link from "@/components/Link";
import { useSession } from "@/lib/auth-client";

const signedInLinks = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Logout", icon: <Logout />, href: "/logout" },
  { label: "Dashboard", icon: <Dashboard />, href: "/dashboard" },
];

const signedOutLinks = [
  { label: "Home", icon: <Home />, href: "/" },
  { label: "Login", icon: <Key />, href: "/login" },
  { label: "Signup", icon: <PersonAdd />, href: "/signup" },
];

export default function BottomNavbar() {
  const pathname = usePathname();
  const { isPending, data: session } = useSession();

  if (isPending) {
    return null;
  }

  return (
    <Box>
      <BottomNavigation showLabels value={pathname}>
        {session
          ? signedInLinks.map((link) => (
              <BottomNavigationAction
                key={link.href}
                component={Link}
                label={link.label}
                icon={link.icon}
                value={link.href}
                href={link.href}
              />
            ))
          : signedOutLinks.map((link) => (
              <BottomNavigationAction
                key={link.href}
                component={Link}
                label={link.label}
                icon={link.icon}
                value={link.href}
                href={link.href}
              />
            ))}
      </BottomNavigation>
    </Box>
  );
}
