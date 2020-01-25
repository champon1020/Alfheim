import * as React from "react";
import "../../assets/styles/article.css";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";

class Article extends React.Component {
  render() {
    return(
      <div id="article-container">
        <ArticleHeader />
        <ArticleContent />
      </div>
    );
  }
}

export default Article;