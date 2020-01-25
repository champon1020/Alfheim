import * as React from "react";
import "../../assets/styles/article.css";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";

class Article extends React.Component {
  render() {
    return(
      <div id="article-container">
        <ArticleHeader />
        <ArticleContent />
        <ArticleFooter />
      </div>
    );
  }
}

export default Article;