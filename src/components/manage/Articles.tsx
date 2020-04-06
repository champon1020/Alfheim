import React, { useEffect, useState, useCallback } from "react";
import Cookie from "js-cookie";
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

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Articles = (props: Props) => {
  const { setVerify } = props;

  const [tab, setTab] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [articles, setArticles] = useState([] as ArticleType[]);
  const [focusedArticle, setFocusedArticle] = useState({} as ArticleType);


  // Call api of getting article list
  // and handle got articles.
  const fetchArticles = useCallback(
    async () => {
      // Call api.
      const res = await defaultApi.apiPrivateFindArticleListAllGet(page, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;

      const articleList = [] as ArticleType[];
      const fetchedArticles = res.data.articles;
      
      // null check.
      if(fetchedArticles === null) {
        setMaxPage(1);
        setArticles([]);
        return;
      }

      // Repeat each articles and push them to articleList.
      // This statement means type of fetchedArticles
      // whose type is Article (swagger declared automatically)
      // are changed to ArticleType.
      fetchedArticles.forEach(v => {
        articleList.push(v);
      });
      setMaxPage(res.data.maxPage);
      setArticles(articleList);
    }, [page, setVerify]);


  // Call api of getting draft list
  // and handle got articles.
  const fetchDrafts = useCallback(
    async () => {
      // Call api.
      const res = await defaultApi.apiPrivateFindDraftListGet(page, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;

      const articleList = [] as ArticleType[];
      const fetchedDrafts = res.data.drafts;

      // null check.
      if(fetchedDrafts === null) {
        setMaxPage(1);
        setArticles([]);
        return;
      }

      // Repeat each articles and push them to articleList.
      // This statement means type of fetchedArticles
      // whose type is Article (swagger declared automatically)
      // are changed to ArticleType.
      fetchedDrafts.forEach(v => {
        const a = parseDraftToArticle(v as DraftType);
        articleList.push(a);
      });
      setMaxPage(res.data.maxPage);
      setArticles(articleList);
    }, [page, setVerify]);


  // On click listener of going previous button.
  // Set page-1.
  const prevCallback = useCallback(
    () => {
      setPage(page-1);
    },[page]);

  // On click listener of going next button.
  // Set page+1.
  const nextCallback = useCallback(
    () => {
      setPage(page+1);
    },[page]);

  // Fetch articles or drafts.
  // Selected by the state of tab.
  useEffect(() => {
    if(tab === "articles") fetchArticles();
    if(tab === "drafts") fetchDrafts();
    // eslint-disable-next-line
  }, [page, tab]);

  // Set state of tab by url pathname.
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
          setFocusedArticle={setFocusedArticle}
          setVerify={setVerify} />
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