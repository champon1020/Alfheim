import "@toast-ui/editor/dist/i18n/ja-jp";
import "highlight.js/styles/darcula.css";
import "~/assets/styles/toast-ui-wrapper.css";

import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Viewer } from "@toast-ui/react-editor";
import hljs from "highlight.js";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  overflow-y: scroll;
  height: calc(
    var(--articles-container-height) - var(--header-height) - 2.3rem
  );
`;

const StyledViewer = styled.div`
  margin: 1% 2%;
`;

type Props = {
  content: string;
};

const Content = (props: Props) => {
  const { content } = props;
  const viewerRef = useRef<Viewer>();

  // Update preview content by change of focusedArticle.content.
  useEffect(() => {
    if (viewerRef.current !== null) {
      viewerRef.current.getInstance().setMarkdown(content);
    }
  }, [content, viewerRef]);

  // Initialize highlight.js
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, []);

  return (
    <StyledContent>
      <StyledViewer>
        <Viewer
          initialValue={content}
          plugins={[codeSyntaxHighlightPlugin]}
          ref={viewerRef}
        />
      </StyledViewer>
    </StyledContent>
  );
};

export default Content;
