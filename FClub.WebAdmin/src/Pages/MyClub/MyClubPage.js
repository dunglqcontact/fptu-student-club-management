import { Container, Typography } from "@mui/material";
import React from "react";

import Page from "../../Components/UI/Page";
import MyClubComponents from "../../Components/Views/MyClub";

const MyClubPage = () => {
  return (
    <Page>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          My CLub
        </Typography>
        <MyClubComponents />
      </Container>
    </Page>
  );
};

export default MyClubPage;
