import List from "@mui/material/List";

import Box from "@mui/material/Box";

import AddTask from "@/components/tasks/AddTask";
import ErrorView from "@/components/layout/ErrorView";
import TaskListItem from "@/components/tasks/TaskListItem";
import EmptyTaskBox from "@/components/tasks/EmptyTaskBox";
import { fetchTasks, TaskQueryParams } from "@/actions/tasks/actions";

interface TaskListProps {
  currentPage: number;
  query: TaskQueryParams;
}

export default async function TaskList({ currentPage, query }: TaskListProps) {
  const { q, completed, ordering } = query;
  const tasksResponse = await fetchTasks({ q, completed, ordering, page: currentPage });

  if (tasksResponse.status === "err") return <ErrorView message={tasksResponse.error} />;

  return (
    <Box>
      {tasksResponse.data.count === 0 && <EmptyTaskBox />}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {tasksResponse.data.results.map((task) => (
          <TaskListItem task={task} key={task.skey} />
        ))}
      </List>
      <AddTask />
    </Box>
  );
}
