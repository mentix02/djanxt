"use client";

import { redirect, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Key from "@mui/icons-material/Key";
import Home from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import Dashboard from "@mui/icons-material/Dashboard";
import PersonAdd from "@mui/icons-material/PersonAdd";

import Link from "@/components/Link";
import { signOut, useSession } from "@/lib/auth-client";

const signedInLinks = [
  <BottomNavigationAction
    key="/dashboard"
    value="/dashboard"
    component={Link}
    label="Dashboard"
    icon={<Dashboard />}
    href="/dashboard"
  />,
  <BottomNavigationAction
    key="/logout"
    value="/logout"
    label="Logout"
    icon={<Logout />}
    onClick={async () => {
      await signOut();
      redirect("/login");
    }}
  />,
];

const signedOutLinks = [
  <BottomNavigationAction key="/login" value="/login" component={Link} label="Login" icon={<Key />} href="/login" />,
  <BottomNavigationAction
    key="/signup"
    value="/signup"
    component={Link}
    label="Signup"
    icon={<PersonAdd />}
    href="/signup"
  />,
];

export default function BottomNavbar() {
  const pathname = usePathname();
  const { isPending, data: session } = useSession();

  if (isPending) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <BottomNavigation showLabels value={pathname}>
        <BottomNavigationAction value="/" component={Link} label="Home" icon={<Home />} href="/" />
        {session ? signedInLinks : signedOutLinks}
      </BottomNavigation>
    </Box>
  );
}
