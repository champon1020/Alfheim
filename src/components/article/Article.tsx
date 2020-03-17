import React from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";
import styled from "styled-components";
import { ArticleType } from "src/type";

const ArticleContainerStyled = styled.div`
  background-color: whitesmoke;
  padding: 40px 10px;
  margin-bottom: 70px;
  box-shadow: 2px 2px 4px gray;
`;

interface ParentProps {
  article: ArticleType;
  content: string;
}

type Props = ParentProps;

const Article = (props: Props) => {
  const { article, content } = props;

  return(
    <ArticleContainerStyled>
      <ArticleHeader article={article} />
      <ArticleContent content={content} />
      <ArticleFooter />
    </ArticleContainerStyled>
  );
};

export default Article;