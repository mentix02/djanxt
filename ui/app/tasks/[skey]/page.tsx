import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

import Container from "@mui/material/Container";

import $fetch from "@/lib/fetch";
import { auth } from "@/lib/auth";
import EditTask from "@/components/tasks/EditTask";

export const metadata: Metadata = {
  title: "Edit Task",
  description: "Edit your task.",
};

interface PageProps {
  params: Promise<{ skey: string }>;
}

const fetchTask = async (skey: string) => {
  const { data, error } = await $fetch("@get/:skey/", { params: { skey } });
  if (error) notFound();
  return data;
};

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
