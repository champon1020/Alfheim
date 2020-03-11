import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "./Button";
import { ArticleType } from "src/type";

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
  height: calc(var(--articles-container-height) - var(--header-height) - 13px - 2rem);
  & article {
    font-size: 1.2rem;
    margin: 1%;
  }
`;

type Props = {
  focusedArticle: ArticleType;
}

const Preview = (props: Props) => {
  const { focusedArticle } = props;
  const [content, setContent] = useState("");

  const contentRef = useCallback(
    (node: HTMLElement) => {
      if(node !== null){
        node.insertAdjacentHTML("afterbegin", content);
      }
    },
    [content],
  );

  const fetchContent = useCallback(
    () => {
      if(focusedArticle.contentHash === undefined) return;
      axios.get(focusedArticle.contentHash)
        .then(res => {
          setContent(res.data);
        });
    },
    [focusedArticle],
  );

  const handleEditClick = useCallback(
    () => {
      window.open("http://localhost:3000/manage?articleId=1");
    },
    [],
  );

  useEffect(() => {
    fetchContent();
  }, [fetchContent, focusedArticle]);

  return(
    <PreviewContainer>
      <Header selected={focusedArticle.title !== undefined}>
        <h2>{focusedArticle.title === undefined 
          ? "Select Article" : focusedArticle.title}</h2>
        <Button 
          handleOnClick={handleEditClick}
          text={"Edit"}
          width={"80"}
          height={"70"}/>
      </Header>
      <Content>
        <article ref={contentRef}></article>
      </Content>
    </PreviewContainer>
  );
};

export default Preview;