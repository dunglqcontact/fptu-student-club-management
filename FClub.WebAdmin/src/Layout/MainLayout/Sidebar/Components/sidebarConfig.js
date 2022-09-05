import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PieChartIcon from "@mui/icons-material/PieChart";
import HomeIcon from "@mui/icons-material/Home";

// ----------------------------------------------------------------------

export const sidebarConfigAdmin = [
  {
    title: "Dashboard",
    path: "/dashboard/main",
    icon: <PieChartIcon />,
  },
  {
    title: "manage club",
    path: "/dashboard/club",
    icon: <MeetingRoomIcon />,
  },
  {
    title: "Manage User",
    path: "/dashboard/user",
    icon: <GroupIcon />,
  },
];

export const sidebarConfigNormal = [
  {
    title: "Activities",
    path: "/dashboard/activity",
    icon: <NotificationsActiveIcon />,
  },
  {
    title: "My Club",
    path: "/dashboard/my-club",
    icon: <HomeIcon />,
  },
  {
    title: "Manage Member",
    path: "/dashboard/club-manage",
    icon: <GroupsIcon />,
  },
  {
    title: "Budget",
    path: "/dashboard/budget",
    icon: <AttachMoneyIcon />,
  },
];
