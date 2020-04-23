import React, { useEffect, useState, useCallback, createRef } from "react";
import Cookie from "js-cookie";
import styled from "styled-components";
import InputForm from "./InputForm";
import FormFooter from "./FormFooter";
import { parseToRequestDraft, parseToRequestArticle, parseToDraft } from "./parser";
import { useDispatch } from "react-redux";
import appActionCreator from "src/actions/actions";
import { ArticleRequestType, DraftRequestType } from "src/type";
import { ErrorStatus, MyErrorStatus, HttpErrorStatus } from "src/components/error/ErrorHandler";
import { validateTitle, validateCategory } from "./validattions";
import { defaultApi } from "../../../App";

// @toast-ui modules
import "codemirror/lib/codemirror.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ja-jp";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Editor } from "@toast-ui/react-editor";

// highlight.js
import "highlight.js/styles/darcula.css";
import hljs from "highlight.js";


const EditContainerStyled = styled.div`
  background-color: whitesmoke;
  .CodeMirror {
    height: 71vh;
  }
`;

const EditorStyled = styled.div`
  font-size: 1.6rem;
`;

// Type of editor article|draft object.
export type EditorArticle = {
  id: string;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

// Default editor article|draft object.
export const defaultEditorDraft: EditorArticle = {
  id: "",
  title: "",
  categories: "",
  updateDate: "",
  content: "",
  imageHash: "default.jpg",
  isPrivate: false
};

// Use as debug.
// If true, api will not be called.
const apiOff = false;

// Duration of saving on real time.
const onlineSaveDuration = 3000;

type Props = {
  updatingArticle?: EditorArticle;
  isExistArticle: boolean;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleForm = (props: Props) => {
  const { updatingArticle, isExistArticle, setVerify } = props;

  // This is returned by setTimeout function in onlineSave
  // This state prevents from multi execution of function.
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  // Some message.
  const [msg, setMsg] = useState("");

  // There are some errors or not.
  const [err, setErr] = useState<ErrorStatus>(MyErrorStatus.NONE);

  // Article or draft information.
  const [editorDraft, setEditorDraft] = useState(defaultEditorDraft);

  // Editor components is mounted or not.
  const [firstMount, setFirstMound] = useState(true);

  // Updating or not.
  // This state prevents from multi execution of function of onlineSave.
  const [updateMode, setUpdateMode] = useState(false);

  // redux dispatch
  const dispatch = useDispatch();

  // Ref of Editor component.
  const editorRef = createRef<Editor>();

  // Error classification.
  // If status >= 300, return true.
  const errClassification = useCallback(
    (status: number): boolean => {
      if(status === 400) setErr(HttpErrorStatus.ERROR_400);
      if(status === 403) setVerify(false);
      if(status === 404) setErr(HttpErrorStatus.ERROR_404);
      if(status === 500) setErr(HttpErrorStatus.ERROR_500);
      return status >= 300;
    },
    [setVerify],
  );

  // Validation function of title and categories string.
  const validation = useCallback(
    (t: string, c: string) => {
      return validateTitle(t, setErr) || validateCategory(c, setErr);
    },[],
  );

  // Call api of registering article.
  const registerArticle = useCallback(
    async (a: ArticleRequestType) => {
      if(apiOff) return;
      await defaultApi.apiPrivateRegisterArticlePost({
        article: a, 
      }, 
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        },
        validateStatus: (stts: number) => {
          return stts <= 500;
        }
      }).then(res => {
        errClassification(res.status);
        if(res.status === 200) window.open("/manage/articles", "_self");
      });
    },[errClassification]
  );

  // Call api of updating article.
  const updateArticle = useCallback(
    async (a: ArticleRequestType) => {
      if(apiOff) return;
      await defaultApi.apiPrivateUpdateArticlePut({
        article: a, 
      }, 
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        },
        validateStatus: (stts: number) => {
          return stts <= 500;
        }
      }).then(res => {
        errClassification(res.status);
        if(res.status === 200) setMsg("Updated!");
      });
    },[errClassification]
  );

  // Call api of updating draft.
  const updateDraft = useCallback(
    async (d: DraftRequestType) => {
      if(apiOff) return;
      if(validation(d.title, d.categories)) return;
      const res = await defaultApi.apiPrivateDraftArticlePost({
        article: d,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        },
        validateStatus: (stts: number) => {
          return stts <= 500;
        }
      });

      // Handle error.
      if(errClassification(res.status)) return;
      if(res.status === 200) setMsg("Saved!");

      // Update editor draft id and reload.
      editorDraft.id = res.data.id;
      window.history.pushState(null, "", "?draftId=" + res.data.id);
      // eslint-disable-next-line
    },[setVerify, validation]
  );


  // Saving on real time.
  // If timerId is not undefined, 
  // do clearTimeout (this means discard last stacked function of setTimeout)
  // and execute new function of setTimeout.
  // Then, update state of timerId.
  const onlineSave = useCallback(
    () => {
      // Clear now timer if timerId is no undefined.
      if(timerId !== undefined){
        clearTimeout(timerId);
      }

      // New markdown content.
      const newMdContent = editorRef.current === null ? "" : editorRef.current.getInstance().getMarkdown();

      // Set content to editorDraft.
      editorDraft.content = newMdContent;

      // Update the state of editor draft.
      const draft = parseToDraft(editorDraft);
      dispatch(appActionCreator.updateDraft(draft, newMdContent));

      // Call updating function after onlineSaveDration.
      // - Dispatch draft and mdContent.
      // - Call api.
      const newTimerId = setTimeout(() => {
        if(isExistArticle) return;
        const reqDraft = parseToRequestDraft(editorDraft);
        updateDraft(reqDraft);
      }, onlineSaveDuration);
      setTimerId(newTimerId);
    },[timerId,
      editorDraft, 
      dispatch, 
      updateDraft,
      isExistArticle,
      editorRef],
  );


  // On click listener of submit button.
  // - Do valitation.
  // - Get editor content.
  // - Parse editor article|draft object to request type.
  // - Call api.
  const onSubmit = useCallback(
    () => {
      if(validation(editorDraft.title, editorDraft.categories)) return;
      const newMdContent = editorRef.current === null ? "" : editorRef.current.getInstance().getMarkdown();
      editorDraft.content = newMdContent;
      const reqArticle = parseToRequestArticle(editorDraft);
      isExistArticle ? updateArticle(reqArticle) : registerArticle(reqArticle);
    },[editorDraft, 
      validation,
      registerArticle,
      isExistArticle,
      updateArticle,
      editorRef],
  );

  // On click listener of preview button.
  // - Do validation.
  // - Open the window of preview.
  // - Detail is compontents/article/Articles.tsx and that children.
  const onPreview = useCallback(
    () => {
      if(validation(editorDraft.title, editorDraft.categories)) return;
      window.open("/article-draft/");
    },
    [validation, editorDraft],
  );

  // On change listener of title form.
  // Update editor article|draft object
  // and call function of saving on real time.
  const setTitleHandler = useCallback(
    (t: string) => {
      editorDraft.title = t;
      onlineSave();
    },[editorDraft, onlineSave]);

  // On change listener of categories form.
  // Update editor article|draft object
  // and call function of saving on real time.
  const setCategoriesHandler = useCallback(
    (c: string) => {
      editorDraft.categories = c;
      onlineSave();
    },[editorDraft, onlineSave]);

  // On change listener of image form.
  // Update editor article|draft object
  // and call function of saving on real time.
  const setImageHandler = useCallback(
    (i: string) => {
      editorDraft.imageHash = i;
      onlineSave();
    },[editorDraft, onlineSave],
  );

  // Set initial article if not undefined.
  // Set intial article.content to editor markdown.
  useEffect(() => {
    if(updatingArticle !== undefined) {
      setEditorDraft(updatingArticle);
      if (editorRef.current !== null) {
        editorRef.current.getInstance().setMarkdown(updatingArticle.content);
      }
    }
    // eslint-disable-next-line
  }, [updatingArticle]);

  // If updateMode is true, execute onlineSave func.
  // When editor is mounted, updateMode becomes true and onlineSave is executed.
  // To prevent this, add firstMount state.
  useEffect(() => {
    if(updateMode) {
      firstMount ? setFirstMound(false) : onlineSave();
      setUpdateMode(false);
    }
    // eslint-disable-next-line
  },[updateMode]);

  // Initialize highlight.js
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  },[]);

  return(
    <EditContainerStyled>
      <InputForm 
        value={editorDraft.title}
        setter={setTitleHandler}
        msgSetter={setMsg}
        errSetter={setErr}
        placeholder="title" />
      <InputForm 
        value={editorDraft.categories}
        setter={setCategoriesHandler}
        msgSetter={setMsg}
        errSetter={setErr}
        placeholder="category" />
      <EditorStyled>
        <Editor 
          previewStyle="vertical"
          height="750px"
          initialEditType="markdown"
          events={{
            "change": () => { 
              setUpdateMode(true);
              setErr(MyErrorStatus.NONE);
              setMsg("");
            }
          }}
          plugins={[
            colorSyntax,
            codeSyntaxHighlight,
          ]}
          useCommandShortcut={true}
          ref={editorRef}
        />
      </EditorStyled>
      <FormFooter
        imageHash={editorDraft.imageHash}
        onSubmit={onSubmit}
        onPreview={onPreview}
        setter={setImageHandler}
        msg={msg}
        err={err} />
    </EditContainerStyled>
  );
};

export default ArticleForm;