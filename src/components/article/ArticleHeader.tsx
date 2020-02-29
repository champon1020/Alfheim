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
  font-size: 2.0rem;
  border-bottom: solid thin gray;
  margin-left: 8%;
  padding: 0 5px;
  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

const TitleContainerStyled = styled.div`
  text-align: center;
  font-size: 2.4rem;
  width: 80%;
  margin: 0 auto 4% auto;
  & h2 {
    margin-bottom: 0;
    border-bottom: solid thin gray;
    display: inline-block;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
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