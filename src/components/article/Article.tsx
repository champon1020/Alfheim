import * as React from "react";
import "../../assets/styles/article.css";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";

interface ParentProps {
  articleId: number;
}

type Props = ParentProps;

const Article: React.FC<Props> = (props) => {
  return(
    <div id="article-container">
      <ArticleHeader />
      <ArticleContent />
      <ArticleFooter />
    </div>
  );
};

export default Article;