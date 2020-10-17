import { ArticleIface } from "~/type";
import React from "react";
import styled from "styled-components";

import ShareBox from "./ShareBox";

const ArticleFooterStyled = styled.div`
  height: 50px;
`;

type Props = {
  article: ArticleIface;
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
