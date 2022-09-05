import { useRef, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PersonIcon from "@mui/icons-material/Person";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DisapproveModal from "./DisapproveModal";
import BanMemberModal from "./BanMemberModal";

// ----------------------------------------------------------------------

export default function MoreMenuMember({
  userId,
  token,
  refreshHandler,
  memberRole,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [modalDisapproveOpen, setModalDisapproveOpen] = useState(false);
  const [modalBanOpen, setModalBanOpen] = useState(false);

  function disapproveUserHandler() {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members/ban?id=${userId}`,
      {
        method: "PUT",
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

  function promoteMemberToTreasurer() {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members/update-role?id=${userId}&roleId=3`,
      {
        method: "PUT",
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

  function promoteMemberToCreator() {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members/update-role?id=${userId}&roleId=4`,
      {
        method: "PUT",
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

  function demoteMember() {
    fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members/update-role?id=${userId}&roleId=2`,
      {
        method: "PUT",
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
    <>
      <IconButton
        ref={ref}
        onClick={() => setIsOpen(true)}
        disabled={memberRole === 1}
      >
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
        {memberRole === 2 && (
          <>
            <MenuItem
              sx={{ color: "text.secondary" }}
              onClick={promoteMemberToTreasurer}
            >
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary="Promote to Treasurer"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
            <MenuItem
              sx={{ color: "text.secondary" }}
              onClick={promoteMemberToCreator}
            >
              <ListItemIcon>
                <PermMediaIcon />
              </ListItemIcon>
              <ListItemText
                primary="Promote to Creator"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </>
        )}

        {memberRole !== 2 && (
          <MenuItem sx={{ color: "text.secondary" }} onClick={demoteMember}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Demote to Member"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <MenuItem sx={{ color: "text.secondary" }} onClick={setModalBanOpen}>
          <ListItemIcon>
            <NotInterestedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Ban member"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>

      <DisapproveModal
        token={token}
        userId={userId}
        modalOpen={modalDisapproveOpen}
        setModalOpen={setModalDisapproveOpen}
        refreshHandler={refreshHandler}
      />

      <BanMemberModal
        modalOpen={modalBanOpen}
        setModalOpen={setModalBanOpen}
        disapproveUserHandler={disapproveUserHandler}
      />
    </>
  );
}
