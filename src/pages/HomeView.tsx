import { defaultApi } from "~/api/entry";
import SideBar from "~/components/common/SideBar";
import ArticleList from "~/components/home/ArticleList";
import { parsePage } from "~/components/parser";
import { Config } from "~/config";
import { countToMaxPage } from "~/func";
import { ArticleIface } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Page from "./Page";
import { IRouteProps, PathParams } from "./PublicView";

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

// Scroll to the top of articles.
const scroll = () => {
  window.scroll({
    top: 430,
    behavior: "smooth",
  });
};

// Append query parameter to pathname.
const pageAppendedPath = (page: string | number) => {
  const path = window.location.pathname;
  return path + "?p=" + page;
};

type Props = IRouteProps;

const HomeView = (props: Props) => {
  const { params } = props.match;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([] as ArticleIface[]);
  const [maxPage, setMaxPage] = useState(0);

  // Jump to previous page.
  const prevCallback = useCallback(() => {
    window.history.pushState(null, "", pageAppendedPath(page - 1));
    setPage(page - 1);
    scroll();
  }, [page]);

  // Jump to next page.
  const nextCallback = useCallback(() => {
    if (page + 1 > 1) {
      window.history.pushState(null, "", pageAppendedPath(page + 1));
      setPage(page + 1);
      scroll();
    }
  }, [page]);

  window.onpopstate = () => {
    setPage(parsePage(window.location.href));
  };

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

        // Update states.
        setMaxPage(countToMaxPage(res.data.count, Config.maxArticleNum));
        setArticles(res.data.articles);
      } catch (err) {
        // handle error
      }
    };

    fetchArticles();
  }, [params, page]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
  }, []);

  return (
    <>
      <MainContainer>
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
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default HomeView;
