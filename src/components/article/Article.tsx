import React, { useCallback } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";
import styled from "styled-components";
import { parseUrl } from "../services/parser";
import { useSelector } from "react-redux";
import { RootState } from "src/stores/store";
import { ArticleType } from "src/type";

const ArticleContainerStyled = styled.div`
  background-color: whitesmoke;
  padding: 40px 10px;
  margin-bottom: 70px;
  box-shadow: 2px 2px 4px gray;
`;

interface ParentProps {
  articleId: number;
}

type Props = ParentProps;

const Article = (props: Props) => {
  const articleId = parseUrl(window.location.pathname).slice(-1)[0];
  const articles = useSelector<RootState, ArticleType[]>(state => state.articleReducer.articles);

  const parseArticle = useCallback(
    (): ArticleType => {
      const article = articles.filter(v => v.id === Number.parseInt(articleId));
      // if(article.length === 0) {
      //   error handling process
      // }
      return article[0];
    },
    [articles, articleId],
  );

  return(
    <ArticleContainerStyled>
      <ArticleHeader article={parseArticle()} />
      <ArticleContent article={parseArticle()} />
      <ArticleFooter />
    </ArticleContainerStyled>
  );
};

export default Article;