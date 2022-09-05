import { useRef, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import GppGoodIcon from "@mui/icons-material/GppGood";

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function UserInactiveMoreMenu({
  userId,
  isAdmin,
  token,
  refreshHandler,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  function activateUserHandler() {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/users/${userId}/true`,
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
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={activateUserHandler}
        >
          <ListItemIcon>
            <GppGoodIcon />
          </ListItemIcon>
          <ListItemText
            primary="Activate User"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
