import "codemirror/lib/codemirror.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ja-jp";
import "highlight.js/styles/darcula.css";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Editor } from "@toast-ui/react-editor";
import { ErrorStatus, MyErrorStatus } from "~/error";
import { convertRefFromFunc } from "~/func";
import hljs from "highlight.js";
import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";

const StyledMdEditor = styled.div`
  font-size: 1.6rem;
`;

// Duration of saving article on real time.
const onlineSaveDuration = 3000;

type Props = {
  onlineSave: () => void;
  setErr: React.Dispatch<React.SetStateAction<ErrorStatus>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
};

const MarkdownEditor = forwardRef<Editor, Props>((props, ref) => {
  const { onlineSave, setErr, setMsg } = props;

  // Reference for markdown editor.
  const editorRef = convertRefFromFunc(ref);

  // Initialize highlight.js
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, []);

  return (
    <StyledMdEditor>
      <Editor
        previewStyle="vertical"
        height="750px"
        initialEditType="markdown"
        events={{
          change: () => {
            setErr(MyErrorStatus.NONE);
            setMsg("");
            onlineSave();
          },
        }}
        plugins={[colorSyntax, codeSyntaxHighlight]}
        useCommandShortcut={true}
        ref={editorRef}
      />
    </StyledMdEditor>
  );
});

export default MarkdownEditor;
