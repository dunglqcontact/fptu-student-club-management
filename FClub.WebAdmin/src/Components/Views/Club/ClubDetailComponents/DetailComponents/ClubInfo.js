import React from "react";
import PropTypes from "prop-types";

// materials
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// icons
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

const ClubInfo = ({ clubName, about, managerName, totalMember }) => {
  const classes = useStyles();
  return (
    <Paper elevation={8} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
        {clubName}
      </Typography>
      <Typography variant="h5" gutterBottom>
        <InfoOutlinedIcon className={classes.wrapIcon} /> Introduction
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        {about}
      </Typography>
      <Typography variant="h5" gutterBottom>
        <ManageAccountsOutlinedIcon className={classes.wrapIcon} /> Club Manager
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        {managerName}
      </Typography>
      <Typography variant="h5" gutterBottom>
        <GroupOutlinedIcon className={classes.wrapIcon} /> Total Member
      </Typography>
      <Typography variant="body1">
        {totalMember} {totalMember < 2 ? "member" : "members"}
      </Typography>
    </Paper>
  );
};

export default ClubInfo;

ClubInfo.propTypes = {
  clubName: PropTypes.string,
};
