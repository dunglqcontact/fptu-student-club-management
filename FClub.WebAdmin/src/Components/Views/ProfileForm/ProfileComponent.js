import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";

// material
import {
  Container,
  Stack,
  Typography,
  Paper,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

// component
import Page from "../../UI/Page";
import { fDate } from "../../../Utils/formatTime";
import UploadImageToFirebase from "../../../Utils/uploadImageToFirebase";

const FormRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const FormRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
  },
}));

const ImageContaier = styled("div")(({ theme }) => ({
  width: "144px",
  height: "144px",
  margin: "auto",
  borderRadius: "50%",
  padding: "8px",
  border: "1px",
}));

const ImageHolder = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
}));

const useStyles = makeStyles((theme) => ({
  inputControl: {
    margin: "10px 0",

    [theme.breakpoints.up("lg")]: {
      margin: "10px",
    },
  },
}));

const ProfileComponent = () => {
  const classes = useStyles();

  const userData = useSelector((state) => state.auth.userData);

  const [avatar, setAvatar] = useState("");
  const [schoolData, setSchoolData] = useState([]);
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(1);
  const [school, setSchool] = useState("FPT");
  const [isAvatarHover, setIsAvatarHover] = useState(false);

  // get school
  useEffect(() => {
    setAvatar(userData.photo);
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
  }, [userData.photo]);
  //

  const submitHandler = (event) => {
    event.preventdefault();
  };

  const genderHandler = (event) => {
    setGender(event.target.value);
  };

  const schoolHandler = (event) => {
    setSchool(event.target.value);
  };

  const imageHandler = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e) => {
        setAvatar(reader.result);
      };
    }
  };

  const uploadHandler = () => {
    UploadImageToFirebase(image);
    setImage(null);
  };

  return (
    <Page title="account">
      {/* Container: centers content horizontally */}
      <Container>
        <Stack mb={5}>
          <Typography variant="h4" gutterBottom>
            Account
          </Typography>
        </Stack>

        <Formik initialValues={userData} onSubmit={submitHandler}>
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex" }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <Paper elevation={6} sx={{ py: 10 }}>
                      <ImageContaier>
                        <ImageHolder
                          onMouseOver={() => setIsAvatarHover(true)}
                          onMouseLeave={() => setIsAvatarHover(false)}
                        >
                          <img src={avatar} alt="Ava" />
                          {isAvatarHover && (
                            <Button
                              component="label"
                              sx={{ position: "absolute", background: "white" }}
                            >
                              Change Avatar
                              <input
                                accept=".jpg, .jpeg, .png"
                                type="file"
                                hidden
                                onChange={imageHandler}
                              />
                            </Button>
                          )}
                        </ImageHolder>
                      </ImageContaier>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="caption">
                          Allowed *.jpeg, *.jpg, *.png
                        </Typography>
                        <Typography variant="caption">
                          max size of 3 MB
                        </Typography>
                        <Button onClick={uploadHandler}>Save</Button>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Paper elevation={6} sx={{ p: 3 }}>
                      <FormRoot>
                        <FormRow>
                          <TextField
                            id="name"
                            className={classes.inputControl}
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange}
                          />
                          <TextField
                            id="email"
                            className={classes.inputControl}
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </FormRow>
                        <FormRow>
                          <TextField
                            id="phone"
                            className={classes.inputControl}
                            fullWidth
                            label="Phone"
                            variant="outlined"
                            type="tel"
                            value={values.phone}
                            onChange={handleChange}
                          />
                          <TextField
                            id="birthday"
                            className={classes.inputControl}
                            fullWidth
                            label="Birthday"
                            variant="outlined"
                            type="date"
                            value={fDate(values.birthday)}
                            onChange={handleChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </FormRow>
                        <FormRow>
                          <FormControl
                            fullWidth
                            className={classes.inputControl}
                          >
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                              labelId="university-label"
                              label="School"
                              value={gender}
                              onChange={genderHandler}
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

                          <FormControl
                            fullWidth
                            className={classes.inputControl}
                          >
                            <InputLabel id="university-label">
                              School
                            </InputLabel>
                            <Select
                              labelId="university-label"
                              label="School"
                              value={school}
                              onChange={schoolHandler}
                            >
                              {schoolData.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </FormRow>
                        <FormRow>
                          <TextField
                            id="about"
                            className={classes.inputControl}
                            label="About"
                            fullWidth
                            multiline
                            rows={5}
                            value={values.bio}
                            onChange={handleChange}
                          />
                        </FormRow>
                        <Box
                          sx={{
                            mt: 2,
                            mr: { xs: 0, lg: "10px" },
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button variant="contained">Save Changes</Button>
                        </Box>
                      </FormRoot>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Page>
  );
};

export default ProfileComponent;
