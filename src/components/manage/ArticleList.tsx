import * as React from "react";
import ArticleListBox from "./ArticleListBox";
import styled from "styled-components";

const ArticleListStyled = styled.div`
  margin-bottom: 80px;
  & ul {
    list-style: none;
    padding: 0;
  }
  & li {
    margin: 30px 0;
  }
`;

const ArticleList = () => {
  return(
    <ArticleListStyled>
      <ul>
        <li>
          <ArticleListBox />
        </li>
        <li>
          <ArticleListBox />
        </li>
      </ul>
    </ArticleListStyled>
  );
};

export default ArticleList;