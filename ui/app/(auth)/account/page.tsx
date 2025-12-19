import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import UpdateAccountForm from "@/components/auth/UpdateAccountForm";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login?next=/account");

  return <UpdateAccountForm />;
}
