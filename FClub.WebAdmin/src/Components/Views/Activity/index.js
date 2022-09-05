import React from "react";
import { Link as RouterLink } from "react-router-dom";

// component
import Page from "../../UI/Page";

// material
import { Button, Container, Stack, Typography } from "@mui/material";
import ActivityList from "./Components/ActivityList";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

// ------------------------------------------------------

const ActivityComponents = () => {
  return (
    <Page title="Club">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" sx={{ mb: 5 }}>
            Activities
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="create"
            startIcon={<ControlPointIcon />}
          >
            New Activity
          </Button>
        </Stack>

        <ActivityList />
      </Container>
    </Page>
  );
};

export default ActivityComponents;
