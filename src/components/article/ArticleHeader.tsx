import { formatDateStr } from "~/func";
import { IArticle } from "~/type";
import React from "react";
import styled from "styled-components";

import Category from "./Category";

const StyledHeader = styled.div`
  & p {
    margin: 0;
  }
`;

const StyledDate = styled.div`
  display: inline-block;
  font-size: 2rem;
  border-bottom: solid thin gray;
  margin-left: 8%;
  padding: 0 5px;
  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

const StyledTitle = styled.div`
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

const StyledCategory = styled.div`
  width: 80%;
  margin: 0 auto;
`;

type Props = {
  article: IArticle;
};

const ArticleHeader = (props: Props) => {
  const { article } = props;

  return (
    <StyledHeader>
      <StyledDate>
        <p>{formatDateStr(article.createDate)}</p>
      </StyledDate>
      <StyledTitle>
        <h2>{article.title}</h2>
      </StyledTitle>
      <StyledCategory>
        <Category categories={article.categories} />
      </StyledCategory>
    </StyledHeader>
  );
};

export default ArticleHeader;
