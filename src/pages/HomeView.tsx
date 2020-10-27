import { defaultApi } from "~/api/entry";
import SideBar from "~/components/common/sidebar/SideBar";
import ArticleList from "~/components/home/ArticleList";
import { Config } from "~/config";
import { countToMaxPage } from "~/misc/misc";
import { parsePage } from "~/misc/param";
import { IArticle } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Page from "./Page";
import { IRouteProps, PathParams } from "./PublicView";

const StyledMain = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  @media (max-width: 1000px) {
    width: 790px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: 0 auto;
  }n
`;

const StyledSub = styled.div`
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

type Props = IRouteProps;

const HomeView = (props: Props) => {
  const { params } = props.match;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [maxPage, setMaxPage] = useState(0);

  // Callback function called as jumping to previous page.
  const prevCallback = useCallback(() => {
    window.open(`${Config.url}?p=${page - 1}`, "_self");
  }, [page]);

  // Callback function called as jumping to next page.
  const nextCallback = useCallback(() => {
    window.open(`${Config.url}?p=${page + 1}`, "_self");
  }, [page]);

  // Fetch articles.
  useEffect(() => {
    const fetchArticles = async () => {
      const path = window.location.pathname;
      const { title, year, month, category } = params;
      let res = {} as any;

      try {
        if (path.startsWith("/home/title") && title !== undefined) {
          // Search for articles by title.
          res = await defaultApi.apiFindArticleListTitleGet(
            title,
            page,
            Config.maxArticleNum
          );
        } else if (
          path.startsWith("/home/category") &&
          category !== undefined &&
          category !== ""
        ) {
          // Search for articles by category.
          res = await defaultApi.apiFindArticleListCategoryGet(
            category.split("-"),
            page,
            Config.maxArticleNum
          );
        } else {
          // Search for all public articles.
          res = await await defaultApi.apiFindArticleListGet(
            page,
            Config.maxArticleNum
          );
        }

        if (res.data.articles === null) {
          return;
        }

        setMaxPage(countToMaxPage(res.data.count, Config.maxArticleNum));
        setArticles(res.data.articles);
      } catch (err) {
        // handle error
      }
    };

    fetchArticles();
  }, [params, page]);

  // Parse page number from query parameter.
  useEffect(() => {
    const page = parsePage(window.location.href);
    setPage(page);
  }, []);

  return (
    <>
      <StyledMain>
        <ArticleList articles={articles} />
        <Page
          current={page}
          hiddenPrev={page === 1}
          hiddenNext={page === maxPage || maxPage === 0}
          prevText="Back"
          nextText="Next"
          prevCallback={prevCallback}
          nextCallback={nextCallback}
        />
      </StyledMain>
      <StyledSub>
        <SideBar />
      </StyledSub>
    </>
  );
};

export default HomeView;
