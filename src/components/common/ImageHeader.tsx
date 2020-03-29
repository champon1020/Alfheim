import React, { useEffect, useCallback, useState, useRef } from "react";
import HeaderImage from "../../assets/images/beach.jpg";
import HeaderImage2 from "../../assets/images/test.jpg";
import styled, { keyframes } from "styled-components";

const ImageHeaderStyled = styled.div`
  text-align: center;
  height: 40rem;
`;

const fadeOut = keyframes`
  from {
    opacity: 1.0;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1.0;
  }
`;

const ImageStyled = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  &.active {
    animation: ${fadeIn} 2s ease 0s;
  }
  &.inactive {
    animation: ${fadeOut} .7s ease 0s;
  }
`;

const imageList = [
  HeaderImage,
  HeaderImage2,
];

const duration = 15000;

const ImageHeader = () => {
  const [img, setImg] = useState(HeaderImage);
  const imageRef = useRef({} as HTMLImageElement);

  const updateImage = useCallback(
    (num: number) => {
      setTimeout(() => {
        imageRef.current.classList.remove("inactive");
        imageRef.current.classList.add("active");
        setImg(imageList[num % imageList.length]);
        updateImage(num+1);
      }, duration);

      setTimeout(() => {
        imageRef.current.classList.remove("active");
        imageRef.current.classList.add("inactive");
      }, duration-600);
    },
    [],
  );

  useEffect(() => {
    updateImage(1);
    // eslint-disable-next-line
  }, []);

  return(
    <ImageHeaderStyled>
      <ImageStyled 
        src={img}
        ref={imageRef}
        alt="header"/>
    </ImageHeaderStyled>
  );
};

export default ImageHeader;