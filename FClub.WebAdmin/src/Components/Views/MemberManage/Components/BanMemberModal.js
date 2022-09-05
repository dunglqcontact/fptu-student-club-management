import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

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

const BanMemberModal = ({ modalOpen, setModalOpen, disapproveUserHandler }) => {
  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };

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
          Do you really want to <b>ban</b> this user?
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
            onClick={() => {
              disapproveUserHandler();
              modalHandler();
            }}
          >
            Ban
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BanMemberModal;
