import React from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import PlaceIcon from "@mui/icons-material/Place";
import EventIcon from "@mui/icons-material/Event";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { fVNDate } from "../../../../../Utils/formatTime";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

const Content = ({ activityDetails, ...others }) => {
  const classes = useStyles();

  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        {activityDetails.content}
      </Typography>
      <Typography gutterBottom sx={{ mb: 2 }}>
        <EventIcon className={classes.wrapIcon} /> Event will begin from{" "}
        <b>{fVNDate(activityDetails.beginDate)}</b> {" to "}
        <b>{fVNDate(activityDetails.dueDate)}</b>
      </Typography>
      <Typography gutterBottom sx={{ mb: 2 }}>
        <PostAddIcon className={classes.wrapIcon} /> Beign register from{" "}
        <b>{fVNDate(activityDetails.regisDate)}</b>
        {" to "}
        <b>{fVNDate(activityDetails.endRegisDate)}</b>
      </Typography>
      <Typography gutterBottom sx={{ mb: 2 }}>
        <PlaceIcon className={classes.wrapIcon} /> Location:{" "}
        {activityDetails.location}
      </Typography>
      <Typography gutterBottom sx={{ mb: 2 }}>
        <ControlPointIcon className={classes.wrapIcon} /> Bonus point when go to
        event: <b>{activityDetails.bonusPoint}</b>
      </Typography>
      <Typography gutterBottom sx={{ mb: 2 }}>
        <ErrorOutlineIcon className={classes.wrapIcon} /> Limit join:{" "}
        <b>{activityDetails.limitJoin}</b>
      </Typography>
    </Box>
  );
};

export default Content;
