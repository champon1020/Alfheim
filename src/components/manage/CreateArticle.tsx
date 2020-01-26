import * as React from "react";
import ArticleForm from "./ArticleForm";

class CreateArticle extends React.Component {
  render() {
    return(
      <div id="create-article-container">
        <ArticleForm />
      </div>
    );
  }
}

export default CreateArticle;