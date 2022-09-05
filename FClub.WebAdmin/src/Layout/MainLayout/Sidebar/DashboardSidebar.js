import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutWeb } from "../../../Context/Actions/authen-action";

// material
import { styled } from "@mui/material/styles";
import { Box, Link, Button, Drawer, Typography, Avatar } from "@mui/material";

// components
import Logo from "./Components/Logo";
import Scrollbar from "../../../Components/UI/Scrollbar";
import NavSection from "./Components/NavSection";
import { MHidden } from "../../../material-extends";

//
import {
  sidebarConfigAdmin,
  sidebarConfigNormal,
} from "./Components/sidebarConfig";

// icon
import LogoutIcon from "@mui/icons-material/Logout";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const { name, photo } = userData;

  const signOutHandler = () => {
    dispatch(signOutWeb());
  };

  // useEffect(() => {
  //   if (isOpenSidebar) {
  //     onCloseSidebar();
  //   }
  // }, [isOpenSidebar, onCloseSidebar]);

  const renderSidebarContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box
          component={RouterLink}
          to={userData.isAdmin ? "/dashboard/main" : "/dashboard/activity"}
          sx={{ display: "inline-flex" }}
        >
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link
          underline="none"
          component={RouterLink}
          to={userData.isAdmin ? "/dashboard/main" : "/dashboard/activity"}
        >
          <AccountStyle>
            <Avatar src={photo} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {userData.isAdmin ? "Admin" : "Club Manager"}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection
        navConfig={userData.isAdmin ? sidebarConfigAdmin : sidebarConfigNormal}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mb: 8, mt: { xs: 15, sm: 0 }, textAlign: "center" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={signOutHandler}
        >
          SIGN OUT
        </Button>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          variant="temporary"
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderSidebarContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open={true}
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderSidebarContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
