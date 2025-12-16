"use client";

import { useState } from "react";
import clx from "@/components/tasks/TaskListItem.module.css";

import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import DeleteIcon from "@mui/icons-material/Delete";

import { TaskListItem as TaskListItemProps } from "@/actions/tasks/types";
import { editTaskListItem, deleteTaskListItem } from "@/actions/tasks/actions";

export default function TaskListItem({ task: initialTask }: { task: TaskListItemProps }) {
  const [task, setTask] = useState(initialTask);
  const [pending, setPending] = useState(false);

  async function updateTask() {
    setPending(true);
    try {
      const updatedTask = await editTaskListItem({ ...task, completed: !task.completed });
      setTask(updatedTask);
    } finally {
      setPending(false);
    }
  }

  async function deleteTask(id: string) {
    setPending(true);
    try {
      await deleteTaskListItem(id);
    } finally {
      setPending(false);
    }
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" disabled={pending} onClick={async () => await deleteTask(task.skey)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton role={undefined} dense disabled={pending} onClick={updateTask}>
        <ListItemIcon>
          <Checkbox edge="end" disableRipple aria-labelledby={task.skey} checked={task.completed} />
        </ListItemIcon>
        <ListItemText id={task.skey} primary={task.content} className={task.completed ? clx.completed : ""} />
      </ListItemButton>
    </ListItem>
  );
}
