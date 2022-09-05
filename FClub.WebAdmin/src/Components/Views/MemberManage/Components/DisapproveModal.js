import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, lg: 350 },
  bgcolor: "background.paper",
  borderRadius: "20px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const DisapproveModal = ({
  token,
  userId,
  modalOpen,
  setModalOpen,
  refreshHandler,
}) => {
  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };

  function disapproveUserHandler() {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((response) => {
      if (response.ok) {
        refreshHandler();
      }
    });
  }

  return (
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
          Do you really want to <b>disapprove</b> this user?
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
            onClick={disapproveUserHandler}
          >
            Disapprove
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DisapproveModal;
