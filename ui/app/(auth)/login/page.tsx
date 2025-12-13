import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) redirect("/account");

  return <LoginForm />;
}
