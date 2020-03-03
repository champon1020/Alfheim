import * as React from "react";
import styled from "styled-components";
import image from "../../assets/images/sky.jpg";

const ImageListStyled = styled.ul`
  text-align: center;
  height: 72vh;
  list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
`;

const ImageListItemStyled = styled.li`
  margin: 20px;
`;

const ImageStyled = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover;
  box-sizing: border-box;
  &:hover { 
    border: solid 3px blue;
    cursor: pointer;
  }
`;

const ImageList = () => {
  return(
    <ImageListStyled>
      <ImageListItemStyled>
        <ImageStyled src={image} />
      </ImageListItemStyled>
    </ImageListStyled>
  );
};

export default ImageList;