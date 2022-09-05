import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// materials
import {
  Button,
  Card,
  Container,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// components
import Page from "../../../UI/Page";
import BlogPostHero from "../../../UI/BlogPostHero";
import Content from "./Components/Content";
import { Box } from "@mui/system";
import EditContent from "./Components/EditContent";
import { deleteActivity } from "./Components/action";
import ParticipantList from "./Components/ParticipantList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, lg: 350 },
  height: 220,
  bgcolor: "background.paper",
  borderRadius: "20px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ActivityDetail = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { idActivity } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activityDetails, setActivityDetails] = useState(null);
  const [author, setAuthor] = useState({});

  function changeEditHandler() {
    setIsEditing((prev) => !prev);
  }

  function deleteActivityHandler() {
    deleteActivity(token, idActivity);
    navigate(-1);
  }

  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/events?Id=${idActivity}&includeProperties=Creator.User`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((resData) => {
        setActivityDetails(resData.data[0]);
        setAuthor(resData.data[0].creator.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idActivity, token, isEditing]);

  return (
    <>
      <Page>
        <Button startIcon={<ArrowBackIosIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Activity Detail
          </Typography>

          {activityDetails != null &&
            (isEditing ? (
              <EditContent
                changeEditHandler={changeEditHandler}
                activityDetails={activityDetails}
              />
            ) : (
              <>
                <Card>
                  <BlogPostHero
                    activityDetails={activityDetails}
                    author={author}
                  />
                  <Content activityDetails={activityDetails} />
                </Card>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mr: 2 }}
                    onClick={modalHandler}
                    fullWidth
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    fullWidth
                    onClick={changeEditHandler}
                  >
                    Edit
                  </Button>
                </Box>
              </>
            ))}
        </Container>
        <Divider sx={{ my: 5 }} />
        <Container>
          <Typography variant="h4" gutterBottom sx={{ my: 4 }}>
            Participants
          </Typography>
          <ParticipantList idActivity={idActivity} />
        </Container>
      </Page>
      {activityDetails != null && (
        <Modal
          open={modalOpen}
          onClose={modalHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Do you really want to delete <b>{activityDetails.title}</b>?
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ mt: 2, mx: 1 }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={modalHandler}
              >
                Cancel
              </Button>
              <Button
                sx={{ mt: 2, mx: 1 }}
                fullWidth
                variant="contained"
                color="error"
                id={idActivity}
                onClick={deleteActivityHandler}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ActivityDetail;
