import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// materials
import { Button, Container, Grid, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// components
import Page from "../../../UI/Page";
import ClubImage from "./DetailComponents/ClubImage";
import ClubInfo from "./DetailComponents/ClubInfo";
import {
  GetClubDetails,
  GetManager,
  GetTotalMember,
} from "./DetailComponents/action";
import ClubMembers from "./DetailComponents/ClubMembers";

const ClubDetail = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { id: clubId } = useParams();

  const [clubDetails, setClubDetails] = useState({});
  const [managerName, setManagerName] = useState("");
  const [totalMember, setTotalMember] = useState(0);

  useEffect(() => {
    GetClubDetails(token, clubId).then((data) => setClubDetails(data));
    GetManager(token, clubId).then((data) => setManagerName(data));
    GetTotalMember(token, clubId).then((data) => setTotalMember(data));
  }, [token, clubId]);

  const goBackHandler = () => {
    navigate(-1);
  };

  const { id, name, logo, about } = clubDetails;

  return (
    <Page title="Club Details">
      <Button startIcon={<ArrowBackIosIcon />} onClick={goBackHandler}>
        Back to Club Page
      </Button>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Club Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} md={4}>
            <ClubImage title={name} imageSrc={logo} id={id} />
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <ClubInfo
              key={id}
              clubName={name}
              about={about}
              managerName={managerName}
              totalMember={totalMember}
            />
          </Grid>

          <Grid item xs={12}>
            <ClubMembers clubId={clubId} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ClubDetail;
