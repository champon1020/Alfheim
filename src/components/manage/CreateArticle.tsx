import React, { useCallback, useState, useEffect, useMemo } from "react";
import ArticleForm, { defaultEditorDraft } from "./editor/ArticleForm";
import { defaultApi } from "src/App";
import { parseFromArticle, parseFromDraft } from "./editor/parser";

type Props = {
  articleId?: string;
  draftId?: string;
}

const CreateArticle = (props: Props) => {
  const { articleId, draftId } = props;
  const [updatingArticle, setUpdatingArticle] = useState(defaultEditorDraft);

  const isArticle = useMemo(() => articleId !== undefined, [articleId]);

  const fetchArticle = useCallback(
    async (id: string) => {
      const res = await defaultApi.apiFindArticleIdGet(id);
      const fetchedArticle = res.data.article;
      const editorDraft = parseFromArticle(fetchedArticle);
      setUpdatingArticle(editorDraft);
    },
    [],
  );

  // fetch draft by id
  const fetchDraft = useCallback(
    async (id: string) => {
      const res = await defaultApi.apiPrivateFindDraftIdGet(id);
      const fetchedDraft = res.data.draft;
      const editorDraft = parseFromDraft(fetchedDraft);
      setUpdatingArticle(editorDraft);
    },
    [],
  );

  useEffect(() => {
    if(articleId !== undefined) fetchArticle(articleId);
    if(draftId !== undefined) fetchDraft(draftId);
    // eslint-disable-next-line
  },[articleId, draftId]);
  
  return(
    <div id="create-article-container">
      <ArticleForm 
        updatingArticle={updatingArticle}
        isArticle={isArticle} />
    </div>
  );
};

export default CreateArticle;