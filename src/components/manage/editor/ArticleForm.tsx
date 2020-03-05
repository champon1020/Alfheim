import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Editor from "tui-editor";
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight
import styled from "styled-components";
import InputForm from "./InputForm";
import FormFooter from "./FormFooter";
import { parseContents, parseToRequestArticle } from "./parser";
import { useDispatch } from "react-redux";
import appActionCreator from "src/actions/actions";
import { ArticleType } from "src/type";
import { ErrorStatus, MyErrorStatus } from "src/components/services/ErrorHandler";
import { validateTitle, validateCategory } from "./validattions";

const EditContainerStyled = styled.div`
  background-color: whitesmoke;
`;

const observeConfig = { 
  subtree: true, 
  childList: true
};

type Props = {
  updatingArticle: ArticleType;
}

const ArticleForm = (props: Props) => {
  const { updatingArticle } = props;
  const editorRef = useRef({} as HTMLDivElement);
  const [timerId, setTimerId] = useState(0);
  const [err, setErr] = useState(MyErrorStatus.NONE as ErrorStatus);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();

  const draftContents = useCallback(
    () => {
      if(timerId !== undefined){
        clearTimeout(timerId);
      }
      const newTimerId = setTimeout(() => {
        // save process
        parseContents(setContents);
      }, 1000);
      setTimerId(newTimerId);
    },
    [timerId],
  );

  const observer = useMemo(() => {
    return new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const el = mutation.target as Element;
        if(el.className === "tui-editor-contents"){
          draftContents();
        }
      });
    });
  }, [draftContents]);

  const validation = useCallback(
    () => {
      return validateTitle(title, setErr) || validateCategory(category, setErr);
    },
    [title, category],
  );

  const onSubmit = useCallback(
    () => {
      if(validation()) return;
      parseContents(setContents);
      const article = parseToRequestArticle(title, category);
    },
    [title, category, validation],
  );

  const onPreview = useCallback(
    () => {
      if(validation()) return;
      parseContents(setContents);
      const article = parseToRequestArticle(title, category);
      dispatch(appActionCreator.updateDraft({article: article, draftContent: contents}));
      window.open("/article-draft/");
    },
    [contents, dispatch, category, title, validation],
  );

  useEffect(() => {
    const target = editorRef.current;
    const instance = new Editor({
      el: target,
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "755px"
    });

    observer.observe(target, observeConfig);
    instance.getHtml();
    // eslint-disable-next-line

    if(updatingArticle !== {} as ArticleType) {
      if(updatingArticle.title !== undefined){
        setTitle(updatingArticle.title);
      }
      if(updatingArticle.categories !== undefined) {
        let categoriesStr = "";
        updatingArticle.categories.forEach(v => categoriesStr += v.name);
        setCategory(categoriesStr);
      }
    }
    // eslint-disable-next-line
  }, []);

  return(
    <EditContainerStyled>
      <InputForm 
        value={title}
        setter={setTitle}
        errSetter={setErr}
        placeholder="title" />
      <InputForm 
        value={category}
        setter={setCategory}
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