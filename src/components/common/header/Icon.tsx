import Favicon from "~/assets/images/favicon.svg";
import Config from "~/config";
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
  cursor: pointer;
  @media (max-width: 500px) {
    left: 1rem;
  }
`;

const Icon = () => {
  const jumpToHome = () => {
    window.open(`${Config.origin}/`, "_self");
  };
  return <StyledIcon src={Favicon} alt={"favicon"} onClick={jumpToHome} />;
};

export default Icon;
