import React, { useMemo, useCallback } from "react";
import ArticleForm from "./editor/ArticleForm";

type Props = {
  articleId?: string;
}

const CreateArticle = (props: Props) => {
  const { articleId } = props;

  const fetchArticle = useCallback(
    () => {
      // fetchArticle
    },
    [],
  );

  const updatingArticle = useMemo(
    () => {
      if(articleId === undefined) return undefined;
      fetchArticle();
      // fetch article by id
    },[articleId, fetchArticle]);
  
  return(
    <div id="create-article-container">
      <ArticleForm updatingArticle={updatingArticle} />
    </div>
  );
};

export default CreateArticle;