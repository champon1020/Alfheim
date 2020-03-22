import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import InputForm from "./InputForm";
import FormFooter from "./FormFooter";
import { parseToRequestDraft, parseToRequestArticle, parseToDraft } from "./parser";
import { useDispatch } from "react-redux";
import appActionCreator from "src/actions/actions";
import { ArticleRequestType, DraftRequestType } from "src/type";
import { ErrorStatus, MyErrorStatus } from "src/components/services/ErrorHandler";
import { validateTitle, validateCategory } from "./validattions";
import { defaultApi } from "../../../App";

const EditContainerStyled = styled.div`
  background-color: whitesmoke;
  .CodeMirror {
    height: 71vh;
  }
`;

const EditorStyled = styled.div`
  font-size: 1.6rem;
`;

export type EditorArticle = {
  id: string;
  title: string;
  categories: string;
  updateDate: string;
  contentHash: string;
  imageHash: string;
  isPrivate: boolean;
}

export const defaultEditorDraft: EditorArticle = {
  id: "",
  title: "",
  categories: "",
  updateDate: "",
  contentHash: "",
  imageHash: "",
  isPrivate: false
};

const htmlPreviewClass = ".editor-preview";
const apiOff = false;

type Props = {
  updatingArticle?: EditorArticle;
  updatingContents?: string;
  isArticle: boolean;
}

const ArticleForm = (props: Props) => {
  const { updatingArticle, updatingContents, isArticle } = props;

  const [timerId, setTimerId] = useState(0);
  const [err, setErr] = useState(MyErrorStatus.NONE as ErrorStatus);
  const [editorDraft, setEditorDraft] = useState(defaultEditorDraft);
  const [htmlContents, setHtmlContents] = useState("");
  const [mdeContents, setMdeContents] = useState("");
  const dispatch = useDispatch();

  const registerArticle = useCallback(
    async (a: ArticleRequestType, htmlCon: string, mdeCon: string) => {
      if(apiOff) return;
      await defaultApi.apiPrivateRegisterArticlePost({
        article: a, 
        htmlContents: htmlCon,
        mdeContents: mdeCon,
      });
    },[]
  );

  const updateArticle = useCallback(
    async (a: ArticleRequestType, htmlCon: string, mdeCon: string) => {
      if(apiOff) return;
      await defaultApi.apiPrivateUpdateArticlePut({
        article: a, 
        htmlContents: htmlCon,
        mdeContents: mdeCon,
      });
    },[]
  );

  const updateDraft = useCallback(
    async (d: DraftRequestType, mdeCon: string) => {
      if(apiOff) return;
      const res = await defaultApi.apiPrivateDraftArticlePost({article: d, mdeContents: mdeCon});
      editorDraft.id = res.data.id;
      editorDraft.contentHash = res.data.contentHash;
      editorDraft.imageHash = res.data.imageHash;
      window.history.pushState(null, "", "?draftId=" + editorDraft.id);
      // eslint-disable-next-line
    },[editorDraft]
  );

  const validation = useCallback(
    (t: string, c: string) => {
      return validateTitle(t, setErr) || validateCategory(c, setErr);
    },[],
  );

  const parseContents = useCallback(
    (className: string) => {
      const newContents = document.querySelector(className);
      if(newContents === null) {
        console.error(className + " is null");
        return "";
      }
      const div = document.createElement("div");
      div.appendChild(newContents.cloneNode(true));
      return div.innerHTML;
    },[],
  );

  const onlineSave = useCallback(
    (value?: string) => {
      if(isArticle) return;
      if(timerId !== undefined){
        clearTimeout(timerId);
      }
      // call api of saving EditorDraft and mdeContents
      const newTimerId = setTimeout(() => {
        let newMdeContents = mdeContents;
        let newHtmlContents = htmlContents;
        if(value !== undefined){
          newMdeContents = value;
          newHtmlContents = parseContents(htmlPreviewClass);
          setHtmlContents(newHtmlContents);
          setMdeContents(newMdeContents);
        }
        const reqDraft = parseToRequestDraft(editorDraft);
        const draft = parseToDraft(editorDraft);
        dispatch(appActionCreator.updateDraft(draft, newHtmlContents));
        updateDraft(reqDraft, newMdeContents);
      }, 300);
      setTimerId(newTimerId);
    },[timerId,
      editorDraft, 
      dispatch, 
      updateDraft,
      isArticle,
      htmlContents,
      mdeContents,
      parseContents],
  );

  const onSubmit = useCallback(
    () => {
      if(validation(editorDraft.title, editorDraft.categories)) return;

      const reqArticle = parseToRequestArticle(editorDraft);
      if(isArticle) updateArticle(reqArticle, htmlContents, mdeContents);
      else registerArticle(reqArticle, htmlContents, mdeContents);
    },[editorDraft, 
      validation,
      registerArticle,
      isArticle,
      updateArticle,
      htmlContents,
      mdeContents],
  );

  const onPreview = useCallback(
    () => {
      if(validation(editorDraft.title, editorDraft.categories)) return;
      window.open("/article-draft/");
    },
    [validation, editorDraft],
  );

  const setTitleHandler = useCallback(
    (t: string) => {
      editorDraft.title = t;
      setEditorDraft(editorDraft);
      onlineSave();
    },[editorDraft, onlineSave]);

  const setCategoriesHandler = useCallback(
    (c: string) => {
      editorDraft.categories = c;
      setEditorDraft(editorDraft);
      onlineSave();
    },[editorDraft, onlineSave]);

  useEffect(() => {
    // set initial article if exist
    if(updatingArticle !== undefined) {
      setEditorDraft(updatingArticle);
    }
    // set initial content if exist
    if(updatingContents !== undefined){
      setMdeContents(updatingContents);
    }
    // eslint-disable-next-line
  }, [updatingArticle, updatingContents]);

  return(
    <EditContainerStyled>
      <InputForm 
        value={editorDraft.title}
        setter={setTitleHandler}
        errSetter={setErr}
        placeholder="title" />
      <InputForm 
        value={editorDraft.categories}
        setter={setCategoriesHandler}
        errSetter={setErr}
        placeholder="category" />
      <EditorStyled>
        <SimpleMDE
          id="savetest"
          value={mdeContents}
          onChange={onlineSave}
          options={{
            spellChecker: false,
            syncSideBySidePreviewScroll: true,
            forceSync: true,
            autosave: {
              enabled: false,
              uniqueId: "savetest",
              delay: 1000
            }
          }}
        />
      </EditorStyled>
      <div id="savetest" />
      <FormFooter
        onSubmit={onSubmit}
        onPreview={onPreview}
        err={err} />
    </EditContainerStyled>
  );
};

export default ArticleForm;