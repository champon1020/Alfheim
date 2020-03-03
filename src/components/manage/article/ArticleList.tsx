import * as React from "react";
import ArticleListBox from "./ArticleListBox";
import styled from "styled-components";

const ArticleListStyled = styled.ul`
  margin-top: 20px;
`;

const ArticleListItemStyled = styled.li`
  margin: 30px 0;
`;

const ArticleList = () => {
  return(
    <ArticleListStyled>
      <ArticleListItemStyled>
        <ArticleListBox />
      </ArticleListItemStyled>
      <ArticleListItemStyled>
        <ArticleListBox />
      </ArticleListItemStyled>
    </ArticleListStyled>
  );
};

export default ArticleList;