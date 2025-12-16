"use client";

import { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { AddTaskContext } from "@/components/tasks/AddTaskProvider";
import { useSearchParams } from "next/navigation";

export default function EmptyTaskBox() {
  const searchParams = useSearchParams();
  const context = useContext(AddTaskContext);

  if (!context) {
    return null;
  }

  const { showDialog } = context;

  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1, p: 4, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        No tasks found
      </Typography>
      {!searchParams.get("q") && (
        <>
          <Typography variant="body1" gutterBottom>
            You currently have no tasks. Click the button below to add your first task!
          </Typography>
          <Button variant="contained" color="primary" onClick={showDialog} sx={{ mt: 2 }}>
            Add Task
          </Button>
        </>
      )}
    </Box>
  );
}
