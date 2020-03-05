import * as React from "react";
import ArticleList from "./article/ArticleList";
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
    <div>
      <ArticleList />
      <PageContainerStyled>
        <Page backText="Back" nextText="Next" />
      </PageContainerStyled>
    </div>
  );
};

export default Articles;