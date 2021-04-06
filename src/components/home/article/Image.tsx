import React from "react";
import styled from "styled-components";

const StyledImageBox = styled.div`
  overflow: hidden;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 55%;
  transition: transform 1s ease-out;
`;

const Image = (props: { alt: string; src: string }) => {
  const { alt, src } = props;

  return (
    <StyledImageBox>
      <StyledImage src={src} alt={alt} />
    </StyledImageBox>
  );
};

export default Image;
