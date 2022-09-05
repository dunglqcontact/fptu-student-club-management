import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";

import { createActivityHandler } from "./Components/action";

// materials
import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Page from "../../../UI/Page";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/system";
import { GetMemberId } from "./Components/action";
import UploadSingleFile from "../../../UI/UploadSingleFile";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const CreateActivity = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const clubId = useSelector((state) => state.auth.clubId);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    GetMemberId(token, userId, clubId).then((data) => setMemberId(data));
  }, [token, userId, clubId]);

  const goBackHandler = () => {
    navigate(-1);
  };

  function submitHandler(data) {
    createActivityHandler(uploadImage, token, data, memberId);
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

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  const initialValues = {
    title: "",
    content: "",
    regisDate: "",
    endRegisDate: "",
    beginDate: "",
    dueDate: "",
    bonusPoint: 0,
    limitJoin: 0,
    location: "",
  };

  return (
    <Page title="Create Activity">
      <Button startIcon={<ArrowBackIosIcon />} onClick={goBackHandler}>
        Back
      </Button>
      <Container>
        <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
          New Activity
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(data, { resetForm }) => {
            submitHandler(data);
            setPreviewImage(null);
            setUploadImage(null);
            resetForm();
          }}
        >
          {({ resetForm }) => (
            <Form autoComplete="off">
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
                  <Grid item xs={12} md={6}>
                    <Field
                      name="regisDate"
                      required
                      as={TextField}
                      label="Register date"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="endRegisDate"
                      required
                      as={TextField}
                      label="End register date"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="beginDate"
                      required
                      as={TextField}
                      label="Begin date"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="dueDate"
                      required
                      as={TextField}
                      label="Due date"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
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
                  <Grid item xs={12}>
                    <LabelStyle>Event Image</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={previewImage}
                      onDrop={handleDrop}
                    />
                  </Grid>
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
                      onClick={() => {
                        resetForm();
                        setUploadImage(null);
                        setPreviewImage(null);
                      }}
                    >
                      Clear Form
                    </Button>
                    <Button
                      sx={{ mx: 1 }}
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      Create
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
            Create success!
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
};

export default CreateActivity;
