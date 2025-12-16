"use client";

import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { createTask } from "@/actions/tasks/actions";
import { TaskCreateData, TaskCreateDataSchema } from "@/actions/tasks/types";

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskDialog({ open, onClose }: AddTaskDialogProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskCreateData>({
    resolver: zodResolver(TaskCreateDataSchema),
  });

  const createTaskHandler: SubmitHandler<TaskCreateData> = async (values) => {
    await createTask(values);
    reset();
    onClose();
  };

  useEffect(() => {
    if (open && contentRef.current) contentRef.current.focus();
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="add-task-dialog-title">
      <DialogTitle id="add-task-dialog-title">Add New Task</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill in the details below to create a new task.</DialogContentText>
        <Box component="form" onSubmit={handleSubmit(createTaskHandler)} noValidate id="add-task-form">
          <TextFieldElement
            focused
            required
            autoFocus
            fullWidth
            name="content"
            label="Content"
            margin="normal"
            control={control}
            inputRef={contentRef}
          />

          <TextFieldElement
            rows={4}
            multiline
            fullWidth
            margin="normal"
            control={control}
            name="description"
            label="Description"
          />
        </Box>

        {errors.root?.non_field_errors && (
          <Typography color="error" variant="body2" sx={{ my: 2 }}>
            {errors.root.non_field_errors.message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          form="add-task-form"
          loading={isSubmitting}
          disabled={isSubmitting}
          onClick={handleSubmit(createTaskHandler)}
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
