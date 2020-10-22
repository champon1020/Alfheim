import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const AnimFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1.0;
  }
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  &.active {
    animation: ${AnimFadeIn} 2s ease 0s;
  }
`;

type Props = {
  src: string;
};

const Image = (props: Props) => {
  const { src } = props;
  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imageRef === null || imageRef.current === null) {
      return;
    }

    imageRef.current.classList.add("active");
    setTimeout(() => {
      imageRef.current.classList.remove("active");
    }, 2000);
  }, [src]);

  return <StyledImage src={src} ref={imageRef} alt="header" />;
};

export default Image;
