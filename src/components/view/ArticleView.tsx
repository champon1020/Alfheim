import React, { useCallback, useState, useEffect } from "react";
import Article from "../article/Article";
import SideBar from "../common/SideBar";
import PageWithTitle from "./PageWithTitle";
import { IRouteProps } from "./PublicView";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, ManageState } from "src/stores/store";
import { ArticleType } from "src/type";
import appErrorHandler, { HttpErrorStatus } from "../services/ErrorHandler";
import ErrorPage from "../error/ErrorPage";
import { checkIsDraft } from "../article/util";
import { parseDraftToArticle } from "../services/parser";
import axios from "axios";

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
  const [prevTitle, setPrevTitle] = useState("");
  const [nextTitle, setNextTitle] = useState("");
  const [article, setArticle] = useState({} as ArticleType);
  const [content, setContent] = useState("");
  const articlesStore = useSelector<RootState, ArticleType[]>(state => state.articleReducer.articles);
  const draftsStore = useSelector<RootState, ManageState>(state => state.manageReducer);
  const dispatch = useDispatch();

  const validArticleId = useCallback(
    () => {
      const articleId = match.params.articleId;
      return articleId === undefined ? -1 : Number.parseInt(articleId);
    },
    [match]
  );

  const fetchContent = useCallback(
    async (article: ArticleType) => {
      if(article.contentHash === undefined) return;
      const res = await axios.get(article.contentHash);
      setContent(res.data);
    },[]
  );

  const fetchArticle = useCallback(
    () => {
      if(checkIsDraft()) {
        const article = parseDraftToArticle(draftsStore.article);
        setArticle(article);
        setContent(draftsStore.draftContent);
        return;
      }

      const id = validArticleId();
      let flg = 0;
      const filteredArticle = articlesStore.filter(v => {
        if(v.id === id-1) {
          setPrevTitle(v.title);
          flg |= 1<<2;
        }
        if(v.id === id+1) {
          setNextTitle(v.title);
          flg |= 1<<1;
        }
        return v.id === id;
      });
      if(filteredArticle.length === 0) {
        appErrorHandler.print(HttpErrorStatus.ERROR_404);
        // handler error
        return;
      }
      if(~flg & (1<<2)) setPrevTitle("");
      if(~flg & (1<<1)) setNextTitle("");
      setArticle(filteredArticle[0]);
      fetchContent(filteredArticle[0]);
    },
    [validArticleId, articlesStore, draftsStore, fetchContent],
  );

  const prevCallback = useCallback(
    () => {
      // fix
    },[]
  );

  const nextCallback = useCallback(
    () => {
      // fix
    },[]
  );

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return(
    <>
      <MainContainer>
        <Article 
          article={article}
          content={content} />
        <PageWithTitle
          prevText={prevTitle}
          nextText={nextTitle}
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