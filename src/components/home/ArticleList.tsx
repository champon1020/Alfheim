import * as React from "react";
import "../../assets/styles/article_list.css";
import ArticleBox from "./ArticleBox";

class ArticlesList extends React.Component {
  render() {
    return(
      <div id="article-list">
        <ul>
          <li>
            <ArticleBox />
          </li>
          <li>
            <ArticleBox />
          </li>
          <li>
            <ArticleBox />
          </li>
        </ul>
      </div>
    );
  }
}

export default ArticlesList;