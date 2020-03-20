import React, { useState, useCallback, useEffect } from "react";
import ArticleList from "../home/ArticleList";
import SideBar from "../common/SideBar";
import Page from "./Page";
import styled from "styled-components";
import { IRouteProps, PathParams } from "./PublicView";
import { defaultApi } from "../../App";
import { ArticleType } from "src/type";
import { AxiosResponse } from "axios";
import { InlineResponse2001 } from "src/api";
import { parsePage, parseViewArticle } from "../services/parser";


const MainContainer = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  @media (max-width: 1000px) {
    width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const SubContainer = styled.div`
  order: 2;
  margin: 0;
  width: calc(var(--container-width) / 4);
  @media (max-width: 1000px) {
    width: calc(var(--container-width) / 2.5);
    margin: 10% auto 0 auto;
  }
  @media (max-width: 800px) {
    width: 78%;
  }
`;

const proxy = async (params: PathParams, p: number): Promise<AxiosResponse<InlineResponse2001>> => {
  const path = window.location.pathname;
  switch(path) {
  case "/home/title": {
    const { title } = params;
    if(title === undefined) break;
    return await defaultApi.apiFindArticleListTitleGet(title, p);
  }
  case "/home/date": {
    const { year, month } = params;
    if(year === undefined || month === undefined) break;
    return await defaultApi.apiFindArticleListCreateDateGet(year+month, p);
  }
  case "/home/category": {
    const { category } = params;
    if(category === undefined) break;
    return await defaultApi.apiFindArticleListCategoryGet(category.split("-"), p);
  }
  default:
    return await defaultApi.apiFindArticleListGet(p);
  }
  return new Promise<AxiosResponse<InlineResponse2001>>((_, reject) => {
    reject(new Error("some error"));
  });
};

const scroll = () => {
  window.scroll({
    top: 430,
    behavior: "smooth"
  });
};

const pageAppendedPath = (page: string | number) => {
  const path = window.location.pathname;
  return path + "?p=" + page;
};

type Props = IRouteProps;

const HomeView = (props: Props) => {
  const { params } = props.match;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([] as ArticleType[]);
  const [maxPage, setMaxPage] = useState(0);

  const fetchArticle = useCallback(
    async () => {
      const res = await proxy(params, page);
      const fetchedArticles = res.data.articles;
      setMaxPage(res.data.maxPage);
      setArticles(parseViewArticle(fetchedArticles, page, maxPage));
    }, 
    [params, page, maxPage]
  );

  const prevCallback = useCallback(
    () => {
      window.history.pushState(null, "", pageAppendedPath(page-1));
      setPage(page-1);
      scroll();
    },[page]
  );

  const nextCallback = useCallback(
    () => {
      if(page+1 > 1) {
        window.history.pushState(null, "", pageAppendedPath(page+1));
        setPage(page+1);
        scroll();
      }
    },[page]
  );

  window.onpopstate = () => {
    setPage(parsePage(window.location.href));
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
  }, []);

  return(
    <>
      <MainContainer>
        <ArticleList articles={articles} />
        <Page
          current={page}
          hiddenPrev={page===1}
          hiddenNext={page===maxPage}
          prevText="Back"
          nextText="Next"
          prevCallback={prevCallback}
          nextCallback={nextCallback}
        />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default HomeView;
