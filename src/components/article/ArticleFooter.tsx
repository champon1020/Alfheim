import * as React from "react";
import styled from "styled-components";
import ShareBox from "./ShareBox";

const ArticleFooterStyled = styled.div`
  height: 50px;
`;

const ArticleFooter = () => {
  return(
    <ArticleFooterStyled>
      <ShareBox />
    </ArticleFooterStyled>
  );
};

export default ArticleFooter;