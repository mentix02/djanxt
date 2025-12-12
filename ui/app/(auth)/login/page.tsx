import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) redirect("/dashboard");

  return <LoginForm />;
}
