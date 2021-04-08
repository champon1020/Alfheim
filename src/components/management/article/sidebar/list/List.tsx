import TabType from "~/components/management/article/tab";
import { IArticle } from "~/interfaces";
import React, { useMemo } from "react";
import styled from "styled-components";

import Box from "./Box";

const StyledList = styled.ul`
  --management-articles-sidebar-box-height: calc(
    var(--management-articles-sidebar-list-height) / 10
  );

  overflow-y: scroll;
  white-space: nowrap;
  height: var(--management-articles-sidebar-list-height);
`;

const StyledEmptyMsg = styled.h3<{ hidden: boolean }>`
  display: ${({ hidden }) => (!hidden ? "none" : "block")};
  text-align: center;
  font-size: 2rem;
  color: gray;
  margin-top: 5%;
`;

interface Props {
  tab: TabType;
  articles: IArticle[];
  setFocusedArticle: (article: IArticle) => void;
}

const ArticleList = (props: Props) => {
  const { tab, articles, setFocusedArticle } = props;

  // Create article list component.
  const articleList = useMemo(() => {
    const list = [] as JSX.Element[];
    articles.forEach((v, i) => {
      list.push(
        <Box
          key={i}
          tab={tab}
          article={v}
          setFocusedArticle={setFocusedArticle}
        />
      );
    });
    return list;
  }, [tab, articles]);

  return (
    <StyledList>
      <StyledEmptyMsg hidden={articles.length === 0}>{"Empty"}</StyledEmptyMsg>
      {articleList}
    </StyledList>
  );
};

export default ArticleList;
