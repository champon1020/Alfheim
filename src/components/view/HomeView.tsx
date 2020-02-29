import React, { useState, useCallback, useEffect } from "react";
import ArticleList from "../home/ArticleList";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import { RootState } from "../../stores/store";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IRouteProps } from "./PublicView";
import { DefaultApi } from "../../api/api";
import appActionCreator from "../../actions/actions";
import { ArticleType } from "src/type";


const MainContainer = styled.div`
  order: 1;
  width: 78%;
  margin-right: 10px;
`;

const SubContainer = styled.div`
  order: 2;
  width: 22%;
  margin-left: 10px;
`;

const api = new DefaultApi();

type Props = IRouteProps;

const HomeView = (props: Props) => {
  const [isErr, setErr] = useState(false);
  const articles = useSelector<RootState, ArticleType[]>(state => state.articlesReducer.articles);
  const dispatch = useDispatch();
  const dispatchArticle = useCallback(
    (article) => {
      dispatch(appActionCreator.updateArticles(article));
    },
    [dispatch],
  );

  useEffect(() => {
    const path = window.location.pathname;
    if(path.startsWith("/home/article")) console.log("article");
    if(path.startsWith("/home/category")) console.log("category");
    api.findArticleListGet()
      .then(res => {
        const articles = res.data.articles;
        dispatchArticle(articles);
      });
  }, [dispatchArticle]);

  return(
    <>
      <MainContainer>
        <ArticleList articles={articles} />
        <Page />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default HomeView;
