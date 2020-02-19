import * as React from "react";
import ImageList from "./ImageList";
import Page from "../common/Page";
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
      <Page />
    </ImagesContainerStyled>
  );
};

export default Images;