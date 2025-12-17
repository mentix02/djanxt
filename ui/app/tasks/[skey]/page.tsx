import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";

import { auth } from "@/lib/auth";
import EditTask from "@/components/tasks/EditTask";
import { fetchTask } from "@/actions/tasks/actions";

export const metadata: Metadata = {
  title: "Edit Task",
  description: "Edit your task.",
};

interface PageProps {
  params: Promise<{ skey: string }>;
}

export default async function Page({ params }: PageProps) {
  const { skey } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect(`/login?next=/tasks/${skey}`);

  const task = await fetchTask(skey);

  return (
    <Container>
      <EditTask task={task} />
    </Container>
  );
}
