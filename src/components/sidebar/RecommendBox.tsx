import React from "react";
import styled from "styled-components";
import image from "../../assets/images/sky.jpg";

const ListItemStyled = styled.li`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover > img {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const ImageStyled = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-out;
`;

const TitleBoxStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  & h2 {
    position: relative;
    color: white;
    opacity: 1;
    top: 4em;
  }
`;

const RecommendBox = () => {
  return (
    <ListItemStyled>
      <ImageStyled src={image} />
      <TitleBoxStyled>
        <h2>sample article</h2>
      </TitleBoxStyled>
    </ListItemStyled>
  );
};

export default RecommendBox;