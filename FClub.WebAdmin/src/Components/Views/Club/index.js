import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// component
import Page from "../../UI/Page";
import ClubList from "./ClubComponents/ClubList";

// material
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const ClubComponent = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [clubs, setClubs] = useState([]);

  const url =
    "https://club-management-service.azurewebsites.net/api/v1/clubs?PageSize=100";

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((resData) => {
        setClubs(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, token]);

  function createClubHandler() {
    navigate("create");
  }

  return (
    <Page title="Club">
      <Container>
        <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Clubs</Typography>
          <Button
            variant="contained"
            startIcon={<ControlPointIcon />}
            onClick={createClubHandler}
          >
            Create New Club
          </Button>
        </Box>

        <ClubList clubs={clubs} />
      </Container>
    </Page>
  );
};

export default ClubComponent;
