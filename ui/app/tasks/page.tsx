import { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";

import $fetch from "@/lib/fetch";
import { auth } from "@/lib/auth";
import TaskList from "@/components/tasks/TaskList";
import ErrorView from "@/components/layout/ErrorView";
import TaskSearch from "@/components/tasks/TaskSearch";
import TaskPagination from "@/components/tasks/TaskPagination";
import AddTaskProvider from "@/components/tasks/AddTaskProvider";
import TaskListSkeleton from "@/components/tasks/TaskListSkeleton";
import {
  TaskQueryParams,
  ErrorFetchResponse,
  SuccessFetchResponse,
  TaskQueryParamsSchema,
  TaskPaginationMetadata,
} from "@/actions/tasks/types";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Your tasks page.",
};

interface PageProps {
  searchParams?: Promise<TaskQueryParams>;
}

const fetchMetadata = async (query: TaskQueryParams): Promise<FetchResponse<TaskPaginationMetadata>> => {
  const { data, error } = await $fetch("@get/metadata/", { query });
  if (error) return ErrorFetchResponse(error.message || "Failed to fetch pagination metadata.");
  return SuccessFetchResponse(data);
};

const parseQueryParams = async (queryParams: object): Promise<TaskQueryParams> => {
  const result = await TaskQueryParamsSchema.safeParseAsync(queryParams);
  if (!result.success) {
    console.warn("Failed to parse query params:", result.error);
    return { ordering: "-timestamp", page: 1 };
  }

  return result.data;
};

export default async function Page(props: PageProps) {
  const queryParams = await props.searchParams;

  // Redirect to login if not authenticated
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?next=/tasks");

  const query = await parseQueryParams(queryParams || {});
  const metadataResponse = await fetchMetadata(query);

  if (metadataResponse.status === "err") return <ErrorView message={metadataResponse.error} />;

  return (
    <Container>
      <AddTaskProvider>
        <TaskSearch />
        <Suspense fallback={<TaskListSkeleton />}>
          <TaskList currentPage={query.page || 1} query={query} />
        </Suspense>
        <TaskPagination metadata={metadataResponse.data} />
      </AddTaskProvider>
    </Container>
  );
}
