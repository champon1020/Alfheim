import Favicon from "~/assets/images/favicon.svg";
import React from "react";
import styled, { keyframes } from "styled-components";

const AnimSlideDown = keyframes`
  from {
    top: -6rem;
  }
  to {
    top: 0rem;
  }
`;

const StyledIcon = styled.img`
  position: absolute;
  display: inline-block;
  left: 3rem;
  margin-top: 0.5rem;
  width: 4.5rem;
  animation: ${AnimSlideDown} 1.7s ease 0s;
`;

const Icon = () => {
  return <StyledIcon src={Favicon} alt={"favicon"} />;
};

export default Icon;
