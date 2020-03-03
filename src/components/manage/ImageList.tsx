import * as React from "react";
import styled from "styled-components";
import image from "../../assets/images/sky.jpg";

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
    <ImageListContainerStyled>
      <ul>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={image} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={image} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={image} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={image} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={image} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <ImageStyled src={image} />
        </li>
      </ul>
    </ImageListContainerStyled>
  );
};

export default ImageList;