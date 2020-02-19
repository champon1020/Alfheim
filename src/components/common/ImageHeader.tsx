import * as React from "react";
import HeaderImage from "../../assets/images/beach.jpg";
import styled from "styled-components";

const ImageHeaderStyled = styled.div`
  text-align: center;
  height: 400px;
  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ImageHeader = () => {
  return(
    <ImageHeaderStyled>
      <img src={HeaderImage} alt="header" />
    </ImageHeaderStyled>
  );
};

export default ImageHeader;