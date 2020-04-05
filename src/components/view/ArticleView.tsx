import React, { useCallback, useState, useEffect } from "react";
import Article from "../article/Article";
import SideBar from "../common/SideBar";
import PageWithTitle from "./PageWithTitle";
import { IRouteProps } from "./PublicView";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState, ManageState } from "src/stores/store";
import { ArticleType } from "src/type";
import { checkIsDraft } from "../article/util";
import { parseDraftToArticle, pathJoin } from "../services/parser";
import { ax } from "../../App";
import { defaultApi, Config } from "src/App";

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
  const [prevArticle, setPrevArticle] = useState({title: ""} as ArticleType);
  const [nextArticle, setNextArticle] = useState({title: ""} as ArticleType);
  const [article, setArticle] = useState({} as ArticleType);
  const [content, setContent] = useState("");
  const draftsStore = useSelector<RootState, ManageState>(state => state.manageReducer);

  const validSortedId = useCallback(
    () => {
      const id = match.params.sortedId;
      return id === undefined ? -1 : Number.parseInt(id);
    },
    [match]
  );

  const fetchArticle = useCallback(
    async (id?: number) => {
      if(checkIsDraft()) {
        const article = parseDraftToArticle(draftsStore.article);
        setArticle(article);
        setContent(draftsStore.draftContent);
        return;
      }

      const sortedId = id === undefined ? validSortedId() : id;
      const res = await defaultApi.apiFindArticleSortedIdGet(sortedId);
      const fetchedArticle = res.data.article;
      const { next, prev } = res.data;
      setArticle(fetchedArticle);
      setPrevArticle(prev);
      setNextArticle(next);
    },
    [validSortedId, draftsStore],
  );

  const prevCallback = useCallback(
    () => {
      window.open(`${Config.host}/article/${prevArticle.sortedId}`, "_self");
    },[prevArticle.sortedId]
  );

  const nextCallback = useCallback(
    () => {
      window.open(`${Config.host}/article/${nextArticle.sortedId}`, "_self");
    },[nextArticle.sortedId]
  );

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    fetchArticle();
    // eslint-disable-next-line
  }, []);

  return(
    <>
      <MainContainer>
        <Article 
          article={article} />
        <PageWithTitle
          prevText={prevArticle.title}
          nextText={nextArticle.title}
          prevCallback={prevCallback}
          nextCallback={nextCallback} />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default ArticleView;