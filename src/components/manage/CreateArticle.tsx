import React, { useCallback, useState, useEffect, useMemo } from "react";
import Cookie from "js-cookie";
import ArticleForm, { defaultEditorDraft } from "./editor/ArticleForm";
import { defaultApi } from "src/App";
import { parseFromArticle, parseFromDraft } from "./editor/parser";

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
  articleId?: string;
  draftId?: string;
}

const CreateArticle = (props: Props) => {
  const { setVerify, articleId, draftId } = props;
  const [updatingArticle, setUpdatingArticle] = useState(defaultEditorDraft);

  const isArticle = useMemo(() => articleId !== undefined, [articleId]);

  // fetch article by id
  const fetchArticle = useCallback(
    async (id: string) => {
      const res = await defaultApi.apiPrivateFindArticleIdGet(id).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;
      const fetchedArticle = res.data.article;
      const editorDraft = parseFromArticle(fetchedArticle);
      setUpdatingArticle(editorDraft);
    },
    [setVerify],
  );

  // fetch draft by id
  const fetchDraft = useCallback(
    async (id: string) => {
      const res = await defaultApi.apiPrivateFindDraftIdGet(id, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;
      const fetchedDraft = res.data.draft;
      const editorDraft = parseFromDraft(fetchedDraft);
      setUpdatingArticle(editorDraft);
    },
    [setVerify],
  );

  useEffect(() => {
    if(articleId !== undefined) {
      fetchArticle(articleId);
    }
    if(draftId !== undefined) {
      fetchDraft(draftId);
    }
    // eslint-disable-next-line
  },[articleId, draftId]);
  
  return(
    <div id="create-article-container">
      <ArticleForm 
        updatingArticle={updatingArticle}
        isArticle={isArticle}
        setVerify={setVerify} />
    </div>
  );
};

export default CreateArticle;