import React, { useCallback } from "react";
import Article from "../article/Article";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import { IRouteProps } from "./PublicView";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState, ManageState } from "src/stores/store";
import { ArticleType } from "src/type";
import appErrorHandler, { HttpErrorStatus } from "../services/ErrorHandler";
import ErrorPage from "../error/ErrorPage";
import { checkIsDraft } from "../article/util";
import { parseDraftToArticle } from "../services/parser";

const MainContainer = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  margin-right: 20px;
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

type Props = IRouteProps;

const ArticleView = (props: Props) => {
  const { match } = props;
  const articles = useSelector<RootState, ArticleType[]>(state => state.articleReducer.articles);
  const draftArticle = useSelector<RootState, ManageState>(state => state.manageReducer);

  const validArticleId = useCallback(
    () => {
      const articleId = match.params.articleId;
      return articleId === undefined ? -1 : Number.parseInt(articleId);
    },
    [match]
  );

  const parsePageComponent = useCallback(
    (): JSX.Element => {
      if(checkIsDraft()) {
        const article = parseDraftToArticle(draftArticle.article);
        console.log(article);
        return <Article article={article} draftContent={draftArticle.draftContent} />;
      }

      const id = validArticleId();
      const article = articles.filter(v => v.id === id);
      if(article.length === 0) {
        appErrorHandler.print(HttpErrorStatus.ERROR_404);
        return <ErrorPage />;
      }
      return <Article article={article[0]} />;
    },
    [articles, validArticleId, draftArticle],
  );


  return(
    <>
      <MainContainer>
        {parsePageComponent()}
        <Page backText="backArticleTitle" nextText="nextArticleTitle" />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default ArticleView;