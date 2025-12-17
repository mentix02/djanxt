"use client";

import Box from "@mui/material/Box";

import { useSession } from "@/lib/auth-client";

export default function UpdateAccountForm() {
  const { data: session, isPending } = useSession();

  if (isPending || !session) return null;

  return <Box>Update Account Form - User is {session.user ? "logged in" : "not logged in"}</Box>;
}
