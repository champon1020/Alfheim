import * as React from "react";
import ArticleListBox from "./ArticleListBox";

const ArticleList = () => {
  return(
    <div id="article-list-container">
      <ul>
        <li>
          <ArticleListBox />
        </li>
        <li>
          <ArticleListBox />
        </li>
      </ul>
    </div>
  );
};

export default ArticleList;