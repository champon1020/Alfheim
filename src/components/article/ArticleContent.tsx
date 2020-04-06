import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

// @toast-ui modules
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

// highlight.js
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

const ArticleContentStyled = styled.article`
  width: 86%;
  margin: 10% auto 50px auto;
  font-size: 1.6rem;
  @media (max-width: 500px) {
    font-size: 1.2rem;
    width: 95%;
  }
`;

type ParentProps = {
  content: string;
}

type Props = ParentProps;

const ArticleContent = (props: Props) => {
  const { content } = props;

  const viewer = useCallback(
    () => {
      if(content === undefined) return <div></div>;
      return (
        <Viewer
          initialValue={content}
        />
      );
    },
    [content],
  );

  // Initialize highlight.js
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  },[]);

  return(
    <ArticleContentStyled>
      {viewer()}
    </ArticleContentStyled>
  );
};

export default ArticleContent;