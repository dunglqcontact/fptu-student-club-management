// material
import { Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function SearchNotFound({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        List is empty!
      </Typography>
      <Typography variant="body2" align="center">
        Please check your data or the internet!
      </Typography>
    </Paper>
  );
}
