import * as React from "react";
import ArticleList from "../home/ArticleList";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import { RootState } from "../../stores/store";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IRouteProps } from "./PublicView";

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

type Props = IRouteProps;

const HomeView = (props: Props) => {
  const articles = useSelector((state: RootState) => state.articlesReducer.articles);
  const recomArticles = useSelector((state: RootState) => state.sidebarReducer.recomArticles);
  const dispatch = useDispatch();

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
