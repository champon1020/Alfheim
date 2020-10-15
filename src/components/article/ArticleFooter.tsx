import { ArticleType } from "~/type";
import * as React from "react";
import styled from "styled-components";

import ShareBox from "./ShareBox";

const ArticleFooterStyled = styled.div`
  height: 50px;
`;

type Props = {
  article: ArticleType,
};

const ArticleFooter = (props: Props) => {
  const { article } = props;

  return (
    <ArticleFooterStyled>
      <ShareBox article={article} />
    </ArticleFooterStyled>
  );
};

export default ArticleFooter;
