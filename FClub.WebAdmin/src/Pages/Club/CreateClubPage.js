import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Page from "../../Components/UI/Page";
import CreateClubComponent from "../../Components/Views/Club/ClubCreateComponents";

const CreateClubPage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Button startIcon={<ArrowBackIosIcon />} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Create Club
        </Typography>

        <CreateClubComponent />
      </Container>
    </Page>
  );
};

export default CreateClubPage;
