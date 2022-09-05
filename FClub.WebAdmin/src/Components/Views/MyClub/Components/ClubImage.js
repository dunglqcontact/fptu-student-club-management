import React from "react";
import PropTypes from "prop-types";

// materials
import { styled } from "@mui/material/styles";

const ImageContaier = styled("div")(({ theme }) => ({
  margin: "auto",
  borderRadius: "50%",
  padding: "15px",
  border: "1px",
}));

const ImageHolder = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
}));

const ClubImage = ({ imageSrc }) => {
  return (
    <ImageContaier>
      <ImageHolder>
        <img src={imageSrc} alt="Ava" />
      </ImageHolder>
    </ImageContaier>
  );
};

export default ClubImage;

ClubImage.propTypes = {
  imageSrc: PropTypes.string,
};
