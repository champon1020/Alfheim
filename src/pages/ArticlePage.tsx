import { apiHandler } from "~/App.tsx";
import Article from "~/components/article/Article";
import SideBar from "~/components/common/sidebar/SideBar";
import Config from "~/config";
import { IArticle } from "~/interfaces";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { IRouteProps } from "./PublicPage";

const StyledMain = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  margin-right: 20px;
  @media (max-width: 1000px) {
    width: 780px;
    margin: 0 auto;
  }
  @media (max-width: 750px) {
    width: 80%;
    margin: 0 auto;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledSub = styled.div`
  order: 2;
  margin: 0;
  width: calc(var(--container-width) / 4);
  @media (max-width: 1000px) {
    width: calc(var(--container-width) / 2.5);
    margin: 10% auto 0 auto;
  }
  @media (max-width: 750px) {
    width: 78%;
  }
`;

const StyledBackHomeButton = styled.div`
  text-align: center;
  font-size: 2.4rem;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  a {
    color: var(--base-color);
  }
`;

type Props = IRouteProps;

const ArticlePage = (props: Props) => {
  const { match } = props;
  const [err, setErr] = useState();
  const [article, setArticle] = useState({} as IArticle);

  // Fetch article.
  // If this is draft, get draft from redux store.
  // If this is article, call api to get article.
  useEffect((id?: number) => {
    apiHandler
      .apiV3GetArticleIdIdGet({
        id: match.params.id,
      })
      .then((res) => {
        setArticle(res.article);
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);

  useEffect(() => {
    if (err != null) {
      throw err;
    }
  }, [err]);

  return (
    <>
      <StyledMain>
        <Article article={article} />
        <StyledBackHomeButton>
          <a href={`${Config.origin}`}>Back Home</a>
        </StyledBackHomeButton>
      </StyledMain>
      <StyledSub>
        <SideBar />
      </StyledSub>
    </>
  );
};

export default ArticlePage;
