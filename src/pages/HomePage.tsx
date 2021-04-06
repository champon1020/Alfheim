import { apiHandler } from "~/App";
import SideBar from "~/components/common/sidebar/SideBar";
import ArticleList from "~/components/home/ArticleList";
import { Config } from "~/config";
import { IArticle } from "~/interfaces";
import { parsePage } from "~/util/util";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Pagenation from "./Pagenation";
import { IRouteProps, PathParams } from "./PublicPage";

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
  const [err, setErr] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [isNext, setNext] = useState(false);
  const [isPrev, setPrev] = useState(false);

  // Callback function jumping to previous page.
  const prevCallback = useCallback(() => {
    window.open(`${Config.url}?p=${page - 1}`, "_self");
  }, [page]);

  // Callback function jumping to next page.
  const nextCallback = useCallback(() => {
    window.open(`${Config.url}?p=${page + 1}`, "_self");
  }, [page]);

  // Fetch articles.
  useEffect(() => {
    const page = parsePage(window.location.href);
    setPage(page);

    const { title, year, month, tag } = params;
    const path = window.location.pathname;

    if (path.startsWith("/home/title") && title !== undefined) {
      apiHandler
        .apiV3GetArticlesTitleTitleGet({ p: page, title: title })
        .then((res: any) => {
          setArticles(res.data.articles);
          setNext(res.data.pagenation.next);
          setPrev(res.data.pagenation.prev);
        })
        .catch((err: any) => {
          setErr(err);
        });
    } else if (path.startsWith("/home/tag") && tag !== undefined && tag != "") {
      apiHandler
        .apiV3GetArticlesTagTagGet({ p: page, tag: tag })
        .then((res: any) => {
          setArticles(res.data.articles);
        })
        .catch((err: any) => {
          setErr(err);
        });
    } else {
      apiHandler
        .apiV3GetArticlesGet({ p: page })
        .then((res: any) => {
          setArticles(res.data.articles);
        })
        .catch((err: any) => {
          setErr(err);
        });
    }
  }, []);

  return (
    <>
      <StyledMain>
        <ArticleList articles={articles} />
        <Pagenation
          current={page}
          isPrev={isPrev}
          isNext={isNext}
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
