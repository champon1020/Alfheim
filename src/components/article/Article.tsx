import { IArticle } from "~/type";
import React from "react";
import styled from "styled-components";

import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";
import ArticleHeader from "./ArticleHeader";

const StyledContainer = styled.div`
  background-color: ghostwhite;
  padding: 40px 10px;
  margin-bottom: 70px;
  box-shadow: 2px 2px 4px gray;
  @media (max-width: 500px) {
    box-shadow: none;
  }
`;

interface Props {
  article: IArticle;
}

const Article = (props: Props) => {
  const { article } = props;

  return (
    <StyledContainer>
      <ArticleHeader article={article} />
      <ArticleContent content={article.content} />
      <ArticleFooter article={article} />
    </StyledContainer>
  );
};

export default Article;
