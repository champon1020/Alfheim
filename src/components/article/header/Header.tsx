import { IArticle } from "~/interfaces";
import { formatDateStr } from "~/util/util";
import React from "react";
import styled from "styled-components";

import Date from "./Date";
import Tag from "./Tag";
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
      <Date date={article.createdAt} />
      <Title title={article.title} />
      <Tag tags={article.tags} />
    </StyledHeader>
  );
};

export default ArticleHeader;
