import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  width: 100%;
  height: 13vh;
  background-color: var(--base-color);
  text-align: center;
  color: white;
`;

const StyledCopyRight = styled.h3`
  padding-top: 3rem;
  font-size: 1.4rem;
`;

const StyledPoweredBy = styled.h3`
  padding-top: 1rem;
  font-size: 1.4rem;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCopyRight>{"Copyright champon"}</StyledCopyRight>
      <StyledPoweredBy>{"Powered by Golang & React"}</StyledPoweredBy>
    </StyledFooter>
  );
};

export default Footer;
