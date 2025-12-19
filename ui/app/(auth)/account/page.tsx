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

  const accounts = await auth.api.listUserAccounts({ headers: await headers() });
  const hasPassword = !!accounts.find((account) => account.providerId === "credential");

  return <UpdateAccountForm hasPassword={hasPassword} user={session.user} />;
}
