import PropTypes from "prop-types";

// material
import { styled } from "@mui/material/styles";
import { Toolbar, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

RankListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function RankListToolbar({ isClub }) {
  return (
    <RootStyle>
      <Typography variant="h4">{isClub ? "Club Rank" : "User Rank"}</Typography>
    </RootStyle>
  );
}
