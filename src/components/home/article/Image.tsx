import React from "react";
import styled from "styled-components";

const StyledImageBox = styled.div`
  overflow: hidden;
  text-align: center;
`;

const StyledImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: calc(var(--article-box-image-height) * 0.8);
  transition: transform 1s ease-out;
  @media (max-width: 750px) {
    width: 100%;
    height: 100%;
  }
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
