"use client";

import { useRouter, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import Key from "@mui/icons-material/Key";
import Home from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Link from "@/components/Link";
import { signOut, useSession } from "@/lib/auth-client";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isPending, data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (isPending) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <BottomNavigation showLabels value={pathname}>
        {session
          ? [
              <BottomNavigationAction
                key="/tasks"
                value="/tasks"
                label="Tasks"
                href="/tasks"
                component={Link}
                icon={<FormatListBulletedIcon />}
              />,
              <BottomNavigationAction
                key="/account"
                label="Account"
                href="/account"
                value="/account"
                component={Link}
                icon={<AccountCircle />}
              />,
              <BottomNavigationAction
                key="/logout"
                value="/logout"
                label="Logout"
                icon={<Logout />}
                onClick={handleSignOut}
              />,
            ]
          : [
              <BottomNavigationAction key="/" value="/" component={Link} label="Home" icon={<Home />} href="/" />,
              <BottomNavigationAction
                key="/login"
                value="/login"
                component={Link}
                label="Login"
                icon={<Key />}
                href="/login"
              />,
              <BottomNavigationAction
                key="/signup"
                href="/signup"
                label="Signup"
                value="/signup"
                component={Link}
                icon={<PersonAdd />}
              />,
            ]}
      </BottomNavigation>
    </Box>
  );
}
