import React, { useEffect, useState, useCallback } from "react";
import ArticleList from "./article/ArticleList";
import styled from "styled-components";
import { ArticleType, DraftType } from "src/type";
import { defaultApi } from "../../App";
import { parseDraftToArticle } from "../services/parser";
import Preview from "./article/Preview";
import Page from "./Page";
import Tab from "./article/Tab";

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
  const [tab, setTab] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [articles, setArticles] = useState([] as ArticleType[]);
  const [focusedArticle, setFocusedArticle] = useState({} as ArticleType);

  const fetchArticles = useCallback(
    async () => {
      const res = await defaultApi.apiPrivateFindArticleListAllGet(page);
      const articleList = [] as ArticleType[];
      const fetchedArticles = res.data.articles;

      if(fetchedArticles === null) {
        setMaxPage(1);
        setArticles([]);
        return;
      }

      fetchedArticles.forEach(v => {
        articleList.push(v);
      });

      setMaxPage(res.data.maxPage);
      setArticles(articleList);
    }, [page]);

  const fetchDrafts = useCallback(
    async () => {
      const res = await defaultApi.apiPrivateFindDraftListGet(page);
      const articleList = [] as ArticleType[];
      const fetchedDrafts = res.data.drafts;

      if(fetchedDrafts === null) {
        setMaxPage(1);
        setArticles([]);
        return;
      }

      fetchedDrafts.forEach(v => {
        const a = parseDraftToArticle(v as DraftType);
        articleList.push(a);
      });

      setMaxPage(res.data.maxPage);
      setArticles(articleList);
    }, [page]);

  const prevCallback = useCallback(
    () => {
      setPage(page-1);
    },[page]);

  const nextCallback = useCallback(
    () => {
      setPage(page+1);
    },[page]);
  
  useEffect(() => {
    if(tab === "articles") fetchArticles();
    if(tab === "drafts") fetchDrafts();
    // eslint-disable-next-line
  }, [page, tab]);

  useEffect(() => {
    if(window.location.pathname.endsWith("articles")) setTab("articles");
    if(window.location.pathname.endsWith("drafts")) setTab("drafts");
  }, []);

  return(
    <ArticlesContainer>
      <ArticleListContainer>
        <Tab 
          tab={tab}
          setTab={setTab}
          setPage={setPage} />
        <ArticleList
          tab={tab} 
          articles={articles}
          setFocusedArticle={setFocusedArticle} />
        <PageContainerStyled>
          <Page 
            current={page}
            height="5"
            next={page===maxPage}
            prev={page===1}
            nextCallback={nextCallback}
            prevCallback={prevCallback}
          />
        </PageContainerStyled>
      </ArticleListContainer>
      <PreviewContainer>
        <Preview 
          tab={tab}
          focusedArticle={focusedArticle} />
      </PreviewContainer>
    </ArticlesContainer>
  );
};

export default Articles;