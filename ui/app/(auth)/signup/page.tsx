import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) redirect("/dashboard");

  return <SignupForm />;
}
