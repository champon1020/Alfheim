import React, { useCallback, createRef, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { ArticleType } from "src/type";
import { Config } from "src/App";

// @toast-ui modules
import "../../../assets/styles/toast-ui-wrapper.css";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Viewer } from "@toast-ui/react-editor";

// highlight.js
import "highlight.js/styles/darcula.css";
import hljs from "highlight.js";


const PreviewContainer = styled.div`
  --header-height: 7rem;
`;

const Header = styled.div<{selected: boolean}>`
  display: flex;
  height: var(--header-height);
  border-bottom: solid 3px lightgray;
  margin-top: 2rem;
  padding: 0 2%;
  & h2 {
    width: 80%;
    font-size: 2rem;
    color: ${({selected}) => `${selected ? "black" : "gray"}`}
  }
  & button {
    width: 20%;
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  overflow-y: scroll;
  white-space: nowrap;
  height: calc(var(--articles-container-height) - var(--header-height) - 2.3rem);
`;

const ViewerWrapper = styled.div`
  margin: 1% 2%;
`;

type Props = {
  tab: string;
  focusedArticle: ArticleType;
}

const Preview = (props: Props) => {
  const { tab, focusedArticle } = props;
  const viewerRef = createRef<Viewer>();

  // On click listener of 'Edit' button.
  // Jump to edit page with article|draft id.
  const handleEditClick = useCallback(
    () => {
      if(focusedArticle.id === undefined) return;
      const pName = tab === "articles" ? "articleId" : "draftId";
      window.open(`${Config.host}/manage?${pName}=${focusedArticle.id}`, "_self");
    },
    [focusedArticle.id, tab],
  );

  // Update preview content by change of focusedArticle.content.
  useEffect(() => {
    if(viewerRef.current !== null) {
      viewerRef.current.getInstance().setMarkdown(focusedArticle.content);
    }
  },[focusedArticle.content, viewerRef]);

  // Initialize highlight.js
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  },[]);

  return(
    <PreviewContainer>
      <Header selected={focusedArticle.title !== undefined}>
        <h2>{focusedArticle.title === undefined 
          ? "Select Article" : focusedArticle.title}</h2>
        <Button
          backgroundColor="yellowgreen"
          color="white"
          handleOnClick={handleEditClick}
          text="Edit"
          width="80"
          height="70"/>
      </Header>
      <Content>
        <ViewerWrapper>
          <Viewer
            initialValue={focusedArticle.content}
            plugins={[
              codeSyntaxHighlightPlugin
            ]}
            ref={viewerRef}
          />
        </ViewerWrapper>
      </Content>
    </PreviewContainer>
  );
};

export default Preview;