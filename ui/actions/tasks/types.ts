import z from "zod";

import { createPaginationSchema } from "@/lib/pagination";

export const TaskPaginationMetadataSchema = z.object({
  page_size: z.number().positive(),
  task_count: z.number().nonnegative(),
});

export const TaskSchema = z.object({
  skey: z.uuidv4().readonly(),
  content: z.string().nonempty(),
  timestamp: z.string().readonly(),
  completed: z.boolean().default(false),
  description: z.string().default("").optional(),
});

export const TaskListItemSchema = TaskSchema.omit({ description: true });
export const TaskCreateDataSchema = z.object({
  ...TaskSchema.omit({ skey: true, timestamp: true }).shape,
  content: z.string().nonempty("Please enter a task."),
  completed: z.boolean().optional(),
});

export const TaskListPaginatedSchema = createPaginationSchema(TaskListItemSchema);

export type Task = z.infer<typeof TaskSchema>;
export type TaskListItem = z.infer<typeof TaskListItemSchema>;
export type TaskCreateData = z.infer<typeof TaskCreateDataSchema>;
export type TaskListPaginated = z.infer<typeof TaskListPaginatedSchema>;
export type TaskPaginationMetadata = z.infer<typeof TaskPaginationMetadataSchema>;
