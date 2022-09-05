import React, { useState, useEffect } from "react";

// materials
import { Container, Typography, Grid } from "@mui/material";

import Page from "../../UI/Page";
import UserReport from "./Components/UserReport";
import ClubReport from "./Components/ClubReport";
import { useSelector } from "react-redux";
import { getClubRank, getUserRank } from "./Components/action";
import ClubRankList from "./Components/ClubRankList";
import UserRankList from "./Components/UserRankList";

const ReportBody = () => {
  const token = useSelector((state) => state.auth.token);

  // user chart
  const [userName, setUserName] = useState([]);
  const [userValue, setUserValue] = useState([]);

  // club chart
  const [clubName, setClubName] = useState([]);
  const [clubValue, setClubValue] = useState([]);

  // club rank list

  useEffect(() => {
    getUserRank(token).then((data) => {
      setUserValue(data.slice(0, 5).map((user) => user.value));
      setUserName(data.slice(0, 5).map((user) => user.key.name));
    });

    getClubRank(token).then((data) => {
      setClubValue(data.slice(0, 5).map((club) => club.value));
      setClubName(data.slice(0, 5).map((club) => club.key.name));
    });
  }, [token]);

  return (
    <Page title="Report">
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Report
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UserReport userName={userName} value={userValue} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ClubReport clubName={clubName} value={clubValue} />
          </Grid>
          <Grid item xs={12}>
            <ClubRankList token={token} />
          </Grid>
          <Grid item xs={12}>
            <UserRankList token={token} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ReportBody;
