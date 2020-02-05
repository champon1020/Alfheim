import * as React from "react";
import Category from "./Category";

const ArticleHeader = () => {
  return(
    <div id="article-header">
      <div id="date-container">
        <p>2020-01-26</p>
      </div>
      <div id="title-container">
        <h2>This is the sample title.</h2>
      </div>
      <div id="category-container">
        <Category />
      </div>
    </div>
  );
};

export default ArticleHeader;