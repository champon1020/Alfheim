import React, { useEffect, useState, useCallback } from "react";
import ArticleList from "./article/ArticleList";
import styled from "styled-components";
import { ArticleType } from "src/type";
import { defaultApi } from "../../App";
import { parseStringToDate } from "../services/parser";
import Preview from "./article/Preview";
import Page from "./Page";

const ArticlesContainer = styled.div`
  --articles-container-height: calc(100vh - 8rem);
  background-color: white;
  margin: 0 5%;
  display: flex;
  height: var(--articles-container-height);
`;

const ArticleListContainer = styled.div`
  order: 1;
  width: 30%;
  height: calc(var(--articles-container-height));
`;

const PreviewContainer = styled.div`
  order: 2;
  width: 70%;
  background-color: white;
  height: var(--articles-container-height);
`;

const PageContainerStyled = styled.div`
  border: solid thin lightgray;
  background-color: white;
  padding: 1.9rem 0;
`;

const Articles = () => {
  const [articles, setArticles] = useState([] as ArticleType[]);
  const [focusedArticle, setFocusedArticle] = useState({} as ArticleType);

  const fetchArticles = useCallback(
    () => {
      defaultApi.apiFindArticleListGet(1)
        .then(res => {
          const { articles } = res.data;
          const articleList = [] as ArticleType[];
          articles.forEach(v => {
            const createDate = parseStringToDate(v.createDate);
            const updateDate = parseStringToDate(v.updateDate);
            articleList.push({
              ...v,
              createDate,
              updateDate,
            });
          });
          setArticles(articleList);
        });
    },
    [],
  );

  const fetchDrafts = useCallback(
    () => {
      defaultApi.apiFindDraftListGet(1)
        .then(res => {
          const articles = [] as ArticleType[];
          res.data.drafts.forEach(d => {
            // fetch drafts
          });
          setArticles(articles);
        });
    },
    [],
  );
  
  useEffect(() => {
    if(window.location.pathname.endsWith("articles")){
      fetchArticles();
    }
    if(window.location.pathname.endsWith("drafts")){
      fetchDrafts();
    }
  }, []);

  return(
    <ArticlesContainer>
      <ArticleListContainer>
        <ArticleList 
          articles={articles}
          setFocusedArticle={setFocusedArticle} />
        <PageContainerStyled>
          <Page 
            height="5"
            next={true}
            back={true}/>
        </PageContainerStyled>
      </ArticleListContainer>
      <PreviewContainer>
        <Preview 
          focusedArticle={focusedArticle} />
      </PreviewContainer>
    </ArticlesContainer>
  );
};

export default Articles;