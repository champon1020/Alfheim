import React, { useCallback} from "react";
import styled from "styled-components";
import { Config } from "src/App";

const ImageListContainer = styled.div`
  height: calc(var(--images-container-height) - 10rem);
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

type Props = {
  images: string[];
}

const ImageList = (props: Props) => {
  const { images } = props; 

  const imageList = useCallback(
    () => {
      const list = [] as JSX.Element[];
      images.forEach((v, i) => {
        const path = Config.srcHost + "/images/" + v;
        list.push(
          <ImageListItemStyled key={i}>
            <a href={path}>
              <ImageStyled src={path} />
            </a>
          </ImageListItemStyled>
        );
      });
      return list;
    },
    [images],
  );

  return(
    <ImageListContainer>
      <ImageListStyled>
        {imageList()}
      </ImageListStyled>
    </ImageListContainer>
  );
};

export default ImageList;