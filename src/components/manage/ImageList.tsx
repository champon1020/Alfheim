import * as React from "react";
import styled from "styled-components";

const ImageListContainerStyled = styled.div`
  text-align: center;
  height: 72vh;
  & ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
  }
  & li {
    margin: 20px;
  }
`;

const ImageStyled = styled.img`
  max-width: 250px;
  max-height: 250px;
  object-fit: cover;
  box-sizing: border-box;
  &:hover { 
    border: solid 3px blue;
    cursor: pointer;
  }
`;

const ImageList = () => {
  return(
    <ImageListContainerStyled>
      <ul>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={require("../../assets/images/profile_image.png")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={require("../../assets/images/manage-wall.jpg")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={require("../../assets/images/manage-wall.jpg")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={require("../../assets/images/manage-wall.jpg")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={require("../../assets/images/profile_image.png")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={require("../../assets/images/manage-wall.jpg")} />
        </li>
      </ul>
    </ImageListContainerStyled>
  );
};

export default ImageList;