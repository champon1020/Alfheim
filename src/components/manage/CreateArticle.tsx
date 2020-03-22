import React, { useCallback, useState, useEffect, useMemo } from "react";
import axios from "axios";
import ArticleForm, { defaultEditorDraft } from "./editor/ArticleForm";
import { defaultApi, Config } from "src/App";
import { parseFromArticle, parseFromDraft } from "./editor/parser";
import { pathJoin } from "../services/parser";

type Props = {
  articleId?: string;
  draftId?: string;
}

const CreateArticle = (props: Props) => {
  const { articleId, draftId } = props;
  const [updatingArticle, setUpdatingArticle] = useState(defaultEditorDraft);
  const [updatingContents, setUpdatingContents] = useState("");

  const isArticle = useMemo(() => articleId !== undefined, [articleId]);

  // fetch article by id
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

  // fetch mde content
  const fetchContent = useCallback(
    async (url: string) => {
      const res = await axios.get(url);
      setUpdatingContents(res.data);
    },[],
  );

  useEffect(() => {
    if(articleId !== undefined) {
      fetchArticle(articleId);
      fetchContent(pathJoin(Config.srcHost, "articles", updatingArticle.contentHash + "_mde"));
    }
    if(draftId !== undefined) {
      fetchDraft(draftId);
      fetchContent(pathJoin(Config.srcHost, "drafts", updatingArticle.contentHash + "_mde"));
    }
    // eslint-disable-next-line
  },[articleId, draftId]);
  
  return(
    <div id="create-article-container">
      <ArticleForm 
        updatingArticle={updatingArticle}
        updatingContents={updatingContents}
        isArticle={isArticle} />
    </div>
  );
};

export default CreateArticle;