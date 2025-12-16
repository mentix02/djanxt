"use client";

import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";

import { useContext } from "react";
import { AddTaskContext } from "@/components/tasks/AddTaskProvider";

export default function AddTask() {
  const context = useContext(AddTaskContext);

  if (!context) {
    return null;
  }

  const { showDialog } = context;

  return (
    <Container>
      <Tooltip title="Add Task" placement="left">
        <Fab color="primary" aria-label="add" onClick={showDialog} sx={{ position: "absolute", bottom: 80, right: 56 }}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
}
