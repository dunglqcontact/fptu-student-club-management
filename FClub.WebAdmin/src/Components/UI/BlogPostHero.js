import PropTypes from "prop-types";

import ShareIcon from "@mui/icons-material/Share";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// material
import { alpha, useTheme, styled } from "@mui/material/styles";

// utils
import { fVNDate } from "../../Utils/formatTime";
import { Box } from "@mui/system";
import {
  Avatar,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useMediaQuery,
} from "@mui/material";

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    name: "Linkedin",
    icon: <LinkedInIcon />,
  },
  {
    name: "Twitter",
    icon: <TwitterIcon />,
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  height: 480,
  position: "relative",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  [theme.breakpoints.up("md")]: {
    height: "auto",
    paddingTop: "calc(100% * 9 / 16)",
  },
  "&:before": {
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: alpha(theme.palette.grey[900], 0.72),
  },
}));

const TitleStyle = styled(Typography)(({ theme }) => ({
  top: 0,
  zIndex: 10,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(10),
  },
}));

const FooterStyle = styled("div")(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "flex-end",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    alignItems: "center",
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(10),
  },
}));

const CoverImgStyle = styled("img")({
  top: 0,
  zIndex: 8,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

BlogPostHero.propTypes = {
  activityDetails: PropTypes.object.isRequired,
};

export default function BlogPostHero({ activityDetails, author, ...other }) {
  const { image: cover, title, createDate: createdAt } = activityDetails;
  const { name, photo: avatarUrl } = author;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <RootStyle {...other}>
      <CoverImgStyle alt="post cover" src={cover} />

      <TitleStyle variant="h2" component="h1">
        {title}
      </TitleStyle>

      <FooterStyle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: "common.white" }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#cccccc" }}>
              Created: {fVNDate(createdAt)}
            </Typography>
          </Box>
        </Box>

        <SpeedDial
          direction={isMobile ? "up" : "left"}
          ariaLabel="Share post"
          icon={<ShareIcon />}
          sx={{ "& .MuiSpeedDial-fab": { width: 48, height: 48 } }}
        >
          {SOCIALS.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="top"
              FabProps={{ color: "default" }}
            />
          ))}
        </SpeedDial>
      </FooterStyle>
    </RootStyle>
  );
}
