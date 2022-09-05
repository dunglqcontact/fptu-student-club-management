import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../Context/Actions/authen-action";

// framer
import { motion } from "framer-motion";

// component
import FormCard from "../../UI/FormCard";
import PasswordField from "../../UI/PasswordField";

// icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// material ui
import { Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles((theme) => ({
  link: {
    marginTop: "20px",
  },
  textContainer: {
    width: "22ch",
  },
}));

const RegisterComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    dispatch(signUp(enteredEmail, enteredPassword));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <FormCard>
      <motion.div
        initial={{ fontSize: "0px" }}
        animate={{ letterSpacing: "3px", fontSize: "33px" }}
      >
        <Typography mb={2} align="left" variant="h3">
          Register
        </Typography>
      </motion.div>
      <form onSubmit={submitHandler}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <div className={classes.textContainer}>
              <TextField
                inputRef={emailInputRef}
                id="standard-email"
                placeholder="Enter your email"
                label="Email"
                variant="standard"
                required
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={classes.textContainer}>
              <TextField
                id="standard-name"
                placeholder="Enter your name"
                label="Name"
                variant="standard"
                required
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={classes.textContainer}>
              <PasswordField
                id="password"
                label="Password"
                placeholder="Enter your password"
                inputRef={passwordInputRef}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={classes.textContainer}>
              <PasswordField
                id="re-password"
                label="Confirm Password"
                placeholder="Re-enter password"
                inputRef={passwordInputRef}
              />
            </div>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <LoadingButton
              sx={{
                margin: 0,
                "&:disabled": {
                  cursor: "not-allowed",
                  pointerEvents: "all !important",
                },
              }}
              startIcon={<CheckCircleOutlineIcon />}
              type="submit"
              size="large"
              loadingPosition="start"
              variant="contained"
              fullWidth
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? "Loading..." : "SIGN UP"}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
      <div className={classes.link}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button startIcon={<ArrowBackIosIcon />}>Back to Sign In</Button>
        </Link>
      </div>
    </FormCard>
  );
};

export default RegisterComponent;
