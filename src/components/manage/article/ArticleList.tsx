import React, { useCallback } from "react";
import ArticleListBox from "./ArticleListBox";
import styled from "styled-components";
import { ArticleType } from "src/type";

const ArticleListStyled = styled.ul`
  overflow-y: scroll;
  white-space: nowrap;
  height: calc(var(--articles-container-height) - 9rem - 4.5rem);
`;

type Props = {
  articles: ArticleType[];
  setFocusedArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
}

const ArticleList = (props: Props) => {
  const { articles, setFocusedArticle } = props;

  const articleList = useCallback(
    () => {
      const list = [] as JSX.Element[];
      articles.forEach((v, i) => {
        list.push(
          <ArticleListBox 
            key={i} 
            article={v}
            setFocusedArticle={setFocusedArticle} />
        );
      });
      return list;
    },
    [articles, setFocusedArticle],
  );

  return(
    <ArticleListStyled>
      {articleList()}
    </ArticleListStyled>
  );
};

export default ArticleList;