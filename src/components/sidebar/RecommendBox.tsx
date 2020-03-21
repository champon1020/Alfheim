import React, { useCallback } from "react";
import styled from "styled-components";
import { ArticleType } from "src/type";
import { Config } from "src/App";
import { pathJoin } from "../services/parser";

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
    top: 3.5em;
  }
`;

type Props = {
  article: ArticleType;
}

const RecommendBox = (props: Props) => {
  const { article } = props;

  const handelOnClick = useCallback(
    () => {
      window.open(pathJoin(Config.host, "article", article.sortedId.toString()), "_self");
    },
    [article],
  );

  return (
    <ListItemStyled
      onClick={handelOnClick} >
      <ImageStyled 
        src={pathJoin(Config.srcHost, "images", article.imageHash)}
      />
      <TitleBoxStyled>
        <h2>{article.title}</h2>
      </TitleBoxStyled>
    </ListItemStyled>
  );
};

export default RecommendBox;