import "~/assets/styles/toast-ui-wrapper.css";
import "@toast-ui/editor/dist/i18n/ja-jp";
import "highlight.js/styles/darcula.css";

import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Viewer } from "@toast-ui/react-editor";
import { loadMathJax } from "~/func";
import hljs from "highlight.js";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

const ArticleContentStyled = styled.article`
  width: 90%;
  margin: 10% auto 50px auto;
  font-size: 1.6rem;
  @media (max-width: 500px) {
    font-size: 1.2rem;
    width: 95%;
  }
`;

type Props = {
  content: string;
};

const ArticleContent = (props: Props) => {
  const { content } = props;
  const contentRef = useRef({} as HTMLDivElement);

  const viewer = useCallback(() => {
    if (content === undefined) {
      return <div></div>;
    }

    return (
      <Viewer initialValue={content} plugins={[codeSyntaxHighlightPlugin]} />
    );
  }, [content]);

  useEffect(() => {
    if (contentRef !== null && contentRef.current.innerHTML !== "<div></div>") {
      loadMathJax();
    }
  }, [viewer]);

  // Initialize highlight.js
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, []);

  return (
    <ArticleContentStyled ref={contentRef}>{viewer()}</ArticleContentStyled>
  );
};

export default ArticleContent;
