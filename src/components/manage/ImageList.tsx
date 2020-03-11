import * as React from "react";
import styled from "styled-components";
import image from "../../assets/images/sky.jpg";
import image2 from "../../assets/images/space.jpg";
import image3 from "../../assets/images/beach.jpg";

const ImageListContainer = styled.div`
  height: calc(var(--images-container-height) - 6rem);
`;

const ImageListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
`;

const ImageListItemStyled = styled.li`
  width: 23%;
  margin: 1%;
  transition: opacity .1s ease-out;
  &:hover { 
    opacity: 0.6;
    cursor: pointer;
  }
`;

const ImageStyled = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ImageList = () => {
  return(
    <ImageListContainer>
      <ImageListStyled>
        <ImageListItemStyled>
          <ImageStyled src={image} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image3} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image2} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image2} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image2} />
        </ImageListItemStyled>
        <ImageListItemStyled>
          <ImageStyled src={image3} />
        </ImageListItemStyled>
      </ImageListStyled>
    </ImageListContainer>
  );
};

export default ImageList;