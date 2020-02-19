import * as React from "react";
import ArticleList from "./ArticleList";
import Page from "../common/Page";
import styled from "styled-components";

const PageContainerStyled = styled.div`
  background-color: white;
  padding: 10px 0;
  border-radius: 10px;
  & #page-container {
    margin: 0;
  }
`;

const Articles = () => {
  return(
    <div id="articles-container">
      <ArticleList />
      <PageContainerStyled>
        <Page />
      </PageContainerStyled>
    </div>
  );
};

export default Articles;