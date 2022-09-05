import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const EditClub = ({ editHandler }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth label="Club Name" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={5} label="About" />
        </Grid>
      </Grid>
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={editHandler}
        >
          Cancel
        </Button>
        <Button variant="contained" fullWidth onClick={editHandler}>
          Update
        </Button>
      </Box>
    </>
  );
};

export default EditClub;
