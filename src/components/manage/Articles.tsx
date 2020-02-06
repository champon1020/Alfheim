import * as React from "react";
import ArticleList from "./ArticleList";
import Page from "../common/Page";

const Articles = () => {
  return(
    <div id="articles-container">
      <ArticleList />
      <div id="articles-page-container">
        <Page />
      </div>
    </div>
  );
};

export default Articles;