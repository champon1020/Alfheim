import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "./Button";
import { ArticleType } from "src/type";
import { Config } from "src/App";
import { pathJoin } from "src/components/services/parser";

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
  & article {
    font-size: 1.2rem;
    margin: 1%;
  }
`;

type Props = {
  tab: string;
  focusedArticle: ArticleType;
}

const Preview = (props: Props) => {
  const { tab, focusedArticle } = props;
  const [content, setContent] = useState("");

  const contentRef = useCallback(
    (node: HTMLElement) => {
      if(node !== null){
        node.innerHTML = "";
        node.insertAdjacentHTML("afterbegin", content);
      }
    },
    [content],
  );

  const fetchContent = useCallback(
    async () => {
      if(focusedArticle.contentHash === undefined) return;
      const dirName = tab;
      let hash = focusedArticle.contentHash;
      hash += dirName==="drafts" ? "_md" : "_html";
      const res = await axios.get(
        pathJoin(
          Config.srcHost, 
          dirName, 
          hash,
        ),
      );
      setContent(res.data);
    },
    [focusedArticle, tab],
  );

  const handleEditClick = useCallback(
    () => {
      if(focusedArticle.id === undefined) return;
      const pName = tab === "articles" ? "articleId" : "draftId";
      window.open(Config.host + "/manage?"+ pName + "=" + focusedArticle.id, "_self");
    },
    [focusedArticle.id, tab],
  );

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line
  }, [focusedArticle]);

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
        <article ref={contentRef}></article>
      </Content>
    </PreviewContainer>
  );
};

export default Preview;