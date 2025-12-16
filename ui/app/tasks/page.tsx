import { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";

import { auth } from "@/lib/auth";
import TaskList from "@/components/tasks/TaskList";
import ErrorView from "@/components/layout/ErrorView";
import TaskSearch from "@/components/tasks/TaskSearch";
import TaskPagination from "@/components/tasks/TaskPagination";
import AddTaskProvider from "@/components/tasks/AddTaskProvider";
import TaskListSkeleton from "@/components/tasks/TaskListSkeleton";
import { fetchMetadata, TaskQueryParams } from "@/actions/tasks/actions";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Your tasks page.",
};

interface PageProps {
  searchParams?: Promise<TaskQueryParams>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;

  const q = searchParams?.q || "";
  const completed = searchParams?.completed || false;
  const currentPage = Number(searchParams?.page) || 1;
  const ordering = searchParams?.ordering || "-timestamp";

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?next=/tasks");
  }

  const metadataResponse = await fetchMetadata({ q });

  if (metadataResponse.status === "err") return <ErrorView message={metadataResponse.error} />;

  return (
    <Container>
      <AddTaskProvider>
        <TaskSearch />
        <Suspense fallback={<TaskListSkeleton />}>
          <TaskList currentPage={currentPage} query={{ q, completed, ordering }} />
        </Suspense>
        <TaskPagination metadata={metadataResponse.data} />
      </AddTaskProvider>
    </Container>
  );
}
