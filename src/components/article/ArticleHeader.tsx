import React from "react";
import Category from "./Category";
import styled from "styled-components";
import { ArticleType } from "src/type";
import { parseDateToString } from "../services/parser";

const ArticleHeaderStyled = styled.div`
  & p {
    margin: 0;
  }
`;

const DateContainerStyled = styled.div`
  display: inline-block;
  font-size: 24px;
  border-bottom: solid thin gray;
  margin-left: 40px;
  padding: 0 5px;
`;

const TitleContainerStyled = styled.div`
  text-align: center;
  font-size: 24px;
  width: 80%;
  margin: 0 auto 20px auto;
  & h2 {
    margin-bottom: 0;
    border-bottom: solid thin gray;
    display: inline-block;
  }
`;

const CategoryContainerStyled = styled.div`
  width: 80%;
  margin: 0 auto;
`;

type ParentProps = {
  article: ArticleType;
}

type Props = ParentProps;

const ArticleHeader = (props: Props) => {
  const { article } = props;

  return(
    <ArticleHeaderStyled>
      <DateContainerStyled>
        <p>{parseDateToString(article.createDate)}</p>
      </DateContainerStyled>
      <TitleContainerStyled>
        <h2>{article.title}</h2>
      </TitleContainerStyled>
      <CategoryContainerStyled>
        <Category categories={article.categories} />
      </CategoryContainerStyled>
    </ArticleHeaderStyled>
  );
};

export default ArticleHeader;