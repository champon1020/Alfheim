import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

import ListBox from "./ListBox";

const ListStyled = styled.ul`
  overflow-y: scroll;
  white-space: nowrap;
  height: calc(var(--articles-container-height) - 9rem - 4.5rem);
`;

const EmptyMessage = styled.h3<{ hidden: boolean }>`
  display: ${({ hidden }) => (!hidden ? "none" : "block")};
  text-align: center;
  font-size: 2rem;
  color: gray;
  margin-top: 5%;
`;

interface Props {
  tab: string;
  articles: IArticle[];
  setFocusedArticle: React.Dispatch<React.SetStateAction<IArticle>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleList = (props: Props) => {
  const { tab, articles, setFocusedArticle, setVerify } = props;

  // Create article list component.
  const articleList = useCallback(() => {
    const list = [] as JSX.Element[];

    articles.forEach((v, i) => {
      list.push(
        <ListBox
          key={i}
          tab={tab}
          article={v}
          setFocusedArticle={setFocusedArticle}
          setVerify={setVerify}
        />
      );
    });

    return list;
  }, [tab, articles, setFocusedArticle, setVerify]);

  return (
    <ListStyled>
      <EmptyMessage hidden={articles.length === 0}>{"Empty"}</EmptyMessage>
      {articleList()}
    </ListStyled>
  );
};

export default ArticleList;
