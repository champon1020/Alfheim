import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Editor from "tui-editor";
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight
import styled from "styled-components";
import InputForm from "./InputForm";
import FormFooter from "./FormFooter";
import { parseContents } from "./parser";

const EditContainerStyled = styled.div`
  background-color: whitesmoke;
`;

const observeConfig = { 
  subtree: true, 
  childList: true, 
  characterData: true 
};

const ArticleForm = () => {
  const editorRef = useRef({} as HTMLDivElement);
  const [timerId, setTimerId] = useState(0);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState({} as Element);

  const draftContents = useCallback(
    () => {
      if(timerId !== undefined){
        clearTimeout(timerId);
      }
      const newTimerId = setTimeout(() => {
        // save process
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

  const onSubmit = useCallback(
    () => {
      parseContents(setContents);
    },
    [],
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
  }, []);

  return(
    <EditContainerStyled>
      <InputForm 
        setter={setTitle}
        errSetter={setErr}
        placeholder="title" />
      <InputForm 
        setter={setCategory}
        errSetter={setErr}
        placeholder="category" />
      <div ref={editorRef}></div>
      <FormFooter
        onSubmit={onSubmit}
        err={err} />
    </EditContainerStyled>
  );
};

export default ArticleForm;