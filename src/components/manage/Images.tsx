import * as React from "react";
import ImageList from "./ImageList";
import styled from "styled-components";

const ImagesContainerStyled = styled.div`
  margin-top: 40px;
  background-color: white;
  padding: 13px;
}
`;

const Images = () => {
  return(
    <ImagesContainerStyled>
      <ImageList />
      {/* <Page backText="" nextText="" /> */}
    </ImagesContainerStyled>
  );
};

export default Images;