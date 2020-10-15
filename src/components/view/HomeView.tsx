import React, { useState, useCallback, useEffect } from "react";
import ArticleList from "~/components/home/ArticleList";
import SideBar from "~/components/common/SideBar";
import Page from "./Page";
import styled from "styled-components";
import { IRouteProps, PathParams } from "./PublicView";
import { defaultApi } from "~/App";
import { ArticleType } from "~/type";
import { AxiosResponse } from "axios";
import { InlineResponse2002 } from "~/api/api";
import { parsePage } from "~/components/services/parser";


const MainContainer = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  @media (max-width: 1000px) {
    width: 790px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const SubContainer = styled.div`
  order: 2;
  width: calc(var(--container-width) / 4);
  @media (max-width: 1000px) {
    width: calc(var(--container-width) / 2.5);
    margin: 10% auto 0 auto;
  }
  @media (max-width: 800px) {
    width: 78%;
  }
`;

const proxy = async (params: PathParams, p: number): Promise<AxiosResponse<InlineResponse2002>> => {
  const path = window.location.pathname;
  const { title, year, month, category } = params;

  if(path.startsWith("/home/title") && title !== undefined) {
    return await defaultApi.apiFindArticleListTitleGet(title, p);
  }

  if(path.startsWith("/home/date") && year !== undefined && month !== undefined) {
    return await defaultApi.apiFindArticleListCreateDateGet(year+month, p);
  }

  if(path.startsWith("/home/category") && category !== undefined && category !== "") {
    return await defaultApi.apiFindArticleListCategoryGet(category.split("-"), p);
  }

  return await defaultApi.apiFindArticleListGet(p);
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
      if(fetchedArticles === null) return; // set empty deal
      setMaxPage(res.data.maxPage);
      setArticles(fetchedArticles);
    }, 
    [params, page]
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
          hiddenNext={page===maxPage || maxPage === 0}
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
