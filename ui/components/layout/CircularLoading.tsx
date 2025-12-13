import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularLoading() {
  return (
    <Grid container alignItems="center" justifyContent="center" minHeight="90dvh">
      <CircularProgress />
    </Grid>
  );
}
