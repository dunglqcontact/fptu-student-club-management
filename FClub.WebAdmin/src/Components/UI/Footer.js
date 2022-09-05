import React from "react";
import styled from "styled-components";

const FooterControl = styled.footer`
  & p {
    text-align: center;
    font-weight: 600;
  }
`;

const Footer = () => {
  return (
    <FooterControl>
      <p>Copyright &copy; {new Date().getFullYear()}</p>;
    </FooterControl>
  );
};

export default Footer;
