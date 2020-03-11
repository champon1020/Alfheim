import React, { useMemo } from "react";
import ArticleForm from "./editor/ArticleForm";

type Props = {
  articleId?: string;
}

const CreateArticle = (props: Props) => {
  const { articleId } = props;

  const updatingArticle = useMemo(
    () => {
      if(articleId === undefined) return undefined;
      // fetch article by id
    },[articleId]);
  
  return(
    <div id="create-article-container">
      <ArticleForm updatingArticle={updatingArticle} />
    </div>
  );
};

export default CreateArticle;