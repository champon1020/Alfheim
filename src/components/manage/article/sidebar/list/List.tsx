import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

import Box from "./Box";

const StyledList = styled.ul`
  overflow-y: scroll;
  white-space: nowrap;
  height: calc(var(--articles-container-height) - 9rem - 4.5rem);
`;

const StyledEmptyMsg = styled.h3<{ hidden: boolean }>`
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
        <Box
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
    <StyledList>
      <StyledEmptyMsg hidden={articles.length === 0}>{"Empty"}</StyledEmptyMsg>
      {articleList()}
    </StyledList>
  );
};

export default ArticleList;
