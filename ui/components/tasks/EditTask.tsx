"use client";

import { enqueueSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextFieldElement, CheckboxElement } from "react-hook-form-mui";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Task, TaskSchema } from "@/actions/tasks/types";
import { editTaskAction, deleteTaskAction } from "@/actions/tasks/actions";

interface EditTaskProps {
  task: Task;
}

export default function EditTask({ task: initialTask }: EditTaskProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialTask,
    resolver: zodResolver(TaskSchema),
  });

  const deleteTask = async () => {
    await deleteTaskAction(initialTask.skey);
  };

  const editTaskHandler: SubmitHandler<Task> = async (values) => {
    await editTaskAction(values);
    enqueueSnackbar("Task updated successfully.", { variant: "success" });
  };

  return (
    <Grid container alignItems="center" justifyContent="center" minHeight="90dvh">
      <Grid size={{ xs: 12, lg: 8 }}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Edit Task
          </Typography>
          <form onSubmit={handleSubmit(editTaskHandler)}>
            <Stack spacing={2}>
              <TextFieldElement autoFocus fullWidth name="content" control={control} label="Task Content" />

              <TextFieldElement fullWidth name="description" control={control} label="Description" multiline rows={4} />

              <CheckboxElement name="completed" control={control} label="Completed" />

              <Button onClick={deleteTask} color="error">
                Delete Task
              </Button>

              <Button type="submit" variant="contained" color="primary" loading={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Task"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
