import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadiusLg,
    margin: "6rem auto",
    width: "37rem",
    padding: "3rem 5rem 3rem 5rem",

    [theme.breakpoints.down("md")]: {
      margin: "4rem auto",
      width: "35rem",
      padding: "3rem 4rem 4rem 4rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
      padding: "1rem 3rem 2rem 3rem",
      margin: "2rem auto",
    },
  },
}));

const FormCard = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={6} className={classes.root}>
      {props.children}
    </Paper>
  );
};

export default FormCard;
