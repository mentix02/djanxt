"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { createFetch } from "@better-fetch/fetch";
import { createAuthHeaders } from "@/lib/api-auth";
import {
  Task,
  TaskSchema,
  TaskListItem,
  TaskCreateData,
  TaskListPaginated,
  TaskPaginationMetadata,
  TaskListPaginatedSchema,
  TaskPaginationMetadataSchema,
} from "@/actions/tasks/types";

export interface TaskQueryParams {
  q?: string;
  page?: number;
  completed?: boolean;
  ordering?: "timestamp" | "-timestamp";
}

const $fetch = createFetch({
  baseURL: `${process.env.BACKEND_URL}/api/todo`,
});

export const createTask = async (newTaskData: TaskCreateData): Promise<FetchResponse<Task>> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const { data: newTask, error } = await $fetch("/", {
    method: "POST",
    body: newTaskData,
    output: TaskSchema,
    headers: createAuthHeaders(session.user.access_key),
  });

  if (error) return { error: error.message || "Something went wrong.", status: "err" };

  revalidatePath("/tasks");
  return { data: newTask, status: "ok" };
};

export const deleteTaskListItem = async (skey: string): Promise<void> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const { error } = await $fetch(`/:skey/`, {
    method: "DELETE",
    params: { skey },
    headers: createAuthHeaders(session.user.access_key),
  });

  if (error) redirect("/error");

  revalidatePath("/tasks");
};

export const editTaskListItem = async (task: TaskListItem): Promise<TaskListItem> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const { data: updatedTask, error } = await $fetch(`/:skey/`, {
    body: task,
    method: "PATCH",
    output: TaskSchema,
    params: { skey: task.skey },
    headers: createAuthHeaders(session.user.access_key),
  });

  if (error) redirect("/error");

  return updatedTask;
};

export const fetchMetadata = async (params: TaskQueryParams): Promise<FetchResponse<TaskPaginationMetadata>> => {
  const { q, completed, page = 1 } = params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return { error: "You must be logged in to view your tasks.", status: "err" };

  const queryParams = new URLSearchParams();

  queryParams.set("page", page.toString());
  if (q) queryParams.set("q", q);
  if (completed) queryParams.set("completed", completed.toString());

  const { data: metadata, error } = await $fetch(`/metadata/?${queryParams.toString()}`, {
    output: TaskPaginationMetadataSchema,
    headers: createAuthHeaders(session.user.access_key),
  });

  if (error) return { error: error.message || "Something went wrong.", status: "err" };

  return { data: metadata, status: "ok" };
};

export const fetchTasks = async (params: TaskQueryParams): Promise<FetchResponse<TaskListPaginated>> => {
  const { q, completed, ordering, page = 1 } = params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return { error: "You must be logged in to view your tasks.", status: "err" };

  const queryParams = new URLSearchParams();

  queryParams.set("page", page.toString());
  if (q) queryParams.set("q", q);
  if (ordering) queryParams.set("ordering", ordering);
  if (completed) queryParams.set("completed", completed.toString());

  const { data: paginatedTasks, error } = await $fetch(`/?${queryParams.toString()}`, {
    output: TaskListPaginatedSchema,
    headers: createAuthHeaders(session.user.access_key),
  });

  if (error) return { error: error.message || "Something went wrong.", status: "err" };

  return { data: paginatedTasks, status: "ok" };
};
