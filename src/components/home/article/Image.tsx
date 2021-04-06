import React from "react";
import styled from "styled-components";

const StyledImageBox = styled.div`
  overflow: hidden;
  height: var(--article-box-height);
  text-align: center;
`;

const StyledImage = styled.img`
  object-fit: contain;
  width: calc(var(--article-box-width) * 0.6);
  height: calc(var(--article-box-height) * 0.85);
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
