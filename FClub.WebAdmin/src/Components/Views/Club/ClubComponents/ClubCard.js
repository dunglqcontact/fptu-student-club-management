import React from "react";

import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Typography, Stack, CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const ClubImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ClubCard.propTypes = {
  club: PropTypes.object,
};

export default function ClubCard({ club }) {
  const { id, name, logo } = club;

  return (
    <>
      <Card>
        <CardActionArea>
          <RouterLink
            style={{ textDecoration: "none", color: "black" }}
            to={id}
          >
            <Box sx={{ pt: "100%", position: "relative" }}>
              <ClubImgStyle alt={name} src={logo} />
            </Box>

            <Stack
              spacing={2}
              sx={{ p: 3, textAlign: "center", alignItems: "center" }}
            >
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            </Stack>
          </RouterLink>
        </CardActionArea>
      </Card>
    </>
  );
}
