import List from "@mui/material/List";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

export default function TaskListSkeleton() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {Array.from({ length: 13 }).map((_, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton role={undefined} dense disabled>
            <ListItemIcon>
              <Checkbox edge="end" disableRipple />
            </ListItemIcon>
            <ListItemText primary={<Skeleton variant="text" />} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
