"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import Visibility from "@mui/icons-material/Visibility";

import { editTaskAction } from "@/actions/tasks/actions";
import clx from "@/components/tasks/TaskListItem.module.css";
import { TaskListItem as TaskListItemProps } from "@/actions/tasks/types";

export default function TaskListItem({ task: initialTask }: { task: TaskListItemProps }) {
  const router = useRouter();
  const [task, setTask] = useState(initialTask);
  const [pending, setPending] = useState(false);

  const updateTask = async () => {
    setPending(true);
    try {
      const updatedTask = await editTaskAction({ ...task, completed: !task.completed });
      setTask(updatedTask);
    } finally {
      setPending(false);
    }
  };

  const viewTask = async () => {
    router.push(`/tasks/${task.skey}`);
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" disabled={pending} aria-label="delete" onClick={viewTask}>
          <Visibility />
        </IconButton>
      }
    >
      <ListItemButton role={undefined} dense disabled={pending} onClick={updateTask}>
        <ListItemIcon>
          <Checkbox edge="end" disableRipple checked={task.completed} aria-labelledby={task.skey} />
        </ListItemIcon>
        <ListItemText id={task.skey} primary={task.content} className={task.completed ? clx.completed : ""} />
      </ListItemButton>
    </ListItem>
  );
}
