import { createFetch, createSchema, FetchSchemaRoutes } from "@better-fetch/fetch";

import getBearerToken from "@/lib/api-auth";
import {
  TaskSchema,
  SkeyParamSchema,
  TaskCreateDataSchema,
  TaskQueryParamsSchema,
  TaskListPaginatedSchema,
  TaskPaginationMetadataSchema,
} from "@/actions/tasks/types";

const fetchSchema = createSchema({
  "@get/": {
    query: TaskQueryParamsSchema,
    output: TaskListPaginatedSchema,
  },
  "@post/": {
    output: TaskSchema,
    input: TaskCreateDataSchema,
  },
  "@get/metadata/": {
    query: TaskQueryParamsSchema,
    output: TaskPaginationMetadataSchema,
  },
  "@get/:skey/": {
    output: TaskSchema,
    params: SkeyParamSchema,
  },
  "@delete/:skey/": {
    params: SkeyParamSchema,
  },
  "@patch/:skey/": {
    output: TaskSchema,
    params: SkeyParamSchema,
    input: TaskSchema.partial().required({ skey: true }), // Everything optional except skey, which is required for identifying the task to update
  },
} as const satisfies FetchSchemaRoutes);

const $fetch = createFetch({
  schema: fetchSchema,
  baseURL: `${process.env.BACKEND_URL}/api/todo`,
  auth: { type: "Bearer", token: getBearerToken },
});

export default $fetch;
