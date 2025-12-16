"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/navigation";

import RefreshIcon from "@mui/icons-material/Refresh";

interface ErrorProps {
  message: string;
}

export default function ErrorView({ message }: ErrorProps) {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid
        container
        spacing={2}
        size={{ xs: 12 }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "200px" }}
      >
        <Box>
          <Typography variant="body2" color="textSecondary">
            Error:
          </Typography>
          <Typography variant="h6" color="error">
            {message}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" startIcon={<RefreshIcon />} onClick={handleRefresh}>
            Retry
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
