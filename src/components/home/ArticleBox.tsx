import { formatDateStr, pathJoin } from "~/components/parser";
import { Config } from "~/config";
import { ArticleIface } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

import ArticleBoxCategory from "./ArticleBoxCategory";

const ArticleBoxStyled = styled.div`
  position: relative;
  z-index: 1;
  width: calc(var(--container-width) / 8 * 2.7);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:hover img {
    transform: scale(1.1);
  }
  @media (max-width: 800px) {
    width: 100%;
    height: 100%;
  }
`;

const ImageBoxStyled = styled.div`
  overflow: hidden;
`;

const ImageStyled = styled.img`
  object-fit: cover;
  width: 100%;
  height: 55%;
  transition: transform 1s ease-out;
`;

const DateBoxStyled = styled.div`
  display: inline-block;
  margin-top: 2%;
  color: white;
  background-color: var(--base-color);
  font-size: 2rem;
  & p {
    padding: 0 10px;
  }
  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

const CategoryBoxStyled = styled.div`
  margin-top: 3%;
`;

const TitleBoxStyled = styled.div`
  margin-top: 3%;
  color: var(--base-color);
  font-size: 2.4rem;
  width: 100%;
  word-break: break-word;
  & h3 {
    display: inline-block;
    text-align: left;
    margin: 0 3%;
  }
  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

interface Props {
  article: ArticleIface;
}

const ArticleBox = (props: Props) => {
  const { article } = props;

  const onClickArticle = useCallback(() => {
    window.location.href = pathJoin(
      Config.url,
      "article",
      article.sortedId.toString()
    );
  }, [article]);

  return (
    <ArticleBoxStyled onClick={onClickArticle}>
      <ImageBoxStyled>
        <ImageStyled
          src={pathJoin(Config.fileUrl, "images", article.imageHash)}
          alt="article box"
        />
      </ImageBoxStyled>
      <DateBoxStyled>
        <p>{formatDateStr(article.createDate)}</p>
      </DateBoxStyled>
      <TitleBoxStyled>
        <h3>{article.title}</h3>
      </TitleBoxStyled>
      <CategoryBoxStyled>
        <ArticleBoxCategory categories={article.categories} />
      </CategoryBoxStyled>
    </ArticleBoxStyled>
  );
};

export default ArticleBox;
