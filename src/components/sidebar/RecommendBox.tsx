import { Config } from "~/config";
import { pathJoin } from "~/func";
import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

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
`;

const TitleWord = styled.h2`
  position: relative;
  top: 33%;
  width: 93%;
  margin: auto;
  color: white;
  opacity: 1;
  word-break: break-word;
`;

type Props = {
  article: IArticle;
};

const RecommendBox = (props: Props) => {
  const { article } = props;

  const handelOnClick = useCallback(() => {
    window.open(
      pathJoin(Config.url, "article", article.sortedId.toString()),
      "_self"
    );
  }, [article]);

  return (
    <ListItemStyled onClick={handelOnClick}>
      <ImageStyled
        src={pathJoin(Config.fileUrl, "images", article.imageHash)}
      />
      <TitleBoxStyled>
        <TitleWord>{article.title}</TitleWord>
      </TitleBoxStyled>
    </ListItemStyled>
  );
};

export default RecommendBox;
