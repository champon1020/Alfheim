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

const StyledTitle = styled.h1`
  position: absolute;
  cursor: pointer;
  color: white;
  display: inline-block;
  left: 2%;
  line-height: 6rem;
  font-size: 2.4rem;
  animation: ${AnimSlideDown} 1.7s ease 0s;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 800px) {
    left: 5%;
  }
`;

const onClickTitle = () => {
  window.open("/", "_self");
};

const Title = () => {
  return (
    <StyledTitle onClick={onClickTitle}>{"champon's notebook"}</StyledTitle>
  );
};

export default Title;
