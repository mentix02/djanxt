"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import $fetch from "@/lib/fetch";
import { Task, TaskCreateData, ErrorFetchResponse, SuccessFetchResponse } from "@/actions/tasks/types";

export const createTaskAction = async (newTaskData: TaskCreateData): Promise<FetchResponse<Task>> => {
  const { data: newTask, error } = await $fetch("@post/", { body: newTaskData });

  if (error) return ErrorFetchResponse(error.message || "Couldn't create a task. Please try again later.");

  revalidatePath("/tasks");
  return SuccessFetchResponse(newTask);
};

export const deleteTaskAction = async (skey: string): Promise<void> => {
  const { error } = await $fetch("@delete/:skey/", { params: { skey } });

  if (error) redirect("/error");

  revalidatePath("/tasks");
  redirect("/tasks");
};

export const editTaskAction = async (task: RequiredPartial<Task, "skey">): Promise<Task> => {
  const { data: updatedTask, error } = await $fetch("@patch/:skey/", { body: task, params: { skey: task.skey } });
  if (error) redirect("/error");
  return updatedTask;
};
