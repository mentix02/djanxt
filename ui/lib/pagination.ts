import z from "zod";
import * as z4 from "zod/v4/core";

export const createPaginationSchema = <ListItemSchema extends z4.$ZodType>(schema: ListItemSchema) =>
  z.object({
    results: z.array(schema),
    count: z.number().nonnegative(),
    next: z.url().nullable(),
    previous: z.url().nullable(),
  });
