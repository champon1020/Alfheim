import React, { useCallback, useState, useEffect } from "react";
import ArticleForm from "./editor/ArticleForm";
import { ArticleType } from "src/type";
import { defaultApi } from "src/App";

type Props = {
  articleId?: string;
}

const CreateArticle = (props: Props) => {
  const { articleId } = props;
  const [updatingArticle, setUpdatingArticle] = useState({} as ArticleType);

  const fetchArticle = useCallback(
    async (id: string) => {
      const res = await defaultApi.apiFindArticleIdGet(id);
      const { article } = res.data;
      setUpdatingArticle(article);
    },
    [],
  );

  useEffect(() => {
    if(articleId === undefined) return undefined;
    fetchArticle(articleId);
    // eslint-disable-next-line
  },[articleId]);
  
  return(
    <div id="create-article-container">
      <ArticleForm updatingArticle={updatingArticle} />
    </div>
  );
};

export default CreateArticle;