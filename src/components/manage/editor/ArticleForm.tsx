import React, { useEffect, useState, useCallback } from "react";
import Cookie from "js-cookie";
import styled from "styled-components";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import InputForm from "./InputForm";
import FormFooter from "./FormFooter";
import { parseToRequestDraft, parseToRequestArticle, parseToDraft } from "./parser";
import { useDispatch } from "react-redux";
import appActionCreator from "src/actions/actions";
import { ArticleRequestType, DraftRequestType } from "src/type";
import { ErrorStatus, MyErrorStatus } from "src/components/error/ErrorHandler";
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
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export const defaultEditorDraft: EditorArticle = {
  id: "",
  title: "",
  categories: "",
  updateDate: "",
  content: "",
  imageHash: "",
  isPrivate: false
};

const htmlPreviewClass = ".editor-preview";
const apiOff = true;

type Props = {
  updatingArticle?: EditorArticle;
  isArticle: boolean;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleForm = (props: Props) => {
  const { updatingArticle, isArticle, setVerify } = props;

  const [timerId, setTimerId] = useState(0);
  const [err, setErr] = useState(MyErrorStatus.NONE as ErrorStatus);
  const [editorDraft, setEditorDraft] = useState(defaultEditorDraft);
  const [htmlContents, setHtmlContents] = useState("");
  const [mdContents, setMdContents] = useState("");
  const dispatch = useDispatch();

  const registerArticle = useCallback(
    async (a: ArticleRequestType) => {
      if(apiOff) return;
      await defaultApi.apiPrivateRegisterArticlePost({
        article: a, 
      }, 
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
    },[setVerify]
  );

  const updateArticle = useCallback(
    async (a: ArticleRequestType) => {
      if(apiOff) return;
      await defaultApi.apiPrivateUpdateArticlePut({
        article: a, 
      }, 
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
    },[setVerify]
  );

  const updateDraft = useCallback(
    async (d: DraftRequestType) => {
      if(apiOff) return;
      const res = await defaultApi.apiPrivateDraftArticlePost({
        article: d,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;
      editorDraft.id = res.data.id;
      editorDraft.content = res.data.content;
      editorDraft.imageHash = res.data.imageHash;
      window.history.pushState(null, "", "?draftId=" + editorDraft.id);
      // eslint-disable-next-line
    },[editorDraft, setVerify]
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
      const contentsNode = newContents.cloneNode(true);
      contentsNode.childNodes.forEach(cn => div.appendChild(cn));
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
        let newMdeContents = mdContents;
        let newHtmlContents = htmlContents;
        if(value !== undefined){
          newMdeContents = value;
          newHtmlContents = parseContents(htmlPreviewClass);
          setHtmlContents(newHtmlContents);
          setMdContents(newMdeContents);
        }
        const reqDraft = parseToRequestDraft(editorDraft);
        const draft = parseToDraft(editorDraft);
        dispatch(appActionCreator.updateDraft(draft, newHtmlContents));
        updateDraft(reqDraft);
      }, 300);
      setTimerId(newTimerId);
    },[timerId,
      editorDraft, 
      dispatch, 
      updateDraft,
      isArticle,
      htmlContents,
      mdContents,
      parseContents],
  );

  const onSubmit = useCallback(
    () => {
      if(validation(editorDraft.title, editorDraft.categories)) return;

      const reqArticle = parseToRequestArticle(editorDraft);
      if(isArticle) updateArticle(reqArticle);
      else registerArticle(reqArticle);
    },[editorDraft, 
      validation,
      registerArticle,
      isArticle,
      updateArticle],
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
    // eslint-disable-next-line
  }, [updatingArticle]);

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
          value={mdContents}
          onChange={onlineSave}
          options={{
            spellChecker: false,
            syncSideBySidePreviewScroll: true,
            forceSync: true,
            autosave: {
              enabled: true,
              uniqueId: "savetest",
              delay: 300
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