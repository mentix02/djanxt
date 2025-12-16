"use client";

import { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TaskPaginationMetadata } from "@/actions/tasks/types";

interface TaskPaginationProps {
  metadata: TaskPaginationMetadata;
}

export default function TaskPagination({ metadata }: TaskPaginationProps) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const { page_size, task_count } = metadata;
  const pageCount = Math.ceil(task_count / page_size);
  const currentPage = Number(searchParams.get("page")) || 1;

  if (pageCount <= 1) return null;

  const handleChange = (_: ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) params.delete("page");
    else params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      size="large"
      color="primary"
      count={pageCount}
      page={currentPage}
      onChange={handleChange}
      sx={{ marginBottom: 3, display: "flex", justifyContent: "center" }}
    />
  );
}
