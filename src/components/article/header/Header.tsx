import { formatDateStr } from "~/func";
import { IArticle } from "~/type";
import React from "react";
import styled from "styled-components";

import Category from "./Category";
import Date from "./Date";
import Title from "./Title";

const StyledHeader = styled.div`
  & p {
    margin: 0;
  }
`;

type Props = {
  article: IArticle;
};

const ArticleHeader = (props: Props) => {
  const { article } = props;

  return (
    <StyledHeader>
      <Date date={article.createdDate} />
      <Title title={article.title} />
      <Category categories={article.categories} />
    </StyledHeader>
  );
};

export default ArticleHeader;
