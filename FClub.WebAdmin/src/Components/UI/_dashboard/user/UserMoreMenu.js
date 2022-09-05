import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import BlockIcon from "@mui/icons-material/Block";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
  Button,
  Autocomplete,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
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
// ----------------------------------------------------------------------

export default function UserMoreMenu({
  userId,
  name,
  isAdmin,
  token,
  refreshHandler,
}) {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [banModal, setBanModal] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [clubData, setClubData] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");

  useEffect(() => {
    fetch(
      "https://club-management-service.azurewebsites.net/api/v1/clubs/without-manager",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
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
        resData.map((row) => result.push({ label: row.name, id: row.id }));
        setClubData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };

  const banModalHandler = () => {
    setBanModal((prev) => !prev);
  };

  function disableUserHandler() {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/users/${userId}/false`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          refreshHandler();
        }
      })
      .catch((error) => console.log(error));
  }

  function managerPromoteHandler() {
    fetch(`https://club-management-service.azurewebsites.net/api/v1/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId,
        clubId: selectedClubId,
        roleId: 1,
        status: true,
        isApproved: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
          refreshHandler();
          setIsSnackbarOpen(true);
        }
      })
      .catch((error) => console.log(error));
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)} disabled={isAdmin}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 250, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={banModalHandler}>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText
            primary="Inactivate User"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <ArrowCircleUpIcon />
          </ListItemIcon>
          <ListItemText
            primary="Promote To Admin"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem sx={{ color: "text.secondary" }} onClick={modalHandler}>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText
            primary="Assign to Club Manager"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>

      {/* Club assgin */}
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
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
            Which club you want to assign?
          </Typography>
          <Autocomplete
            disablePortal
            options={clubData}
            onChange={(event, value) => {
              setSelectedClubId(value.id);
            }}
            renderInput={(params) => <TextField {...params} label="Club" />}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Button
              sx={{ mt: 2, mx: 1 }}
              fullWidth
              variant="contained"
              color="error"
              onClick={modalHandler}
            >
              Cancel
            </Button>
            <Button
              sx={{ mt: 2, mx: 1 }}
              fullWidth
              variant="contained"
              onClick={() => {
                managerPromoteHandler();
                modalHandler();
              }}
            >
              Assign
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Ban user */}
      <Modal
        open={banModal}
        onClose={banModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
            Do you really want to inactivate <b>{name}</b> ?
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Button
              sx={{ mt: 2, mx: 1 }}
              fullWidth
              variant="contained"
              color="error"
              onClick={banModalHandler}
            >
              Cancel
            </Button>
            <Button
              sx={{ mt: 2, mx: 1 }}
              fullWidth
              variant="contained"
              onClick={disableUserHandler}
            >
              Inactivate
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", bgcolor: "#2E7D32", color: "white" }}
        >
          Assign success!
        </Alert>
      </Snackbar>
    </>
  );
}
