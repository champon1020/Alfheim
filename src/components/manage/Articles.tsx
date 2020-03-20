import React, { useEffect, useState, useCallback } from "react";
import ArticleList from "./article/ArticleList";
import styled from "styled-components";
import { ArticleType, DraftType } from "src/type";
import { defaultApi } from "../../App";
import { formatDateStr, parseDraftToArticle } from "../services/parser";
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
  const [tab, setTab] = useState("articles");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [articles, setArticles] = useState([] as ArticleType[]);
  const [focusedArticle, setFocusedArticle] = useState({} as ArticleType);

  const fetchArticles = useCallback(
    async () => {
      const res = await defaultApi.apiFindArticleListGet(page);
      const fetchedArticles = res.data.articles;
      const articleList = [] as ArticleType[];

      fetchedArticles.forEach(v => {
        const createDate = formatDateStr(v.createDate);
        const updateDate = formatDateStr(v.updateDate);
        articleList.push({
          ...v,
          createDate,
          updateDate,
        });
      });

      setMaxPage(res.data.maxPage);
      setArticles(articleList);
    }, [page]);

  const fetchDrafts = useCallback(
    async () => {
      const res = await defaultApi.apiPrivateFindDraftListGet(1);
      const articleList = [] as ArticleType[];
      const { drafts } = res.data;
      drafts.forEach(v => {
        const a = parseDraftToArticle(v as DraftType);
        articleList.push({
          ...a
        });
      });
      setArticles(articleList);
    }, []);

  const prevCallback = useCallback(
    () => {
      setPage(page-1);
    },[page]);

  const nextCallback = useCallback(
    () => {
      setPage(page+1);
    },[page]);
  
  useEffect(() => {
    if(tab === "articles"){
      fetchArticles();
    }
    if(tab === "drafts"){
      fetchDrafts();
    }
    // eslint-disable-next-line
  }, [page, tab]);

  return(
    <ArticlesContainer>
      <ArticleListContainer>
        <Tab 
          tab={tab}
          setTab={setTab} />
        <ArticleList 
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
          focusedArticle={focusedArticle} />
      </PreviewContainer>
    </ArticlesContainer>
  );
};

export default Articles;