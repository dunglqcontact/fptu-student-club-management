import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ClubInfo from "./Components/ClubInfo";
import ClubImage from "./Components/ClubImage";

import {
  GetClubDetails,
  GetManager,
  GetTotalMember,
} from "./Components/action";

import { Button, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import EditClub from "./Components/EditClub";

const MyClubComponents = () => {
  const token = useSelector((state) => state.auth.token);
  const clubId = useSelector((state) => state.auth.clubId);

  const [clubDetails, setClubDetails] = useState({});
  const [managerName, setManagerName] = useState("");
  const [totalMember, setTotalMember] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    GetClubDetails(token, clubId).then((data) => setClubDetails(data));
    GetManager(token, clubId).then((data) => setManagerName(data));
    GetTotalMember(token, clubId).then((data) => setTotalMember(data));
  }, [token, clubId]);

  function editHandler() {
    setIsEditing((prev) => !prev);
  }

  const { id, name, logo, about } = clubDetails;
  return (
    <Paper elevation={8} sx={{ width: { xs: "100%", md: "60%" }, p: 4 }}>
      {!isEditing && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={0} md={2}></Grid>
            <Grid item xs={12} md={8} alignItems="center">
              <ClubImage title={name} imageSrc={logo} id={id} />
            </Grid>
            <Grid item xs={0} md={2}></Grid>
            <Grid item xs={12}>
              <ClubInfo
                key={id}
                clubName={name}
                about={about}
                managerName={managerName}
                totalMember={totalMember}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" fullWidth onClick={editHandler}>
              Edit
            </Button>
          </Box>
        </>
      )}
      {isEditing && <EditClub editHandler={editHandler} />}
    </Paper>
  );
};

export default MyClubComponents;
