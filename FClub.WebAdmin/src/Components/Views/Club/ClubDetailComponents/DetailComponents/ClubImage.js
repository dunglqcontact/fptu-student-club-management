import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

// materials
import { Button, Card, CardContent, Modal, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const ImageContaier = styled("div")(({ theme }) => ({
  margin: "auto",
  borderRadius: "50%",
  padding: "15px",
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

const ClubImage = ({ imageSrc, title, id }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };

  const banClubHandler = (event) => {
    const id = event.target.id;
    const url = `https://club-management-service.azurewebsites.net/api/v1/clubs/${id}/false`;
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setModalOpen((prev) => !prev);
        navigate(-1, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card>
        <ImageContaier>
          <ImageHolder>
            <img src={imageSrc} alt="Ava" />
          </ImageHolder>
        </ImageContaier>
        <CardContent>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {title}
            </Typography>
            <Button variant="contained" color="error" onClick={modalHandler}>
              Ban this Club
            </Button>
          </Box>
        </CardContent>
      </Card>
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
            Do you really want to ban <b>{title}</b>?
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
              Unban
            </Button>
            <Button
              sx={{ mt: 2, mx: 1 }}
              fullWidth
              variant="contained"
              color="error"
              id={id}
              onClick={banClubHandler}
            >
              Ban
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ClubImage;

ClubImage.propTypes = {
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};
