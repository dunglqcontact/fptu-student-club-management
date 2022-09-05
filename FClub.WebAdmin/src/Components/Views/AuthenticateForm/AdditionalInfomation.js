import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// framer
import { motion } from "framer-motion";

// component
import FormCard from "../../UI/FormCard";

// material ui
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { LoadingButton } from "@mui/lab";
import { registerToBackend } from "../../../Context/Actions/authen-action";

const useStyles = makeStyles((theme) => ({
  link: {
    marginTop: "20px",
  },
}));

const RegisterComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const firebaseToken = useSelector((state) => state.auth.firebaseToken);

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const schoolInputRef = useRef();
  const birthInputRef = useRef();
  const genderInputRef = useRef();

  const [gender, setGender] = useState(1);
  const [schoolData, setSchoolData] = useState([]);
  const [school, setSchool] = useState("");

  const schoolHandler = (event) => {
    setSchool(event.target.value);
  };

  const genderHandler = (event) => {
    setGender(event.target.value);
  };

  // get school
  useEffect(() => {
    fetch(
      "https://club-management-service.azurewebsites.net/api/v1/universities?PageSize=100"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((resData) => {
        setSchoolData(resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //

  function submitHandler(event) {
    event.preventDefault();

    const userData = {
      universityId: schoolInputRef.current.value,
      name: nameInputRef.current.value,
      phone: phoneInputRef.current.value,
      birthday: birthInputRef.current.value,
      gender: genderInputRef.current.value,
    };

    dispatch(registerToBackend(firebaseToken, userData));
  }

  useEffect(() => {
    if (isRegistered) {
      if (isLoggedIn) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [isLoggedIn, isRegistered, navigate]);

  return (
    <FormCard>
      <motion.div
        initial={{ fontSize: "0px" }}
        animate={{ letterSpacing: "5px", fontSize: "33px" }}
      >
        <Typography mb={4} align="left" variant="h3">
          One more step
        </Typography>
      </motion.div>

      <form onSubmit={submitHandler}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <div className={classes.textContainer}>
              <TextField
                inputRef={nameInputRef}
                id="standard-name"
                placeholder="Enter your name"
                label="Name"
                required
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.textContainer}>
              <FormControl fullWidth required className={classes.inputControl}>
                <InputLabel id="university-label">School</InputLabel>
                <Select
                  labelId="university-label"
                  label="School"
                  value={school}
                  onChange={schoolHandler}
                  inputRef={schoolInputRef}
                >
                  {schoolData.length !== 0 ? (
                    schoolData.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem key="" value="">
                      Loading...
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.textContainer}>
              <TextField
                inputRef={phoneInputRef}
                id="standard-phone"
                placeholder="Enter your phone"
                label="Phone"
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.textContainer}>
              <TextField
                id="standard-birth"
                label="Birthday"
                type="date"
                fullWidth
                inputRef={birthInputRef}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.textContainer}>
              <FormControl fullWidth className={classes.inputControl}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="university-label"
                  label="School"
                  value={gender}
                  onChange={genderHandler}
                  inputRef={genderInputRef}
                >
                  <MenuItem key={1} value={1}>
                    Male
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Female
                  </MenuItem>
                  <MenuItem key={3} value={3}>
                    Other
                  </MenuItem>
                </Select>
              </FormControl>
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
              {isLoading ? "Loading..." : "COMPLETE"}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </FormCard>
  );
};

export default RegisterComponent;
