import React, { useState, useCallback, useEffect } from "react";
import ArticleList from "../home/ArticleList";
import SideBar from "../common/SideBar";
import Page from "./Page";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IRouteProps, PathParams } from "./PublicView";
import { defaultApi } from "../../App";
import appActionCreator from "../../actions/actions";
import { ArticleType } from "src/type";
import { AxiosResponse } from "axios";
import { InlineResponse200 } from "src/api";


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

const proxy = async (path: string, params: PathParams): Promise<AxiosResponse<InlineResponse200>> => {
  switch(path) {
  case "/home/title": {
    const { title } = params;
    if(title === undefined) break;
    return await defaultApi.apiFindArticleListTitleGet(title, 1);
  }
  case "/home/date": {
    const { year, month } = params;
    if(year === undefined || month === undefined) break;
    return await defaultApi.apiFindArticleListCreateDateGet(year+month, 1);
  }
  case "/home/category": {
    const { category } = params;
    if(category === undefined) break;
    return await defaultApi.apiFindArticleListCategoryGet(category.split("-"), 1);
  }
  default:
    return await defaultApi.apiFindArticleListGet(1);
  }
  return new Promise<AxiosResponse<InlineResponse200>>((_, reject) => {
    reject(new Error("some error"));
  });
};

type Props = IRouteProps;

const HomeView = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { params } = props.match;
  const [articles, setArticles] = useState([] as ArticleType[]);
  const dispatch = useDispatch();

  const dispatchArticle = useCallback(
    (articles) => {
      dispatch(appActionCreator.updateArticles(articles));
    },
    [dispatch],
  );

  const fetchArticle = useCallback(
    async () => {
      const path = window.location.pathname;
      const res = await proxy(path, params);
      const { articles } = res.data;
      setArticles(articles);
      dispatchArticle(articles);
    }, [dispatchArticle]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return(
    <>
      <MainContainer>
        <ArticleList articles={articles} />
        <Page backText="Back" nextText="Next" />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default HomeView;
