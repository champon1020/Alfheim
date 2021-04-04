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

const HomePage = (props: Props) => {
  const { params } = props.match;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([] as IArticle[]);

  // Callback function called as jumping to previous page.
  const prevCallback = useCallback(() => {
    window.open(`${Config.url}?p=${page - 1}`, "_self");
  }, [page]);

  // Callback function called as jumping to next page.
  const nextCallback = useCallback(() => {
    window.open(`${Config.url}?p=${page + 1}`, "_self");
  }, [page]);

  // Parse page number from query parameter.
  // Fetch articles.
  useEffect(() => {
    const page = parsePage(window.location.href);
    setPage(page);

    const { title, year, month, tag } = params;
    const path = window.location.pathname;

    if (path.startsWith("/home/title") && title !== undefined) {
      defaultApi
        .apiV3GetArticlesTitleTitleGet({ p: page, title: title })
        .then((res) => {
          setArticles(res.data.articles);
        })
        .catch((err) => {
          setErr(err);
        });
    } else if (path.startsWith("/home/tag") && tag !== undefined && tag != "") {
      defaultApi
        .apiV3GetArticlesTagTagGet({ p: page, tag: tag })
        .then((res) => {
          setArticles(res.data.articles);
        })
        .catch((err) => {
          setErr(err);
        });
    } else {
      defaultApi
        .apiV3GetArticlesGet({ p: page })
        .then((res) => {
          setArticles(res.data.articles);
        })
        .catch((err) => {
          setErr(err);
        });
    }
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

export default HomePage;
