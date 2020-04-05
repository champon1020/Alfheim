import React, { useEffect, useState, useCallback, createRef } from "react";
import Cookie from "js-cookie";
import styled from "styled-components";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
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
  imageHash: "",
  isPrivate: false
};

// Use as debug.
// If true, api will not be called.
const apiOff = true;

type Props = {
  updatingArticle?: EditorArticle;
  isArticle: boolean;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleForm = (props: Props) => {
  const { updatingArticle, isArticle, setVerify } = props;

  // This is returned by setTimeout function in onlineSave
  // This state prevents from multi execution of function.
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  // There are some errors or not.
  const [err, setErr] = useState(MyErrorStatus.NONE as ErrorStatus);

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
        }
      }).catch(() => {
        setVerify(false);
      });
    },[setVerify]
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
        }
      }).catch(() => {
        setVerify(false);
      });
    },[setVerify]
  );

  // Call api of updating draft.
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

  // Validation function of title and categories string.
  const validation = useCallback(
    (t: string, c: string) => {
      return validateTitle(t, setErr) || validateCategory(c, setErr);
    },[],
  );

  // Saving on real time.
  // If timerId is not undefined, 
  // do clearTimeout (this means discard last stacked function of setTimeout)
  // and execute new function of setTimeout.
  // Then, update state of timerId.
  const onlineSave = useCallback(
    () => {
      if(isArticle) return;
      if(timerId !== undefined){
        clearTimeout(timerId);
      }
      const newTimerId = setTimeout(() => {
        const newMdContents = editorRef.current === null ? "" : editorRef.current.getInstance().getMarkdown();
        const newEditorDraft = {
          content: newMdContents,
          ...editorDraft,
        };
        const reqDraft = parseToRequestDraft(newEditorDraft);
        const draft = parseToDraft(newEditorDraft);
        dispatch(appActionCreator.updateDraft(draft, newMdContents));
        setEditorDraft(newEditorDraft);
        updateDraft(reqDraft);
        console.log("save");
      }, 700);
      setTimerId(newTimerId);
    },[timerId,
      editorDraft, 
      dispatch, 
      updateDraft,
      isArticle,
      editorRef],
  );

  // On click listener of submit button.
  // Do valitation.
  // Parse editor article|draft object to request type.
  // Call api.
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

  // On click listener of preview button.
  // Do validation.
  // Open the window of preview.
  // Detail is compontents/article/Articles.tsx and that children.
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
      setEditorDraft(editorDraft);
      onlineSave();
    },[editorDraft, onlineSave]);

  // On change listener of categories form.
  // Update editor article|draft object
  // and call function of saving on real time.
  const setCategoriesHandler = useCallback(
    (c: string) => {
      editorDraft.categories = c;
      setEditorDraft(editorDraft);
      onlineSave();
    },[editorDraft, onlineSave]);

  // Set initial article if not undefined.
  useEffect(() => {
    if(updatingArticle !== undefined) {
      setEditorDraft(updatingArticle);
    }
  }, [updatingArticle]);

  // If updateMode is true, execute onlineSave func.
  // When editor is mounted, updateMode becomes true and onlineSave is executed.
  // To prevent this, add firstMount state.
  useEffect(() => {
    if(updateMode) {
      if(firstMount){
        setFirstMound(false);
        return;
      }
      onlineSave();
      setUpdateMode(false);
    }
    // eslint-disable-next-line
  },[updateMode]);

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
        <Editor 
          previewStyle="vertical"
          height="750px"
          initialEditType="markdown"
          initialValue="- hello"
          events={{
            "change": () => { setUpdateMode(true); }
          }}
          useCommandShortcut={true}
          ref={editorRef}
        />
      </EditorStyled>
      <FormFooter
        onSubmit={onSubmit}
        onPreview={onPreview}
        err={err} />
    </EditContainerStyled>
  );
};

export default ArticleForm;