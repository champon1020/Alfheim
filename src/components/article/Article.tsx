import { ArticleIface } from "~/type";
import React from "react";
import styled from "styled-components";

import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";
import ArticleHeader from "./ArticleHeader";

const ArticleContainerStyled = styled.div`
  background-color: ghostwhite;
  padding: 40px 10px;
  margin-bottom: 70px;
  box-shadow: 2px 2px 4px gray;
  @media (max-width: 500px) {
    box-shadow: none;
  }
`;

interface Props {
  article: ArticleIface;
}

const Article = (props: Props) => {
  const { article } = props;

  return (
    <ArticleContainerStyled>
      <ArticleHeader article={article} />
      <ArticleContent content={article.content} />
      <ArticleFooter article={article} />
    </ArticleContainerStyled>
  );
};

export default Article;
