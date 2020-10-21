import { IArticle } from "~/type";
import React from "react";
import styled from "styled-components";

import ShareBox from "./ShareBox";

const StyledFooter = styled.div`
  height: 50px;
`;

type Props = {
  article: IArticle;
};

const ArticleFooter = (props: Props) => {
  const { article } = props;

  return (
    <StyledFooter>
      <ShareBox article={article} />
    </StyledFooter>
  );
};

export default ArticleFooter;
