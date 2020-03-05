import * as React from "react";
import ArticleForm from "./editor/ArticleForm";
import { ArticleType } from "src/type";

const CreateArticle = () => {
  const article = { title: "test" } as ArticleType;
  
  return(
    <div id="create-article-container">
      <ArticleForm updatingArticle={article} />
    </div>
  );
};

export default CreateArticle;