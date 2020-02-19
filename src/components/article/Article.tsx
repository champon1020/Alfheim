import * as React from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";
import styled from "styled-components";

const ArticleContainerStyled = styled.div`
  background-color: rgb(255, 248, 240);
  padding: 40px 10px;
  margin-bottom: 70px;
  box-shadow: 2px 2px 4px gray;
`;

interface ParentProps {
  articleId: number;
}

type Props = ParentProps;

const Article: React.FC<Props> = (props) => {
  return(
    <ArticleContainerStyled>
      <ArticleHeader />
      <ArticleContent />
      <ArticleFooter />
    </ArticleContainerStyled>
  );
};

export default Article;