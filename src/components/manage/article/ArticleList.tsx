import React, { useCallback } from "react";
import ArticleListBox from "./ArticleListBox";
import styled from "styled-components";
import { ArticleType } from "~/type";

const ArticleListStyled = styled.ul`
  overflow-y: scroll;
  white-space: nowrap;
  height: calc(var(--articles-container-height) - 9rem - 4.5rem);
`;

const EmptyMessage = styled.h3<{hidden: boolean}>`
  display: ${({hidden}) => !hidden ? "none" : "block"};
  text-align: center;
  font-size: 2.0rem;
  color: gray;
  margin-top: 5%;
`;

type Props = {
  tab: string;
  articles: ArticleType[];
  setFocusedArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleList = (props: Props) => {
  const { tab, articles, setFocusedArticle, setVerify } = props;

  // Create article list component.
  const articleList = useCallback(
    () => {
      const list = [] as JSX.Element[];
      articles.forEach((v, i) => {
        list.push(
          <ArticleListBox 
            key={i}
            tab={tab}
            article={v}
            setFocusedArticle={setFocusedArticle}
            setVerify={setVerify} />
        );
      });
      return list;
    },
    [tab, articles, setFocusedArticle, setVerify],
  );

  return(
    <ArticleListStyled>
      <EmptyMessage 
        hidden={articles.length === 0}>
        {"Empty"}
      </EmptyMessage>
      {articleList()}
    </ArticleListStyled>
  );
};

export default ArticleList;
