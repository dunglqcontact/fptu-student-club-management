import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { editActivityHandler } from "./action";

// materials
import {
  Alert,
  Button,
  Grid,
  Paper,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { GetMemberId } from "./action";
import { fVNDate } from "../../../../../Utils/formatTime";

const ImageContaier = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px",
  border: "1px",
  borderStyle: "dashed",
}));

function getCurrentDay() {
  const time = new Date();
  return time.getDate();
}

const EditContent = ({ changeEditHandler, activityDetails, ...others }) => {
  const { idActivity } = useParams();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [regisDate, setRegisDate] = useState(activityDetails.regisDate);
  const [endRegisDate, setEndRegisDate] = useState(
    activityDetails.endRegisDate
  );
  const [beginDate, setBeginDate] = useState(activityDetails.beginDate);
  const [dueDate, setDueDate] = useState(activityDetails.dueDate);

  const [imageUrl, setImageUrl] = useState(activityDetails.image);
  const [uploadImage, setUploadImage] = useState(null);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    GetMemberId(token, userId, "BAS").then((data) => setMemberId(data));
  }, [token, userId]);

  function uploadImageHandler(event) {
    if (event.target.files[0]) {
      setUploadImage(event.target.files[0]);

      // show the upload photo to the screen
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e) => {
        setImageUrl(reader.result);
      };
    }
  }

  const handleRegisDate = (newValue) => {
    setRegisDate(newValue);
  };
  const handleEndRegisDate = (newValue) => {
    setEndRegisDate(newValue);
  };
  const handleBeginDate = (newValue) => {
    setBeginDate(newValue);
  };
  const handleDueDate = (newValue) => {
    setDueDate(newValue);
  };

  function submitHandler(data) {
    const finalData = {
      createDate: fVNDate(getCurrentDay()),
      regisDate: regisDate,
      endRegisDate: endRegisDate,
      beginDate: beginDate,
      dueDate: dueDate,
      ...data,
    };
    editActivityHandler(uploadImage, token, idActivity, finalData, memberId);
    setIsSnackbarOpen(true);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  function TransitionSnackbarLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const initialValues = {
    title: activityDetails.title,
    content: activityDetails.content,
    bonusPoint: activityDetails.bonusPoint,
    limitJoin: activityDetails.limitJoin,
    location: activityDetails.location,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { resetForm }) => {
          submitHandler(data);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <Paper elevation={5} sx={{ p: 5, width: { lg: "65%" } }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    name="title"
                    label="Title"
                    required
                    fullWidth
                    as={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="content"
                    label="Content"
                    fullWidth
                    required
                    multiline
                    rows={7}
                    as={TextField}
                  />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="regisDate"
                      required
                      as={DesktopDatePicker}
                      label="Register date"
                      inputFormat="dd/MM/yyyy"
                      onChange={handleRegisDate}
                      value={regisDate}
                      renderInput={(params) => (
                        <TextField required fullWidth {...params} />
                      )}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="endRegisDate"
                      required
                      as={DesktopDatePicker}
                      label="End register date"
                      inputFormat="dd/MM/yyyy"
                      onChange={handleEndRegisDate}
                      value={endRegisDate}
                      renderInput={(params) => (
                        <TextField required fullWidth {...params} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="beginDate"
                      required
                      as={DesktopDatePicker}
                      label="Begin date"
                      inputFormat="dd/MM/yyyy"
                      onChange={handleBeginDate}
                      value={beginDate}
                      renderInput={(params) => (
                        <TextField required fullWidth {...params} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="dueDate"
                      required
                      as={DesktopDatePicker}
                      label="Due date"
                      inputFormat="dd/MM/yyyy"
                      onChange={handleDueDate}
                      value={dueDate}
                      renderInput={(params) => (
                        <TextField required fullWidth {...params} />
                      )}
                      fullWidth
                    />
                  </Grid>
                </LocalizationProvider>

                <Grid item xs={12} md={6}>
                  <Field
                    name="bonusPoint"
                    as={TextField}
                    label="Bonus point"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    name="limitJoin"
                    as={TextField}
                    label="Limit join"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="location"
                    as={TextField}
                    label="Location"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    component="label"
                    color="secondary"
                    variant="contained"
                  >
                    Upload Image
                    <input
                      name="image"
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      hidden
                      onChange={uploadImageHandler}
                    />
                  </Button>
                </Grid>
                {imageUrl && (
                  <Grid item xs={12} md={6}>
                    <ImageContaier>
                      <img
                        style={{ maxWidth: 200 }}
                        src={imageUrl}
                        alt="Event"
                      />
                    </ImageContaier>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    mt: 5,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    sx={{ mx: 1 }}
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={changeEditHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ mx: 1 }}
                    fullWidth
                    variant="contained"
                    type="submit"
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        TransitionComponent={TransitionSnackbarLeft}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", bgcolor: "#2E7D32", color: "white" }}
        >
          Edit success!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditContent;
