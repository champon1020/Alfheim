import React, { useCallback, useState, useEffect, useMemo } from "react";
import Cookie from "js-cookie";
import ArticleForm, { defaultEditorDraft } from "./editor/ArticleForm";
import { defaultApi } from "~/App";
import { parseFromArticle, parseFromDraft } from "./editor/parser";

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
  articleId?: string;
  draftId?: string;
}

const CreateArticle = (props: Props) => {
  const { setVerify, articleId, draftId } = props;

  // Updating article.
  // This state is used if article or draft is selected.
  const [updatingArticle, setUpdatingArticle] = useState(defaultEditorDraft);

  // Bool whether updatingArticle has already submit or not.
  // If articleId is not undefined, this is true. 
  const isExistArticle = useMemo(() => articleId !== undefined, [articleId]);

  // Call api of getting article by id.
  // Update the state of updatingArticle.
  const fetchArticle = useCallback(
    async (id: string) => {
      const res = await defaultApi.apiPrivateFindArticleIdGet(id, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;
      const fetchedArticle = res.data.article;
      const editorDraft = parseFromArticle(fetchedArticle);
      setUpdatingArticle(editorDraft);
    },
    [setVerify],
  );

  // Call api of getting draft by id.
  // Update the state of updatingArticle.
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

  // Fetch article or draft by whether articleId or draftId is undefined or not.
  useEffect(() => {
    if(articleId !== undefined) fetchArticle(articleId);
    if(draftId !== undefined) fetchDraft(draftId);
    // eslint-disable-next-line
  },[articleId, draftId]);
  
  return(
    <div id="create-article-container">
      <ArticleForm 
        updatingArticle={updatingArticle}
        isExistArticle={isExistArticle}
        setVerify={setVerify} />
    </div>
  );
};

export default CreateArticle;
