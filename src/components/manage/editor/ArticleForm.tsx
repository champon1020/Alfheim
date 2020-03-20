import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Editor from "tui-editor";
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight
import styled from "styled-components";
import InputForm from "./InputForm";
import FormFooter from "./FormFooter";
import { parseContents, parseDraftToRequestArticle } from "./parser";
import { useDispatch } from "react-redux";
import appActionCreator from "src/actions/actions";
import { ArticleType, DraftType } from "src/type";
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

type Props = {
  updatingArticle?: ArticleType;
}

const defaultDraft: DraftType = {
  id: "",
  sortedId: -1,
  title: "",
  categories: "",
  updateDate: "",
  contentHash: "",
  imageHash: ""
};

const ArticleForm = (props: Props) => {
  const { updatingArticle } = props;
  const editorRef = useRef({} as HTMLDivElement);
  const [timerId, setTimerId] = useState(0);
  const [err, setErr] = useState(MyErrorStatus.NONE as ErrorStatus);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [draft] = useState(defaultDraft);
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();

  const save = useCallback(
    () => {
      if(timerId !== undefined){
        clearTimeout(timerId);
      }
      // save process
      const newTimerId = setTimeout(() => {
        const newContents = parseContents(setContents);
        dispatch(appActionCreator.updateDraft(draft, newContents));
        defaultApi.apiDraftArticlePost({article: draft, contents: newContents});
      }, 300);

      setTimerId(newTimerId);
    },
    [timerId, draft, dispatch],
  );

  const observer = useMemo(() => {
    return new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const el = mutation.target as Element;
        if(el.className === "tui-editor-contents"){
          save();
        }
      });
    });
  }, [save]);

  const validation = useCallback(
    () => (validateTitle(title, setErr) || validateCategory(categories, setErr)),
    [title, categories],
  );

  const onSubmit = useCallback(
    () => {
      if(validation()) return;
      parseContents(setContents);
      const article = parseDraftToRequestArticle(draft);
      defaultApi.apiRegisterArticlePost({article: article, contents: contents});
    },
    [draft, contents, validation],
  );

  const onPreview = useCallback(
    () => {
      if(validation()) return;
      window.open("/article-draft/");
    },
    [validation],
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

    if(updatingArticle !== undefined) {
      if(updatingArticle.title !== undefined){
        setTitleHandler(updatingArticle.title);
      }
      if(updatingArticle.categories !== undefined) {
        let categoriesStr = "";
        updatingArticle.categories.forEach(v => categoriesStr += v.name + ",");
        setCategoriesHandler(categoriesStr);
      }
    }
    // eslint-disable-next-line
  }, []);

  const setTitleHandler = useCallback(
    (title: string) => {
      setTitle(title);
      draft.title = title;
      save();
    },[draft, save]);

  const setCategoriesHandler = useCallback(
    (categories: string) => {
      setCategories(categories);
      draft.categories = categories;
      save();
    },[draft, save]);

  return(
    <EditContainerStyled>
      <InputForm 
        value={title}
        setter={setTitleHandler}
        errSetter={setErr}
        placeholder="title" />
      <InputForm 
        value={categories}
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