import * as React from "react";
import ArticleList from "./ArticleList";
import Page from "../common/Page";

class Articles extends React.Component {
  render() {
    return(
      <div id="articles-container">
        <ArticleList />
        <Page />
      </div>
    );
  }
}

export default Articles;