import * as React from "react";
import ImageList from "./ImageList";
import styled from "styled-components";
import Page from "./Page";

const ImagesContainerStyled = styled.div`
  --images-container-height: calc(100vh - 7rem);
  margin: 0 15%;
  padding: 0 0.2%;
  height: calc(var(--images-container-height) - 1rem);
  background-color: white;
`;

const Images = () => {
  return(
    <ImagesContainerStyled>
      <ImageList />
      <Page
        width={"70"}
        height={"5"}
        next={true}
        back={true} />
    </ImagesContainerStyled>
  );
};

export default Images;