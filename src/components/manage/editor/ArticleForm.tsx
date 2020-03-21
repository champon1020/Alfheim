import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Editor from "tui-editor";
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight
import styled from "styled-components";
import InputForm from "./InputForm";
import FormFooter from "./FormFooter";
import { parseContents, parseToRequestDraft, parseToRequestArticle, parseToDraft } from "./parser";
import { useDispatch } from "react-redux";
import appActionCreator from "src/actions/actions";
import { ArticleRequestType, DraftRequestType } from "src/type";
import { ErrorStatus, MyErrorStatus } from "src/components/services/ErrorHandler";
import { validateTitle, validateCategory } from "./validattions";
import { defaultApi } from "../../../App";

const EditContainerStyled = styled.div`
  background-color: whitesmoke;
`;

const observeConfig = { 
  subtree: true, 
  childList: true
};

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
  isPrivate: true
};

type Props = {
  updatingArticle?: EditorArticle;
  isArticle: boolean;
}

const ArticleForm = (props: Props) => {
  const { updatingArticle, isArticle } = props;
  const editorRef = useRef({} as HTMLDivElement);

  const [timerId, setTimerId] = useState(0);
  const [err, setErr] = useState(MyErrorStatus.NONE as ErrorStatus);
  const [editorDraft, setEditorDraft] = useState(defaultEditorDraft);
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();

  const registerArticle = useCallback(
    async (a: ArticleRequestType, c: string) => {
      await defaultApi.apiPrivateRegisterArticlePost({article: a, contents: c});
    },[]
  );

  const updateArticle = useCallback(
    async (a: ArticleRequestType, c: string) => {
      await defaultApi.apiPrivateUpdateArticlePut({article: a, contents: c});
    },[]
  );

  const updateDraft = useCallback(
    async (d: DraftRequestType, c: string) => {
      // const res = await defaultApi.apiPrivateDraftArticlePost({article: d, contents: c});
      // editorDraft.id = res.data.id;
      // editorDraft.contentHash = res.data.contentHash;
      // editorDraft.imageHash = res.data.imageHash;
      // window.history.pushState(null, "", "?draftId=" + editorDraft.id);
      // eslint-disable-next-line
    },[editorDraft]
  );

  const validation = useCallback(
    (t: string, c: string) => {
      return validateTitle(t, setErr) || validateCategory(c, setErr);
    },[],
  );

  const onlineSave = useCallback(
    () => {
      if(isArticle) return;
      if(timerId !== undefined){
        clearTimeout(timerId);
      }
      // save 
      const newTimerId = setTimeout(() => {
        const newContents = parseContents(setContents);
        const reqDraft = parseToRequestDraft(editorDraft);
        const draft = parseToDraft(editorDraft);
        dispatch(appActionCreator.updateDraft(draft, newContents));
        updateDraft(reqDraft, newContents);
      }, 300);
      setTimerId(newTimerId);
    },[timerId, 
      editorDraft, 
      dispatch, 
      updateDraft,
      isArticle],
  );

  const onSubmit = useCallback(
    () => {
      if(validation(editorDraft.title, editorDraft.categories)) return;
      const reqArticle = parseToRequestArticle(editorDraft);
      const newContents = parseContents(setContents);

      if(isArticle) updateArticle(reqArticle, newContents);
      else registerArticle(reqArticle, newContents);
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

  const observer = useMemo(() => {
    return new MutationObserver((mutations) => {
      let flg = false;
      mutations.forEach((mutation) => {
        const el = mutation.target as Element;
        if(el.className === "tui-editor-contents"){
          flg = true;
        }
      });
      if(flg) onlineSave();
    });
  }, [onlineSave]);

  useEffect(() => {
    const target = editorRef.current;
    observer.observe(target, observeConfig);
  }, [editorDraft]);

  useEffect(() => {
    // set article and content
    if(updatingArticle !== undefined) {
      setEditorDraft(updatingArticle);
    }
    // eslint-disable-next-line
  }, [updatingArticle]);

  useEffect(() => {
    // prepare markdown editor
    const target = editorRef.current;
    const instance = new Editor({
      el: target,
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "755px"
    });
    instance.getHtml();
    // eslint-disable-next-line
  },[]);

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
      <div ref={editorRef}></div>
      <FormFooter
        onSubmit={onSubmit}
        onPreview={onPreview}
        err={err} />
    </EditContainerStyled>
  );
};

export default ArticleForm;