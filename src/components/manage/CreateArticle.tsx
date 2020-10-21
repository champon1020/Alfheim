import { defaultApi } from "~/api/entry";
import { parse } from "~/parser";
import { IEditorArticle } from "~/type";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import ArticleForm, { defaultEditorDraft } from "./editor/ArticleForm";

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
  articleId?: string;
  draftId?: string;
};

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
  const fetchArticle = async (id: string) => {
    try {
      const res = await defaultApi.apiPrivateFindArticleIdGet(id, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
        },
      });

      const editorDraft: IEditorArticle = parse(
        res.data.article,
        "IEditorArticle"
      );
      setUpdatingArticle(editorDraft);
    } catch (err) {
      // If calling api is failed, set verify false.
      setVerify(false);
    }
  };

  // Call api of getting draft by id.
  // Update the state of updatingArticle.
  const fetchDraft = async (id: string) => {
    try {
      const res = await defaultApi.apiPrivateFindDraftIdGet(id, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
        },
      });

      const editorDraft: IEditorArticle = parse(
        res.data.draft,
        "IEditorArticle"
      );
      setUpdatingArticle(editorDraft);
    } catch (err) {
      // If calling api is failed, set verify false.
      setVerify(false);
    }
  };

  // Fetch article or draft by whether articleId or draftId is undefined or not.
  useEffect(() => {
    if (articleId !== undefined) {
      fetchArticle(articleId);
    }
    if (draftId !== undefined) {
      fetchDraft(draftId);
    }
  }, [articleId, draftId]);

  return (
    <div id="create-article-container">
      <ArticleForm
        updatingArticle={updatingArticle}
        isExistArticle={isExistArticle}
        setVerify={setVerify}
      />
    </div>
  );
};

export default CreateArticle;
