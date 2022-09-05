import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FormikProvider, Form, useFormik } from "formik";

import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  Paper,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

import { createClubHandler } from "./Components/action";
import UploadSingleFile from "../../../UI/UploadSingleFile";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const CreateClubComponent = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [uploadImage, setUploadImage] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [schoolData, setSchoolData] = useState([]);

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
        const result = [];
        resData.data.map((row) => result.push({ label: row.name, id: row.id }));
        setSchoolData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function submitHandler(data) {
    createClubHandler(uploadImage, token, data);
    setIsSnackbarOpen(true);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      universityId: "",
      balance: 0,
      about: "",
      status: true,
    },
    onSubmit: async (data, { resetForm }) => {
      submitHandler(data);
      setSelectedSchool("");
      resetForm();
    },
  });

  const { values, handleSubmit, setFieldValue, getFieldProps } = formik;

  function TransitionSnackbarLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploadImage(file);
        setFieldValue("logo", {
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Paper elevation={8} sx={{ p: 5, width: "70%" }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Club ID"
                  fullWidth
                  required
                  inputProps={{
                    maxLength: 32,
                    style: { textTransform: "uppercase" },
                  }}
                  {...getFieldProps("id")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...getFieldProps("name")}
                  label="Club Name"
                  fullWidth
                  required
                  placeholder="Enter club name"
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  value={selectedSchool}
                  onChange={(event, newValue) => {
                    setFieldValue("universityId", newValue.id);
                    setSelectedSchool(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="School" />
                  )}
                  options={schoolData}
                  getOptionLabel={(option) => option.label || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <LabelStyle>Club Logo</LabelStyle>

                <UploadSingleFile
                  maxSize={3145728}
                  accept="image/*"
                  file={values.logo}
                  onDrop={handleDrop}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                textAlign: "center",
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" fullWidth>
                Create
              </Button>
            </Box>
          </Paper>
        </Form>
      </FormikProvider>

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
    </>
  );
};

export default CreateClubComponent;
