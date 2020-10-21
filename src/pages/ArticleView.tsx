import { defaultApi } from "~/api/entry";
import Article from "~/components/article/Article";
import SideBar from "~/components/common/SideBar";
import { parseDraftToArticle } from "~/components/parser";
import { Config } from "~/config";
import { ManageState, RootState } from "~/stores/store";
import { ArticleIface } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PageWithTitle from "./PageWithTitle";
import { IRouteProps } from "./PublicView";

const MainContainer = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  margin-right: 20px;
  @media (max-width: 1000px) {
    width: 780px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: 0 auto;
  }
  @media (max-width: 500px) {
    width: 100%;
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

// Check if this is the draft or not from pathname.
const checkIsDraft = () => {
  return window.location.pathname.startsWith("/article-draft");
};

const ArticleView = (props: Props) => {
  const { match } = props;
  const [prevArticle, setPrevArticle] = useState({} as ArticleIface);
  const [nextArticle, setNextArticle] = useState({} as ArticleIface);
  const [article, setArticle] = useState({} as ArticleIface);

  const draftsStore = useSelector<RootState, ManageState>(
    (state: any) => state.manageReducer
  );

  // Validate sorted id.
  const validSortedId = useCallback(() => {
    const id = match.params.sortedId;
    return id === undefined ? -1 : Number.parseInt(id);
  }, [match]);

  // Callback function to jump to previous article.
  const prevCallback = useCallback(() => {
    window.open(`${Config.url}/article/${prevArticle.sortedId}`, "_self");
  }, [prevArticle.sortedId]);

  // Callbakc function to jump to next article.
  const nextCallback = useCallback(() => {
    window.open(`${Config.url}/article/${nextArticle.sortedId}`, "_self");
  }, [nextArticle.sortedId]);

  // Fetch article.
  // If this is draft, get draft from redux store.
  // If this is article, call api to get article.
  useEffect((id?: number) => {
    if (checkIsDraft()) {
      const article = parseDraftToArticle(draftsStore.article);
      article.content = draftsStore.draftContent;
      setArticle(article);
      return;
    }

    const fetchArticle = async () => {
      const sortedId = id === undefined ? validSortedId() : id;
      try {
        const res = await defaultApi.apiFindArticleSortedIdGet(sortedId);
        setArticle(res.data.article);
        setPrevArticle(res.data.prevArticle);
        setNextArticle(res.data.nextArticle);
      } catch (err) {
        // handle error
      }
    };

    fetchArticle();
  }, []);

  return (
    <>
      <MainContainer>
        <Article article={article} />
        <PageWithTitle
          prevText={prevArticle.title}
          nextText={nextArticle.title}
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

export default ArticleView;
