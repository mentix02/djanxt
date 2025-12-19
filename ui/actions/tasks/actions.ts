"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import getBearerToken from "@/lib/api-auth";
import { createFetch } from "@better-fetch/fetch";
import {
  Task,
  TaskSchema,
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
  auth: { type: "Bearer", token: getBearerToken },
});

export const fetchTask = async (skey: string): Promise<Task> => {
  const { data: task, error } = await $fetch("/:skey/", {
    params: { skey },
    output: TaskSchema,
  });

  if (error)
    if (error.status === 404) notFound();
    else redirect("/error");

  return task;
};

export const createTaskAction = async (newTaskData: TaskCreateData): Promise<FetchResponse<Task>> => {
  const { data: newTask, error } = await $fetch("/", {
    method: "POST",
    body: newTaskData,
    output: TaskSchema,
  });

  if (error) return { error: error.message || "Something went wrong.", status: "err" };

  revalidatePath("/tasks");
  return { data: newTask, status: "ok" };
};

export const deleteTaskAction = async (skey: string): Promise<void> => {
  const { error } = await $fetch("/:skey/", {
    method: "DELETE",
    params: { skey },
  });

  if (error) redirect("/error");

  revalidatePath("/tasks");
  redirect("/tasks");
};

export const editTaskAction = async (task: RequiredPartial<Task, "skey">): Promise<Task> => {
  const { data: updatedTask, error } = await $fetch("/:skey/", {
    body: task,
    method: "PATCH",
    output: TaskSchema,
    params: { skey: task.skey },
  });

  if (error) redirect("/error");

  return updatedTask;
};

export const fetchMetadata = async (params: TaskQueryParams): Promise<FetchResponse<TaskPaginationMetadata>> => {
  const { q, completed, page = 1 } = params;
  const queryParams = new URLSearchParams();

  queryParams.set("page", page.toString());
  if (q) queryParams.set("q", q);
  if (completed) queryParams.set("completed", completed.toString());

  const { data: metadata, error } = await $fetch(`/metadata/?${queryParams.toString()}`, {
    output: TaskPaginationMetadataSchema,
  });

  if (error) return { error: error.message || "Something went wrong.", status: "err" };

  return { data: metadata, status: "ok" };
};

export const fetchTasks = async (params: TaskQueryParams): Promise<FetchResponse<TaskListPaginated>> => {
  const { q, completed, ordering, page = 1 } = params;

  const queryParams = new URLSearchParams();

  queryParams.set("page", page.toString());
  if (q) queryParams.set("q", q);
  if (ordering) queryParams.set("ordering", ordering);
  if (completed) queryParams.set("completed", completed.toString());

  const { data: paginatedTasks, error } = await $fetch(`/?${queryParams.toString()}`, {
    output: TaskListPaginatedSchema,
  });

  if (error) return { error: error.message || "Something went wrong.", status: "err" };

  return { data: paginatedTasks, status: "ok" };
};
