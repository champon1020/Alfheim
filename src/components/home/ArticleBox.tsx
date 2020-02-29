import React, { useCallback } from "react";
import styled from "styled-components";
import ArticleBoxCategory from "./ArticleBoxCategory";
import { ArticleType } from "src/type";
import { parseDateToString } from "../services/parser";

const ArticleBoxStyled = styled.div`
  position: relative;
  z-index: 1;
  width: calc(var(--container-width) / 8 * 2.7);
  height: calc(var(--container-width) / 8 * 2.7);
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
    font-size: 1rem;
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
  & h3 {
    display: inline-block;
    text-align: left;
    margin: 0 3%;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const BASE_URL = "http://localhost:3000";

type Props = {
  article: ArticleType;
}

const ArticleBox = (props: Props) => {
  const { article } = props;

  const handleOnClick = useCallback(
    () => {
      window.location.href = BASE_URL + "/article/" + article.id;
    },
    [article],
  );

  return(
    <ArticleBoxStyled onClick={handleOnClick}>
      <ImageBoxStyled>
        <ImageStyled src={article.imageUrl} alt="article box" />
      </ImageBoxStyled>
      <DateBoxStyled>
        <p>{parseDateToString(article.createDate)}</p>
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